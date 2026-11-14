import SwiftUI

// MARK: - Schedule list for a route (mirrors app/trains/schedule.tsx)

struct ScheduleScreen: View {
    let route: Route
    var onOpenTrain: (TrainSchedule) -> Void

    @Environment(ThemeManager.self) private var themeManager
    @Environment(LanguageManager.self) private var languageManager
    @Environment(FavoritesStore.self) private var favoritesStore

    @State private var schedules: [TrainSchedule] = []

    var body: some View {
        let theme = themeManager.theme
        ScrollView {
            VStack(alignment: .leading, spacing: 12) {
                // Route summary card
                ThemedCard {
                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            Text("\(languageManager.stationName(route.from)) → \(languageManager.stationName(route.to))")
                                .font(.headline)
                                .foregroundStyle(theme.text)
                                .lineLimit(1)
                            Spacer()
                            Button {
                                favoritesStore.toggle(route)
                            } label: {
                                Image(systemName: favoritesStore.isFavorite(route) ? "heart.fill" : "heart")
                                    .foregroundStyle(favoritesStore.isFavorite(route) ? theme.error : theme.textSecondary)
                            }
                        }
                        HStack(spacing: 14) {
                            Label("₹\(route.fare)", systemImage: "indianrupeesign")
                            Label("\(route.duration) min", systemImage: "clock")
                            Label("\(route.distance) km", systemImage: "point.topleft.down.curvedto.point.bottomright.up")
                        }
                        .font(.caption)
                        .foregroundStyle(theme.textSecondary)
                    }
                }

                ForEach(schedules) { schedule in
                    ScheduleRow(schedule: schedule) {
                        onOpenTrain(schedule)
                    }
                }
            }
            .padding(16)
        }
        .background(theme.background)
        .navigationTitle(languageManager.t("timetable"))
        .navigationBarTitleDisplayMode(.inline)
        .navigationDestination(for: TrainSchedule.self) { schedule in
            CartOccupancyScreen(schedule: schedule)
        }
        .onAppear {
            if schedules.isEmpty {
                schedules = SchedulesData.schedules(line: route.line, from: route.from.id, to: route.to.id)
            }
        }
    }
}

// MARK: - Schedule row

struct ScheduleRow: View {
    let schedule: TrainSchedule
    var onTap: () -> Void

    @Environment(ThemeManager.self) private var themeManager
    @Environment(LanguageManager.self) private var languageManager

    var body: some View {
        Button(action: onTap) {
            ThemedCard {
                HStack(spacing: 12) {
                    // Departure → arrival
                    VStack(alignment: .leading, spacing: 2) {
                        Text("\(schedule.departure) → \(schedule.arrival)")
                            .font(.subheadline.weight(.bold))
                            .foregroundStyle(themeManager.theme.text)
                        Text(schedule.trainNumber)
                            .font(.caption)
                            .foregroundStyle(themeManager.theme.textSecondary)
                    }

                    Spacer()

                    // Type chip
                    HStack(spacing: 4) {
                        Image(systemName: schedule.type.symbolName).font(.caption2)
                        Text(languageManager.t(schedule.type.rawValue))
                            .font(.caption.weight(.semibold))
                    }
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(themeManager.theme.primary.opacity(0.12))
                    .foregroundStyle(themeManager.theme.primary)
                    .clipShape(Capsule())

                    // Status
                    VStack(alignment: .trailing, spacing: 2) {
                        Text(languageManager.t(statusKey))
                            .font(.caption.weight(.semibold))
                            .foregroundStyle(themeManager.theme.color(schedule.status.colorKey))
                        Text("\(languageManager.t("platform")) \(schedule.platform)")
                            .font(.caption)
                            .foregroundStyle(themeManager.theme.textSecondary)
                    }
                }
            }
        }
        .buttonStyle(.plain)
        .contentShape(Rectangle())
    }

    private var statusKey: String {
        switch schedule.status {
        case .onTime: return "onTime"
        case .delayed: return "delayed"
        case .cancelled: return "cancelled"
        }
    }
}
