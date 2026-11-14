//
//  CrowdSenseApp.swift
//  CrowdSense
//

import SwiftUI

@main
struct CrowdSenseApp: App {
    @State private var themeManager = ThemeManager()
    @State private var languageManager = LanguageManager()
    @State private var favoritesStore = FavoritesStore()
    @State private var router = AppRouter()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(themeManager)
                .environment(languageManager)
                .environment(favoritesStore)
                .environment(router)
        }
    }
}
