import Foundation

// MARK: - Core transport models (mirrors the Expo app)

enum TrainLine: String, Codable, CaseIterable, Hashable {
    case western, central, harbour

    var tintHex: String {
        switch self {
        case .western: return "#4CAF50"
        case .central: return "#2196F3"
        case .harbour: return "#FF9800"
        }
    }
}

enum AppLanguage: String, CaseIterable, Codable {
    case english = "en"
    case hindi = "hi"
    case marathi = "mr"

    var displayName: String {
        switch self {
        case .english: return "English"
        case .hindi: return "हिंदी"
        case .marathi: return "मराठी"
        }
    }
}

struct Station: Identifiable, Codable, Hashable {
    var id: String
    var name: String
    var nameHi: String
    var nameMr: String
    var code: String
    var line: TrainLine
    var zone: Int
}

enum CartType: String, Codable, Hashable {
    case general, firstClass, ladies
}

struct Cart: Identifiable, Codable, Hashable {
    var number: Int
    var occupancy: Int
    var type: CartType

    var id: Int { number }
}

enum TrainType: String, Codable, Hashable {
    case slow, fast, express
}

enum TrainStatus: String, Codable, Hashable {
    case onTime, delayed, cancelled
}

struct TrainSchedule: Identifiable, Codable, Hashable {
    var id: String
    var trainNumber: String
    var departure: String
    var arrival: String
    var platform: String
    var destination: String
    var type: TrainType
    var status: TrainStatus
    var delay: Int?
    var carts: [Cart]
}

struct Route: Identifiable, Codable, Hashable {
    var id: String
    var from: Station
    var to: Station
    var line: TrainLine
    var duration: Int
    var fare: Int
    var distance: Int
}

struct FavoriteRoute: Identifiable, Codable, Hashable {
    var id: String
    var route: Route
    var nickname: String?
    var createdAt: Date
    var alertsEnabled: Bool
}

// MARK: - Buses

enum BusType: String, CaseIterable, Hashable {
    case ordinary, limited, ac

    var label: String {
        switch self {
        case .ordinary: return "Ordinary"
        case .limited: return "Limited"
        case .ac: return "AC"
        }
    }
}

struct BusRoute: Identifiable, Hashable {
    var id: String
    var number: String
    var name: String
    var from: String
    var to: String
    var type: BusType
    var fare: Int
    var frequency: String
}

// MARK: - Emergency

enum EmergencyCategory: String, CaseIterable, Hashable {
    case police, fire, medical, railway, transport
}

struct EmergencyContact: Identifiable, Hashable {
    var id: String
    var name: String
    var nameHi: String
    var nameMr: String
    var number: String
    var category: EmergencyCategory
}
