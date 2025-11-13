import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data generators
const generateMockResponse = (message, module) => {
  const responses = {
    create: [
      "I'll help you create an amazing story! Let me craft something magical...",
      "Creating your story now! This is going to be wonderful...",
      "Let's bring your idea to life! Here's what I've created..."
    ],
    stories: [
      "Here's a wonderful story for you!",
      "I found the perfect story for you!",
      "Let me share this magical tale with you..."
    ],
    studio: [
      "Let's animate your idea! Here's what we can create...",
      "Bringing your animation to life!",
      "Your animation is ready! Here's what we made..."
    ],
    games: [
      "Let's play a fun game! Here's your adventure...",
      "Game time! Here's your challenge...",
      "Ready to play? Here's your game!"
    ],
    community: [
      "Here are some amazing community creations!",
      "Check out what the community has made!",
      "Discover these wonderful community stories!"
    ]
  };

  const moduleResponses = responses[module] || responses.create;
  return moduleResponses[Math.floor(Math.random() * moduleResponses.length)];
};

const generateSubject = () => {
  const subjects = ['Adventure', 'Fantasy', 'Science', 'Nature', 'Space', 'Ocean'];
  return subjects[Math.floor(Math.random() * subjects.length)];
};

// API Routes

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, module } = req.body;
    
    // TODO: Integrate with OpenAI or Gemini here
    // Example:
    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4",
    //   messages: [{ role: "user", content: message }],
    // });
    // const aiResponse = completion.choices[0].message.content;

    // Mock response for now
    const response = generateMockResponse(message, module);
    const subject = generateSubject();
    
    res.json({
      response,
      summary: `An amazing ${subject.toLowerCase()} story based on "${message.substring(0, 50)}...". This story features exciting characters and magical moments that will spark your imagination.`,
      thumbnail: `https://picsum.photos/300/200?random=${Date.now()}`,
      subject,
    });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Stories endpoint
app.get('/api/stories', async (req, res) => {
  try {
    // TODO: Fetch from database or AI service
    const stories = [
      {
        id: 1,
        title: 'Space Adventure',
        summary: 'A thrilling journey through the stars',
        thumbnail: 'https://picsum.photos/300/200?random=1',
        subject: 'Space',
      },
      {
        id: 2,
        title: 'Magic Forest',
        summary: 'Discover the secrets of the enchanted forest',
        thumbnail: 'https://picsum.photos/300/200?random=2',
        subject: 'Fantasy',
      },
      {
        id: 3,
        title: 'Ocean Quest',
        summary: 'Dive deep into underwater adventures',
        thumbnail: 'https://picsum.photos/300/200?random=3',
        subject: 'Ocean',
      },
    ];
    
    res.json({ stories });
  } catch (error) {
    console.error('Error in /api/stories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Games endpoint
app.get('/api/games', async (req, res) => {
  try {
    // TODO: Fetch game templates or generate with AI
    const games = [
      {
        id: 1,
        title: 'Adventure Explorer',
        prompt: 'Create an adventure story where I\'m a brave explorer!',
        icon: '🚀',
      },
      {
        id: 2,
        title: 'Magic Animals',
        prompt: 'Make a story about magical animals in a forest!',
        icon: '🌲',
      },
      {
        id: 3,
        title: 'Space Adventure',
        prompt: 'Tell me a space adventure with aliens and planets!',
        icon: '🛸',
      },
      {
        id: 4,
        title: 'Underwater Kingdom',
        prompt: 'Create a story about underwater kingdoms!',
        icon: '🌊',
      },
    ];
    
    res.json({ games });
  } catch (error) {
    console.error('Error in /api/games:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Grades endpoint (for future use)
app.get('/api/grades', async (req, res) => {
  try {
    const grades = [
      { id: 1, name: 'Pre-K', ageRange: '3-5' },
      { id: 2, name: 'Kindergarten', ageRange: '5-6' },
      { id: 3, name: 'Grade 1', ageRange: '6-7' },
      { id: 4, name: 'Grade 2', ageRange: '7-8' },
      { id: 5, name: 'Grade 3', ageRange: '8-9' },
    ];
    
    res.json({ grades });
  } catch (error) {
    console.error('Error in /api/grades:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Kiddy Universe API server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoints:`);
  console.log(`   POST /api/chat`);
  console.log(`   GET  /api/stories`);
  console.log(`   GET  /api/games`);
  console.log(`   GET  /api/grades`);
  console.log(`\n💡 To integrate AI services, update the TODO comments in server.js`);
});

