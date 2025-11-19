

import React from 'react';
import { CombinedMonthData } from '../types';
import { Accordion } from './ui/Accordion';
import { Sprout, Fish, Droplets, Flower } from 'lucide-react';

interface Props {
  data: CombinedMonthData[];
  language?: 'en' | 'fj';
}

export const MonthCalendar: React.FC<Props> = ({ data, language = 'en' }) => {
  return (
    <div className="max-w-3xl mx-auto p-4 pb-20">
      <h2 className="text-3xl font-display font-bold text-volau-dark dark:text-stone-100 mb-2 text-center">
        {language === 'fj' ? 'Vola ni Vula' : 'Traditional Calendar'}
      </h2>
      <p className="text-stone-600 dark:text-volau-green text-center mb-8 font-medium">
        {language === 'fj' 
          ? 'Vakamuria na veivula kei na veika e yaco kina.' 
          : 'Explore the Fijian lunar cycles and seasonal activities.'}
      </p>
      
      {data.map((month) => (
        <Accordion
          key={month.def.number}
          title={
            <span className="flex items-baseline gap-3">
              {language === 'en' ? (
                <>
                  <span className="text-xl font-display uppercase tracking-wider text-volau-dark dark:text-stone-100">{month.def.name_en}</span>
                  <span className="text-volau-green font-medium font-display">{month.def.name_fj}</span>
                </>
              ) : (
                <>
                  <span className="text-xl font-display uppercase tracking-wider text-volau-dark dark:text-stone-100">{month.def.name_fj}</span>
                  <span className="text-volau-green font-medium font-display">{month.def.name_en}</span>
                </>
              )}
            </span>
          }
          subtitle={language === 'en' ? month.seasonalTitle?.title_en : month.seasonalTitle?.title_fj}
        >
          <div className="space-y-6">
            {/* Season Title - Bold Color Block */}
            {month.seasonalTitle && (
              <div className="bg-volau-dark dark:bg-volau-yellow/10 p-4 rounded-lg border-l-4 border-volau-yellow shadow-sm">
                <h4 className="font-bold text-volau-yellow dark:text-volau-yellow font-display text-lg">
                  {language === 'en' ? month.seasonalTitle.title_en : month.seasonalTitle.title_fj}
                </h4>
                {language !== 'en' && <p className="text-sm text-stone-300 dark:text-stone-400 italic">{month.seasonalTitle.title_en}</p>}
                <p className="text-xs text-stone-400 dark:text-stone-500 uppercase tracking-widest mt-2 opacity-80">{month.seasonalTitle.category}</p>
              </div>
            )}

            {/* Indicators Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Crops - Volau Green Tint */}
              <div className="bg-[#EAF2ED] dark:bg-volau-green/10 p-4 rounded-lg border border-volau-green/30">
                <div className="flex items-center gap-2 mb-3 border-b border-volau-green/20 pb-2">
                  <div className="bg-white dark:bg-volau-green/20 p-1.5 rounded-full">
                    <Sprout className="w-5 h-5 text-volau-green" />
                  </div>
                  <h3 className="font-semibold text-volau-dark dark:text-volau-green">Crops & Planting</h3>
                </div>
                {month.crops.length > 0 ? (
                  <ul className="space-y-2">
                    {month.crops.map((c, idx) => (
                      <li key={idx} className="text-sm text-stone-800 dark:text-stone-200 flex justify-between items-start gap-2">
                        <span className="font-medium">{c.crop_name_en}</span>
                        <span className="text-volau-dark dark:text-stone-300 text-[10px] uppercase font-bold tracking-wide bg-white/80 dark:bg-volau-dark px-2 py-0.5 rounded-md border border-volau-green/30 dark:border-stone-700 text-right flex-shrink-0">{c.recommendation}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-stone-500 italic">No specific crop data.</p>
                )}
                {/* Crop Indicators */}
                {month.indicators.filter(i => i.indicator_type_code === 'crop').map((ind, i) => (
                  <div key={i} className="mt-3 bg-white/60 dark:bg-black/20 p-2 rounded border border-volau-green/10">
                    <p className="text-xs text-volau-green dark:text-stone-400 italic font-medium">
                      "{ind.note_fj}"
                    </p>
                    <p className="text-xs text-stone-600 dark:text-stone-500 mt-1">{ind.note_en}</p>
                  </div>
                ))}
              </div>

              {/* Marine - Volau Earth Tint */}
              <div className="bg-[#F5EFE9] dark:bg-volau-earth/10 p-4 rounded-lg border border-volau-earth/30">
                <div className="flex items-center gap-2 mb-3 border-b border-volau-earth/20 pb-2">
                   <div className="bg-white dark:bg-volau-earth/20 p-1.5 rounded-full">
                    <Fish className="w-5 h-5 text-volau-earth" />
                  </div>
                  <h3 className="font-semibold text-volau-earth dark:text-volau-earth">Fishing & Marine</h3>
                </div>
                {month.marineStatus.length > 0 ? (
                  <ul className="space-y-2">
                    {month.marineStatus.map((m, idx) => (
                      <li key={idx} className="text-sm text-stone-800 dark:text-stone-200 flex justify-between items-center">
                        <span className="font-medium">{m.species_name_en}</span>
                        <span className="text-xs text-volau-earth font-bold capitalize bg-white/80 dark:bg-black/30 px-2 py-0.5 rounded">{m.status.replace('_', ' ')}</span>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-sm text-stone-500 italic">No specific marine data.</p>}
                
                {/* Marine Indicators */}
                {month.indicators.filter(i => i.indicator_type_code === 'maritime').map((ind, i) => (
                   <div key={i} className="mt-3 bg-white/60 dark:bg-black/20 p-2 rounded border border-volau-earth/10">
                    <p className="text-xs text-volau-earth dark:text-stone-400 italic font-bold">
                      "{ind.note_fj}"
                    </p>
                    <p className="text-xs text-stone-600 dark:text-stone-500 mt-1">{ind.note_en}</p>
                   </div>
                ))}
              </div>
            </div>

            {/* Secondary Info */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Native Plants - Volau Yellow/Stone Theme */}
              <div className="border-2 border-volau-yellow/20 dark:border-volau-yellow/30 rounded-lg p-3 bg-[#FFFCF5] dark:bg-volau-yellow/5">
                <div className="flex items-center gap-2 mb-2 border-b border-volau-yellow/20 pb-1">
                  <Flower className="w-4 h-4 text-volau-yellow" />
                  <h4 className="font-bold text-sm text-stone-700 dark:text-stone-200 uppercase tracking-wide">Native Flora</h4>
                </div>
                <ul className="space-y-1">
                  {month.trees.map((t, idx) => (
                    <li key={idx} className="text-xs text-stone-600 dark:text-stone-400 flex items-start gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-volau-yellow mt-1"></span>
                      <span><strong className="text-stone-800 dark:text-stone-300">{t.tree_name_en}</strong> is {t.status}.</span>
                    </li>
                  ))}
                  {month.trees.length === 0 && <li className="text-xs text-stone-400">No specific flora events.</li>}
                </ul>
              </div>
              
              {/* Freshwater - Volau Dark Theme */}
              <div className="border-2 border-volau-dark/20 dark:border-volau-dark/50 rounded-lg p-3 bg-[#F2F5F4] dark:bg-volau-dark/20">
                <div className="flex items-center gap-2 mb-2 border-b border-volau-dark/10 pb-1">
                  <Droplets className="w-4 h-4 text-volau-dark dark:text-volau-green" />
                  <h4 className="font-bold text-sm text-stone-700 dark:text-stone-200 uppercase tracking-wide">Freshwater</h4>
                </div>
                {month.indicators.filter(i => i.indicator_type_code === 'freshwater').map((ind, i) => (
                   <p key={i} className="text-xs text-stone-700 dark:text-stone-300 mb-2">
                   <span className="font-bold block text-volau-dark dark:text-stone-100">{ind.note_en}</span>
                   <span className="block text-stone-500 dark:text-stone-400 italic">{ind.note_fj}</span>
                 </p>
                ))}
                 {month.indicators.filter(i => i.indicator_type_code === 'freshwater').length === 0 && 
                   <p className="text-xs text-stone-400">No specific freshwater events.</p>
                 }
              </div>
            </div>

          </div>
        </Accordion>
      ))}
    </div>
  );
};