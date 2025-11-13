import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Stories from './pages/Stories'
import Voice from './pages/Voice'
import DreamStudio from './pages/DreamStudio'
import Settings from './pages/Settings'
import About from './pages/About'
import Games from './pages/Games'
import StoryCards from './pages/StoryCards'
import StoryDetail from './pages/StoryDetail'
import GameDetail from './pages/GameDetail'
 // Add this import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/story-cards" element={<StoryCards />} />
        <Route path="/story/:id" element={<StoryDetail />} />
        <Route path="/game/:id" element={<GameDetail />} />
        
        <Route path="/stories" element={<Stories />} />
        <Route path="/voice" element={<Voice />} />
        <Route path="/studio" element={<DreamStudio />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="/games" element={<Games />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App