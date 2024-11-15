'use client';

import { useState, useEffect } from "react";
import { motion } from 'framer-motion';

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
}

interface Quote {
  content: string;
  author: string;
}

const QUOTES = [
  {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    content: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    content: "Stay hungry, stay foolish.",
    author: "Stewart Brand"
  },
  {
    content: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    content: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House"
  },
  {
    content: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman"
  },
  {
    content: "Make it work, make it right, make it fast.",
    author: "Kent Beck"
  }
];

// Add this weather simulation data
const WEATHER_CONDITIONS = [
  { temp: 32, description: "sunny", icon: "01d" },
  { temp: 30, description: "partly cloudy", icon: "02d" },
  { temp: 28, description: "cloudy", icon: "03d" },
  { temp: 27, description: "light rain", icon: "10d" },
];

export default function Page() {
  const [currentTime, setCurrentTime] = useState("00:00");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true, // This will show time in 12-hour format with AM/PM
        timeZone: 'Asia/Kolkata'
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate weather changes
    const updateWeather = () => {
      const randomWeather = WEATHER_CONDITIONS[Math.floor(Math.random() * WEATHER_CONDITIONS.length)];
      // Add some random variation to temperature
      const tempVariation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
      setWeather({
        ...randomWeather,
        temp: randomWeather.temp + tempVariation,
      });
      setLoading(false);
    };

    updateWeather();
    // Update weather every 30 minutes
    const weatherInterval = setInterval(updateWeather, 1800000);
    return () => clearInterval(weatherInterval);
  }, []);

  useEffect(() => {
    // Get a random quote from our collection
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    setQuote(QUOTES[randomIndex]);
    
    // Optionally, change quote every few minutes
    const quoteInterval = setInterval(() => {
      const newIndex = Math.floor(Math.random() * QUOTES.length);
      setQuote(QUOTES[newIndex]);
    }, 300000); // Changes every 5 minutes

    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-light flex items-center justify-center">
      <div className="container max-w-5xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Clock and Weather Section */}
          <div className="text-center mb-16">
            <div className="text-8xl font-thin tracking-widest text-white/90">
              {currentTime}
            </div>
            <div className="text-sm text-white/40 mt-2">IST INDIA</div>
            
            {/* Weather Widget */}
            {weather && !loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 flex items-center justify-center gap-2 text-white/60"
              >
                <img 
                  src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                  alt="weather icon"
                  className="w-8 h-8"
                />
                <span className="text-lg">{weather.temp}°C</span>
                <span className="text-sm capitalize">{weather.description}</span>
              </motion.div>
            )}

            {quote && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 max-w-md mx-auto text-white/50 text-sm"
              >
                <p className="italic">"{quote.content}"</p>
                <p className="mt-2 text-xs">— {quote.author}</p>
              </motion.div>
            )}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-extralight mb-6">Full Stack Developer.</h1>
                <div className="text-xl font-extralight text-white/60">
                  Crafting digital experiences
                </div>
              </div>

              <div className="space-y-4 text-sm text-gray-400">
                <p>
                  Specialized in building modern web applications with a focus on 
                  user experience and performance. Bringing ideas to life through 
                  clean code and thoughtful design.
                </p>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                  <h3 className="text-white/40 mb-4">Technologies</h3>
                  <ul className="space-y-2">
                    <li className="text-white/80">React & Next.js</li>
                    <li className="text-white/80">TypeScript</li>
                    <li className="text-white/80">Node.js</li>
                    <li className="text-white/80">TailwindCSS</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white/40 mb-4">Focus Areas</h3>
                  <ul className="space-y-2">
                    <li className="text-white/80">Web Applications</li>
                    <li className="text-white/80">API Development</li>
                    <li className="text-white/80">UI/UX Design</li>
                    <li className="text-white/80">Performance</li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <div className="flex gap-6 text-sm text-white/60">
                  <span className="hover:text-white transition-colors cursor-pointer" onClick={() => window.open('https://github.com/devansh-m12', '_blank')}>GitHub</span>
                  <span className="hover:text-white transition-colors cursor-pointer" onClick={() => window.open('https://www.linkedin.com/in/devansh-m12/', '_blank')}>LinkedIn</span>
                  <span className="hover:text-white transition-colors cursor-pointer" onClick={() => window.open('https://x.com/d3v1sX', '_blank')}>Twitter</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
