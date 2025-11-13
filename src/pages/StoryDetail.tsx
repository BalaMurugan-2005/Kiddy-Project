import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import BackgroundEffects from '../components/BackgroundEffects'
import SparkleCursor from '../components/SparkleCursor'

// Sample story data - in real app, this would come from an API
const storiesData = {
  1: {
    id: 1,
    title: 'Space Adventure',
    emoji: '🚀',
    description: 'Journey through the stars and discover new planets with friendly aliens!',
    color: 'from-blue-400 to-purple-500',
    category: 'Adventure',
    duration: '5-7 minutes',
    ageGroup: '5-8 years',
    content: `
# 🚀 The Amazing Space Adventure

Once upon a time, in a little house at the edge of town, lived a curious boy named Leo. Leo loved looking at the stars every night with his telescope.

One evening, as Leo was gazing at the twinkling stars, a bright, shimmering light descended from the sky and landed in his backyard! It was a spaceship shaped like a giant glowing pear!

The spaceship door slid open with a gentle *whoosh*, and out stepped Zorp, a friendly alien with three eyes and a smile that sparkled like stardust.

"Hello, Earth child!" Zorp said in a musical voice. "Would you like to join me on a journey through the Milky Way?"

Leo's eyes widened with excitement. "Really? Can we go right now?"

## 🌟 The Galactic Tour

Zorp's spaceship was amazing! The seats were made of fluffy clouds, and the controls looked like colorful candy buttons. As they zoomed into space, Leo saw:

- **Sparkling stars** that twinkled like diamonds
- **Colorful planets** with rings of rainbow colors
- **Friendly comets** that waved their shiny tails
- **Dancing asteroids** that played cosmic music

Their first stop was **Glitter Planet**, where everything sparkled! The trees had leaves made of crystals, and the rivers flowed with liquid stardust. The Glitter People, who shimmered in all colors, taught Leo how to do the "Twinkle Dance."

Next, they visited **Bouncy Planet**, where the ground was like a giant trampoline! Leo and Zorp bounced so high they could touch the pink cotton candy clouds. The Bouncy Bunnies showed them how to do super-high jumps.

## 🎉 The Cosmic Party

Suddenly, they received a special invitation! All the planets were having a **Galactic Friendship Party** on Rainbow Moon.

At the party, Leo met:
- **Martians** who told funny jokes
- **Venusians** who shared space cookies
- **Moon fairies** who danced on moonbeams
- **Star children** who sang beautiful songs

They played games like "Hide and Seek behind Saturn's rings" and "Tag with shooting stars." Leo even won first prize in the "Best Earth Dance" competition!

## 🏡 Returning Home

As the party ended, Zorp said, "It's time to take you home, Leo. But remember, you're now an official Space Explorer!"

The spaceship landed gently in Leo's backyard. Zorp gave Leo a special star necklace that would always glow when he looked at the stars.

"Whenever you see this glow," Zorp said, "know that your space friends are thinking of you!"

Leo waved goodbye as the spaceship disappeared into the night sky. He knew this was just the beginning of many more space adventures!

## 💫 The End... Or Is It?

Leo still looks at the stars every night, and his star necklace always glows brightly. Who knows what other space adventures await?

*The universe is full of wonders, and friendship can be found in the most unexpected places!* ✨
    `,
    moral: 'Friendship and curiosity can lead to the most amazing adventures!',
    activities: [
      'Draw your own alien friend',
      'Name the planets you would visit',
      'Create a spaceship from cardboard boxes'
    ]
  },
  2: {
    id: 2,
    title: 'Magic Forest',
    emoji: '🌲',
    description: 'Explore enchanted forests with talking animals and magical creatures!',
    color: 'from-green-400 to-emerald-500',
    category: 'Fantasy',
    duration: '4-6 minutes',
    ageGroup: '4-7 years',
    content: `
# 🌲 The Secret Magic Forest

In a cozy little village surrounded by tall mountains, there lived a brave little girl named Lily. Behind her house was a forest that everyone said was magical, but no one ever went there.

One sunny morning, Lily decided to be brave and explore the magic forest. She packed a small backpack with cookies and her favorite teddy bear.

As she stepped into the forest, something amazing happened! The trees started whispering, "Welcome, Lily! We've been waiting for you!"

## 🐇 Meeting the Forest Friends

The first creature Lily met was **Bobby the Bunny**, who could talk! He had soft white fur and wore tiny glasses.

"Hello there!" Bobby said. "I'm the forest librarian. Would you like to meet the other animals?"

Lily nodded excitedly. Bobby led her to a clearing where she met:

- **Sally Squirrel** who collected shiny acorns
- **Oliver Owl** who knew all the forest secrets
- **Freddie Fox** who was the best at hide and seek
- **Bella Butterfly** who could change colors

## 🎨 The Colorful Meadow

They walked to a meadow where the flowers sang and the grass danced! The roses sang lullabies, the daisies told jokes, and the sunflowers did the cha-cha!

In the middle of the meadow stood the **Great Talking Tree**. He had a wise, kind face in his bark and leaves that shimmered like emeralds.

"Welcome, dear child," the tree said in a rumbling but friendly voice. "The forest has been waiting for someone with a pure heart like yours."

## 🎭 The Forest Festival

The animals decided to throw a festival in Lily's honor! They prepared:

- **Acorn tea** served in flower cups
- **Berry cakes** that sparkled with sugar
- **Dancing lessons** from the graceful deer
- **Music** from the cricket orchestra

Lily taught the animals how to play "Duck Duck Goose" and they taught her how to understand the language of the wind.

## 🏡 Finding the Way Home

As the sun began to set, the fireflies lit up to show Lily the path home. Each firefly glowed in a different color, creating a rainbow pathway.

"Will I be able to come back?" Lily asked sadly.

The Great Talking Tree gave her a magical leaf. "Keep this leaf safe," he said. "Whenever you want to visit, just hold it and whisper 'Forest friends'."

## 🌈 The Promise

Lily returned home just as the stars came out. Her parents were happy to see her and loved hearing about her magical day.

Now, every weekend, Lily visits her forest friends. They have new adventures, learn new games, and always end the day with berry cakes and acorn tea.

## 💚 The End

*True friendship can be found in the most magical places, and sometimes magic is closer than we think!*

**Remember:** Always be kind to animals and nature, and you might discover magic too! 🌟
    `,
    moral: 'Kindness to nature and animals brings magical friendships',
    activities: [
      'Draw your own magical animal friend',
      'Plant a flower or tree',
      'Make a nature collage with leaves and flowers'
    ]
  }
  // Add more stories as needed...
}

export default function StoryDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [currentStory, setCurrentStory] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const story = storiesData[id as keyof typeof storiesData]
      setCurrentStory(story)
      setIsLoading(false)
    }, 1000)
  }, [id])

  if (isLoading) {
    return (
      <main className="relative min-h-screen overflow-hidden">
        <BackgroundEffects />
        <SparkleCursor />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-6xl"
          >
            🌟
          </motion.div>
        </div>
      </main>
    )
  }

  if (!currentStory) {
    return (
      <main className="relative min-h-screen overflow-hidden">
        <BackgroundEffects />
        <SparkleCursor />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl mb-4">Story Not Found</h1>
            <button 
              onClick={() => navigate('/story-cards')}
              className="px-6 py-3 rounded-full glass hover:bg-white/50"
            >
              Back to Stories
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundEffects />
      <SparkleCursor />
      
      <div className="relative z-10 min-h-screen px-4 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/story-cards')}
          className="mb-6 px-4 py-2 rounded-full glass text-sm font-medium hover:bg-white/50 focus:outline-none focus:ring-4 focus:ring-sky-blue/50 transition-all flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to Story Cards"
        >
          <span>←</span>
          <span>Back to Stories</span>
        </motion.button>

        {/* Story Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className={`text-8xl p-8 rounded-3xl bg-gradient-to-br ${currentStory.color} text-white inline-block mb-6`}>
            {currentStory.emoji}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sky-blue via-pink to-soft-yellow bg-clip-text text-transparent">
            {currentStory.title}
          </h1>
          <div className="flex justify-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
            <span>📖 {currentStory.category}</span>
            <span>⏱️ {currentStory.duration}</span>
            <span>👶 {currentStory.ageGroup}</span>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {currentStory.description}
          </p>
        </motion.div>

        {/* Story Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-2xl p-6 md:p-8 mb-6">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {/* Convert markdown-like content to proper formatting */}
              {currentStory.content.split('\n').map((paragraph: string, index: number) => {
                if (paragraph.startsWith('# ')) {
                  return <h1 key={index} className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">{paragraph.replace('# ', '')}</h1>
                } else if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3 mt-6">{paragraph.replace('## ', '')}</h2>
                } else if (paragraph.startsWith('- **')) {
                  const text = paragraph.replace('- **', '').replace('**', '')
                  return <li key={index} className="flex items-start mb-2">
                    <span className="text-sky-blue mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{text}</span>
                  </li>
                } else if (paragraph.trim() === '') {
                  return <br key={index} />
                } else if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                  return <p key={index} className="italic text-gray-600 dark:text-gray-400 text-center my-4">{paragraph.replace(/\*/g, '')}</p>
                } else {
                  return <p key={index} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{paragraph}</p>
                }
              })}
            </div>
          </div>

          {/* Story Moral */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-6 mb-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20"
          >
            <h3 className="text-2xl font-bold text-center mb-4">🌟 Story Moral</h3>
            <p className="text-lg text-center text-gray-700 dark:text-gray-300">
              {currentStory.moral}
            </p>
          </motion.div>

          {/* Fun Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-2xl font-bold text-center mb-6">🎨 Fun Activities</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentStory.activities.map((activity: string, index: number) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 text-center"
                >
                  <p className="text-gray-700 dark:text-gray-300">{activity}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex justify-center space-x-4 mt-8"
          >
            <button
              onClick={() => navigate('/story-cards')}
              className="px-6 py-3 rounded-full glass hover:bg-white/50 transition-all"
            >
              📚 More Stories
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-blue to-blue-500 text-white hover:shadow-lg transition-all"
            >
              🏠 Back to Dashboard
            </button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}