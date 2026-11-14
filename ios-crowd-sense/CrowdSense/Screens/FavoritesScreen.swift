import SwiftUI

// MARK: - Favorites (mirrors app/favorites.tsx)

struct FavoritesScreen: View {
    @Environment(ThemeManager.self) private var themeManager
    @Environment(LanguageManager.self) private var languageManager
    @Environment(FavoritesStore.self) private var favoritesStore

    var body: some View {
        let theme = themeManager.theme
        Group {
            if favoritesStore.favorites.isEmpty {
                // Empty state
                VStack(spacing: 12) {
                    Image(systemName: "heart.slash")
                        .font(.system(size: 44))
                        .foregroundStyle(theme.textSecondary)
                    Text(languageManager.t("noFavorites"))
                        .font(.headline)
                        .foregroundStyle(theme.text)
                    Text(languageManager.t("noFavoritesHint"))
                        .font(.caption)
                        .foregroundStyle(theme.textSecondary)
                        .multilineTextAlignment(.center)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else {
                ScrollView {
                    VStack(spacing: 12) {
                        ForEach(favoritesStore.favorites) { favorite in
                            ThemedCard {
                                VStack(alignment: .leading, spacing: 10) {
                                    HStack {
                                        VStack(alignment: .leading, spacing: 2) {
                                            Text("\(languageManager.stationName(favorite.route.from)) → \(languageManager.stationName(favorite.route.to))")
                                                .font(.subheadline.weight(.bold))
                                                .foregroundStyle(theme.text)
                                                .lineLimit(1)
                                            Text(languageManager.t(favorite.route.line.rawValue))
                                                .font(.caption)
                                                .foregroundStyle(Color(hex: favorite.route.line.tintHex))
                                        }
                                        Spacer()
                                        // Alert toggle
                                        Button {
                                            favoritesStore.toggleAlerts(id: favorite.id)
                                        } label: {
                                            Image(systemName: favorite.alertsEnabled ? "bell.fill" : "bell.slash")
                                                .foregroundStyle(favorite.alertsEnabled ? theme.warning : theme.textSecondary)
                                        }
                                        // Remove
                                        Button {
                                            favoritesStore.remove(id: favorite.id)
                                        } label: {
                                            Image(systemName: "trash")
                                                .foregroundStyle(theme.error)
                                        }
                                    }

                                    HStack(spacing: 14) {
                                        Label("₹\(favorite.route.fare)", systemImage: "indianrupeesign")
                                        Label("\(favorite.route.duration) min", systemImage: "clock")
                                    }
                                    .font(.caption)
                                    .foregroundStyle(theme.textSecondary)
                                }
                            }
                        }
                    }
                    .padding(16)
                }
            }
        }
        .background(theme.background)
        .navigationTitle(languageManager.t("favorites"))
        .navigationBarTitleDisplayMode(.inline)
    }
}
