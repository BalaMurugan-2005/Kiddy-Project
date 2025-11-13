# Kiddy Universe — Light. Camera. Dream. ✨

A futuristic, minimal, and playful web UI for a creative AI platform where children can design, animate, and explore stories. Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## 🎨 Design Features

- **Futuristic × Minimal × Kid-Friendly** design
- Clean conversational interface inspired by ChatGPT and Gemini
- Colorful, game-style sidebar buttons with glow effects
- Glassmorphism panels and smooth animations
- Dream Mode toggle for dark pastel theme with neon accents
- Animated sparkle cursor trail
- Responsive design for mobile and desktop

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Custom fonts** - Poppins, Fredoka, Nunito

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open the URL shown in the terminal (usually [http://localhost:5173](http://localhost:5173))

## 🎯 Features

### Layout Components

- **Left Sidebar**: Navigation with circular glowing buttons (Create, Stories, Dream Studio, Community, Settings)
- **Right Sidebar**: Info panel with Recent Creations and Tips
- **Center Chat Area**: Main conversation interface with message bubbles
- **Header**: Logo and Dream Mode toggle

### Interactive Elements

- **Navigation Buttons**: Circular buttons with hover animations, glow effects, and tooltips
- **Chat Interface**: Message bubbles with smooth fade-in animations
- **Output Cards**: Story/concept cards with action buttons (Create Scene, Expand Story, Voice It)
- **Typing Indicator**: Three bouncing dots animation
- **Sparkle Cursor**: Animated cursor trail on interactive elements

### Background Effects

- Floating sparkles with neon glow
- Subtle film reel icons
- Soft gradient background (white → pastel blue → light pink)
- Dream Mode: Dark pastel theme with neon accents

## 🎨 Color Palette

- Background: `#F9FAFB` (white)
- Sky Blue: `#81D4FA`
- Soft Yellow: `#FFD54F`
- Pink: `#F48FB1`
- Neon Cyan: `#00E5FF`
- Neon Pink: `#FF80AB`

## 📱 Responsive Design

- Mobile-first approach
- Sidebars hidden on small screens
- Adaptive text sizes and spacing
- Touch-friendly button sizes

## 🛠️ Development

### Project Structure

```
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Top navigation bar
│   │   ├── LeftSidebar.tsx      # Left navigation sidebar
│   │   ├── RightSidebar.tsx     # Right info panel
│   │   ├── ChatArea.tsx         # Main chat interface
│   │   ├── MessageBubble.tsx    # Chat message component
│   │   ├── OutputCard.tsx       # Story/concept card
│   │   ├── TypingIndicator.tsx  # AI typing animation
│   │   ├── BackgroundEffects.tsx # Background animations
│   │   └── SparkleCursor.tsx    # Cursor trail effect
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # React entry point
│   └── index.css                # Global styles
├── index.html                   # HTML entry point
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

## 🎭 Dream Mode

Toggle between light and dark themes:
- **Light Mode**: Bright, airy design with pastel colors
- **Dream Mode**: Dark pastel theme with neon accents and glowing effects

## 🚀 Build for Production

```bash
npm run build
npm run preview
```

The built files will be in the `dist` directory.

## 📝 Notes

- All animations use Framer Motion for smooth, performant transitions
- Glassmorphism effects use backdrop-filter for modern browser support
- Sparkle cursor only appears on interactive elements
- Background effects are optimized to not impact performance

## 🎨 Customization

You can customize colors, fonts, and animations in:
- `tailwind.config.js` - Color palette and animations
- `src/index.css` - Global styles and theme variables
- Individual component files - Component-specific styling

## Backend API

The project includes a Node.js + Express backend server. See `server/README.md` for setup instructions.

### Quick Backend Setup

```bash
cd server
npm install
cp .env.example .env
npm start
```

The backend runs on `http://localhost:3001` by default.

### API Endpoints

- `POST /api/chat` - Send chat messages and get AI responses
- `GET /api/stories` - Get available stories
- `GET /api/games` - Get game templates
- `GET /api/grades` - Get grade levels

### AI Integration

The backend is ready for AI integration. See `server/README.md` for detailed instructions on integrating OpenAI or Google Gemini.

## License

MIT
