export interface Station {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  code: string;
  line: TrainLine;
  zone: number;
}

export interface Cart {
  number: number;
  occupancy: number;
  type: 'general' | 'firstClass' | 'ladies';
}

export interface TrainSchedule {
  id: string;
  trainNumber: string;
  departure: string;
  arrival: string;
  platform: string;
  destination: string;
  type: 'slow' | 'fast' | 'express';
  status: 'onTime' | 'delayed' | 'cancelled';
  delay?: number;
  carts: Cart[];
}

export interface Route {
  id: string;
  from: Station;
  to: Station;
  line: TrainLine;
  duration: number;
  fare: number;
  distance: number;
}

export interface FavoriteRoute {
  id: string;
  route: Route;
  nickname?: string;
  createdAt: Date;
  alertsEnabled: boolean;
}

export type TrainLine = 'western' | 'central' | 'harbour';

export type Language = 'en' | 'hi' | 'mr';

export interface BusRoute {
  id: string;
  number: string;
  name: string;
  from: string;
  to: string;
  type: 'ordinary' | 'limited' | 'ac';
  fare: number;
}

export interface MetroStation {
  id: string;
  name: string;
  line: 'line1' | 'line2' | 'line3';
}

export interface EmergencyContact {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  number: string;
  category: 'police' | 'fire' | 'medical' | 'railway' | 'transport';
}