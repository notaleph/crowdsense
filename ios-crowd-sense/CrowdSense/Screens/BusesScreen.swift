import SwiftUI

// MARK: - Buses tab (mirrors app/(tabs)/buses.tsx)

struct BusesScreen: View {
    @Environment(ThemeManager.self) private var themeManager
    @Environment(LanguageManager.self) private var languageManager

    @State private var query = ""
    @State private var selectedType: BusType?

    private var filtered: [BusRoute] {
        BusesData.routes.filter { route in
            let matchesType = selectedType == nil || route.type == selectedType
            let term = query.lowercased()
            let matchesQuery = term.isEmpty
                || route.name.lowercased().contains(term)
                || route.number.contains(term)
                || route.from.lowercased().contains(term)
                || route.to.lowercased().contains(term)
            return matchesType && matchesQuery
        }
    }

    var body: some View {
        let theme = themeManager.theme
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                GradientHeader {
                    Text(languageManager.t("buses"))
                        .font(.title2.bold())
                        .padding(.vertical, 8)
                }

                VStack(alignment: .leading, spacing: 12) {
                    // Search
                    HStack {
                        Image(systemName: "magnifyingglass")
                            .foregroundStyle(theme.textSecondary)
                        TextField(languageManager.t("search"), text: $query)
                            .foregroundStyle(theme.text)
                        if !query.isEmpty {
                            Button {
                                query = ""
                            } label: {
                                Image(systemName: "xmark.circle.fill")
                                    .foregroundStyle(theme.textSecondary)
                            }
                        }
                    }
                    .padding(10)
                    .background(theme.card)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
                    .overlay(RoundedRectangle(cornerRadius: 10).stroke(theme.border, lineWidth: 1))

                    // Type filter chips
                    HStack(spacing: 8) {
                        filterChip(label: languageManager.t("all"), selected: selectedType == nil) {
                            selectedType = nil
                        }
                        ForEach(BusType.allCases, id: \.self) { type in
                            filterChip(label: type.label, selected: selectedType == type) {
                                selectedType = selectedType == type ? nil : type
                            }
                        }
                    }

                    // Routes
                    ForEach(filtered) { route in
                        BusRouteCard(route: route)
                    }
                }
                .padding(.horizontal, 16)
            }
            .padding(.bottom, 24)
        }
        .background(theme.background)
        .navigationTitle(languageManager.t("buses"))
        .navigationBarTitleDisplayMode(.inline)
    }

    private func filterChip(label: String, selected: Bool, action: @escaping () -> Void) -> some View {
        let theme = themeManager.theme
        return Button(action: action) {
            Text(label)
                .font(.caption.weight(.semibold))
                .padding(.horizontal, 12)
                .padding(.vertical, 7)
                .background(selected ? theme.primary : theme.card)
                .foregroundStyle(selected ? .white : theme.text)
                .clipShape(Capsule())
                .overlay(Capsule().stroke(theme.border, lineWidth: 1))
        }
        .buttonStyle(.plain)
    }
}

struct BusRouteCard: View {
    let route: BusRoute

    @Environment(ThemeManager.self) private var themeManager
    @Environment(LanguageManager.self) private var languageManager

    var body: some View {
        let theme = themeManager.theme
        ThemedCard {
            HStack(spacing: 12) {
                // Number badge
                Text(route.number)
                    .font(.headline.weight(.bold))
                    .frame(width: 46, height: 46)
                    .background(theme.primary.opacity(0.12))
                    .foregroundStyle(theme.primary)
                    .clipShape(RoundedRectangle(cornerRadius: 10))

                VStack(alignment: .leading, spacing: 3) {
                    Text("\(route.from) → \(route.to)")
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(theme.text)
                        .lineLimit(1)
                    HStack(spacing: 8) {
                        Text(route.type.label)
                            .font(.caption.weight(.semibold))
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(theme.secondary.opacity(0.12))
                            .foregroundStyle(theme.secondary)
                            .clipShape(Capsule())
                        Label(route.frequency, systemImage: "clock")
                            .font(.caption)
                            .foregroundStyle(theme.textSecondary)
                    }
                }

                Spacer()

                Text("₹\(route.fare)")
                    .font(.subheadline.weight(.bold))
                    .foregroundStyle(theme.text)
            }
        }
    }
}
