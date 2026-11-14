import SwiftUI

// MARK: - Trains tab (mirrors app/(tabs)/trains.tsx)

struct TrainsScreen: View {
    @Environment(ThemeManager.self) private var themeManager
    @Environment(LanguageManager.self) private var languageManager

    @State private var selectedLine: TrainLine = .western
    @State private var originStation: Station?
    @State private var showDestinationSelector = false
    @State private var path: [Route] = []
    @State private var pendingRoute: Route?

    var body: some View {
        NavigationStack(path: $path) {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    GradientHeader {
                        Text(languageManager.t("trains"))
                            .font(.title2.bold())
                            .padding(.vertical, 8)
                    }

                    VStack(alignment: .leading, spacing: 12) {
                        // Line selector chips
                        HStack(spacing: 8) {
                            LineChip(line: .western, selected: selectedLine == .western, title: languageManager.t("western")) {
                                selectedLine = .western
                            }
                            LineChip(line: .central, selected: selectedLine == .central, title: languageManager.t("central")) {
                                selectedLine = .central
                            }
                            LineChip(line: .harbour, selected: selectedLine == .harbour, title: languageManager.t("harbour")) {
                                selectedLine = .harbour
                            }
                        }

                        SectionTitle(languageManager.t("stations"))

                        // Station list
                        VStack(spacing: 8) {
                            ForEach(StationsData.stations(for: selectedLine)) { station in
                                Button {
                                    originStation = station
                                    showDestinationSelector = true
                                } label: {
                                    HStack(spacing: 12) {
                                        Text(station.code)
                                            .font(.caption.weight(.bold))
                                            .frame(width: 52, height: 30)
                                            .background(Color(hex: selectedLine.tintHex).opacity(0.14))
                                            .foregroundStyle(Color(hex: selectedLine.tintHex))
                                            .clipShape(RoundedRectangle(cornerRadius: 8))

                                        VStack(alignment: .leading, spacing: 2) {
                                            Text(languageManager.stationName(station))
                                                .font(.subheadline.weight(.semibold))
                                                .foregroundStyle(themeManager.theme.text)
                                                .lineLimit(1)
                                            Text("Zone \(station.zone)")
                                                .font(.caption)
                                                .foregroundStyle(themeManager.theme.textSecondary)
                                        }

                                        Spacer()

                                        Image(systemName: "chevron.right")
                                            .font(.caption.weight(.semibold))
                                            .foregroundStyle(themeManager.theme.textSecondary)
                                    }
                                    .padding(12)
                                    .background(themeManager.theme.card)
                                    .clipShape(RoundedRectangle(cornerRadius: 12))
                                    .overlay(
                                        RoundedRectangle(cornerRadius: 12)
                                            .stroke(themeManager.theme.border, lineWidth: 1)
                                    )
                                }
                                .buttonStyle(.plain)
                            }
                        }
                    }
                    .padding(.horizontal, 16)
                }
                .padding(.bottom, 24)
            }
            .background(themeManager.theme.background)
            .navigationTitle(languageManager.t("trains"))
            .navigationBarTitleDisplayMode(.inline)
            .navigationDestination(for: Route.self) { route in
                ScheduleScreen(route: route)
            }
        }
        .sheet(isPresented: $showDestinationSelector, onDismiss: {
            if let route = pendingRoute {
                path.append(route)
                pendingRoute = nil
            }
        }) {
            if let origin = originStation {
                DestinationSelectorScreen(origin: origin, line: selectedLine) { destination in
                    pendingRoute = Route(
                        id: "\(origin.id)-\(destination.id)",
                        from: origin,
                        to: destination,
                        line: selectedLine,
                        duration: Int.random(in: 12...55),
                        fare: 10 + Int.random(in: 0...4) * 5,
                        distance: Int.random(in: 5...60)
                    )
                    showDestinationSelector = false
                }
                .presentationDetents([.medium, .large])
            }
        }
    }
}

// MARK: - Destination selector sheet (search + endpoint quick options)

struct DestinationSelectorScreen: View {
    let origin: Station
    let line: TrainLine
    let onSelect: (Station) -> Void

    @Environment(\.dismiss) private var dismiss
    @Environment(ThemeManager.self) private var themeManager
    @Environment(LanguageManager.self) private var languageManager

    @State private var query = ""

    private var results: [Station] {
        query.isEmpty
            ? StationsData.possibleDestinations(from: origin)
            : StationsData.search(query, language: languageManager.language)
    }

    var body: some View {
        let theme = themeManager.theme
        VStack(alignment: .leading, spacing: 14) {
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text(languageManager.t("to"))
                        .font(.caption)
                        .foregroundStyle(theme.textSecondary)
                    Text(languageManager.stationName(origin))
                        .font(.headline)
                        .foregroundStyle(theme.text)
                }
                Spacer()
                Button(languageManager.t("search")) { dismiss() }
                    .font(.subheadline)
            }

            // Search field
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
            .background(theme.surface)
            .clipShape(RoundedRectangle(cornerRadius: 10))

            // Endpoint quick options
            HStack(spacing: 8) {
                ForEach(StationsData.endpointDestinations(from: origin)) { endpoint in
                    Button {
                        onSelect(endpoint)
                    } label: {
                        HStack(spacing: 6) {
                            Image(systemName: "arrowtriangle.right.fill").font(.caption2)
                            Text(languageManager.stationName(endpoint)).lineLimit(1)
                        }
                        .font(.caption.weight(.semibold))
                        .padding(.horizontal, 12)
                        .padding(.vertical, 8)
                        .frame(maxWidth: .infinity)
                        .background(Color(hex: line.tintHex).opacity(0.12))
                        .foregroundStyle(Color(hex: line.tintHex))
                        .clipShape(Capsule())
                    }
                    .buttonStyle(.plain)
                }
            }

            // Results
            ScrollView {
                VStack(spacing: 8) {
                    ForEach(results) { station in
                        Button {
                            onSelect(station)
                        } label: {
                            HStack {
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(languageManager.stationName(station))
                                        .font(.subheadline.weight(.semibold))
                                        .foregroundStyle(theme.text)
                                        .lineLimit(1)
                                    Text(station.code)
                                        .font(.caption)
                                        .foregroundStyle(theme.textSecondary)
                                }
                                Spacer()
                                Image(systemName: "arrow.right.circle")
                                    .foregroundStyle(Color(hex: line.tintHex))
                            }
                            .padding(12)
                            .background(theme.surface)
                            .clipShape(RoundedRectangle(cornerRadius: 10))
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
        }
        .padding(16)
        .background(theme.background)
    }
}
