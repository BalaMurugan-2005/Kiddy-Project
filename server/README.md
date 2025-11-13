# Kiddy Universe Backend API

Node.js + Express backend server for Kiddy Universe.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### POST /api/chat
Send a chat message and get an AI response.

**Request:**
```json
{
  "message": "Create a story about a brave explorer",
  "module": "create"
}
```

**Response:**
```json
{
  "response": "I'll help you create an amazing story!",
  "summary": "An amazing adventure story...",
  "thumbnail": "https://...",
  "subject": "Adventure"
}
```

### GET /api/stories
Get a list of available stories.

**Response:**
```json
{
  "stories": [
    {
      "id": 1,
      "title": "Space Adventure",
      "summary": "...",
      "thumbnail": "https://...",
      "subject": "Space"
    }
  ]
}
```

### GET /api/games
Get a list of available games.

**Response:**
```json
{
  "games": [
    {
      "id": 1,
      "title": "Adventure Explorer",
      "prompt": "Create an adventure story...",
      "icon": "🚀"
    }
  ]
}
```

### GET /api/grades
Get available grade levels.

## Integrating AI Services

### OpenAI Integration

1. Install OpenAI SDK:
```bash
npm install openai
```

2. Update `server.js`:
```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// In /api/chat endpoint:
const completion = await openai.chat.completions.create({
  model: process.env.OPENAI_MODEL || 'gpt-4',
  messages: [
    { role: 'system', content: 'You are a creative storytelling assistant for children.' },
    { role: 'user', content: message }
  ],
});

const aiResponse = completion.choices[0].message.content;
```

3. Add to `.env`:
```
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4
```

### Google Gemini Integration

1. Install Gemini SDK:
```bash
npm install @google/generative-ai
```

2. Update `server.js`:
```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// In /api/chat endpoint:
const result = await model.generateContent(message);
const aiResponse = result.response.text();
```

3. Add to `.env`:
```
GEMINI_API_KEY=your_key_here
```

## Notes

- The server currently returns mock data
- All endpoints are ready for AI integration
- CORS is enabled for local development
- The server runs on port 3001 by default

