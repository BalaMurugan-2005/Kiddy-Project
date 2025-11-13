# Kiddy Universe - Setup Instructions

## Quick Start

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173` (or the port shown in terminal).

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start the server
npm start
```

The backend will run on `http://localhost:3001`.

## Running Both Servers

You'll need to run both the frontend and backend simultaneously:

**Terminal 1 (Frontend):**
```bash
npm run dev
```

**Terminal 2 (Backend):**
```bash
cd server
npm start
```

## Project Structure

```
kiddy-universe/
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── App.tsx            # Main app component
│   └── main.tsx            # Entry point
├── server/                 # Node.js backend
│   ├── server.js          # Express server
│   └── package.json       # Backend dependencies
├── index.html             # HTML entry point
├── vite.config.ts         # Vite configuration
└── package.json           # Frontend dependencies
```

## Features

### ✅ Implemented

- **6 Navigation Buttons**: 3 on left, 3 on right with slide-in panels
- **Chat Interface**: Message bubbles, typing indicator, voice input (mic button)
- **Output Cards**: Netflix-style cards with thumbnail, title, subject badge, action buttons
- **Game Buttons**: Inject prefilled prompts into chat
- **Panel Backgrounds**: Dynamic gradient backgrounds based on open panel
- **Dream Mode**: Dark pastel theme toggle
- **Mobile Responsive**: Bottom corner buttons on mobile, full-width overlays
- **Accessibility**: Large fonts, high contrast, keyboard navigation
- **Backend API**: Express server with mock endpoints

### 🔌 AI Integration Points

The backend is ready for AI integration. See `server/README.md` for detailed instructions on integrating:
- OpenAI (GPT-4)
- Google Gemini

## API Endpoints

- `POST /api/chat` - Send chat messages
- `GET /api/stories` - Get available stories
- `GET /api/games` - Get game templates
- `GET /api/grades` - Get grade levels

## Development Notes

### Adding AI Services

1. Install the AI SDK (OpenAI or Gemini)
2. Add API key to `server/.env`
3. Update the TODO comments in `server/server.js`
4. Uncomment and configure the AI integration code

### Customization

- **Colors**: Edit `tailwind.config.js`
- **Fonts**: Edit `src/index.css`
- **Animations**: Edit component files using Framer Motion
- **API Responses**: Edit `server/server.js`

## Troubleshooting

### CORS Errors
- Make sure backend is running on port 3001
- Check that CORS is enabled in `server/server.js`

### Port Conflicts
- Frontend: Change port in `vite.config.ts` or use `npm run dev -- --port 3000`
- Backend: Change `PORT` in `server/.env`

### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (18+ recommended)

## Production Build

### Frontend
```bash
npm run build
npm run preview
```

### Backend
```bash
cd server
npm start
```

## License

MIT

