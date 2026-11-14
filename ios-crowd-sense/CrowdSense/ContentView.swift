//
//  ContentView.swift
//  CrowdSense
//

import SwiftUI

/// Root tab navigation — mirrors the Expo bottom tabs (Home, Trains, Buses, More).
struct ContentView: View {
    @Environment(ThemeManager.self) private var themeManager
    @Environment(AppRouter.self) private var router

    var body: some View {
        TabView(selection: Bindable(router).selectedTab) {
            Tab(value: AppRouter.Tab.home, content: { HomeScreen() })
            Tab(value: AppRouter.Tab.trains, content: { TrainsScreen() })
            Tab(value: AppRouter.Tab.buses, content: { BusesScreen() })
            Tab(value: AppRouter.Tab.more, content: { MoreScreen() })
        }
        .tint(themeManager.theme.primary)
        .preferredColorScheme(themeManager.mode == .system ? nil : (themeManager.isDark ? .dark : .light))
    }
}

#Preview {
    ContentView()
        .environment(ThemeManager())
        .environment(LanguageManager())
        .environment(FavoritesStore())
        .environment(AppRouter())
}
