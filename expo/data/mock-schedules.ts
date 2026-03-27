import { TrainSchedule, TrainLine, Cart } from '@/types/transport';

const generateCarts = (): Cart[] => {
  const carts: Cart[] = [];
  for (let i = 1; i <= 12; i++) {
    let type: 'general' | 'firstClass' | 'ladies' = 'general';
    
    if (i % 4 === 0) {
      type = 'firstClass';
    } else if (i % 5 === 0) {
      type = 'ladies';
    }

    const occupancy = Math.floor(Math.random() * 60) + 20;
    
    carts.push({
      number: i,
      occupancy,
      type,
    });
  }
  return carts;
};

const generateSchedule = (line: TrainLine, fromStation: string, toStation: string): TrainSchedule[] => {
  const schedules: TrainSchedule[] = [];
  const baseTime = new Date();
  baseTime.setHours(5, 0, 0, 0); // Start from 5 AM

  for (let i = 0; i < 50; i++) {
    const departureTime = new Date(baseTime);
    departureTime.setMinutes(baseTime.getMinutes() + (i * 12)); // Every 12 minutes

    const arrivalTime = new Date(departureTime);
    arrivalTime.setMinutes(departureTime.getMinutes() + Math.floor(Math.random() * 30) + 15); // 15-45 min journey

    const types = ['slow', 'fast', 'express'] as const;
    const statuses = ['onTime', 'delayed', 'cancelled'] as const;
    const platforms = ['1', '2', '3', '4', '5', '6'];

    const type = types[Math.floor(Math.random() * types.length)];
    const status = Math.random() > 0.8 ? statuses[Math.floor(Math.random() * statuses.length)] : 'onTime';
    const delay = status === 'delayed' ? Math.floor(Math.random() * 15) + 5 : undefined;

    schedules.push({
      id: `${line}-${i}`,
      trainNumber: `${line.toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
      departure: departureTime.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      arrival: arrivalTime.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      destination: toStation,
      type,
      status,
      delay,
      carts: generateCarts(),
    });
  }

  return schedules;
};

export const getTrainSchedule = (line: TrainLine, from: string, to: string): TrainSchedule[] => {
  return generateSchedule(line, from, to);
};

export const getLiveStatus = (trainNumber: string): TrainSchedule | null => {
  // Mock live status
  const statuses = ['onTime', 'delayed', 'cancelled'] as const;
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  return {
    id: trainNumber,
    trainNumber,
    departure: '14:30',
    arrival: '15:15',
    platform: '3',
    destination: 'Churchgate',
    type: 'fast',
    status,
    delay: status === 'delayed' ? Math.floor(Math.random() * 20) + 5 : undefined,
    carts: generateCarts(),
  };
};