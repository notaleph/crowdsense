import SwiftUI
import UIKit

// MARK: - Emergency contacts (mirrors app/emergency.tsx)

struct EmergencyScreen: View {
    @Environment(ThemeManager.self) private var themeManager
    @Environment(LanguageManager.self) private var languageManager

    @State private var selectedCategory: EmergencyCategory?
    @State private var contactToCall: EmergencyContact?

    private var filtered: [EmergencyContact] {
        EmergencyData.contacts.filter { selectedCategory == nil || $0.category == selectedCategory }
    }

    var body: some View {
        let theme = themeManager.theme
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                GradientHeader {
                    VStack(alignment: .leading, spacing: 4) {
                        Text(languageManager.t("emergency"))
                            .font(.title2.bold())
                        Text(languageManager.t("emergencyHint"))
                            .font(.caption)
                            .opacity(0.9)
                    }
                    .padding(.vertical, 8)
                }

                VStack(alignment: .leading, spacing: 12) {
                    // Category chips
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 8) {
                            categoryChip(label: languageManager.t("all"), selected: selectedCategory == nil) {
                                selectedCategory = nil
                            }
                            ForEach(EmergencyCategory.allCases, id: \.self) { category in
                                categoryChip(label: categoryLabel(category), selected: selectedCategory == category) {
                                    selectedCategory = selectedCategory == category ? nil : category
                                }
                            }
                        }
                    }

                    ForEach(filtered) { contact in
                        ThemedCard {
                            HStack(spacing: 12) {
                                Image(systemName: icon(for: contact.category))
                                    .font(.body)
                                    .frame(width: 36, height: 36)
                                    .background(theme.error.opacity(0.12))
                                    .foregroundStyle(theme.error)
                                    .clipShape(RoundedRectangle(cornerRadius: 9))

                                VStack(alignment: .leading, spacing: 2) {
                                    Text(contactName(contact))
                                        .font(.subheadline.weight(.semibold))
                                        .foregroundStyle(theme.text)
                                        .lineLimit(1)
                                    Text(contact.number)
                                        .font(.caption)
                                        .foregroundStyle(theme.textSecondary)
                                }

                                Spacer()

                                Button {
                                    contactToCall = contact
                                } label: {
                                    Image(systemName: "phone.fill")
                                        .font(.body)
                                        .frame(width: 40, height: 40)
                                        .background(theme.success)
                                        .foregroundStyle(.white)
                                        .clipShape(Circle())
                                }
                            }
                        }
                    }
                }
                .padding(.horizontal, 16)
            }
            .padding(.bottom, 24)
        }
        .background(theme.background)
        .navigationTitle(languageManager.t("emergency"))
        .navigationBarTitleDisplayMode(.inline)
        .alert(
            languageManager.t("callConfirm"),
            isPresented: Binding(
                get: { contactToCall != nil },
                set: { if !$0 { contactToCall = nil } }
            )
        ) {
            Button(languageManager.t("call"), role: .none) {
                if let contact = contactToCall, let url = URL(string: "tel://\(contact.number.replacingOccurrences(of: "-", with: ""))") {
                    UIApplication.shared.open(url)
                }
                contactToCall = nil
            }
            Button(languageManager.t("cancel"), role: .cancel) {
                contactToCall = nil
            }
        } message: {
            if let contact = contactToCall {
                Text("\(contactName(contact)) · \(contact.number)")
            }
        }
    }

    private func categoryChip(label: String, selected: Bool, action: @escaping () -> Void) -> some View {
        let theme = themeManager.theme
        return Button(action: action) {
            Text(label)
                .font(.caption.weight(.semibold))
                .padding(.horizontal, 12)
                .padding(.vertical, 7)
                .background(selected ? theme.error : theme.card)
                .foregroundStyle(selected ? .white : theme.text)
                .clipShape(Capsule())
                .overlay(Capsule().stroke(theme.border, lineWidth: 1))
        }
        .buttonStyle(.plain)
    }

    private func categoryLabel(_ category: EmergencyCategory) -> String {
        switch category {
        case .police: return languageManager.t("police")
        case .fire: return languageManager.t("fire")
        case .medical: return languageManager.t("medical")
        case .railway: return languageManager.t("railway")
        case .transport: return languageManager.t("transport")
        }
    }

    private func icon(for category: EmergencyCategory) -> String {
        switch category {
        case .police: return "shield.fill"
        case .fire: return "flame.fill"
        case .medical: return "cross.case.fill"
        case .railway: return "tram.fill"
        case .transport: return "bus.fill"
        }
    }

    private func contactName(_ contact: EmergencyContact) -> String {
        switch languageManager.language {
        case .english: return contact.name
        case .hindi: return contact.nameHi
        case .marathi: return contact.nameMr
        }
    }
}
