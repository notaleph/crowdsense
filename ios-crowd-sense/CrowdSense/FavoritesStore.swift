import Foundation
import SwiftUI

// MARK: - Favorites store (mirrors hooks/favorites-context.tsx, persisted to UserDefaults)

@Observable
final class FavoritesStore {
    private static let storageKey = "favorites"

    private(set) var favorites: [FavoriteRoute] = []

    init() {
        load()
    }

    private func load() {
        guard let data = UserDefaults.standard.data(forKey: Self.storageKey) else { return }
        if let decoded = try? JSONDecoder().decode([FavoriteRoute].self, from: data) {
            favorites = decoded
        }
    }

    private func save() {
        if let data = try? JSONEncoder().encode(favorites) {
            UserDefaults.standard.set(data, forKey: Self.storageKey)
        }
    }

    func add(_ route: Route, nickname: String? = nil) {
        let favorite = FavoriteRoute(
            id: "\(route.from.id)-\(route.to.id)-\(Int(Date().timeIntervalSince1970 * 1000))",
            route: route,
            nickname: nickname,
            createdAt: Date(),
            alertsEnabled: true
        )
        favorites.append(favorite)
        save()
    }

    func remove(id: String) {
        favorites.removeAll { $0.id == id }
        save()
    }

    func toggleAlerts(id: String) {
        guard let index = favorites.firstIndex(where: { $0.id == id }) else { return }
        favorites[index].alertsEnabled.toggle()
        save()
    }

    func isFavorite(_ route: Route) -> Bool {
        favorites.contains {
            $0.route.from.id == route.from.id && $0.route.to.id == route.to.id && $0.route.line == route.line
        }
    }

    func toggle(_ route: Route) {
        if isFavorite(route) {
            if let match = favorites.first(where: {
                $0.route.from.id == route.from.id && $0.route.to.id == route.to.id && $0.route.line == route.line
            }) {
                remove(id: match.id)
            }
        } else {
            add(route)
        }
    }
}

// MARK: - Tab router (lets Home quick actions switch tabs)

@Observable
final class AppRouter {
    enum Tab: Hashable {
        case home, trains, buses, more
    }

    var selectedTab: Tab = .home
    var homePath: [HomeDestination] = []
}
