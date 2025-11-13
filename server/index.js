const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message, module } = req.body;
  
  // Placeholder response - replace with actual AI integration
  const responses = {
    create: `I love your creative idea about "${message}"! Let me create something magical for you...`,
    stories: `What an amazing story concept! "${message}" sounds like an incredible adventure.`,
    studio: `Let's bring "${message}" to life with animation! This will be amazing!`,
    games: `Great game idea! "${message}" sounds like so much fun!`,
    community: `The community will love "${message}"! What a wonderful idea to share!`,
  };

  const response = responses[module] || responses.create;
  
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  res.json({
    response,
    summary: `An amazing adventure based on "${message}"! This story features exciting characters and magical moments that will spark your imagination.`,
    thumbnail: `https://picsum.photos/300/200?random=${Date.now()}`,
    subject: 'Adventure',
  });
});

// Stories endpoint
app.get('/api/stories', async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  
  // Placeholder stories - replace with database query
  const stories = Array.from({ length: parseInt(limit) }, (_, i) => ({
    id: `story-${offset + i}`,
    title: `Story ${offset + i + 1}`,
    summary: `An amazing story about adventures and magic!`,
    thumbnail: `https://picsum.photos/300/200?random=${offset + i}`,
    subject: ['Adventure', 'Fantasy', 'Sci-Fi', 'Mystery'][i % 4],
    createdAt: new Date().toISOString(),
  }));

  res.json({ stories, total: 100 });
});

// Games endpoint
app.get('/api/games', async (req, res) => {
  // Placeholder games - replace with actual game data
  const games = [
    {
      id: 'adventure-explorer',
      title: 'Adventure Explorer',
      description: 'Create an adventure story where you\'re a brave explorer!',
      prompt: 'Create an adventure story where I\'m a brave explorer!',
      icon: '🚀',
    },
    {
      id: 'magical-animals',
      title: 'Magical Animals',
      description: 'Make a story about magical animals in a forest!',
      prompt: 'Make a story about magical animals in a forest!',
      icon: '🌲',
    },
    {
      id: 'space-adventure',
      title: 'Space Adventure',
      description: 'Tell me a space adventure with aliens and planets!',
      prompt: 'Tell me a space adventure with aliens and planets!',
      icon: '🛸',
    },
    {
      id: 'underwater-kingdom',
      title: 'Underwater Kingdom',
      description: 'Create a story about underwater kingdoms!',
      prompt: 'Create a story about underwater kingdoms!',
      icon: '🌊',
    },
  ];

  res.json({ games });
});

// Grades endpoint (for educational content filtering)
app.get('/api/grades', async (req, res) => {
  const grades = [
    { id: 1, label: 'Grade 1-2', ageRange: '6-7 years' },
    { id: 2, label: 'Grade 3-4', ageRange: '8-9 years' },
    { id: 3, label: 'Grade 5-6', ageRange: '10-11 years' },
    { id: 4, label: 'Grade 7-8', ageRange: '12-13 years' },
  ];

  res.json({ grades });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Kiddy Universe API server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoints:`);
  console.log(`   POST /api/chat`);
  console.log(`   GET  /api/stories`);
  console.log(`   GET  /api/games`);
  console.log(`   GET  /api/grades`);
  console.log(`   GET  /api/health`);
});

module.exports = app;

