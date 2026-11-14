import SwiftUI

// MARK: - Home tab (mirrors app/(tabs)/index.tsx)

enum HomeDestination: Hashable {
    case favorites, calculator, emergency, chat
}

struct HomeScreen: View {
    @Environment(ThemeManager.self) private var themeManager
    @Environment(LanguageManager.self) private var languageManager
    @Environment(FavoritesStore.self) private var favoritesStore
    @Environment(AppRouter.self) private var router

    var body: some View {
        NavigationStack(path: Bindable(router).homePath) {
            ScrollView {
                VStack(spacing: 16) {
                    GradientHeader {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("Crowd Sense")
                                .font(.title.bold())
                            Text("Mumbai Transport")
                                .font(.subheadline)
                                .opacity(0.9)
                        }
                        .padding(.vertical, 12)
                    }

                    VStack(alignment: .leading, spacing: 12) {
                        SectionTitle(languageManager.t("quickActions"))
                        quickActionGrid
                    }
                    .padding(.horizontal, 16)

                    if !favoritesStore.favorites.isEmpty {
                        VStack(alignment: .leading, spacing: 12) {
                            SectionTitle(languageManager.t("favorites"))
                            ForEach(favoritesStore.favorites.prefix(2)) { favorite in
                                ThemedCard {
                                    HStack {
                                        VStack(alignment: .leading, spacing: 4) {
                                            Text("\(languageManager.stationName(favorite.route.from)) → \(languageManager.stationName(favorite.route.to))")
                                                .font(.subheadline.weight(.semibold))
                                                .foregroundStyle(themeManager.theme.text)
                                            Text(languageManager.t(favorite.route.line.rawValue))
                                                .font(.caption)
                                                .foregroundStyle(themeManager.theme.textSecondary)
                                        }
                                        Spacer()
                                        Image(systemName: "bell.fill")
                                            .foregroundStyle(themeManager.theme.primary)
                                    }
                                }
                            }
                        }
                        .padding(.horizontal, 16)
                    }

                    ThemedCard {
                        HStack(spacing: 12) {
                            Image(systemName: "dot.radiowaves.left.and.right")
                                .font(.title3)
                                .foregroundStyle(themeManager.theme.secondary)
                            VStack(alignment: .leading, spacing: 2) {
                                Text(languageManager.t("liveStatus"))
                                    .font(.subheadline.weight(.semibold))
                                    .foregroundStyle(themeManager.theme.text)
                                Text(languageManager.t("liveUpdateHint"))
                                    .font(.caption)
                                    .foregroundStyle(themeManager.theme.textSecondary)
                            }
                        }
                    }
                    .padding(.horizontal, 16)
                }
                .padding(.bottom, 24)
            }
            .background(themeManager.theme.background)
            .navigationTitle(languageManager.t("home"))
            .navigationBarTitleDisplayMode(.inline)
            .navigationDestination(for: HomeDestination.self) { destination in
                switch destination {
                case .favorites: FavoritesScreen()
                case .calculator: CalculatorScreen()
                case .emergency: EmergencyScreen()
                case .chat: ChatScreen()
                }
            }
        }
    }

    private var quickActionGrid: some View {
        let actions: [(String, String, () -> Void)] = [
            (languageManager.t("trains"), "tram.fill", { router.selectedTab = .trains }),
            (languageManager.t("buses"), "bus.fill", { router.selectedTab = .buses }),
            (languageManager.t("fareCalculator"), "indianrupeesign", { router.homePath.append(.calculator) }),
            (languageManager.t("emergency"), "phone.fill", { router.homePath.append(.emergency) }),
            (languageManager.t("chatAssistant"), "bubble.left.and.text.bubble.right.fill", { router.homePath.append(.chat) }),
            (languageManager.t("favorites"), "heart.fill", { router.homePath.append(.favorites) }),
        ]

        return LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
            ForEach(actions.indices, id: \.self) { index in
                let action = actions[index]
                Button(action: action.2) {
                    VStack(spacing: 8) {
                        Image(systemName: action.1)
                            .font(.title2)
                        Text(action.0)
                            .font(.caption.weight(.medium))
                            .multilineTextAlignment(.center)
                            .lineLimit(2)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 14)
                    .background(themeManager.theme.card)
                    .foregroundStyle(themeManager.theme.primary)
                    .clipShape(RoundedRectangle(cornerRadius: 14))
                    .overlay(
                        RoundedRectangle(cornerRadius: 14)
                            .stroke(themeManager.theme.border, lineWidth: 1)
                    )
                }
                .buttonStyle(.plain)
            }
        }
    }
}
