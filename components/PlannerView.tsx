import React, { useState } from 'react';
import { getAllCrops, getAllMarineSpecies, getMonthData } from '../services/dataService';
import { MONTHS } from '../constants';
import { generateFarmingAdvice } from '../services/geminiService';
import { Loader2, Sparkles, CalendarCheck, Download, Printer, Wind, CloudRain, AlertTriangle, Anchor, Target, ChevronsRight, Info, Lightbulb } from 'lucide-react';
import { WeatherData } from '../App';
import { AIPlan } from '../types';

interface PlannerViewProps {
  language: 'en' | 'fj';
  darkMode: boolean;
  weather: WeatherData | null;
}

const PREDEFINED_GOALS = [
  "Improve Soil Health",
  "Organic Pest Control",
  "Drought-Resistant Crops",
  "Weed Management",
  "Sustainable Fishing",
  "Maximise Yield"
];

export const PlannerView: React.FC<PlannerViewProps> = ({ language, darkMode, weather }) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [selectedFish, setSelectedFish] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [otherGoal, setOtherGoal] = useState('');
  
  const [aiPlan, setAiPlan] = useState<AIPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const crops = getAllCrops();
  const marine = getAllMarineSpecies();
  const monthData = getMonthData(MONTHS.find(m => m.number === selectedMonth) || MONTHS[0]);

  const toggleCrop = (name: string) => {
    setSelectedCrops(prev => prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]);
  };

  const toggleFish = (name: string) => {
    setSelectedFish(prev => prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]);
  };
  
  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]);
  };

  const handleGeneratePlan = async () => {
    setLoading(true);
    setAiPlan(null);
    const monthName = MONTHS.find(m => m.number === selectedMonth)?.name_en || 'Current Month';
    const allGoals = [...selectedGoals];
    if (otherGoal.trim()) {
      allGoals.push(otherGoal.trim());
    }
    const plan = await generateFarmingAdvice(monthName, selectedCrops, selectedFish, language, allGoals);
    setAiPlan(plan);
    setLoading(false);
  };

  const handleDownloadText = () => {
    if (!aiPlan) return;
    let textContent = `VOLAU PLAN - ${monthData.def.name_en}\n\n`;
    textContent += `INTRODUCTION:\n${aiPlan.introduction}\n\n`;

    if (aiPlan.farmingPlan.length > 0) {
      textContent += '--- FARMING PLAN ---\n';
      aiPlan.farmingPlan.forEach(task => {
        textContent += `Timing: ${task.timing}\nTask: ${task.task}\nDetails: ${task.details}\nSeasonal Note: ${task.seasonalNote || 'N/A'}\n\n`;
      });
    }

    if (aiPlan.fishingPlan.length > 0) {
      textContent += '--- FISHING PLAN ---\n';
      aiPlan.fishingPlan.forEach(task => {
        textContent += `Timing: ${task.timing}\nTask: ${task.task}\nDetails: ${task.details}\nAbundance: ${task.abundance || 'N/A'}\nRecommendation: ${task.recommendation || 'N/A'}\n\n`;
      });
    }

    const element = document.createElement("a");
    const file = new Blob([textContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "volau-plan.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  const availableCropsInMonth = monthData.crops.map(c => c.crop_name_en);
  const availableFishInMonth = monthData.marineStatus.map(m => m.species_name_en);

  const getSeaSafety = () => {
    const indicators = monthData.indicators.filter(i => i.indicator_type_code === 'maritime');
    const indicatorText = language === 'fj' 
        ? indicators.map(i => i.note_fj).join('. ') 
        : indicators.map(i => i.note_en).join('. ');
    
    let status: 'safe' | 'caution' | 'unsafe' = 'safe';
    let reason = "Conditions appear normal.";

    if (weather) {
        if (weather.code >= 95 || weather.windspeed > 40) {
            status = 'unsafe';
            reason = "High winds or storm detected.";
        } else if (weather.code >= 61 || weather.windspeed > 25) {
            status = 'caution';
            reason = "Rain or moderate winds detected.";
        }
    }

    const lowerNote = indicatorText.toLowerCase();
    if (lowerNote.includes('rough') || lowerNote.includes('poisonous')) {
         if (status !== 'unsafe') {
             status = 'caution';
             reason = "Historical data warns of rough seas or poisonous fish.";
         }
    }

    return { status, reason, indicatorText };
  };

  const seaSafety = getSeaSafety();
  
  const getSeasonalNoteStyle = (note?: string) => {
    if (!note) return 'bg-stone-100 text-stone-600';
    const lowerNote = note.toLowerCase();
    if (lowerNote.includes('ideal') || lowerNote.includes('abundant')) {
      return 'bg-volau-green/20 text-volau-green dark:bg-volau-green/30 dark:text-volau-green';
    }
    if (lowerNote.includes('not recommended') || lowerNote.includes('low supply')) {
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
    }
    return 'bg-volau-yellow/20 text-volau-earth dark:bg-volau-yellow/30 dark:text-volau-earth';
  }


  return (
    <div className="max-w-4xl mx-auto p-4 pb-20 animate-in fade-in duration-300">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-volau-dark dark:text-stone-100">Volau Planner</h2>
        <p className="text-stone-600 dark:text-volau-green font-medium">Customized farm and fishing schedules.</p>
      </div>

      {/* Steps 1, 2, 3 */}
      <div className="bg-[#F0F7F4] dark:bg-[#08261d] rounded-xl shadow-sm border border-volau-dark/20 dark:border-volau-dark mb-8 overflow-hidden">
        <div className="bg-volau-dark p-4"><h3 className="text-lg font-bold flex items-center gap-2 text-white"><CalendarCheck className="w-5 h-5 text-volau-yellow" />Step 1: Select Month</h3></div>
        <div className="p-6"><div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">{MONTHS.map(m=>(<button key={m.number} onClick={()=>setSelectedMonth(m.number)} className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${selectedMonth===m.number?'bg-volau-green text-white shadow-md transform scale-105 font-bold':'bg-white dark:bg-[#0C3B2E] text-stone-600 dark:text-stone-300 hover:bg-volau-green/20 dark:hover:bg-[#0F4637] border border-stone-200 dark:border-stone-700'}`}>{m.name_en}</button>))}</div><div className="mt-6 text-center bg-white dark:bg-black/20 p-4 rounded-lg border border-volau-green/20"><p className="text-volau-dark dark:text-volau-green font-display text-xl font-bold tracking-wide">{monthData.def.name_fj}</p><p className="text-stone-500 dark:text-stone-400 text-sm italic">{monthData.seasonalTitle?.title_en}</p></div></div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#F0F7F4] dark:bg-[#08261d] rounded-xl shadow-sm border border-volau-green/30 dark:border-volau-dark overflow-hidden flex flex-col"><div className="bg-volau-green p-4"><h3 className="text-lg font-bold text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-white" />Step 2: Select Crops</h3></div><div className="p-4 flex-grow"><div className="max-h-80 overflow-y-auto pr-2 space-y-2 custom-scrollbar">{crops.map(c=>{const i=availableCropsInMonth.some(cn=>cn.includes(c.name_en));return(<label key={c.name_en} className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-colors ${selectedCrops.includes(c.name_en)?'bg-volau-green text-white shadow-md border-volau-green':'bg-white dark:bg-[#0C3B2E] border-transparent hover:bg-volau-green/10 dark:hover:bg-[#0F4637]'}`}><div className="flex items-center gap-3"><input type="checkbox" checked={selectedCrops.includes(c.name_en)} onChange={()=>toggleCrop(c.name_en)} className="w-4 h-4 rounded focus:ring-volau-green text-volau-green bg-transparent border-stone-300 dark:border-stone-600" /><div><p className={`font-medium ${selectedCrops.includes(c.name_en)?'text-white':'text-stone-800 dark:text-stone-200'}`}>{c.name_en}</p><p className={`text-xs ${selectedCrops.includes(c.name_en)?'text-white/80':'text-stone-500 dark:text-stone-400'}`}>{c.name_fj}</p></div></div>{i&&(<span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-sm ${selectedCrops.includes(c.name_en)?'bg-white/20 text-white':'text-volau-green bg-volau-green/10'}`}>Season</span>)}</label>);})}</div></div></div>
        <div className="bg-[#FDF7F2] dark:bg-[#08261d] rounded-xl shadow-sm border border-volau-earth/30 dark:border-volau-dark overflow-hidden flex flex-col"><div className="bg-volau-earth p-4"><h3 className="text-lg font-bold text-white flex items-center gap-2"><Anchor className="w-5 h-5 text-white" />Step 3: Select Marine</h3></div><div className="p-4 flex-grow"><div className="max-h-80 overflow-y-auto pr-2 space-y-2 custom-scrollbar">{marine.map(s=>{const i=availableFishInMonth.some(f=>f.includes(s.name_en));return(<label key={s.name_en} className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-colors ${selectedFish.includes(s.name_en)?'bg-volau-earth text-white shadow-md border-volau-earth':'bg-white dark:bg-[#0C3B2E] border-transparent hover:bg-volau-earth/10 dark:hover:bg-[#0F4637]'}`}><div className="flex items-center gap-3"><input type="checkbox" checked={selectedFish.includes(s.name_en)} onChange={()=>toggleFish(s.name_en)} className="w-4 h-4 rounded focus:ring-volau-earth text-volau-earth bg-transparent border-stone-300 dark:border-stone-600"/><div><p className={`font-medium ${selectedFish.includes(s.name_en)?'text-white':'text-stone-800 dark:text-stone-200'}`}>{s.name_en}</p><p className={`text-xs ${selectedFish.includes(s.name_en)?'text-white/80':'text-stone-500 dark:text-stone-400'}`}>{s.name_fj}</p></div></div>{i&&(<span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-sm ${selectedFish.includes(s.name_en)?'bg-white/20 text-white':'text-volau-earth bg-volau-earth/10'}`}>Active</span>)}</label>);})}</div></div></div>
      </div>
      
      {/* Custom Goal Buttons */}
      <div className="bg-stone-50 dark:bg-[#08261d] rounded-xl shadow-sm border border-volau-yellow/30 dark:border-volau-dark mb-8 overflow-hidden">
        <div className="bg-volau-yellow p-4"><h3 className="text-lg font-bold flex items-center gap-2 text-volau-dark"><Target className="w-5 h-5" />Step 4: Add Custom Goals (Optional)</h3></div>
        <div className="p-6">
          <div className="flex flex-wrap gap-3 mb-4">
            {PREDEFINED_GOALS.map(goal => (
              <button key={goal} onClick={() => toggleGoal(goal)} className={`px-4 py-2 text-sm font-medium rounded-full border-2 transition-all ${selectedGoals.includes(goal) ? 'bg-volau-dark text-white border-volau-dark' : 'bg-white dark:bg-[#0C3B2E] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-volau-dark'}`}>
                {goal} {selectedGoals.includes(goal) && '✓'}
              </button>
            ))}
          </div>
          <input type="text" value={otherGoal} onChange={(e)=>setOtherGoal(e.target.value)} placeholder="Other specific goals..." className="w-full mt-2 p-3 rounded-lg bg-white dark:bg-[#0C3B2E] border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-volau-yellow" />
        </div>
      </div>

      <div className="flex justify-center mb-10"><button onClick={handleGeneratePlan} disabled={loading||(selectedCrops.length===0&&selectedFish.length===0)} className={`flex items-center gap-3 px-10 py-5 rounded-full text-xl font-bold shadow-xl transition-all ${loading||(selectedCrops.length===0&&selectedFish.length===0)?'bg-stone-300 dark:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-not-allowed':'bg-volau-dark text-white hover:bg-volau-yellow hover:text-volau-dark hover:shadow-2xl transform hover:-translate-y-1 ring-4 ring-volau-dark/10'}`}>{loading?<Loader2 className="animate-spin w-6 h-6"/>:<Sparkles className="w-6 h-6"/>}{loading?"Consulting VolauDB...":"CONSULT VOLAU AI"}</button></div>

      {aiPlan && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {selectedFish.length > 0 && (<div id="marine-safety" className={`rounded-xl p-6 shadow-md border-l-8 transition-colors ${seaSafety.status==='safe'?'bg-[#F6F9F7] dark:bg-[#0A2E20] border-volau-green':seaSafety.status==='caution'?'bg-amber-50 dark:bg-[#382b10] border-volau-yellow':'bg-red-50 dark:bg-[#381010] border-red-600'}`}><div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2"><Anchor className={`w-6 h-6 ${seaSafety.status==='safe'?'text-volau-green':seaSafety.status==='caution'?'text-volau-yellow':'text-red-600'}`}/><h3 className="text-xl font-display font-bold text-stone-800 dark:text-stone-100">Sea Safety Report</h3></div><div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${seaSafety.status==='safe'?'bg-volau-green text-white':seaSafety.status==='caution'?'bg-volau-yellow text-stone-900':'bg-red-600 text-white'}`}>{seaSafety.status==='safe'?'Conditions Good':seaSafety.status==='caution'?'Exercise Caution':'Unsafe Conditions'}</div></div><div className="grid md:grid-cols-2 gap-4"><div className="bg-white dark:bg-black/20 p-3 rounded-lg"><p className="text-xs text-stone-500 dark:text-stone-400 uppercase mb-1 font-bold">Real-Time Forecast</p>{weather?(<div className="flex items-center gap-3">{weather.code>50?<CloudRain className="text-stone-400"/>:<Wind className="text-stone-400"/>}<div><p className="font-medium text-stone-800 dark:text-stone-200">Wind: {weather.windspeed} km/h</p><p className="text-xs text-stone-500">{seaSafety.reason}</p></div></div>):(<p className="text-sm italic text-stone-400">Weather data unavailable.</p>)}</div><div className="bg-white dark:bg-black/20 p-3 rounded-lg"><p className="text-xs text-stone-500 dark:text-stone-400 uppercase mb-1 font-bold">Volau Almanac ({monthData.def.name_fj})</p><div className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-volau-earth mt-1 flex-shrink-0"/><p className="text-sm text-stone-700 dark:text-stone-300 italic">"{seaSafety.indicatorText||"No specific marine warnings."}"</p></div></div></div></div>)}

            <div id="printable-plan" className="bg-white dark:bg-[#08261d] rounded-xl p-8 shadow-xl border-t-8 border-volau-dark relative overflow-hidden">
                <div className="flex items-center justify-between mb-6 border-b pb-4 border-stone-100 dark:border-volau-dark"><div className="flex items-center gap-4"><div className="p-3 bg-volau-dark rounded-lg shadow-lg transform -rotate-3"><Sparkles className="w-8 h-8 text-volau-yellow"/></div><div><h3 className="text-2xl font-display font-bold text-volau-dark dark:text-stone-100">Your Volau Plan</h3><p className="text-sm text-volau-green font-medium">AI-Generated Strategy</p></div></div><div className="flex gap-2 no-print"><button onClick={handleDownloadText} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-[#0C3B2E] hover:bg-volau-green hover:text-white rounded-lg transition-colors" title="Download as Text File"><Download className="w-4 h-4"/><span className="hidden sm:inline">Save Text</span></button><button onClick={handlePrint} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-[#0C3B2E] hover:bg-volau-green hover:text-white rounded-lg transition-colors" title="Print / Save as PDF"><Printer className="w-4 h-4"/><span className="hidden sm:inline">Print PDF</span></button></div></div>
                
                <p className="text-stone-700 dark:text-stone-300 mb-8 italic text-center bg-stone-50 dark:bg-black/20 p-4 rounded-lg border-l-4 border-volau-earth">{aiPlan.introduction}</p>

                {/* Farming Timetable */}
                {aiPlan.farmingPlan && aiPlan.farmingPlan.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xl font-bold font-display text-volau-dark dark:text-volau-green mb-4 pb-2 border-b-2 border-volau-green/30 flex items-center gap-2"><Sparkles className="w-5 h-5"/>Farming Timetable</h4>
                    <div className="space-y-4">
                      {aiPlan.farmingPlan.map((item, index) => (
                        <div key={index} className="bg-stone-50 dark:bg-volau-dark/20 p-4 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                            <div className="md:col-span-1 font-bold text-volau-green flex items-center gap-2"><CalendarCheck className="w-4 h-4"/>{item.timing}</div>
                            <div className="md:col-span-1 font-semibold text-stone-800 dark:text-stone-200">{item.task}</div>
                            <div className="md:col-span-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{item.details}</div>
                          </div>
                           {item.seasonalNote && (
                            <div className="mt-3">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-bold rounded-full ${getSeasonalNoteStyle(item.seasonalNote)}`}>
                                <Info className="w-4 h-4" />
                                {item.seasonalNote}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fishing Timetable */}
                {aiPlan.fishingPlan && aiPlan.fishingPlan.length > 0 && (
                  <div>
                    <h4 className="text-xl font-bold font-display text-volau-dark dark:text-volau-earth mb-4 pb-2 border-b-2 border-volau-earth/30 flex items-center gap-2"><Anchor className="w-5 h-5"/>Fishing Timetable</h4>
                     <div className="space-y-4">
                      {aiPlan.fishingPlan.map((item, index) => (
                        <div key={index} className="bg-stone-50 dark:bg-volau-dark/20 p-4 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                            <div className="md:col-span-1 font-bold text-volau-earth flex items-center gap-2"><ChevronsRight className="w-4 h-4"/>{item.timing}</div>
                            <div className="md:col-span-1 font-semibold text-stone-800 dark:text-stone-200">{item.task}</div>
                            <div className="md:col-span-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{item.details}</div>
                          </div>
                          {item.abundance && (
                            <div className="mt-3">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-bold rounded-full ${getSeasonalNoteStyle(item.abundance)}`}>
                                <Info className="w-4 h-4" />
                                Abundance: {item.abundance}
                              </div>
                            </div>
                          )}
                          {item.recommendation && (
                            <div className="mt-3 bg-volau-yellow/10 dark:bg-volau-yellow/20 border-l-4 border-volau-yellow p-3 rounded-r-md">
                              <div className="flex items-center gap-3">
                                <Lightbulb className="w-6 h-6 text-volau-earth flex-shrink-0" />
                                <div>
                                  <h5 className="font-bold text-sm text-volau-earth">Recommendation</h5>
                                  <p className="text-sm text-stone-700 dark:text-stone-300">{item.recommendation}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {aiPlan.farmingPlan.length === 0 && aiPlan.fishingPlan.length === 0 && (
                  <div className="text-center text-stone-500 dark:text-stone-400 italic bg-stone-100 dark:bg-volau-dark/20 p-6 rounded-lg flex items-center justify-center gap-3">
                    <Info className="w-5 h-5"/>
                    <p>No specific plan generated. Try selecting some crops or marine species.</p>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-stone-100 dark:border-volau-dark text-center text-xs text-stone-400 hidden print:block"><p>Generated by VOLAU - Fijian Agricultural Planner</p></div>
            </div>
        </div>
      )}
    </div>
  );
};