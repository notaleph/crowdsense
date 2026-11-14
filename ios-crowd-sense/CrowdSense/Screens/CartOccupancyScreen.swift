import SwiftUI

// MARK: - Cart occupancy (mirrors app/trains/cart-occupancy.tsx)

struct CartOccupancyScreen: View {
    let schedule: TrainSchedule

    @Environment(ThemeManager.self) private var themeManager
    @Environment(LanguageManager.self) private var languageManager

    private let columns = [GridItem(.flexible(), spacing: 10), GridItem(.flexible(), spacing: 10), GridItem(.flexible(), spacing: 10)]

    var body: some View {
        let theme = themeManager.theme
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                // Train summary
                ThemedCard {
                    VStack(alignment: .leading, spacing: 6) {
                        Text("\(schedule.departure) → \(schedule.arrival)")
                            .font(.headline)
                            .foregroundStyle(theme.text)
                        Text("\(schedule.trainNumber) · \(languageManager.t(schedule.type.rawValue)) · \(languageManager.t("platform")) \(schedule.platform)")
                            .font(.caption)
                            .foregroundStyle(theme.textSecondary)
                    }
                }

                // Cart grid
                LazyVGrid(columns: columns, spacing: 10) {
                    ForEach(schedule.carts) { cart in
                        CartCell(cart: cart)
                    }
                }

                // Legend
                ThemedCard {
                    VStack(alignment: .leading, spacing: 10) {
                        SectionTitle(languageManager.t("legend"))
                        legendRow(color: Color(hex: "3B82F6"), label: languageManager.t("low"))
                        legendRow(color: Color(hex: "10B981"), label: languageManager.t("moderate"))
                        legendRow(color: Color(hex: "F59E0B"), label: languageManager.t("high"))
                        legendRow(color: Color(hex: "EF4444"), label: languageManager.t("veryHigh"))
                    }
                }

                // Tip
                ThemedCard {
                    HStack(alignment: .top, spacing: 10) {
                        Image(systemName: "lightbulb.fill")
                            .foregroundStyle(theme.warning)
                        Text(languageManager.t("cartTip"))
                            .font(.caption)
                            .foregroundStyle(theme.textSecondary)
                    }
                }
            }
            .padding(16)
        }
        .background(theme.background)
        .navigationTitle(languageManager.t("cartOccupancy"))
        .navigationBarTitleDisplayMode(.inline)
    }

    private func legendRow(color: Color, label: String) -> some View {
        HStack(spacing: 8) {
            RoundedRectangle(cornerRadius: 3)
                .fill(color)
                .frame(width: 14, height: 14)
            Text(label)
                .font(.caption)
                .foregroundStyle(themeManager.theme.text)
        }
    }
}

// MARK: - Single cart cell

struct CartCell: View {
    let cart: Cart

    @Environment(ThemeManager.self) private var themeManager
    @Environment(LanguageManager.self) private var languageManager

    var body: some View {
        let theme = themeManager.theme
        let color = occupancyColor(cart.occupancy)
        VStack(spacing: 6) {
            HStack(spacing: 4) {
                Text("\(cart.number)")
                    .font(.subheadline.weight(.bold))
                if cart.type != .general {
                    Image(systemName: cart.type.symbolName)
                        .font(.caption2)
                        .foregroundStyle(theme.primary)
                }
            }
            .foregroundStyle(theme.text)

            Text("\(cart.occupancy)%")
                .font(.caption.weight(.semibold))
                .foregroundStyle(color)

            // Occupancy bar
            GeometryReader { proxy in
                ZStack(alignment: .leading) {
                    Capsule()
                        .fill(theme.border.opacity(0.6))
                    Capsule()
                        .fill(color)
                        .frame(width: proxy.size.width * CGFloat(cart.occupancy) / 100.0)
                }
            }
            .frame(height: 5)

            Text(cart.type == .general ? "Gen" : cart.type.label)
                .font(.system(size: 9))
                .foregroundStyle(theme.textSecondary)
                .lineLimit(1)
        }
        .padding(8)
        .background(theme.surface)
        .clipShape(RoundedRectangle(cornerRadius: 10))
        .overlay(
            RoundedRectangle(cornerRadius: 10)
                .stroke(theme.border, lineWidth: 1)
        )
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Cart \(cart.number), \(cart.type.label), \(cart.occupancy) percent full")
    }
}
