# CrowdSense – Mumbai Local Train Crowd Intelligence

CrowdSense is a mobile application concept designed to help Mumbai local train commuters make more informed boarding decisions through coach-wise crowd information.

The project explores combining a commuter-facing mobile experience with computer vision-based passenger detection to estimate crowd levels in individual train coaches.

## The Problem

Mumbai's suburban railway network carries millions of commuters. Passengers often have limited information about how crowded individual coaches are before boarding.

CrowdSense explores how crowd intelligence could help commuters make better-informed travel decisions.

## Key Features

- **Train Route Selection:** Explore stations across Mumbai's Western, Central and Harbour lines.
- **Journey Planning:** Select source and destination stations.
- **Coach-wise Occupancy Interface:** View occupancy levels across individual train coaches.
- **Saved Routes:** Save frequently used journeys.
- **Train Schedules:** Explore train schedule interfaces.
- **Multilingual Interface:** Language support for English, Hindi and Marathi.
- **Theme Support:** Light and dark modes.
- **Emergency Information:** Access emergency contact information.

## Technology Stack

| Category | Technologies |
|---|---|
| Framework | React Native, Expo |
| Language | TypeScript |
| Navigation | Expo Router |
| State Management | Zustand |
| Data Fetching | TanStack React Query |
| Local Persistence | AsyncStorage |
| UI | Lucide React Native |

## Project Structure

```text
expo/
├── app/
│   ├── (tabs)/
│   ├── trains/
│   ├── chat.tsx
│   ├── emergency.tsx
│   └── favorites.tsx
├── components/
├── constants/
├── data/
├── hooks/
├── types/
├── assets/
├── app.json
└── package.json
```

## Current Implementation Status

The current repository contains the mobile frontend and its application workflows.

- The coach occupancy interface currently uses simulated/random occupancy values.
- Train schedules and train status are generated using mock data.
- The YOLO computer vision model is maintained in a separate repository and is not currently connected to the mobile application through an API.
- The chat assistant interface is a work in progress.

These limitations distinguish the current prototype from the proposed end-to-end product.

## Computer Vision Component

A separate Python-based computer vision component explores passenger detection and head/body counting using a custom-trained YOLO11s model.

The model can process images, videos and camera input through local inference scripts.

See the separate CrowdSense Computer Vision repository for its implementation and training artifacts.

## Running the Application

Prerequisites:
- Node.js
- Bun
- Expo-compatible development environment

Install dependencies:

```bash
cd expo
bun install
```

The original development scripts use Rork tooling:

```bash
bun run start
```

Additional setup may be required to run the project outside its original Rork environment.

## Development Approach

The project was developed collaboratively. My contributions included:

- UI/UX design and frontend development.
- Product feature planning and prioritisation.
- Translating commuter problems into application workflows.
- Coordinating development across project components.
- Working on the separate YOLO implementation and training workflow.

AI-assisted development tools were used to accelerate coding. Generated code was reviewed, tested and modified during development.

## Project Status

Academic/final-year project prototype. The mobile frontend and computer vision component are independently runnable, but end-to-end integration remains future work.

---

**CrowdSense**  
Built as a final-year project exploring technology-driven improvements to Mumbai local train commuting.
