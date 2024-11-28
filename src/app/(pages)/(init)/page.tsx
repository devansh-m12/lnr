'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Boxes } from '@/components/ui/background-boxes';

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  location: string;
}

interface Quote {
  content: string;
  author: string;
}

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
  };
}

interface GeocodingResponse {
  address: {
    city?: string;
    town?: string;
    village?: string;
    state: string;
    country: string;
  };
}

const QUOTES = [
  {
    content: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
  {
    content: 'Innovation distinguishes between a leader and a follower.',
    author: 'Steve Jobs',
  },
  {
    content: 'Stay hungry, stay foolish.',
    author: 'Stewart Brand',
  },
  {
    content:
      'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
  },
  {
    content: "Code is like humor. When you have to explain it, it's bad.",
    author: 'Cory House',
  },
  {
    content: 'Simplicity is the soul of efficiency.',
    author: 'Austin Freeman',
  },
  {
    content: 'Make it work, make it right, make it fast.',
    author: 'Kent Beck',
  },
];

export default function Page() {
  const [currentTime, setCurrentTime] = useState('00:00');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [locationError, setLocationError] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true, // This will show time in 12-hour format with AM/PM
          timeZone: 'Asia/Kolkata',
        }),
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const getWeatherDescription = (code: number): { description: string; icon: string } => {
      // WMO Weather interpretation codes: https://open-meteo.com/en/docs
    const weatherCodes: Record<number, { description: string; icon: string }> = {
      0: { description: 'Clear sky', icon: '01d' },
      1: { description: 'Mainly clear', icon: '02d' },
      2: { description: 'Partly cloudy', icon: '02d' },
      3: { description: 'Overcast', icon: '03d' },
      45: { description: 'Foggy', icon: '50d' },
      48: { description: 'Depositing rime fog', icon: '50d' },
      51: { description: 'Light drizzle', icon: '09d' },
      53: { description: 'Moderate drizzle', icon: '09d' },
      55: { description: 'Dense drizzle', icon: '09d' },
      61: { description: 'Light rain', icon: '10d' },
      63: { description: 'Moderate rain', icon: '10d' },
      65: { description: 'Heavy rain', icon: '10d' },
      71: { description: 'Light snow', icon: '13d' },
      73: { description: 'Moderate snow', icon: '13d' },
      75: { description: 'Heavy snow', icon: '13d' },
      95: { description: 'Thunderstorm', icon: '11d' },
    };
    
      return weatherCodes[code] || { description: 'Unknown', icon: '03d' };
    };

    const getLocationName = async (lat: number, lon: number): Promise<string> => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );
        const data: GeocodingResponse = await response.json();
        
        // Get the most specific location name available
        const cityName = data.address.city || data.address.town || data.address.village || '';
        const stateName = data.address.state;
        const countryName = data.address.country;

        return `${cityName}, ${stateName}, ${countryName}`;
      } catch (error) {
        console.error('Error fetching location name:', error);
        return 'Location unknown';
      }
    };

    const fetchWeather = async (latitude: number, longitude: number) => {
      try {
        const [weatherResponse, locationName] = await Promise.all([
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
          ),
          getLocationName(latitude, longitude)
        ]);

        const data: OpenMeteoResponse = await weatherResponse.json();
        const weatherInfo = getWeatherDescription(data.current.weather_code);
        
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          description: weatherInfo.description,
          icon: weatherInfo.icon,
          location: locationName
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    const getCurrentLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
            setLocationError('');
          },
          (error) => {
            console.error('Error getting location:', error);
            setLocationError('Unable to get location');
            // Fallback to Delhi coordinates
            fetchWeather(28.61, 77.23);
          }
        );
      } else {
        setLocationError('Geolocation is not supported');
        // Fallback to Delhi coordinates
        fetchWeather(28.61, 77.23);
      }
    };

    getCurrentLocation();
    // Update weather every 30 minutes
    const weatherInterval = setInterval(getCurrentLocation, 1800000);
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
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-black to-black font-light text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] z-0" />
      <Boxes className="opacity-[0.4]" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-transparent to-transparent blur-3xl z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-600/5 to-transparent blur-2xl z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-0" />
      <div className="container relative z-10 mx-auto max-w-5xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Clock and Weather Section */}
          <div className="mb-16 text-center">
            <div className="text-8xl font-thin tracking-widest text-white/90">
              {currentTime}
            </div>
            <div className="mt-2 text-sm text-white/40">IST INDIA</div>

            {/* Weather Widget */}
            {weather && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 space-y-2"
              >
                <div className="flex items-center justify-center gap-2 text-white/60">
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                    alt="weather icon"
                    className="h-8 w-8"
                  />
                  <span className="text-lg">{weather.temp}°C</span>
                  <span className="text-sm capitalize">
                    {weather.description}
                  </span>
                </div>
                <div className="text-sm text-white/40">
                  {weather.location}
                </div>
                {locationError && (
                  <div className="text-sm text-red-400">
                    {locationError}
                  </div>
                )}
              </motion.div>
            )}

            {quote && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mx-auto mt-6 max-w-md text-sm text-white/50"
              >
                <p className="italic">"{quote.content}"</p>
                <p className="mt-2 text-xs">— {quote.author}</p>
              </motion.div>
            )}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h1 className="mb-6 text-5xl font-extralight">
                  Full Stack Developer.
                </h1>
                <div className="text-xl font-extralight text-white/60">
                  Building Better Ideas then Yesterday !!
                </div>
              </div>

              <div className="space-y-4 text-sm text-gray-400">
                <p>
                  Specialized in building modern web applications with a focus
                  on user experience and performance. Bringing ideas to life
                  through clean code and thoughtful design.
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
                  <h3 className="mb-4 text-white/40">Technologies</h3>
                  <ul className="space-y-2">
                    <li className="text-white/80">React & Next.js</li>
                    <li className="text-white/80">TypeScript</li>
                    <li className="text-white/80">Node.js</li>
                    <li className="text-white/80">TailwindCSS</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-white/40">Focus Areas</h3>
                  <ul className="space-y-2">
                    <li className="text-white/80">Web Applications</li>
                    <li className="text-white/80">API Development</li>
                    <li className="text-white/80">UI/UX Design</li>
                    <li className="text-white/80">Performance</li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8">
                <div className="flex gap-6 text-sm text-white/60">
                  <span
                    className="cursor-pointer transition-colors hover:text-white"
                    onClick={() =>
                      window.open('https://github.com/devansh-m12', '_blank')
                    }
                  >
                    GitHub
                  </span>
                  <span
                    className="cursor-pointer transition-colors hover:text-white"
                    onClick={() =>
                      window.open(
                        'https://www.linkedin.com/in/devansh-m12/',
                        '_blank',
                      )
                    }
                  >
                    LinkedIn
                  </span>
                  <span
                    className="cursor-pointer transition-colors hover:text-white"
                    onClick={() =>
                      window.open('https://x.com/d3v1sX', '_blank')
                    }
                  >
                    Twitter
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
