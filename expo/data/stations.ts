import { Station, TrainLine } from '@/types/transport';

export const stations: Station[] = [
  // Western Line
  { id: 'cst', name: 'Chhatrapati Shivaji Terminus', nameHi: 'छत्रपति शिवाजी टर्मिनस', nameMr: 'छत्रपती शिवाजी टर्मिनस', code: 'CST', line: 'western', zone: 1 },
  { id: 'masjid', name: 'Masjid Bunder', nameHi: 'मस्जिद बंदर', nameMr: 'मशीद बंदर', code: 'MSD', line: 'western', zone: 1 },
  { id: 'sandhurst', name: 'Sandhurst Road', nameHi: 'सैंडहर्स्ट रोड', nameMr: 'सँडहर्स्ट रोड', code: 'SRA', line: 'western', zone: 1 },
  { id: 'dockyard', name: 'Dockyard Road', nameHi: 'डॉकयार्ड रोड', nameMr: 'डॉकयार्ड रोड', code: 'DYR', line: 'western', zone: 1 },
  { id: 'reay', name: 'Reay Road', nameHi: 'रे रोड', nameMr: 'रे रोड', code: 'RRD', line: 'western', zone: 1 },
  { id: 'cotton', name: 'Cotton Green', nameHi: 'कॉटन ग्रीन', nameMr: 'कॉटन ग्रीन', code: 'CTG', line: 'western', zone: 1 },
  { id: 'sewri', name: 'Sewri', nameHi: 'सेवरी', nameMr: 'सेवरी', code: 'SWR', line: 'western', zone: 1 },
  { id: 'wadala', name: 'Wadala Road', nameHi: 'वडाला रोड', nameMr: 'वडाळा रोड', code: 'WDL', line: 'western', zone: 1 },
  { id: 'gtn', name: 'GTB Nagar', nameHi: 'जीटीबी नगर', nameMr: 'जीटीबी नगर', code: 'GTN', line: 'western', zone: 1 },
  { id: 'chunabhatti', name: 'Chunabhatti', nameHi: 'चुनाभट्टी', nameMr: 'चुनाभट्टी', code: 'CHB', line: 'western', zone: 1 },
  { id: 'kurla', name: 'Kurla', nameHi: 'कुर्ला', nameMr: 'कुर्ला', code: 'KLA', line: 'western', zone: 2 },
  { id: 'tilak', name: 'Tilak Nagar', nameHi: 'तिलक नगर', nameMr: 'तिलक नगर', code: 'TLK', line: 'western', zone: 2 },
  { id: 'chembur', name: 'Chembur', nameHi: 'चेंबूर', nameMr: 'चेंबूर', code: 'CHR', line: 'western', zone: 2 },
  { id: 'govandi', name: 'Govandi', nameHi: 'गोवंडी', nameMr: 'गोवंडी', code: 'GVD', line: 'western', zone: 2 },
  { id: 'mankhurd', name: 'Mankhurd', nameHi: 'मानखुर्द', nameMr: 'मानखुर्द', code: 'MKD', line: 'western', zone: 2 },
  { id: 'vashi', name: 'Vashi', nameHi: 'वाशी', nameMr: 'वाशी', code: 'VSH', line: 'western', zone: 3 },
  { id: 'sanpada', name: 'Sanpada', nameHi: 'सानपाडा', nameMr: 'सानपाडा', code: 'SPD', line: 'western', zone: 3 },
  { id: 'juinagar', name: 'Juinagar', nameHi: 'जुईनगर', nameMr: 'जुईनगर', code: 'JUI', line: 'western', zone: 3 },
  { id: 'nerul', name: 'Nerul', nameHi: 'नेरुल', nameMr: 'नेरुळ', code: 'NRL', line: 'western', zone: 3 },
  { id: 'seawoods', name: 'Seawoods-Darave', nameHi: 'सीवुड्स-दारावे', nameMr: 'सीवुड्स-दारावे', code: 'SWD', line: 'western', zone: 3 },

  // Central Line
  { id: 'mumbai_central', name: 'Mumbai Central', nameHi: 'मुंबई सेंट्रल', nameMr: 'मुंबई सेंट्रल', code: 'BCT', line: 'central', zone: 1 },
  { id: 'mahalaxmi', name: 'Mahalaxmi', nameHi: 'महालक्ष्मी', nameMr: 'महालक्ष्मी', code: 'MX', line: 'central', zone: 1 },
  { id: 'lower_parel', name: 'Lower Parel', nameHi: 'लोअर परेल', nameMr: 'लोअर परेळ', code: 'PL', line: 'central', zone: 1 },
  { id: 'elphinstone', name: 'Elphinstone Road', nameHi: 'एल्फिंस्टन रोड', nameMr: 'एल्फिंस्टन रोड', code: 'EPR', line: 'central', zone: 1 },
  { id: 'dadar', name: 'Dadar', nameHi: 'दादर', nameMr: 'दादर', code: 'DR', line: 'central', zone: 1 },
  { id: 'matunga', name: 'Matunga', nameHi: 'माटुंगा', nameMr: 'माटुंगा', code: 'MTN', line: 'central', zone: 1 },
  { id: 'sion', name: 'Sion', nameHi: 'सायन', nameMr: 'सायन', code: 'SIN', line: 'central', zone: 1 },
  { id: 'kurla_central', name: 'Kurla', nameHi: 'कुर्ला', nameMr: 'कुर्ला', code: 'KYN', line: 'central', zone: 2 },
  { id: 'vidyavihar', name: 'Vidyavihar', nameHi: 'विद्याविहार', nameMr: 'विद्याविहार', code: 'VVH', line: 'central', zone: 2 },
  { id: 'ghatkopar', name: 'Ghatkopar', nameHi: 'घाटकोपर', nameMr: 'घाटकोपर', code: 'GC', line: 'central', zone: 2 },
  { id: 'vikhroli', name: 'Vikhroli', nameHi: 'विखरोली', nameMr: 'विखरोळी', code: 'VK', line: 'central', zone: 2 },
  { id: 'kanjurmarg', name: 'Kanjurmarg', nameHi: 'कांजुरमार्ग', nameMr: 'कांजुरमार्ग', code: 'KJMG', line: 'central', zone: 2 },
  { id: 'bhandup', name: 'Bhandup', nameHi: 'भांडुप', nameMr: 'भांडुप', code: 'BND', line: 'central', zone: 2 },
  { id: 'nahur', name: 'Nahur', nameHi: 'नाहूर', nameMr: 'नाहूर', code: 'NHU', line: 'central', zone: 2 },
  { id: 'mulund', name: 'Mulund', nameHi: 'मुलुंड', nameMr: 'मुलुंड', code: 'MLD', line: 'central', zone: 2 },
  { id: 'thane', name: 'Thane', nameHi: 'ठाणे', nameMr: 'ठाणे', code: 'TNA', line: 'central', zone: 3 },
  { id: 'kalwa', name: 'Kalwa', nameHi: 'कळवा', nameMr: 'कळवा', code: 'KLWA', line: 'central', zone: 3 },
  { id: 'mumbra', name: 'Mumbra', nameHi: 'मुंब्रा', nameMr: 'मुंब्रा', code: 'MMBR', line: 'central', zone: 3 },
  { id: 'diva', name: 'Diva', nameHi: 'दिवा', nameMr: 'दिवा', code: 'DIVA', line: 'central', zone: 3 },
  { id: 'kopar', name: 'Kopar', nameHi: 'कोपर', nameMr: 'कोपर', code: 'KPR', line: 'central', zone: 3 },

  // Harbour Line
  { id: 'churchgate', name: 'Churchgate', nameHi: 'चर्चगेट', nameMr: 'चर्चगेट', code: 'CCG', line: 'harbour', zone: 1 },
  { id: 'marine_lines', name: 'Marine Lines', nameHi: 'मरीन लाइन्स', nameMr: 'मरीन लाइन्स', code: 'MEL', line: 'harbour', zone: 1 },
  { id: 'charni_road', name: 'Charni Road', nameHi: 'चार्णी रोड', nameMr: 'चार्णी रोड', code: 'CYR', line: 'harbour', zone: 1 },
  { id: 'grant_road', name: 'Grant Road', nameHi: 'ग्रांट रोड', nameMr: 'ग्रांट रोड', code: 'GTR', line: 'harbour', zone: 1 },
  { id: 'mumbai_central_harbour', name: 'Mumbai Central', nameHi: 'मुंबई सेंट्रल', nameMr: 'मुंबई सेंट्रल', code: 'BCT', line: 'harbour', zone: 1 },
  { id: 'mahalaxmi_harbour', name: 'Mahalaxmi', nameHi: 'महालक्ष्मी', nameMr: 'महालक्ष्मी', code: 'MX', line: 'harbour', zone: 1 },
  { id: 'lower_parel_harbour', name: 'Lower Parel', nameHi: 'लोअर परेल', nameMr: 'लोअर परेळ', code: 'PL', line: 'harbour', zone: 1 },
  { id: 'prabhadevi', name: 'Prabhadevi', nameHi: 'प्रभादेवी', nameMr: 'प्रभादेवी', code: 'PRD', line: 'harbour', zone: 1 },
  { id: 'dadar_harbour', name: 'Dadar', nameHi: 'दादर', nameMr: 'दादर', code: 'DR', line: 'harbour', zone: 1 },
  { id: 'matunga_road', name: 'Matunga Road', nameHi: 'माटुंगा रोड', nameMr: 'माटुंगा रोड', code: 'MTRR', line: 'harbour', zone: 1 },
  { id: 'mahim', name: 'Mahim', nameHi: 'माहिम', nameMr: 'माहिम', code: 'MM', line: 'harbour', zone: 1 },
  { id: 'bandra', name: 'Bandra', nameHi: 'बांद्रा', nameMr: 'बांद्रा', code: 'BA', line: 'harbour', zone: 2 },
  { id: 'khar_road', name: 'Khar Road', nameHi: 'खार रोड', nameMr: 'खार रोड', code: 'KR', line: 'harbour', zone: 2 },
  { id: 'santacruz', name: 'Santacruz', nameHi: 'सांताक्रूज़', nameMr: 'सांताक्रूझ', code: 'SC', line: 'harbour', zone: 2 },
  { id: 'vile_parle', name: 'Vile Parle', nameHi: 'विले पार्ले', nameMr: 'विळे पारळे', code: 'VLP', line: 'harbour', zone: 2 },
  { id: 'andheri', name: 'Andheri', nameHi: 'अंधेरी', nameMr: 'अंधेरी', code: 'ADH', line: 'harbour', zone: 2 },
  { id: 'jogeshwari', name: 'Jogeshwari', nameHi: 'जोगेश्वरी', nameMr: 'जोगेश्वरी', code: 'JOS', line: 'harbour', zone: 2 },
  { id: 'ram_mandir', name: 'Ram Mandir', nameHi: 'राम मंदिर', nameMr: 'राम मंदिर', code: 'RMD', line: 'harbour', zone: 2 },
  { id: 'goregaon', name: 'Goregaon', nameHi: 'गोरेगांव', nameMr: 'गोरेगाव', code: 'GRG', line: 'harbour', zone: 2 },
  { id: 'malad', name: 'Malad', nameHi: 'मलाड', nameMr: 'मलाड', code: 'MDD', line: 'harbour', zone: 2 },
  { id: 'kandivali', name: 'Kandivali', nameHi: 'कांदिवली', nameMr: 'कांदिवली', code: 'KNDV', line: 'harbour', zone: 2 },
];

export const getStationsByLine = (line: TrainLine): Station[] => {
  return stations.filter(station => station.line === line);
};

export const getStationById = (id: string): Station | undefined => {
  return stations.find(station => station.id === id);
};

export const searchStations = (query: string, language: 'en' | 'hi' | 'mr' = 'en'): Station[] => {
  const searchTerm = query.toLowerCase();
  return stations.filter(station => {
    const name = language === 'hi' ? station.nameHi : 
                 language === 'mr' ? station.nameMr : station.name;
    return name.toLowerCase().includes(searchTerm) || 
           station.code.toLowerCase().includes(searchTerm);
  });
};

// Get endpoint stations for each line
export const getLineEndpoints = (line: TrainLine): Station[] => {
  const lineStations = getStationsByLine(line);
  if (lineStations.length === 0) return [];
  
  // Return first and last stations as endpoints
  return [lineStations[0], lineStations[lineStations.length - 1]];
};

// Get possible destinations from a given station
export const getPossibleDestinations = (fromStation: Station): Station[] => {
  const lineStations = getStationsByLine(fromStation.line);
  const fromIndex = lineStations.findIndex(s => s.id === fromStation.id);
  
  if (fromIndex === -1) return [];
  
  // Get all stations except the current one
  return lineStations.filter(s => s.id !== fromStation.id);
};

// Get endpoint destinations from a station (both directions)
export const getEndpointDestinations = (fromStation: Station): Station[] => {
  const endpoints = getLineEndpoints(fromStation.line);
  return endpoints.filter(endpoint => endpoint.id !== fromStation.id);
};