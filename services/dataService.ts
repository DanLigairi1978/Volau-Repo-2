import {
  MONTHS,
  SEASONAL_TITLES,
  CROP_CALENDAR,
  INDICATORS,
  MARINE_STATUS,
  TREE_PHENOLOGY,
  CROP_DB,
  MARINE_SPECIES_DB
} from '../constants';
import { CombinedMonthData, MonthDef } from '../types';

export const getMonthData = (monthDef: MonthDef): CombinedMonthData => {
  const name = monthDef.name_en;

  return {
    def: monthDef,
    seasonalTitle: SEASONAL_TITLES.find(t => t.month_name_en === name),
    crops: CROP_CALENDAR.filter(c => c.month_name_en === name),
    indicators: INDICATORS.filter(i => i.month_name_en === name),
    marineStatus: MARINE_STATUS.filter(m => m.month_name_en === name),
    trees: TREE_PHENOLOGY.filter(t => t.month_name_en === name),
  };
};

export const getAllMonthsData = (): CombinedMonthData[] => {
  return MONTHS.map(getMonthData);
};

export const getAllCrops = () => CROP_DB;
export const getAllMarineSpecies = () => MARINE_SPECIES_DB;
