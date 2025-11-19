import { 
  MonthDef, 
  SeasonalTitle, 
  CropCalendarItem, 
  Indicator, 
  MarineStatus, 
  TreePhenology,
  CropInfo,
  MarineSpeciesInfo
} from './types';

export const MONTHS: MonthDef[] = [
  { number: 1, name_en: "January", name_fj: "Janueri" },
  { number: 2, name_en: "February", name_fj: "Feperueri" },
  { number: 3, name_en: "March", name_fj: "Maji" },
  { number: 4, name_en: "April", name_fj: "Epereli" },
  { number: 5, name_en: "May", name_fj: "Me" },
  { number: 6, name_en: "June", name_fj: "Jiune" },
  { number: 7, name_en: "July", name_fj: "Julai" },
  { number: 8, name_en: "August", name_fj: "Okosita" },
  { number: 9, name_en: "September", name_fj: "Seviteba" },
  { number: 10, name_en: "October", name_fj: "Okotova" },
  { number: 11, name_en: "November", name_fj: "Noveba" },
  { number: 12, name_en: "December", name_fj: "Tiseba" },
];

export const SEASONAL_TITLES: SeasonalTitle[] = [
  { month_name_en: "January", title_en: "Month of Abundance of Rabbitfish", title_fj: "Vula I Nuqa Levu", category: "season" },
  { month_name_en: "February", title_en: "Month of Presentation of First Fruits", title_fj: "Vula I Sevu", category: "season" },
  { month_name_en: "March", title_en: "Month of Harvesting Yams", title_fj: "Vula I Kelikeli", category: "season" },
  { month_name_en: "April", title_en: "Month of Flowering of Reeds", title_fj: "Vula I Gasau", category: "season" },
  { month_name_en: "May", title_en: "Month of Flowering of the Doi", title_fj: "Vula I Doi", category: "season" },
  { month_name_en: "June", title_en: "Month of Weeding and Clearing", title_fj: "Vula I Werewere", category: "season" },
  { month_name_en: "July", title_en: "Month of Soil Preparation", title_fj: "Vula I Cukicuki", category: "season" },
  { month_name_en: "August", title_en: "Month of Flowering of Drala", title_fj: "Vula I Senidrala", category: "season" },
  { month_name_en: "September", title_en: "Month of Sprouting Yams", title_fj: "Vula I Vavakada", category: "season" },
  { month_name_en: "October", title_en: "Month of Small Supply of Balolo", title_fj: "Vula I Balolo Lailai", category: "season" },
  { month_name_en: "November", title_en: "Month of Abundant Supply of Balolo", title_fj: "Vula I Balolo Levu", category: "season" },
  { month_name_en: "December", title_en: "Month of Low Availability of Rabbitfish", title_fj: "Vula I Nuqa Lailai", category: "season" },
];

export const CROP_CALENDAR: CropCalendarItem[] = [
  { month_name_en: "January", crop_name_en: "Taro", recommendation: "Ideal time to plant" },
  { month_name_en: "January", crop_name_en: "Sweet potato", recommendation: "Planted during these months" },
  { month_name_en: "February", crop_name_en: "Breadfruit", recommendation: "Harvest" },
  { month_name_en: "March", crop_name_en: "Yam", recommendation: "Harvest and planting" },
  { month_name_en: "April", crop_name_en: "Breadfruit", recommendation: "Abundant" },
  { month_name_en: "May", crop_name_en: "Cucumber", recommendation: "Direct planting from seed" },
  { month_name_en: "May", crop_name_en: "Watermelon", recommendation: "Direct planting from seed" },
  { month_name_en: "May", crop_name_en: "Eggplant", recommendation: "Transplanting" },
  { month_name_en: "June", crop_name_en: "Yam", recommendation: "Begin planting" },
  { month_name_en: "July", crop_name_en: "Taro", recommendation: "Ideal time to plant" },
  { month_name_en: "August", crop_name_en: "Cassava", recommendation: "Ideal crop for season" },
  { month_name_en: "September", crop_name_en: "Taro", recommendation: "Planting season" },
  { month_name_en: "October", crop_name_en: "Breadfruit", recommendation: "Harvest" },
  { month_name_en: "November", crop_name_en: "Leafy vegetables", recommendation: "Planting season" },
  { month_name_en: "December", crop_name_en: "Breadfruit", recommendation: "Maturity" },
];

export const INDICATORS: Indicator[] = [
  { month_name_en: "January", indicator_type_code: "maritime", note_en: "Great abundance of Parrotfish; crabs, Giant Trevally and Spanish Mackerel spawning", note_fj: "Levu na Nuqa; Vakaluveni na Saqa, Walu" },
  { month_name_en: "January", indicator_type_code: "freshwater", note_en: "Habihabi, Ohi, Mo’Omo’O, Motomoto listed as freshwater shellfish", note_fj: "Se Tiko Na Nuqanuqa/Nukanuka Ka Vakatakilakila Ni Sa Cabe Na Nuqa" },
  { month_name_en: "January", indicator_type_code: "crop", note_en: "Ideal time to plant Dalo ni Tana, Dalo ni Vuci, Vudi, Jaina, Tivoli", note_fj: "Gauna Vinaka Ni Tei – Dalo Ni Tana, Dalo Ni Vuci, Vudi, Jaina, Tivoli" },
  { month_name_en: "January", indicator_type_code: "native_plants", note_en: "Lagakali and Buaniviti flowering (used for perfumed oil and garlands)", note_fj: "Se Na Lagakali, Buaniviti, Caucau, Makosoi/Mahosoi" },
  
  { month_name_en: "February", indicator_type_code: "maritime", note_en: "Sea slugs and univalves abundant", note_fj: "Levu na Vivili Kei na Sasalu Ni Waitui" },
  { month_name_en: "February", indicator_type_code: "freshwater", note_en: "Small fish Malevu and Voro abundant", note_fj: "Iha/Ika Ni Waidranu/Waidroka – Sesere, Malea, Lova" },
  { month_name_en: "February", indicator_type_code: "crop", note_en: "Breadfruit, taro, cassava harvest", note_fj: "Matua Tiko na Dalo Ni Tana Kei na Tivoli" },
  { month_name_en: "February", indicator_type_code: "native_plants", note_en: "Dakua Salusalu flowering", note_fj: "Se na Dakua/Tahua Salusalu" },

  { month_name_en: "March", indicator_type_code: "maritime", note_en: "Sea slugs and univalves abundant", note_fj: "Levu na Vivili Kei na Sasalu Ni Waitui" },
  { month_name_en: "March", indicator_type_code: "freshwater", note_en: "Water levels changing (Duana/Tuna)", note_fj: "Tawa Tiko Na Wai Ena Duana/Tuna" },
  { month_name_en: "March", indicator_type_code: "crop", note_en: "Yam harvest and planting", note_fj: "Tei Na Uvi Taumada" },
  { month_name_en: "March", indicator_type_code: "native_plants", note_en: "Yaka tree flowering", note_fj: "Se na Yaka" },

  { month_name_en: "April", indicator_type_code: "maritime", note_en: "Goldspot Herring, Sardinella, Barracuda, Trevally netted", note_fj: "Levu na Tugadra, Daniva, Salala, Sara" },
  { month_name_en: "April", indicator_type_code: "freshwater", note_en: "Shellfish Drevula abundant", note_fj: "Levu na Drevula Kei na Veimataqali Vivili" },
  { month_name_en: "April", indicator_type_code: "crop", note_en: "Start planting leafy vegetables", note_fj: "Tekivu Na Bucibucini – Kakana Draudrau" },
  { month_name_en: "April", indicator_type_code: "native_plants", note_en: "Duruka and Vico flowering", note_fj: "Se na Duruka Kei na Vico" },

  { month_name_en: "May", indicator_type_code: "maritime", note_en: "Goldspot Herring, Sardinella, Bigeyed scad netted", note_fj: "Tukuni Ni Dau Drava na Watui" },
  { month_name_en: "May", indicator_type_code: "freshwater", note_en: "Fishing poor", note_fj: "Cabe na Salala Ka Levu Tiko na Tugadra" },
  { month_name_en: "May", indicator_type_code: "crop", note_en: "Direct planting (cucumber, watermelon, beans, okra, corn, garlic)", note_fj: "Direct planting from seeds" },
  { month_name_en: "May", indicator_type_code: "native_plants", note_en: "Doi tree flowering", note_fj: "Se na Doi" },

  { month_name_en: "June", indicator_type_code: "maritime", note_en: "Spanish Mackerel, Barracuda, Trevally abundant", note_fj: "Levu na Matu, Salala, Tugadra, Daniva" },
  { month_name_en: "June", indicator_type_code: "freshwater", note_en: "Sea grapes (nama) and Lumi harvested", note_fj: "Levu na nama Kei na Lumi" },
  { month_name_en: "June", indicator_type_code: "crop", note_en: "Begin weeding and planting first yams", note_fj: "Tekivu na Werewere" },
  { month_name_en: "June", indicator_type_code: "native_plants", note_en: "Dilo and Dakua Salusalu fruiting", note_fj: "Vua na Dilo Kei na Dakua/Tahua Salusalu" },

  { month_name_en: "July", indicator_type_code: "maritime", note_en: "Octopus abundant", note_fj: "Basika na Kuita" },
  { month_name_en: "July", indicator_type_code: "freshwater", note_en: "Goatfish, herring, scad abundant", note_fj: "Levu na Ose Kei na Daniva" },
  { month_name_en: "July", indicator_type_code: "crop", note_en: "Soil preparation and taro planting", note_fj: "Cukicuki Ka Tei na Uvi" },
  { month_name_en: "July", indicator_type_code: "native_plants", note_en: "Mango, Oranges, Kavika flowering", note_fj: "Se na Maqo, Kavika, Moli" },

  { month_name_en: "August", indicator_type_code: "maritime", note_en: "Octopus high season", note_fj: "Levu na Kuita" },
  { month_name_en: "August", indicator_type_code: "freshwater", note_en: "Little fish Vaya and Matu abundant", note_fj: "Levu na Vaya, Matu" },
  { month_name_en: "August", indicator_type_code: "crop", note_en: "Cassava, taro, ginger, yams, plantain, bananas ideal", note_fj: "IDEAL CROPS that grow well" },
  { month_name_en: "August", indicator_type_code: "native_plants", note_en: "Drala flowering", note_fj: "Se na Drala" },

  { month_name_en: "September", indicator_type_code: "maritime", note_en: "Kawakawa still breeding", note_fj: "Vakaluveni Tiko na Kawakawa Kei na Donu" },
  { month_name_en: "September", indicator_type_code: "freshwater", note_en: "Golden Plover migration", note_fj: "Kumukumuni na Dilio" },
  { month_name_en: "September", indicator_type_code: "crop", note_en: "Taro and Kawai yam planting", note_fj: "Dau Caka na Veitiqa Ni Sa Tei Oti" },
  { month_name_en: "September", indicator_type_code: "native_plants", note_en: "Mango and Drala flowering", note_fj: "Se na Maqo, Drala" },

  { month_name_en: "October", indicator_type_code: "maritime", note_en: "First appearance of Balolo", note_fj: "Ta na Balolo Ena So na Vanua" },
  { month_name_en: "October", indicator_type_code: "freshwater", note_en: "Some fish poisonous", note_fj: "Dau Gaga Eso na Ika" },
  { month_name_en: "October", indicator_type_code: "crop", note_en: "Kawai yam cultivation", note_fj: "Tei na Kawai" },
  { month_name_en: "October", indicator_type_code: "native_plants", note_en: "Mokosoi and Misimisi flowering", note_fj: "Se na Mokosoi, Misimisi" },

  { month_name_en: "November", indicator_type_code: "maritime", note_en: "Second larger appearance of Balolo", note_fj: "Ta na Balolo Ena So na Vanua" },
  { month_name_en: "November", indicator_type_code: "freshwater", note_en: "Some fish poisonous", note_fj: "Dau Gaga Eso na Ika" },
  { month_name_en: "November", indicator_type_code: "crop", note_en: "Leafy vegetables planting (rourou, bele, watercress)", note_fj: "Opportune time to plant leafy vegetables" },
  { month_name_en: "November", indicator_type_code: "native_plants", note_en: "Mango, Pineapple, Kavika, Dawa fruiting", note_fj: "Vua na Maqo, Painapiu, Kavika, Dawa" },

  { month_name_en: "December", indicator_type_code: "maritime", note_en: "Rabbitfish low supply", note_fj: "Levu na Nuqa Lailai" },
  { month_name_en: "December", indicator_type_code: "freshwater", note_en: "Young sharks born", note_fj: "Veibaleti na Vonu" },
  { month_name_en: "December", indicator_type_code: "crop", note_en: "Breadfruit maturity", note_fj: "Se na Sinukakala" },
  { month_name_en: "December", indicator_type_code: "native_plants", note_en: "Flamboyant trees flowering", note_fj: "Se na Nuqanuqa, Buabua, Sekoula" }
];

export const MARINE_STATUS: MarineStatus[] = [
  { month_name_en: "January", species_name_en: "Rabbitfish", status: "abundance", note: "High volume" },
  { month_name_en: "January", species_name_en: "Parrotfish", status: "abundance", note: "Great abundance" },
  { month_name_en: "January", species_name_en: "Giant trevally", status: "spawning", note: "" },
  { month_name_en: "January", species_name_en: "Spanish mackerel", status: "spawning", note: "" },
  { month_name_en: "February", species_name_en: "Emperor", status: "abundance", note: "" },
  { month_name_en: "February", species_name_en: "Goatfish", status: "abundance", note: "" },
  { month_name_en: "March", species_name_en: "Yam", status: "harvest", note: "" }, // Note: Yam is a crop but appeared in species CSV in prompt, keeping for fidelity
  { month_name_en: "April", species_name_en: "Spanish mackerel", status: "abundance", note: "" },
  { month_name_en: "June", species_name_en: "Octopus", status: "season begins", note: "" },
  { month_name_en: "July", species_name_en: "Octopus", status: "abundant", note: "" },
  { month_name_en: "August", species_name_en: "Kawakawa", status: "spawning", note: "" },
  { month_name_en: "September", species_name_en: "Yam", status: "sprouting", note: "" },
  { month_name_en: "October", species_name_en: "Balolo", status: "appearance", note: "First appearance" },
  { month_name_en: "November", species_name_en: "Balolo", status: "abundance", note: "Second larger appearance" },
  { month_name_en: "December", species_name_en: "Rabbitfish", status: "low_supply", note: "" }
];

export const TREE_PHENOLOGY: TreePhenology[] = [
  { month_name_en: "January", tree_name_en: "Damanu/Tamanu", status: "flowering", note: "" },
  { month_name_en: "January", tree_name_en: "Lagakali", status: "flowering", note: "Used for perfumed oil" },
  { month_name_en: "January", tree_name_en: "Buaniviti", status: "flowering", note: "Used for garlands" },
  { month_name_en: "March", tree_name_en: "Yaka", status: "flowering", note: "Handicrafts and herbal medicine" },
  { month_name_en: "May", tree_name_en: "Doi", status: "flowering", note: "" },
  { month_name_en: "May", tree_name_en: "Vesi", status: "fruiting", note: "" },
  { month_name_en: "June", tree_name_en: "Dilo", status: "fruiting", note: "" },
  { month_name_en: "July", tree_name_en: "Pandanus", status: "flowering", note: "" },
  { month_name_en: "August", tree_name_en: "Drala", status: "flowering", note: "" },
  { month_name_en: "October", tree_name_en: "Mokosoi", status: "flowering", note: "Perfumed oils" },
  { month_name_en: "November", tree_name_en: "Misimisi", status: "fruiting", note: "" },
  { month_name_en: "December", tree_name_en: "Flamboyant", status: "flowering", note: "" },
  { month_name_en: "December", tree_name_en: "Cawa", status: "fruiting", note: "" },
  { month_name_en: "December", tree_name_en: "Vutu", status: "fruiting", note: "" },
  { month_name_en: "December", tree_name_en: "Tiri", status: "fruiting", note: "" },
  { month_name_en: "December", tree_name_en: "Duruka", status: "fruiting", note: "" },
  { month_name_en: "December", tree_name_en: "Vico", status: "fruiting", note: "" },
];

export const CROP_DB: CropInfo[] = [
  { name_en: "Taro", name_fj: "Dalo", latin_name: "", crop_type: "starchy" },
  { name_en: "Yam", name_fj: "Uvi", latin_name: "", crop_type: "starchy" },
  { name_en: "Plantain", name_fj: "Vudi", latin_name: "", crop_type: "starchy" },
  { name_en: "Banana", name_fj: "Jaina", latin_name: "", crop_type: "fruit" },
  { name_en: "Corn", name_fj: "Sila", latin_name: "", crop_type: "grain" },
  { name_en: "Sweet potato", name_fj: "Kumala", latin_name: "", crop_type: "starchy" },
  { name_en: "Cabbage", name_fj: "Kaveti", latin_name: "", crop_type: "leafy" },
  { name_en: "Lettuce", name_fj: "Letisi", latin_name: "", crop_type: "leafy" },
  { name_en: "Cucumber", name_fj: "Kiukaba", latin_name: "", crop_type: "fruit" },
  { name_en: "Watermelon", name_fj: "Meleni", latin_name: "", crop_type: "fruit" },
  { name_en: "Eggplant", name_fj: "Baigani", latin_name: "", crop_type: "fruit" },
  { name_en: "Chilli", name_fj: "Rokete", latin_name: "", crop_type: "fruit" },
  { name_en: "Breadfruit", name_fj: "Uto", latin_name: "", crop_type: "fruit" },
  { name_en: "Arrowroot", name_fj: "Yabia", latin_name: "", crop_type: "root" },
  { name_en: "Duruka", name_fj: "Duruka", latin_name: "Saccharum edule", crop_type: "leafy" },
  { name_en: "Vico", name_fj: "Vico", latin_name: "Erianthus maximus", crop_type: "leafy" },
];

export const MARINE_SPECIES_DB: MarineSpeciesInfo[] = [
  { name_en: "Rabbitfish", name_fj: "Nuqa", taxonomic_name: "Siganus argenteus", species_class: "fish" },
  { name_en: "Parrotfish", name_fj: "Ulavi", taxonomic_name: "Scarus spp./Chlorurus spp.", species_class: "fish" },
  { name_en: "Giant trevally", name_fj: "Saqa", taxonomic_name: "Caranx ignobilis", species_class: "fish" },
  { name_en: "Spanish mackerel", name_fj: "Walu", taxonomic_name: "Scomberomorus commerson", species_class: "fish" },
  { name_en: "Goatfish", name_fj: "Lova", taxonomic_name: "Parupeneus spp.", species_class: "fish" },
  { name_en: "Emperor", name_fj: "Sesere", taxonomic_name: "Lethrinus spp.", species_class: "fish" },
  { name_en: "Tilapia/Grass carp", name_fj: "Malea", taxonomic_name: "", species_class: "fish" },
  { name_en: "Octopus", name_fj: "Kuita", taxonomic_name: "", species_class: "cephalopod" },
  { name_en: "Kawakawa (Grouper)", name_fj: "Kawakawa", taxonomic_name: "Cephalopholis spp.", species_class: "fish" },
  { name_en: "Skipjack tuna", name_fj: "La Seu", taxonomic_name: "Katsuwonus pelamis", species_class: "fish" },
  { name_en: "Yellowfin tuna", name_fj: "Tuna", taxonomic_name: "Thunnus albacares", species_class: "fish" },
  { name_en: "Great barracuda", name_fj: "Ogo", taxonomic_name: "Sphyraena barracuda", species_class: "fish" },
  { name_en: "Silver scad", name_fj: "Tugadra", taxonomic_name: "Selar crumenophthalmus", species_class: "fish" },
  { name_en: "Balolo", name_fj: "Balolo", taxonomic_name: "Eunice viridis", species_class: "worm" }, // Added manually from context
];
