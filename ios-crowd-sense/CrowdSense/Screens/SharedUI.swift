import SwiftUI

// MARK: - Shared helpers used across screens

func occupancyColor(_ value: Int) -> Color {
    switch value {
    case ..<40: return Color(hex: "3B82F6")
    case ..<60: return Color(hex: "10B981")
    case ..<80: return Color(hex: "F59E0B")
    default: return Color(hex: "EF4444")
    }
}

extension CartType {
    var label: String {
        switch self {
        case .general: return "General"
        case .firstClass: return "First Class"
        case .ladies: return "Ladies Only"
        }
    }

    var symbolName: String {
        switch self {
        case .general: return "person.3"
        case .firstClass: return "star"
        case .ladies: return "figure.dress.line.vertical.figure"
        }
    }
}

extension TrainType {
    var symbolName: String {
        switch self {
        case .slow: return "tram"
        case .fast: return "tram.fill"
        case .express: return "bolt.fill"
        }
    }
}

extension TrainStatus {
    var colorKey: AppTheme.ColorKey {
        switch self {
        case .onTime: return .success
        case .delayed: return .warning
        case .cancelled: return .error
        }
    }
}

extension AppTheme {
    enum ColorKey {
        case success, warning, error
    }

    func color(_ key: ColorKey) -> Color {
        switch key {
        case .success: return success
        case .warning: return warning
        case .error: return error
        }
    }
}

// MARK: - Card container

struct ThemedCard<Content: View>: View {
    @Environment(ThemeManager.self) private var themeManager
    @ViewBuilder var content: () -> Content

    var body: some View {
        let theme = themeManager.theme
        content()
            .padding(14)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(theme.card)
            .clipShape(RoundedRectangle(cornerRadius: 14))
            .overlay(
                RoundedRectangle(cornerRadius: 14)
                    .stroke(theme.border, lineWidth: 1)
            )
    }
}

// MARK: - Gradient header

struct GradientHeader<Content: View>: View {
    @Environment(ThemeManager.self) private var themeManager
    @ViewBuilder var content: () -> Content

    var body: some View {
        content()
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(.horizontal, 16)
            .padding(.top, 8)
            .padding(.bottom, 20)
            .background(
                LinearGradient(
                    colors: themeManager.theme.headerGradient,
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            )
            .foregroundStyle(.white)
    }
}

// MARK: - Line color chip

struct LineChip: View {
    let line: TrainLine
    let selected: Bool
    let title: String
    let action: () -> Void

    @Environment(ThemeManager.self) private var themeManager

    var body: some View {
        let theme = themeManager.theme
        let tint = Color(hex: line.tintHex)
        Button(action: action) {
            Text(title)
                .font(.subheadline.weight(.semibold))
                .lineLimit(1)
                .padding(.horizontal, 14)
                .padding(.vertical, 8)
                .frame(maxWidth: .infinity)
                .background(selected ? tint : tint.opacity(0.12))
                .foregroundStyle(selected ? .white : tint)
                .clipShape(Capsule())
                .overlay(Capsule().stroke(tint, lineWidth: selected ? 0 : 1))
        }
        .buttonStyle(.plain)
        .accessibilityAddTraits(selected ? [.isSelected] : [])
    }
}

// MARK: - Section title

struct SectionTitle: View {
    let text: String

    init(_ text: String) {
        self.text = text
    }

    @Environment(ThemeManager.self) private var themeManager

    var body: some View {
        Text(text)
            .font(.headline)
            .foregroundStyle(themeManager.theme.text)
    }
}
