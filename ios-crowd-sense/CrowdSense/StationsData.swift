import Foundation

// MARK: - Station data (mirrors data/stations.ts)

enum StationsData {
    static let all: [Station] = [
        // Western Line
        Station(id: "cst", name: "Chhatrapati Shivaji Terminus", nameHi: "छत्रपति शिवाजी टर्मिनस", nameMr: "छत्रपती शिवाजी टर्मिनस", code: "CST", line: .western, zone: 1),
        Station(id: "masjid", name: "Masjid Bunder", nameHi: "मस्जिद बंदर", nameMr: "मशीद बंदर", code: "MSD", line: .western, zone: 1),
        Station(id: "sandhurst", name: "Sandhurst Road", nameHi: "सैंडहर्स्ट रोड", nameMr: "सँडहर्स्ट रोड", code: "SRA", line: .western, zone: 1),
        Station(id: "dockyard", name: "Dockyard Road", nameHi: "डॉकयार्ड रोड", nameMr: "डॉकयार्ड रोड", code: "DYR", line: .western, zone: 1),
        Station(id: "reay", name: "Reay Road", nameHi: "रे रोड", nameMr: "रे रोड", code: "RRD", line: .western, zone: 1),
        Station(id: "cotton", name: "Cotton Green", nameHi: "कॉटन ग्रीन", nameMr: "कॉटन ग्रीन", code: "CTG", line: .western, zone: 1),
        Station(id: "sewri", name: "Sewri", nameHi: "सेवरी", nameMr: "सेवरी", code: "SWR", line: .western, zone: 1),
        Station(id: "wadala", name: "Wadala Road", nameHi: "वडाला रोड", nameMr: "वडाळा रोड", code: "WDL", line: .western, zone: 1),
        Station(id: "gtn", name: "GTB Nagar", nameHi: "जीटीबी नगर", nameMr: "जीटीबी नगर", code: "GTN", line: .western, zone: 1),
        Station(id: "chunabhatti", name: "Chunabhatti", nameHi: "चुनाभट्टी", nameMr: "चुनाभट्टी", code: "CHB", line: .western, zone: 1),
        Station(id: "kurla", name: "Kurla", nameHi: "कुर्ला", nameMr: "कुर्ला", code: "KLA", line: .western, zone: 2),
        Station(id: "tilak", name: "Tilak Nagar", nameHi: "तिलक नगर", nameMr: "तिलक नगर", code: "TLK", line: .western, zone: 2),
        Station(id: "chembur", name: "Chembur", nameHi: "चेंबूर", nameMr: "चेंबूर", code: "CHR", line: .western, zone: 2),
        Station(id: "govandi", name: "Govandi", nameHi: "गोवंडी", nameMr: "गोवंडी", code: "GVD", line: .western, zone: 2),
        Station(id: "mankhurd", name: "Mankhurd", nameHi: "मानखुर्द", nameMr: "मानखुर्द", code: "MKD", line: .western, zone: 2),
        Station(id: "vashi", name: "Vashi", nameHi: "वाशी", nameMr: "वाशी", code: "VSH", line: .western, zone: 3),
        Station(id: "sanpada", name: "Sanpada", nameHi: "सानपाडा", nameMr: "सानपाडा", code: "SPD", line: .western, zone: 3),
        Station(id: "juinagar", name: "Juinagar", nameHi: "जुईनगर", nameMr: "जुईनगर", code: "JUI", line: .western, zone: 3),
        Station(id: "nerul", name: "Nerul", nameHi: "नेरुल", nameMr: "नेरुळ", code: "NRL", line: .western, zone: 3),
        Station(id: "seawoods", name: "Seawoods-Darave", nameHi: "सीवुड्स-दारावे", nameMr: "सीवुड्स-दारावे", code: "SWD", line: .western, zone: 3),

        // Central Line
        Station(id: "mumbai_central", name: "Mumbai Central", nameHi: "मुंबई सेंट्रल", nameMr: "मुंबई सेंट्रल", code: "BCT", line: .central, zone: 1),
        Station(id: "mahalaxmi", name: "Mahalaxmi", nameHi: "महालक्ष्मी", nameMr: "महालक्ष्मी", code: "MX", line: .central, zone: 1),
        Station(id: "lower_parel", name: "Lower Parel", nameHi: "लोअर परेल", nameMr: "लोअर परेळ", code: "PL", line: .central, zone: 1),
        Station(id: "elphinstone", name: "Elphinstone Road", nameHi: "एल्फिंस्टन रोड", nameMr: "एल्फिंस्टन रोड", code: "EPR", line: .central, zone: 1),
        Station(id: "dadar", name: "Dadar", nameHi: "दादर", nameMr: "दादर", code: "DR", line: .central, zone: 1),
        Station(id: "matunga", name: "Matunga", nameHi: "माटुंगा", nameMr: "माटुंगा", code: "MTN", line: .central, zone: 1),
        Station(id: "sion", name: "Sion", nameHi: "सायन", nameMr: "सायन", code: "SIN", line: .central, zone: 1),
        Station(id: "kurla_central", name: "Kurla", nameHi: "कुर्ला", nameMr: "कुर्ला", code: "KYN", line: .central, zone: 2),
        Station(id: "vidyavihar", name: "Vidyavihar", nameHi: "विद्याविहार", nameMr: "विद्याविहार", code: "VVH", line: .central, zone: 2),
        Station(id: "ghatkopar", name: "Ghatkopar", nameHi: "घाटकोपर", nameMr: "घाटकोपर", code: "GC", line: .central, zone: 2),
        Station(id: "vikhroli", name: "Vikhroli", nameHi: "विखरोली", nameMr: "विखरोळी", code: "VK", line: .central, zone: 2),
        Station(id: "kanjurmarg", name: "Kanjurmarg", nameHi: "कांजुरमार्ग", nameMr: "कांजुरमार्ग", code: "KJMG", line: .central, zone: 2),
        Station(id: "bhandup", name: "Bhandup", nameHi: "भांडुप", nameMr: "भांडुप", code: "BND", line: .central, zone: 2),
        Station(id: "nahur", name: "Nahur", nameHi: "नाहूर", nameMr: "नाहूर", code: "NHU", line: .central, zone: 2),
        Station(id: "mulund", name: "Mulund", nameHi: "मुलुंड", nameMr: "मुलुंड", code: "MLD", line: .central, zone: 2),
        Station(id: "thane", name: "Thane", nameHi: "ठाणे", nameMr: "ठाणे", code: "TNA", line: .central, zone: 3),
        Station(id: "kalwa", name: "Kalwa", nameHi: "कळवा", nameMr: "कळवा", code: "KLWA", line: .central, zone: 3),
        Station(id: "mumbra", name: "Mumbra", nameHi: "मुंब्रा", nameMr: "मुंब्रा", code: "MMBR", line: .central, zone: 3),
        Station(id: "diva", name: "Diva", nameHi: "दिवा", nameMr: "दिवा", code: "DIVA", line: .central, zone: 3),
        Station(id: "kopar", name: "Kopar", nameHi: "कोपर", nameMr: "कोपर", code: "KPR", line: .central, zone: 3),

        // Harbour Line
        Station(id: "churchgate", name: "Churchgate", nameHi: "चर्चगेट", nameMr: "चर्चगेट", code: "CCG", line: .harbour, zone: 1),
        Station(id: "marine_lines", name: "Marine Lines", nameHi: "मरीन लाइन्स", nameMr: "मरीन लाइन्स", code: "MEL", line: .harbour, zone: 1),
        Station(id: "charni_road", name: "Charni Road", nameHi: "चार्णी रोड", nameMr: "चार्णी रोड", code: "CYR", line: .harbour, zone: 1),
        Station(id: "grant_road", name: "Grant Road", nameHi: "ग्रांट रोड", nameMr: "ग्रांट रोड", code: "GTR", line: .harbour, zone: 1),
        Station(id: "mumbai_central_harbour", name: "Mumbai Central", nameHi: "मुंबई सेंट्रल", nameMr: "मुंबई सेंट्रल", code: "BCT", line: .harbour, zone: 1),
        Station(id: "mahalaxmi_harbour", name: "Mahalaxmi", nameHi: "महालक्ष्मी", nameMr: "महालक्ष्मी", code: "MX", line: .harbour, zone: 1),
        Station(id: "lower_parel_harbour", name: "Lower Parel", nameHi: "लोअर परेल", nameMr: "लोअर परेळ", code: "PL", line: .harbour, zone: 1),
        Station(id: "prabhadevi", name: "Prabhadevi", nameHi: "प्रभादेवी", nameMr: "प्रभादेवी", code: "PRD", line: .harbour, zone: 1),
        Station(id: "dadar_harbour", name: "Dadar", nameHi: "दादर", nameMr: "दादर", code: "DR", line: .harbour, zone: 1),
        Station(id: "matunga_road", name: "Matunga Road", nameHi: "माटुंगा रोड", nameMr: "माटुंगा रोड", code: "MTRR", line: .harbour, zone: 1),
        Station(id: "mahim", name: "Mahim", nameHi: "माहिम", nameMr: "माहिम", code: "MM", line: .harbour, zone: 1),
        Station(id: "bandra", name: "Bandra", nameHi: "बांद्रा", nameMr: "बांद्रा", code: "BA", line: .harbour, zone: 2),
        Station(id: "khar_road", name: "Khar Road", nameHi: "खार रोड", nameMr: "खार रोड", code: "KR", line: .harbour, zone: 2),
        Station(id: "santacruz", name: "Santacruz", nameHi: "सांताक्रूज़", nameMr: "सांताक्रूझ", code: "SC", line: .harbour, zone: 2),
        Station(id: "vile_parle", name: "Vile Parle", nameHi: "विले पार्ले", nameMr: "विळे पारळे", code: "VLP", line: .harbour, zone: 2),
        Station(id: "andheri", name: "Andheri", nameHi: "अंधेरी", nameMr: "अंधेरी", code: "ADH", line: .harbour, zone: 2),
        Station(id: "jogeshwari", name: "Jogeshwari", nameHi: "जोगेश्वरी", nameMr: "जोगेश्वरी", code: "JOS", line: .harbour, zone: 2),
        Station(id: "ram_mandir", name: "Ram Mandir", nameHi: "राम मंदिर", nameMr: "राम मंदिर", code: "RMD", line: .harbour, zone: 2),
        Station(id: "goregaon", name: "Goregaon", nameHi: "गोरेगांव", nameMr: "गोरेगाव", code: "GRG", line: .harbour, zone: 2),
        Station(id: "malad", name: "Malad", nameHi: "मलाड", nameMr: "मलाड", code: "MDD", line: .harbour, zone: 2),
        Station(id: "kandivali", name: "Kandivali", nameHi: "कांदिवली", nameMr: "कांदिवली", code: "KNDV", line: .harbour, zone: 2),
    ]

    static func stations(for line: TrainLine) -> [Station] {
        all.filter { $0.line == line }
    }

    static func station(byId id: String) -> Station? {
        all.first { $0.id == id }
    }

    static func search(_ query: String, language: AppLanguage) -> [Station] {
        guard !query.isEmpty else { return [] }
        let term = query.lowercased()
        return all.filter { station in
            let name: String
            switch language {
            case .english: name = station.name
            case .hindi: name = station.nameHi
            case .marathi: name = station.nameMr
            }
            return name.lowercased().contains(term) || station.code.lowercased().contains(term)
        }
    }

    // First and last stations of the line
    static func lineEndpoints(_ line: TrainLine) -> [Station] {
        let lineStations = stations(for: line)
        guard let first = lineStations.first, let last = lineStations.last else { return [] }
        return [first, last]
    }

    // All stations on the same line, except the origin
    static func possibleDestinations(from: Station) -> [Station] {
        stations(for: from.line).filter { $0.id != from.id }
    }

    // Endpoint destinations reachable from a station (both directions)
    static func endpointDestinations(from: Station) -> [Station] {
        lineEndpoints(from.line).filter { $0.id != from.id }
    }
}
