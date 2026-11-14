import Foundation

// MARK: - Mock schedules (mirrors data/mock-schedules.ts)

enum SchedulesData {
    static func generateCarts() -> [Cart] {
        (1...12).map { i in
            var type: CartType = .general
            if i % 4 == 0 {
                type = .firstClass
            } else if i % 5 == 0 {
                type = .ladies
            }
            return Cart(number: i, occupancy: Int.random(in: 20...79), type: type)
        }
    }

    static func schedules(line: TrainLine, from: String, to: String) -> [TrainSchedule] {
        var result: [TrainSchedule] = []
        var clock = Calendar.current.date(bySettingHour: 5, minute: 0, second: 0, of: Date()) ?? Date()
        let types: [TrainType] = [.slow, .fast, .express]
        let platforms = ["1", "2", "3", "4", "5", "6"]

        for i in 0..<50 {
            clock = clock.addingTimeInterval(12 * 60)
            let travel = TimeInterval(Int.random(in: 15...45) * 60)
            let arrival = clock.addingTimeInterval(travel)

            let type = types.randomElement() ?? .slow
            let status: TrainStatus = Double.random(in: 0..<1) > 0.8 ? [.onTime, .delayed, .cancelled].randomElement()! : .onTime
            let delay = status == .delayed ? Int.random(in: 5...19) : nil

            let formatter = DateFormatter()
            formatter.dateFormat = "HH:mm"

            result.append(TrainSchedule(
                id: "\(line)-\(i)",
                trainNumber: "\(line.rawValue.uppercased())-\(String(format: "%03d", i + 1))",
                departure: formatter.string(from: clock),
                arrival: formatter.string(from: arrival),
                platform: platforms.randomElement() ?? "1",
                destination: to,
                type: type,
                status: status,
                delay: delay,
                carts: generateCarts()
            ))
        }
        return result
    }
}

// MARK: - Mock bus routes (mirrors the buses screen)

enum BusesData {
    static let routes: [BusRoute] = [
        BusRoute(id: "1", number: "1", name: "Colaba - Bandra", from: "Colaba", to: "Bandra", type: .ordinary, fare: 15, frequency: "10-15 min"),
        BusRoute(id: "2", number: "2", name: "CSMT - Mulund", from: "CSMT", to: "Mulund", type: .limited, fare: 25, frequency: "15-20 min"),
        BusRoute(id: "3", number: "25", name: "Colaba - Bandra", from: "Colaba", to: "Bandra", type: .ac, fare: 35, frequency: "20-25 min"),
        BusRoute(id: "4", number: "37", name: "Mantralaya - Kurla", from: "Mantralaya", to: "Kurla", type: .ordinary, fare: 18, frequency: "12-18 min"),
        BusRoute(id: "5", number: "56", name: "Dadar - Andheri", from: "Dadar", to: "Andheri", type: .limited, fare: 22, frequency: "15-20 min"),
        BusRoute(id: "6", number: "85", name: "Fort - Borivali", from: "Fort", to: "Borivali", type: .ac, fare: 45, frequency: "25-30 min"),
        BusRoute(id: "7", number: "103", name: "Bandra - Ghatkopar", from: "Bandra", to: "Ghatkopar", type: .ordinary, fare: 20, frequency: "10-15 min"),
        BusRoute(id: "8", number: "125", name: "Churchgate - Malad", from: "Churchgate", to: "Malad", type: .limited, fare: 28, frequency: "18-22 min"),
    ]
}

// MARK: - Emergency contacts (mirrors data/emergency-contacts.ts)

enum EmergencyData {
    static let contacts: [EmergencyContact] = [
        EmergencyContact(id: "police-1", name: "Mumbai Police Control Room", nameHi: "मुंबई पुलिस कंट्रोल रूम", nameMr: "मुंबई पोलीस कंट्रोल रूम", number: "100", category: .police),
        EmergencyContact(id: "police-2", name: "Railway Protection Force", nameHi: "रेलवे सुरक्षा बल", nameMr: "रेल्वे संरक्षण दल", number: "1512", category: .railway),
        EmergencyContact(id: "fire-1", name: "Fire Brigade", nameHi: "अग्निशमन दल", nameMr: "अग्निशमन दल", number: "101", category: .fire),
        EmergencyContact(id: "medical-1", name: "Ambulance Service", nameHi: "एम्बुलेंस सेवा", nameMr: "रुग्णवाहिका सेवा", number: "108", category: .medical),
        EmergencyContact(id: "railway-1", name: "Railway Enquiry", nameHi: "रेलवे पूछताछ", nameMr: "रेल्वे चौकशी", number: "139", category: .railway),
        EmergencyContact(id: "transport-1", name: "BEST Bus Helpline", nameHi: "बेस्ट बस हेल्पलाइन", nameMr: "बेस्ट बस हेल्पलाइन", number: "1800-22-8800", category: .transport),
        EmergencyContact(id: "medical-2", name: "KEM Hospital", nameHi: "केईएम अस्पताल", nameMr: "केईएम रुग्णालय", number: "022-2413-6051", category: .medical),
        EmergencyContact(id: "medical-3", name: "Sion Hospital", nameHi: "सायन अस्पताल", nameMr: "सायन रुग्णालय", number: "022-2407-7777", category: .medical),
        EmergencyContact(id: "police-3", name: "Women Helpline", nameHi: "महिला हेल्पलाइन", nameMr: "महिला हेल्पलाइन", number: "1091", category: .police),
        EmergencyContact(id: "transport-2", name: "Mumbai Metro Helpline", nameHi: "मुंबई मेट्रो हेल्पलाइन", nameMr: "मुंबई मेट्रो हेल्पलाइन", number: "1800-103-4636", category: .transport),
    ]
}
