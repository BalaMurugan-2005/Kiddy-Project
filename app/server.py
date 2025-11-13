import os
import random
from dataclasses import dataclass
from typing import Any, Dict, List, Optional

from flask import Flask, jsonify, render_template, request
from flask_cors import CORS


def create_app() -> Flask:
	app = Flask(__name__, static_folder="static", template_folder="templates")
	app.config["JSON_SORT_KEYS"] = False
	app.secret_key = os.environ.get("FLASK_SECRET_KEY", "dev-secret-key")
	CORS(app)

	@app.route("/", methods=["GET"])
	def index():
		return render_template("index.html")

	@app.route("/grade", methods=["POST"])
	def set_grade():
		data = request.get_json(silent=True) or {}
		grade = str(data.get("grade", "")).strip()
		if not grade or not grade.isdigit() or not (1 <= int(grade) <= 10):
			return jsonify({"ok": False, "error": "Invalid grade"}), 400
		return jsonify({
			"ok": True,
			"message": f"Welcome to Grade {grade} Universe — Let’s Learn with Stories & Games!",
			"grade": int(grade),
		})

	@app.route("/video", methods=["POST"])
	def get_video():
		data = request.get_json(silent=True) or {}
		subject = (data.get("subject") or "general").lower()
		grade = int(data.get("grade") or 5)
		# Mock a small catalog of curated videos by subject and grade band
		video_catalog = {
			"math": [
				{"title": "Understanding Fractions", "url": "https://www.youtube.com/embed/4lkq3D4XNVw"},
				{"title": "Multiply Like a Pro", "url": "https://www.youtube.com/embed/CFb-0-7D8oE"},
				{"title": "Geometry Basics", "url": "https://www.youtube.com/embed/6hG8h7WZ8v8"},
			],
			"science": [
				{"title": "The Water Cycle", "url": "https://www.youtube.com/embed/al-do-HGuIk"},
				{"title": "Solar System Tour", "url": "https://www.youtube.com/embed/libKVRa01L8"},
				{"title": "Plant Life Explained", "url": "https://www.youtube.com/embed/ql6OL7_qFgU"},
			],
			"general": [
				{"title": "Learn with Kiddy", "url": "https://www.youtube.com/embed/dQw4w9WgXcQ"},
				{"title": "Study Superpowers", "url": "https://www.youtube.com/embed/2L1J4w0Qh1U"},
				{"title": "Creative Thinking", "url": "https://www.youtube.com/embed/1bq0qff4iF8"},
			],
		}
		pool = video_catalog.get(subject) or video_catalog["general"]
		video = random.choice(pool)
		return jsonify({"ok": True, "subject": subject, "grade": grade, "video": video})

	@app.route("/voice", methods=["POST"])
	def voice():
		# This endpoint is a stub for server-side voice handling.
		# Frontend uses the Web Speech API for STT/TTS. We simply echo.
		data = request.get_json(silent=True) or {}
		text = (data.get("text") or "").strip()
		if not text:
			return jsonify({"ok": False, "error": "No text provided"}), 400
		return jsonify({"ok": True, "transcript": text, "tts": text})

	@app.route("/chat", methods=["POST"])
	def chat():
		data = request.get_json(silent=True) or {}
		message = (data.get("message") or "").strip()
		mode = (data.get("mode") or "chat").strip()  # chat | story | explain
		grade = int(data.get("grade") or 5)
		subject = (data.get("subject") or "general").strip()
		model = (data.get("model") or os.environ.get("OPENAI_MODEL", "gpt-4o-mini")).strip()
		images = data.get("images") or []  # array of data URLs or http urls

		if not message:
			return jsonify({"ok": False, "error": "Message is required"}), 400

		response = generate_ai_response(
			message=message,
			mode=mode,
			grade=grade,
			subject=subject,
			model=model,
			images=images,
		)
		return jsonify({"ok": True, "response": response})

	@app.route("/search", methods=["POST"])
	def search():
		data = request.get_json(silent=True) or {}
		query = (data.get("query") or "").strip()
		if not query:
			return jsonify({"ok": False, "error": "Query is required"}), 400
		# Use public Wikipedia opensearch API (no key required)
		import requests
		try:
			resp = requests.get(
				"https://en.wikipedia.org/w/api.php",
				params={
					"action": "opensearch",
					"search": query,
					"limit": 5,
					"namespace": 0,
					"format": "json"
				},
				timeout=6,
			)
			js = resp.json()
			titles = js[1] or []
			descs = js[2] or []
			links = js[3] or []
			results = []
			for i in range(min(len(titles), len(links))):
				results.append({
					"title": titles[i],
					"snippet": (descs[i] if i < len(descs) else "") or "",
					"url": links[i],
				})
			return jsonify({"ok": True, "results": results})
		except Exception:
			return jsonify({"ok": False, "error": "Search failed"}), 500

	return app


def generate_ai_response(message: str, mode: str, grade: int, subject: str, model: str, images: List[str]) -> Dict[str, Any]:
	"""
	Generate a friendly response. Uses OpenAI if available, otherwise a playful mock.
	"""
	api_key = os.environ.get("OPENAI_API_KEY", "").strip()
	use_openai = bool(api_key)
	if use_openai:
		try:
			# Lazy import to keep cold-start fast when not using OpenAI
			from openai import OpenAI
			client = OpenAI(api_key=api_key)
			system_prompt = _build_system_prompt(grade=grade, subject=subject)
			user_prompt = _build_user_prompt(message=message, mode=mode)
			# Prepare content with optional images for vision-capable models
			user_content: List[Dict[str, Any]] = [{"type": "text", "text": user_prompt}]
			for img in images[:3]:
				user_content.append({"type": "image_url", "image_url": {"url": img}})
			chat = client.chat.completions.create(
				model=(model or os.environ.get("OPENAI_MODEL", "gpt-4o-mini")),
				messages=[
					{"role": "system", "content": system_prompt},
					{"role": "user", "content": user_content if len(user_content) > 1 else user_prompt},
				],
				temperature=0.8,
				max_tokens=500,
			)
			text = chat.choices[0].message.content.strip()
			return {"text": text, "model": "openai", "used_model": model}
		except Exception as e:
			# Fall back to mock on error
			pass

	# Mock playful response
	img_note = f"\n(You attached {len(images)} image(s). I'll imagine what they show!)" if images else ""
	if mode == "story":
		text = (
			f"Once upon a starlit night in Kiddy Universe, Grade {grade} explorer,\n"
			f"you discovered a {subject or 'mysterious'} portal! With a brave smile, you said:\n"
			f"“{message}” — and the portal giggled! It taught you a shiny new idea,\n"
			f"and a friendly comet cheered, ‘Light. Learn. Dream!’ 🚀✨{img_note}"
		)
	elif mode == "explain":
		text = (
			f"Here’s a Grade {grade} friendly explanation about {subject or 'this concept'}:\n"
			f"- Think of it like a simple game.\n"
			f"- Break it into steps.\n"
			f"- Try an example: {message}\n"
			f"Great job! What part should we explore next?{img_note}"
		)
	else:
		text = (
			f"Awesome thought! For Grade {grade}, here’s a helpful tip:\n"
			f"“{message}” can be explored with stories, voices, and videos.\n"
			f"Pick a panel to dive deeper — Story, Voice, or Video! 🌈{img_note}"
		)
	return {"text": text, "model": "mock"}


def _build_system_prompt(grade: int, subject: str) -> str:
	return (
		f"You are Kiddy Universe, a cheerful AI teacher for kids. "
		f"Keep tone playful yet clear. Level content for Grade {grade}. "
		f"Subject focus: {subject or 'general learning'}. "
		f"Prefer short paragraphs, bullet points, and simple examples."
	)


def _build_user_prompt(message: str, mode: str) -> str:
	if mode == "story":
		return (
			"Create a short, imaginative story that teaches the concept in a friendly way. "
			"Include vivid imagery and 2-3 short paragraphs. Concept: " + message
		)
	if mode == "explain":
		return (
			"Explain this concept simply using an analogy and a quick example. "
			"Keep it kid-friendly and concise. Concept: " + message
		)
	return "Respond as a friendly tutor. Question or idea: " + message


app = create_app()

if __name__ == "__main__":
	# For local development
	app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")), debug=True)


