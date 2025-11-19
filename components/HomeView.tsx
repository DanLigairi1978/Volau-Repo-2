

import React, { useMemo, useState, useEffect } from 'react';
import { getMonthData } from '../services/dataService';
import { MONTHS } from '../constants';
import { Calendar, Anchor, ArrowRight, CloudSun, Cloud, CloudRain, CloudLightning, CloudDrizzle, Wind, Sun } from 'lucide-react';
import { WeatherData } from '../App';

interface HomeViewProps {
  language: 'en' | 'fj';
  onNavigate: (view: 'calendar' | 'planner') => void;
  weather: WeatherData | null;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  language, 
  onNavigate,
  weather
}) => {
  const today = new Date();
  const currentMonthIndex = today.getMonth() + 1; // 1-12
  const currentDay = today.getDate();
  
  // Get Data for current month
  const monthDef = MONTHS.find(m => m.number === currentMonthIndex) || MONTHS[0];
  const monthData = getMonthData(monthDef);

  // Carousel State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Greeting Cycle State
  const [greetingIndex, setGreetingIndex] = useState(0);

  const greetings = [
    { line1: "Bula", line2: "Vinaka" },
    { line1: "Bula", line2: "Vina'a" },
    { line1: "Bula", line2: "Re" },
    { line1: "Bula", line2: "Si'a" },
    { line1: "Malo", line2: "Bula" }
  ];
  
  // Images for the carousel - Updated to specific high-quality nature shots
  const heroImages = [
    "https://images.unsplash.com/photo-1518467166778-b88f373ffec7?q=80&w=1932&auto=format&fit=crop", // Vibrant Sea Turtle
    "https://images.unsplash.com/photo-1507290439931-a861b5a38200?q=80&w=1932&auto=format&fit=crop", // Frangipani Flowers
    "https://images.unsplash.com/photo-1505881402582-c5bc11054f91?q=80&w=1932&auto=format&fit=crop", // Palm Trees on Beach
    "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=1932&auto=format&fit=crop"  // Coral Reef
  ];

  useEffect(() => {
    const imgInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    const textInterval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 5000); // Change text every 5 seconds (Slower cycle)

    return () => {
      clearInterval(imgInterval);
      clearInterval(textInterval);
    };
  }, []);

  // Helper to get Weather Icon and Description
  const getWeatherDisplay = (code: number) => {
    // WMO Weather interpretation codes
    if (code === 0) return { icon: <Sun className="w-8 h-8 text-volau-yellow" />, label: 'Clear' };
    if (code >= 1 && code <= 3) return { icon: <CloudSun className="w-8 h-8 text-stone-500" />, label: 'Cloudy' };
    if (code >= 45 && code <= 48) return { icon: <Cloud className="w-8 h-8 text-stone-400" />, label: 'Fog' };
    if (code >= 51 && code <= 57) return { icon: <CloudDrizzle className="w-8 h-8 text-blue-400" />, label: 'Drizzle' };
    if (code >= 61 && code <= 67) return { icon: <CloudRain className="w-8 h-8 text-blue-500" />, label: 'Rain' };
    if (code >= 80 && code <= 82) return { icon: <CloudRain className="w-8 h-8 text-blue-600" />, label: 'Showers' };
    if (code >= 95) return { icon: <CloudLightning className="w-8 h-8 text-purple-500" />, label: 'Storm' };
    return { icon: <CloudSun className="w-8 h-8 text-volau-yellow" />, label: 'Fair' };
  };

  // Moon Phase Calculation (Approximate)
  const getMoonPhase = (date: Date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    const day = date.getDate();
    
    let c = 0;
    let e = 0;
    let jd = 0;
    let b = 0;

    if (month < 3) {
      year--;
      month += 12;
    }

    ++month;

    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09; // jd is total days elapsed
    jd /= 29.5305882; // divide by the moon cycle
    b = parseInt(jd.toString()); // int(jd) -> b, take integer part of jd
    jd -= b; // subtract integer part to leave fractional part of original jd
    b = Math.round(jd * 8); // scale fraction from 0-8 and round

    if (b >= 8) b = 0; // 0 and 8 are the same so turn 8 into 0

    switch (b) {
      case 0: return { name: 'New Moon', icon: '🌑' };
      case 1: return { name: 'Waxing Crescent', icon: 'Tk' }; // Using unicode or shape
      case 2: return { name: 'First Quarter', icon: '🌓' };
      case 3: return { name: 'Waxing Gibbous', icon: '🌔' };
      case 4: return { name: 'Full Moon', icon: '🌕' };
      case 5: return { name: 'Waning Gibbous', icon: '🌖' };
      case 6: return { name: 'Last Quarter', icon: '🌗' };
      case 7: return { name: 'Waning Crescent', icon: '🌘' };
      default: return { name: 'New Moon', icon: '🌑' };
    }
  };

  const moonPhase = useMemo(() => getMoonPhase(today), []);

  // Get a featured tip (Crop or Maritime)
  const dailyTip = useMemo(() => {
    // Try to find a crop indicator first, then maritime
    const cropInd = monthData.indicators.find(i => i.indicator_type_code === 'crop');
    const seaInd = monthData.indicators.find(i => i.indicator_type_code === 'maritime');
    
    if (language === 'fj') {
        return cropInd ? cropInd.note_fj : (seaInd ? seaInd.note_fj : "Talo e dua na bili.");
    }
    return cropInd ? cropInd.note_en : (seaInd ? seaInd.note_en : "A good day to plan.");
  }, [monthData, language]);

  const seasonalTitle = language === 'en'
    ? monthData.seasonalTitle?.title_en
    : monthData.seasonalTitle?.title_fj;

  // Format Date
  const dateString = today.toLocaleDateString(language === 'fj' ? 'fj-FJ' : 'en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-md mx-auto p-4 pb-20 flex flex-col min-h-[80vh]">
      
      {/* Hero / Header Area with Carousel - Increased Height */}
      <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl mb-[-100px] z-0 bg-volau-dark group">
         {/* Carousel Images */}
         {heroImages.map((img, index) => (
           <div 
             key={img}
             className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
               index === currentImageIndex ? 'opacity-100' : 'opacity-0'
             }`}
           >
             <img 
                src={img} 
                alt={`Volau Nature ${index}`} 
                className="w-full h-full object-cover opacity-90 scale-105 group-hover:scale-110 transition-transform duration-[8000ms]"
            />
           </div>
         ))}
         
         {/* Gradient Overlay for Text Readability - Lighter top */}
         <div className="absolute inset-0 bg-gradient-to-t from-volau-dark/80 via-volau-dark/10 to-transparent z-10"></div>
         
         {/* Carousel Indicators */}
         <div className="absolute top-4 right-4 z-20 flex gap-1.5">
           {heroImages.map((_, idx) => (
             <div 
               key={idx} 
               className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                 idx === currentImageIndex ? 'bg-volau-yellow w-3' : 'bg-white/50'
               }`}
             />
           ))}
         </div>

         <div className="absolute bottom-28 left-6 text-white z-20 min-h-[80px]">
             {/* Slower, soft cross-fade animation */}
             <div key={greetingIndex} className="animate-in slide-in-from-bottom-4 fade-in duration-[2000ms] ease-in-out fill-mode-forwards">
               <h2 className="text-4xl font-display font-bold leading-tight drop-shadow-lg">
                   {greetings[greetingIndex].line1}<br/>
                   {greetings[greetingIndex].line2}
               </h2>
             </div>
         </div>
      </div>

      {/* Daily Card - Floating Overlap */}
      <div className="bg-stone-50 dark:bg-[#08261d] border-2 border-volau-dark dark:border-volau-green rounded-3xl p-6 pt-8 shadow-2xl mb-8 relative overflow-hidden z-10 backdrop-blur-md bg-opacity-95 mt-4">
        
        {/* Weather Decor (Top Left) */}
        <div className="absolute top-4 left-4 flex flex-col items-center">
            {weather ? (
              <>
                <div className="mb-1 opacity-90">
                  {getWeatherDisplay(weather.code).icon}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-volau-earth">
                  {weather.temp}°C {getWeatherDisplay(weather.code).label}
                </span>
              </>
            ) : (
               <div className="flex flex-col items-center gap-1 animate-pulse">
                 <div className="bg-stone-200 dark:bg-stone-800 h-8 w-8 rounded-full"></div>
                 <div className="bg-stone-200 dark:bg-stone-800 h-2 w-10 rounded"></div>
               </div>
            )}
        </div>

        {/* Moon Phase Decor (Top Right) */}
        <div className="absolute top-4 right-4 flex flex-col items-center">
            <div className="text-4xl mb-1 opacity-90 text-volau-dark dark:text-stone-200" title={moonPhase.name} role="img" aria-label={moonPhase.name}>
                {moonPhase.icon}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-volau-earth">{moonPhase.name}</span>
        </div>

        {/* Date Section (Centered, pushed down slightly) */}
        <div className="mb-6 mt-10 text-center relative z-10">
            <h1 className="text-5xl font-display font-bold text-volau-dark dark:text-stone-50 mb-1">
                {currentDay} <span className="text-2xl uppercase text-volau-green">{monthDef.name_en.substring(0,3)}</span>
            </h1>
            <p className="text-stone-600 dark:text-stone-400 font-medium uppercase tracking-wide text-sm">
                {dateString}
            </p>
        </div>

        {/* Seasonal Info */}
        <div className="mb-5 border-l-4 border-volau-green pl-4 py-1 bg-white/50 dark:bg-black/20 rounded-r-lg">
            <h3 className="text-lg font-display font-bold text-volau-dark dark:text-volau-yellow uppercase leading-tight mb-1">
                {monthData.def.name_fj.toUpperCase()}
            </h3>
            {seasonalTitle && (
              <p className="text-sm font-medium text-stone-700 dark:text-stone-300 leading-snug">
                  {seasonalTitle}
              </p>
            )}
        </div>

        {/* Tip Box */}
        <div className="bg-white dark:bg-stone-900/50 p-4 rounded-lg border border-volau-earth/30 shadow-sm">
            <p className="text-xs font-bold text-volau-earth uppercase mb-1 tracking-wide">Daily Insight</p>
            <p className="text-sm text-volau-dark dark:text-stone-200 italic font-medium">
                "{dailyTip}"
            </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="space-y-4">
        <button 
            onClick={() => onNavigate('calendar')}
            className="w-full group bg-white dark:bg-[#0C3B2E] hover:bg-stone-50 dark:hover:bg-[#0F4637] border border-stone-200 dark:border-volau-green/30 p-4 rounded-xl shadow-sm flex items-center justify-between transition-all hover:shadow-md"
        >
            <div className="flex items-center gap-4">
                <div className="bg-volau-green/10 dark:bg-volau-green/20 p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-volau-green" />
                </div>
                <div className="text-left">
                    <h3 className="font-bold text-volau-dark dark:text-stone-100 text-lg font-display">Almanac Calendar</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">View traditional months & seasons</p>
                </div>
            </div>
            <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-volau-green group-hover:translate-x-1 transition-all" />
        </button>

        <button 
            onClick={() => onNavigate('planner')}
            className="w-full group bg-white dark:bg-[#0C3B2E] hover:bg-stone-50 dark:hover:bg-[#0F4637] border border-stone-200 dark:border-volau-green/30 p-4 rounded-xl shadow-sm flex items-center justify-between transition-all hover:shadow-md"
        >
            <div className="flex items-center gap-4">
                <div className="bg-volau-earth/10 dark:bg-volau-earth/20 p-3 rounded-lg">
                    <Anchor className="w-6 h-6 text-volau-earth" />
                </div>
                <div className="text-left">
                    <h3 className="font-bold text-volau-dark dark:text-stone-100 text-lg font-display">Plan Your Volau</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">AI Work Shed & Farming Guide</p>
                </div>
            </div>
            <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-volau-earth group-hover:translate-x-1 transition-all" />
        </button>
      </div>

    </div>
  );
};