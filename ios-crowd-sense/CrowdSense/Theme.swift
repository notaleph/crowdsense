import SwiftUI
import UIKit

// MARK: - Color hex helper

extension Color {
    init(hex: String) {
        var value: UInt64 = 0
        Scanner(string: hex.trimmingCharacters(in: CharacterSet(charactersIn: "#"))).scanHexInt64(&value)
        let r, g, b: Double
        r = Double((value >> 16) & 0xFF) / 255.0
        g = Double((value >> 8) & 0xFF) / 255.0
        b = Double(value & 0xFF) / 255.0
        self.init(red: r, green: g, blue: b)
    }
}

// MARK: - Theme palette (matches the Expo light/dark themes)

struct AppTheme {
    let background: Color
    let surface: Color
    let card: Color
    let primary: Color
    let secondary: Color
    let text: Color
    let textSecondary: Color
    let border: Color
    let success: Color
    let warning: Color
    let error: Color
    let headerGradient: [Color]
    let uiBackground: UIColor

    static let light = AppTheme(
        background: Color(hex: "FFFFFF"),
        surface: Color(hex: "F8F9FA"),
        card: Color(hex: "FFFFFF"),
        primary: Color(hex: "1976D2"),
        secondary: Color(hex: "FF6B35"),
        text: Color(hex: "212121"),
        textSecondary: Color(hex: "757575"),
        border: Color(hex: "E0E0E0"),
        success: Color(hex: "4CAF50"),
        warning: Color(hex: "FF9800"),
        error: Color(hex: "F44336"),
        headerGradient: [Color(hex: "2196F3"), Color(hex: "1976D2")],
        uiBackground: .systemBackground
    )

    static let dark = AppTheme(
        background: Color(hex: "121212"),
        surface: Color(hex: "1E1E1E"),
        card: Color(hex: "1E1E1E"),
        primary: Color(hex: "64B5F6"),
        secondary: Color(hex: "FF8A65"),
        text: Color(hex: "FFFFFF"),
        textSecondary: Color(hex: "B0B0B0"),
        border: Color(hex: "333333"),
        success: Color(hex: "81C784"),
        warning: Color(hex: "FFB74D"),
        error: Color(hex: "E57373"),
        headerGradient: [Color(hex: "1976D2"), Color(hex: "1565C0")],
        uiBackground: UIColor(red: 0.07, green: 0.07, blue: 0.07, alpha: 1)
    )
}

// MARK: - Theme manager

@Observable
final class ThemeManager {
    enum Mode: String, CaseIterable {
        case light, dark, system

        var label: String {
            switch self {
            case .light: return "Light"
            case .dark: return "Dark"
            case .system: return "System"
            }
        }
    }

    private static let storageKey = "theme"

    var mode: Mode {
        didSet { UserDefaults.standard.set(mode.rawValue, forKey: Self.storageKey) }
    }

    init() {
        let saved = UserDefaults.standard.string(forKey: Self.storageKey)
        mode = saved.flatMap(Mode.init(rawValue:)) ?? .system
    }

    private var systemIsDark: Bool {
        UITraitCollection.current.userInterfaceStyle == .dark
    }

    var isDark: Bool {
        switch mode {
        case .light: return false
        case .dark: return true
        case .system: return systemIsDark
        }
    }

    var theme: AppTheme { isDark ? .dark : .light }

    func cycleMode() {
        let all = Mode.allCases
        let index = all.firstIndex(of: mode) ?? 0
        mode = all[(index + 1) % all.count]
    }
}

// MARK: - Language manager

@Observable
final class LanguageManager {
    private static let storageKey = "language"

    var language: AppLanguage {
        didSet { UserDefaults.standard.set(language.rawValue, forKey: Self.storageKey) }
    }

    init() {
        let saved = UserDefaults.standard.string(forKey: Self.storageKey)
        language = saved.flatMap(AppLanguage.init(rawValue:)) ?? .english
    }

    func t(_ key: String) -> String {
        Translations.forKey(key, language: language)
            ?? Translations.forKey(key, language: .english)
            ?? key
    }

    func stationName(_ station: Station) -> String {
        switch language {
        case .english: return station.name
        case .hindi: return station.nameHi
        case .marathi: return station.nameMr
        }
    }

    func cycleLanguage() {
        let all = AppLanguage.allCases
        let index = all.firstIndex(of: language) ?? 0
        language = all[(index + 1) % all.count]
    }
}
