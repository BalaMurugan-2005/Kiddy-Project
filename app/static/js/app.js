/* Kiddy Universe Frontend Logic */
(function () {
	"use strict";

	const bodyRoot = document.getElementById("bodyRoot");
	const chatList = document.getElementById("chatList");
	const chatInput = document.getElementById("chatInput");
	const btnSend = document.getElementById("btnSend");
	const subjectSelect = document.getElementById("subjectSelect");
	const gradeSelect = document.getElementById("gradeSelect");
	const modeChips = Array.from(document.querySelectorAll(".mode-chip"));
	const panelButtons = Array.from(document.querySelectorAll(".circle-btn"));
	const imagePicker = document.getElementById("imagePicker");
	const btnAttach = document.getElementById("btnAttach");
	const attachPreview = document.getElementById("attachPreview");
	const btnSearch = document.getElementById("btnSearch");
	const mentionMenu = document.getElementById("mentionMenu");
	const appContainer = document.getElementById("app-container");
	const sideIds = {
		voice: document.getElementById("voice-btn"),
		story: document.getElementById("story-btn"),
		video: document.getElementById("video-btn"),
		grades: document.getElementById("grades-btn"),
		settings: document.getElementById("settings-btn"),
	};

	// Panels
	const panels = {
		voice: document.getElementById("panel-voice"),
		story: document.getElementById("panel-story"),
		video: document.getElementById("panel-video"),
		grades: document.getElementById("panel-grades"),
		settings: document.getElementById("panel-settings"),
	};

	// Voice controls
	const btnStartVoice = document.getElementById("btnStartVoice");
	const btnStopVoice = document.getElementById("btnStopVoice");
	const btnVoiceInline = document.getElementById("btnVoiceInline");
	const micVisual = document.getElementById("micVisual");

	// Video controls
	const btnLoadVideo = document.getElementById("btnLoadVideo");
	const videoSubject = document.getElementById("videoSubject");
	const videoPlayer = document.getElementById("videoPlayer");
	const videoTitle = document.getElementById("videoTitle");

	// Grades
	const gradeGrid = document.getElementById("gradeGrid");
	const gradeWelcome = document.getElementById("gradeWelcome");

	// Settings
	const toggleAnimation = document.getElementById("toggleAnimation");
	const fontSizeRange = document.getElementById("fontSizeRange");
	const voiceRateRange = document.getElementById("voiceRateRange");
	const themeColorPicker = document.getElementById("themeColorPicker");
	const btnReset = document.getElementById("btnReset");

	let activeMode = "chat"; // chat | story | explain
	let recognition = null;
	let speakingUtterance = null;
	let attachedImages = []; // dataURLs
	let selectedModel = "";

	// Build grade cards
	for (let i = 1; i <= 10; i++) {
		const btn = document.createElement("button");
		btn.className = "btn-chip";
		btn.textContent = `Grade ${i}`;
		btn.addEventListener("click", async () => {
			gradeSelect.value = String(i);
			const res = await fetch("/grade", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ grade: i }),
			});
			const data = await res.json();
			if (data?.ok) {
				gradeWelcome.textContent = data.message;
				applyTheme("grades");
			}
		});
		gradeGrid.appendChild(btn);
	}

	// Mode chips
	modeChips.forEach((chip) => {
		chip.addEventListener("click", () => {
			activeMode = chip.dataset.mode;
			modeChips.forEach((c) => c.classList.remove("ring-2", "ring-violet-300"));
			chip.classList.add("ring-2", "ring-violet-300");
		});
	});

	// Panel toggles and theme switching
	panelButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			const panelKey = btn.dataset.panel;
			togglePanel(panelKey);
		});
	});

	function togglePanel(key) {
		Object.entries(panels).forEach(([k, panel]) => {
			if (!panel) return;
			if (k === key) {
				panel.classList.toggle("open");
				panel.classList.toggle("active");
				if (panel.classList.contains("open")) applyTheme(k);
			} else {
				panel.classList.remove("open");
				panel.classList.remove("active");
			}
		});
		// Update active state on side buttons to reflect current open panel
		Object.entries(sideIds).forEach(([name, el]) => {
			if (!el) return;
			if (name === key && panels[key]?.classList.contains("open")) el.classList.add("active");
			else el.classList.remove("active");
		});
	}

	function applyTheme(section) {
		bodyRoot.classList.remove("theme-voice", "theme-story", "theme-video", "theme-grades", "theme-settings");
		if (section === "voice") bodyRoot.classList.add("theme-voice");
		if (section === "story") bodyRoot.classList.add("theme-story");
		if (section === "video") bodyRoot.classList.add("theme-video");
		if (section === "grades") bodyRoot.classList.add("theme-grades");
		if (section === "settings") bodyRoot.classList.add("theme-settings");
		// Also update the app container gradient using CSS variables, matching the example
		if (!appContainer) return;
		const mapping = {
			voice: "var(--bg-voice)",
			story: "var(--bg-story)",
			video: "var(--bg-video)",
			grades: "var(--bg-grades)",
			settings: "var(--bg-settings)",
		};
		appContainer.style.background = mapping[section] || "var(--bg-default)";
	}

	// Chat interactions
	btnSend.addEventListener("click", sendMessage);
	chatInput.addEventListener("keydown", (e) => {
		if (e.key === "Enter") sendMessage();
		// Show mention menu when user types '@'
		if (e.key === "@") {
			openMentionMenu();
		}
	});

	// Attach images
	if (btnAttach && imagePicker) {
		btnAttach.addEventListener("click", () => imagePicker.click());
		imagePicker.addEventListener("change", async () => {
			if (!imagePicker.files) return;
			const files = Array.from(imagePicker.files).slice(0, 3);
			for (const f of files) {
				await readAsDataURL(f).then((url) => attachedImages.push(url));
			}
			renderAttachPreview();
			imagePicker.value = "";
		});
	}
	function readAsDataURL(file) {
		return new Promise((resolve, reject) => {
			const fr = new FileReader();
			fr.onload = () => resolve(fr.result);
			fr.onerror = reject;
			fr.readAsDataURL(file);
		});
	}
	function renderAttachPreview() {
		if (!attachPreview) return;
		attachPreview.innerHTML = "";
		if (!attachedImages.length) {
			attachPreview.classList.add("hidden");
			return;
		}
		attachPreview.classList.remove("hidden");
		attachedImages.forEach((url, idx) => {
			const t = document.createElement("div");
			t.className = "thumb";
			const img = document.createElement("img");
			img.src = url;
			const x = document.createElement("button");
			x.className = "x";
			x.textContent = "×";
			x.addEventListener("click", () => {
				attachedImages.splice(idx, 1);
				renderAttachPreview();
			});
			t.appendChild(img); t.appendChild(x);
			attachPreview.appendChild(t);
		});
	}

	// Mention models
	function openMentionMenu() {
		if (!mentionMenu) return;
		mentionMenu.classList.remove("hidden");
	}
	if (mentionMenu) {
		mentionMenu.addEventListener("click", (e) => {
			const target = e.target;
			if (target && target.dataset && target.dataset.model) {
				selectedModel = target.dataset.model;
				chatInput.value = (chatInput.value || "") + " @" + selectedModel + " ";
				mentionMenu.classList.add("hidden");
			}
		});
		document.addEventListener("click", (e) => {
			if (!mentionMenu.contains(e.target) && e.target !== chatInput) {
				mentionMenu.classList.add("hidden");
			}
		});
	}

	function appendMessage(role, text) {
		const msg = document.createElement("div");
		msg.className = `msg ${role}`;
		const avatar = document.createElement("div");
		avatar.className = "avatar";
		avatar.textContent = role === "user" ? "🧒" : "✨";
		const bubble = document.createElement("div");
		bubble.className = "bubble whitespace-pre-wrap";
		bubble.textContent = text;
		msg.appendChild(avatar);
		msg.appendChild(bubble);
		chatList.appendChild(msg);
		chatList.scrollTo({ top: chatList.scrollHeight, behavior: "smooth" });
		return bubble;
	}

	function appendTyping() {
		const msg = document.createElement("div");
		msg.className = "msg ai";
		const avatar = document.createElement("div");
		avatar.className = "avatar";
		avatar.textContent = "✨";
		const bubble = document.createElement("div");
		bubble.className = "bubble";
		const dots = document.createElement("div");
		dots.className = "typing";
		dots.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
		bubble.appendChild(dots);
		msg.appendChild(avatar);
		msg.appendChild(bubble);
		chatList.appendChild(msg);
		chatList.scrollTo({ top: chatList.scrollHeight, behavior: "smooth" });
		return msg;
	}

	async function sendMessage() {
		const text = (chatInput.value || "").trim();
		if (!text) return;
		appendMessage("user", text);
		chatInput.value = "";
		// Parse inline model mention like "@gpt-4o-mini"
		const at = text.match(/@([a-zA-Z0-9\-\._]+)/);
		const modelOverride = at ? at[1] : (selectedModel || "");
		const typingEl = appendTyping();
		try {
			const res = await fetch("/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					message: text,
					mode: activeMode,
					subject: subjectSelect.value,
					grade: Number(gradeSelect.value),
					model: modelOverride,
					images: attachedImages,
				}),
			});
			const data = await res.json();
			typingEl.remove();
			const aiText = data?.response?.text || "I couldn't think of a response. Try again?";
			const bubble = appendMessage("ai", aiText);
			if (voiceEnabled()) speak(aiText);
			// Clear attachments after send
			attachedImages = [];
			renderAttachPreview();
		} catch (e) {
			typingEl.remove();
			appendMessage("ai", "Hmm, something went wrong. Please try again.");
		}
	}

	// Voice: Web Speech API (STT + TTS)
	function getRecognition() {
		if (recognition) return recognition;
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition) return null;
		recognition = new SpeechRecognition();
		recognition.lang = "en-US";
		recognition.continuous = true;
		recognition.interimResults = true;
		recognition.onresult = (event) => {
			let interim = "";
			let final = "";
			for (let i = event.resultIndex; i < event.results.length; i++) {
				const transcript = event.results[i][0].transcript;
				if (event.results[i].isFinal) final += transcript;
				else interim += transcript;
			}
			if (interim) {
				// show interim in the input
				chatInput.value = interim;
			}
			if (final) {
				chatInput.value = final.trim();
			}
		};
		recognition.onstart = () => micVisual.classList.add("ring-4", "ring-sky-300");
		recognition.onend = () => micVisual.classList.remove("ring-4", "ring-sky-300");
		return recognition;
	}

	function voiceEnabled() {
		return (window.speechSynthesis && toggleAnimation.checked) ? true : false;
	}

	function speak(text) {
		if (!window.speechSynthesis) return;
		if (speakingUtterance) {
			window.speechSynthesis.cancel();
			speakingUtterance = null;
		}
		const utt = new SpeechSynthesisUtterance(text);
		utt.rate = Number(voiceRateRange.value);
		speakingUtterance = utt;
		window.speechSynthesis.speak(utt);
	}

	if (btnStartVoice) {
		btnStartVoice.addEventListener("click", () => {
			const rec = getRecognition();
			if (!rec) {
				appendMessage("ai", "Voice recognition not supported on this browser.");
				return;
			}
			try { rec.start(); } catch {}
		});
	}
	if (btnStopVoice) {
		btnStopVoice.addEventListener("click", () => {
			if (recognition) try { recognition.stop(); } catch {}
		});
	}
	if (btnVoiceInline) {
		btnVoiceInline.addEventListener("click", () => {
			const rec = getRecognition();
			if (!rec) {
				appendMessage("ai", "Voice recognition not supported on this browser.");
				return;
			}
			try { rec.start(); } catch {}
			applyTheme("voice");
			panels.voice?.classList.add("open");
		});
	}

	// Video
	if (btnLoadVideo) {
		btnLoadVideo.addEventListener("click", async () => {
			try {
				const res = await fetch("/video", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						subject: videoSubject.value,
						grade: Number(gradeSelect.value),
					}),
				});
				const data = await res.json();
				if (data?.ok && data.video) {
					videoPlayer.src = data.video.url;
					videoTitle.textContent = `${capitalize(data.subject)}: ${data.video.title}`;
					applyTheme("video");
				}
			} catch (e) {
				videoTitle.textContent = "Failed to load a video. Try again.";
			}
		});
	}

	function capitalize(s) { return (s || "").charAt(0).toUpperCase() + (s || "").slice(1); }

	// Web Search
	if (btnSearch) {
		btnSearch.addEventListener("click", doSearch);
	}
	async function doSearch() {
		const q = (chatInput.value || "").trim();
		if (!q) return;
		const typingEl = appendTyping();
		try {
			const res = await fetch("/search", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ query: q }),
			});
			const data = await res.json();
			typingEl.remove();
			if (data?.ok && Array.isArray(data.results)) {
				const html = data.results.map(r => (
					`• <a href="${r.url}" target="_blank" rel="noopener">${escapeHtml(r.title || r.url)}</a>\n  ${escapeHtml(r.snippet || "")}`
				)).join("\n\n");
				appendMessage("ai", "Here are a few things I found:\n\n" + html);
			} else {
				appendMessage("ai", "I couldn't find anything. Try another search.");
			}
		} catch {
			typingEl.remove();
			appendMessage("ai", "Search failed. Please try again.");
		}
	}
	function escapeHtml(s) {
		return (s || "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
	}

	// Settings
	const themeButtons = Array.from(document.querySelectorAll('[data-theme]'));
	themeButtons.forEach((b) => {
		b.addEventListener("click", () => {
			const theme = b.dataset.theme;
			if (theme === "dark") document.body.classList.add("dark");
			else document.body.classList.remove("dark");
			applyTheme("settings");
			panels.settings?.classList.add("open");
			panels.settings?.classList.add("active");
		});
	});

	if (fontSizeRange) {
		fontSizeRange.addEventListener("input", () => {
			document.documentElement.style.fontSize = `${fontSizeRange.value}px`;
		});
	}
	if (themeColorPicker) {
		themeColorPicker.addEventListener("input", () => {
			const meta = document.querySelector('meta[name="theme-color"]');
			if (meta) meta.setAttribute("content", themeColorPicker.value);
		});
	}
	if (btnReset) {
		btnReset.addEventListener("click", () => {
			document.body.classList.remove("dark");
			document.documentElement.style.fontSize = "16px";
			voiceRateRange.value = "1.0";
			toggleAnimation.checked = true;
			const meta = document.querySelector('meta[name="theme-color"]');
			if (meta) meta.setAttribute("content", "#a78bfa");
			bodyRoot.className = "font-[Nunito] bg-gradient-to-br from-violet-100 via-pink-50 to-emerald-100 min-h-screen text-slate-800 transition-colors duration-700 ease-out";
			Object.values(panels).forEach((p) => p?.classList.remove("open"));
		});
	}
})(); 


