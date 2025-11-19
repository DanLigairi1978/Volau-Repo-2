
import React, { useState, useEffect } from 'react';
import { getAllMonthsData } from './services/dataService';
import { MonthCalendar } from './components/MonthCalendar';
import { PlannerView } from './components/PlannerView';
import { HomeView } from './components/HomeView';
import { Calendar, Anchor, Home, Sun, Moon } from 'lucide-react';

export interface WeatherData {
  temp: number;
  code: number;
  windspeed: number;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'calendar' | 'planner'>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<'en' | 'fj'>('en');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const fullData = getAllMonthsData();

  // Handle Theme Toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Fetch Weather for Fiji (Suva coordinates)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Including windspeed now for fishing safety
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-18.1416&longitude=178.4419&current_weather=true&timezone=Pacific%2FFiji'
        );
        const data = await response.json();
        if (data.current_weather) {
          setWeather({
            temp: data.current_weather.temperature,
            code: data.current_weather.weathercode,
            windspeed: data.current_weather.windspeed,
          });
        }
      } catch (error) {
        console.error('Failed to fetch weather', error);
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCF8] dark:bg-[#051B15] flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="bg-volau-dark text-white shadow-xl sticky top-0 z-50 transition-colors duration-300 border-b-4 border-volau-earth">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          <button onClick={() => setActiveTab('home')} className="text-left group flex-shrink-0">
            <h1 className="text-2xl font-display font-bold tracking-wide text-white group-hover:text-volau-yellow transition-colors">VOLAU</h1>
            <p className="text-volau-green text-xs uppercase tracking-widest">Lunar and Seasonal Guide</p>
          </button>
          
          <div className="flex flex-wrap justify-center items-center gap-3">
            {/* Navigation */}
            <nav className="flex bg-[#082b21] p-1 rounded-lg border border-volau-green/20">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md transition-all ${
                  activeTab === 'home' 
                    ? 'bg-volau-green text-white shadow font-semibold' 
                    : 'text-stone-300 hover:text-volau-yellow'
                }`}
                title="Home"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Home</span>
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md transition-all ${
                  activeTab === 'calendar' 
                    ? 'bg-volau-green text-white shadow font-semibold' 
                    : 'text-stone-300 hover:text-volau-yellow'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Calendar</span>
              </button>
              <button
                onClick={() => setActiveTab('planner')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md transition-all ${
                  activeTab === 'planner' 
                    ? 'bg-volau-green text-white shadow font-semibold' 
                    : 'text-stone-300 hover:text-volau-yellow'
                }`}
              >
                <Anchor className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Planner</span>
              </button>
            </nav>

            {/* Settings Controls (Language & Theme) */}
            <div className="flex items-center gap-2 bg-[#082b21] p-1 rounded-lg border border-volau-green/20">
               {/* Language Toggle */}
               <div className="flex rounded-md overflow-hidden">
                  <button 
                    onClick={() => setLanguage('en')}
                    className={`px-2 py-2 text-[10px] font-bold transition-all ${
                      language === 'en' ? 'bg-volau-dark text-white' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    ENG
                  </button>
                  <div className="w-px bg-volau-green/20 my-1"></div>
                  <button 
                    onClick={() => setLanguage('fj')}
                    className={`px-2 py-2 text-[10px] font-bold transition-all ${
                      language === 'fj' ? 'bg-volau-green text-white' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    FJ
                  </button>
               </div>

               <div className="w-px h-6 bg-volau-green/20"></div>

               {/* Theme Toggle */}
               <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-md text-stone-300 hover:text-volau-yellow transition-colors"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
               >
                 {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
               </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-300">
            <HomeView 
              language={language}
              onNavigate={(view) => setActiveTab(view)}
              weather={weather}
            />
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="animate-in fade-in duration-300">
            <div className="pt-4 px-4 max-w-3xl mx-auto">
              <button 
                onClick={() => setActiveTab('home')}
                className="mb-2 text-sm text-stone-500 hover:text-volau-dark dark:hover:text-volau-yellow flex items-center gap-1"
              >
                ← Back to Dashboard
              </button>
            </div>
            <MonthCalendar data={fullData} language={language} />
          </div>
        )}
        
        {activeTab === 'planner' && (
          <div className="animate-in fade-in duration-300">
             <div className="pt-4 px-4 max-w-4xl mx-auto">
              <button 
                onClick={() => setActiveTab('home')}
                className="mb-2 text-sm text-stone-500 hover:text-volau-dark dark:hover:text-volau-yellow flex items-center gap-1"
              >
                ← Back to Dashboard
              </button>
            </div>
            <PlannerView 
              language={language} 
              darkMode={darkMode}
              weather={weather}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-100 dark:bg-[#08261d] text-stone-600 dark:text-stone-400 py-10 text-center border-t border-stone-200 dark:border-volau-dark transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="font-display font-bold text-volau-dark dark:text-volau-green mb-2 tracking-widest">VOLAU</h3>
          <p className="text-sm mb-6 font-light">Connecting tradition with technology.</p>
          <p className="text-xs text-stone-400 dark:text-stone-500 max-w-lg mx-auto leading-relaxed">
            Action Researcher and Practitioner of Traditional Knowledge in Agriculture<br/>
            <span className="text-volau-earth font-medium">Marika Radua</span> | PG Dip. Agriculture (Hort)<br/>
            AI recommendations generated by Gemini 2.5 Flash.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
