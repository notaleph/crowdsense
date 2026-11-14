import SwiftUI

// MARK: - Fare calculator (mirrors app/calculator.tsx)

struct CalculatorScreen: View {
    @Environment(ThemeManager.self) private var themeManager
    @Environment(LanguageManager.self) private var languageManager

    // Mumbai fares: taxi ₹25 + ₹17/km, auto ₹21 + ₹14/km
    private let taxiBase = 25
    private let taxiPerKm = 17
    private let autoBase = 21
    private let autoPerKm = 14

    @State private var kmText = ""

    private var km: Double {
        Double(kmText) ?? 0
    }

    private var taxiFare: Int {
        km > 0 ? taxiBase + Int((km * Double(taxiPerKm)).rounded()) : 0
    }

    private var autoFare: Int {
        km > 0 ? autoBase + Int((km * Double(autoPerKm)).rounded()) : 0
    }

    var body: some View {
        let theme = themeManager.theme
        VStack(spacing: 16) {
            // Result cards
            HStack(spacing: 12) {
                fareCard(title: languageManager.t("taxi"), icon: "car.fill", base: taxiBase, perKm: taxiPerKm, total: taxiFare)
                fareCard(title: languageManager.t("auto"), icon: "figure.wave", base: autoBase, perKm: autoPerKm, total: autoFare)
            }
            .padding(.horizontal, 16)

            // Distance display
            ThemedCard {
                VStack(spacing: 4) {
                    Text(languageManager.t("distance"))
                        .font(.caption)
                        .foregroundStyle(theme.textSecondary)
                    Text(kmText.isEmpty ? "0 km" : "\(kmText) km")
                        .font(.system(size: 36, weight: .bold, design: .rounded))
                        .foregroundStyle(theme.text)
                }
                .frame(maxWidth: .infinity)
            }
            .padding(.horizontal, 16)

            // Keypad
            VStack(spacing: 10) {
                ForEach(0..<4, id: \.self) { row in
                    HStack(spacing: 10) {
                        ForEach(keypadKeys(row: row), id: \.self) { key in
                            KeyCap(label: key, theme: theme) {
                                handleKey(key)
                            }
                        }
                    }
                }
            }
            .padding(.horizontal, 16)

            if km > 0 {
                Button {
                    kmText = ""
                } label: {
                    Text(languageManager.t("clear"))
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(theme.error)
                }
            }

            Spacer(minLength: 0)
        }
        .padding(.top, 16)
        .background(theme.background)
        .navigationTitle(languageManager.t("fareCalculator"))
        .navigationBarTitleDisplayMode(.inline)
    }

    private func keypadKeys(row: Int) -> [String] {
        switch row {
        case 0: return ["1", "2", "3"]
        case 1: return ["4", "5", "6"]
        case 2: return ["7", "8", "9"]
        default: return [".", "0", "⌫"]
        }
    }

    private func handleKey(_ key: String) {
        if key == "⌫" {
            kmText.removeLast()
        } else if key == "." {
            if !kmText.contains(".") {
                kmText += kmText.isEmpty ? "0." : "."
            }
        } else if kmText.count < 5 {
            kmText += key
        }
    }

    private func fareCard(title: String, icon: String, base: Int, perKm: Int, total: Int) -> some View {
        let theme = themeManager.theme
        return ThemedCard {
            VStack(alignment: .leading, spacing: 6) {
                HStack {
                    Image(systemName: icon)
                        .foregroundStyle(theme.primary)
                    Text(title)
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(theme.text)
                }
                Text("₹\(total)")
                    .font(.system(size: 30, weight: .bold, design: .rounded))
                    .foregroundStyle(theme.primary)
                Text("\(languageManager.t("base")) ₹\(base) + ₹\(perKm)/km")
                    .font(.caption2)
                    .foregroundStyle(theme.textSecondary)
            }
        }
    }
}

struct KeyCap: View {
    let label: String
    let theme: AppTheme
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(label)
                .font(.title2.weight(.medium))
                .frame(maxWidth: .infinity)
                .frame(height: 52)
                .background(theme.card)
                .foregroundStyle(theme.text)
                .clipShape(RoundedRectangle(cornerRadius: 12))
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(theme.border, lineWidth: 1))
        }
        .buttonStyle(.plain)
    }
}
