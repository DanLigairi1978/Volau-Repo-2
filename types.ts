export interface MonthDef {
  number: number;
  name_en: string;
  name_fj: string;
}

export interface SeasonalTitle {
  month_name_en: string;
  title_en: string;
  title_fj: string;
  category: string;
}

export interface CropCalendarItem {
  month_name_en: string;
  crop_name_en: string;
  recommendation: string;
}

export interface Indicator {
  month_name_en: string;
  indicator_type_code: 'maritime' | 'freshwater' | 'crop' | 'native_plants';
  note_en: string;
  note_fj: string;
}

export interface MarineStatus {
  month_name_en: string;
  species_name_en: string;
  status: string; // abundance, spawning, etc.
  note: string;
}

export interface TreePhenology {
  month_name_en: string;
  tree_name_en: string;
  status: string; // flowering, fruiting
  note: string;
}

export interface CropInfo {
  name_en: string;
  name_fj: string;
  latin_name: string;
  crop_type: string;
}

export interface MarineSpeciesInfo {
  name_en: string;
  name_fj: string;
  taxonomic_name: string;
  species_class: string;
}

// Derived types for the UI
export interface CombinedMonthData {
  def: MonthDef;
  seasonalTitle?: SeasonalTitle;
  crops: CropCalendarItem[];
  indicators: Indicator[];
  marineStatus: MarineStatus[];
  trees: TreePhenology[];
}

// Types for structured AI Plan
export interface AIFarmingTask {
  timing: string; // e.g., "Week 1", "Daily", "Mid-Month"
  task: string;
  details: string;
  seasonalNote?: string; // e.g., "Ideal Planting Season", "Harvest Time", "Not Recommended"
}

export interface AIFishingTask {
  timing: string; // e.g., "High Tide", "Full Moon"
  task: string;
  details: string;
  abundance?: string; // e.g., "Abundant", "Low Supply", "Spawning Season"
  recommendation?: string; // e.g., "Consider targeting Rabbitfish instead, which is abundant now."
}

export interface AIPlan {
  introduction: string;
  farmingPlan: AIFarmingTask[];
  fishingPlan: AIFishingTask[];
}