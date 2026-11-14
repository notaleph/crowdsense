import SwiftUI

// MARK: - Chat assistant (work in progress)

struct ChatScreen: View {
    @Environment(ThemeManager.self) private var themeManager
    @Environment(LanguageManager.self) private var languageManager

    var body: some View {
        let theme = themeManager.theme
        VStack(spacing: 14) {
            Spacer()
            Image(systemName: "bubble.left.and.text.bubble.right")
                .font(.system(size: 48))
                .foregroundStyle(theme.primary)
            Text(languageManager.t("chatAssistant"))
                .font(.headline)
                .foregroundStyle(theme.text)
            Text(languageManager.t("comingSoon"))
                .font(.subheadline)
                .foregroundStyle(theme.textSecondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 32)
            Spacer()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(theme.background)
        .navigationTitle(languageManager.t("chatAssistant"))
        .navigationBarTitleDisplayMode(.inline)
    }
}
