import SwiftUI

// MARK: - More tab (mirrors app/(tabs)/more.tsx)

struct MoreScreen: View {
    @Environment(ThemeManager.self) private var themeManager
    @Environment(LanguageManager.self) private var languageManager

    var body: some View {
        let theme = themeManager.theme
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    GradientHeader {
                        Text(languageManager.t("more"))
                            .font(.title2.bold())
                            .padding(.vertical, 8)
                    }

                    VStack(spacing: 10) {
                        NavigationLink(value: "favorites") {
                            MoreRow(title: languageManager.t("favorites"), icon: "heart.fill", tint: theme.error)
                        }
                        .buttonStyle(.plain)

                        NavigationLink(value: "calculator") {
                            MoreRow(title: languageManager.t("fareCalculator"), icon: "indianrupeesign", tint: theme.primary)
                        }
                        .buttonStyle(.plain)

                        NavigationLink(value: "emergency") {
                            MoreRow(title: languageManager.t("emergency"), icon: "phone.fill", tint: theme.error)
                        }
                        .buttonStyle(.plain)

                        NavigationLink(value: "chat") {
                            MoreRow(title: languageManager.t("chatAssistant"), icon: "bubble.left.and.text.bubble.right.fill", tint: theme.primary)
                        }
                        .buttonStyle(.plain)
                    }
                    .padding(.horizontal, 16)

                    // Settings
                    VStack(alignment: .leading, spacing: 10) {
                        SectionTitle(languageManager.t("settings"))

                        ThemedCard {
                            // Language
                            Button {
                                languageManager.cycleLanguage()
                            } label: {
                                HStack {
                                    MoreRow(title: languageManager.t("language"), icon: "globe", tint: theme.primary, chevron: false)
                                    Spacer()
                                    Text(languageManager.language.displayName)
                                        .font(.subheadline)
                                        .foregroundStyle(theme.textSecondary)
                                }
                            }
                            .buttonStyle(.plain)

                            Divider().overlay(theme.border)

                            // Theme
                            Button {
                                themeManager.cycleMode()
                            } label: {
                                HStack {
                                    MoreRow(title: languageManager.t("theme"), icon: "circle.lefthalf.filled", tint: theme.secondary, chevron: false)
                                    Spacer()
                                    Text(themeManager.mode.label)
                                        .font(.subheadline)
                                        .foregroundStyle(theme.textSecondary)
                                }
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.horizontal, 16)
                }
                .padding(.bottom, 24)
            }
            .background(theme.background)
            .navigationTitle(languageManager.t("more"))
            .navigationBarTitleDisplayMode(.inline)
            .navigationDestination(for: String.self) { key in
                switch key {
                case "favorites": FavoritesScreen()
                case "calculator": CalculatorScreen()
                case "emergency": EmergencyScreen()
                case "chat": ChatScreen()
                default: EmptyView()
                }
            }
        }
    }
}

// MARK: - More menu row

struct MoreRow: View {
    let title: String
    let icon: String
    let tint: Color
    var chevron = true

    @Environment(ThemeManager.self) private var themeManager

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.body)
                .frame(width: 34, height: 34)
                .background(tint.opacity(0.12))
                .foregroundStyle(tint)
                .clipShape(RoundedRectangle(cornerRadius: 8))

            Text(title)
                .font(.subheadline.weight(.medium))
                .foregroundStyle(themeManager.theme.text)

            Spacer()

            if chevron {
                Image(systemName: "chevron.right")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(themeManager.theme.textSecondary)
            }
        }
        .padding(.vertical, 2)
    }
}
