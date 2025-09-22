import { useCallback, useEffect, useState } from 'react';
import { getDeviceById } from '../services/api';
import type { Device, Player } from '../types';

export const useDevice = (deviceId: string | undefined) => {
  const [device, setDevice] = useState<Device | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDeviceAndPlayers = useCallback(async () => {
    if (!deviceId) return;
    
    try {
      setLoading(true);
      setError(null);

      const deviceResponse = await getDeviceById(parseInt(deviceId));
      setDevice(deviceResponse.data);

      // Создаем игроков на основе мест девайса
      const players: Player[] = deviceResponse.data.places.map((place) => ({
        id: deviceResponse.data.id * 100 + place.place,
        name: `Player ${place.place}`,
        balance: place.balances,
        deviceId: deviceResponse.data.id,
        place: place.place,
        currency: place.currency,
        lastActivity: new Date().toISOString(),
      }));

      setPlayers(players);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load device and players"
      );
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  useEffect(() => {
    loadDeviceAndPlayers();
  }, [loadDeviceAndPlayers]);

  return { device, players, loading, error, refetch: loadDeviceAndPlayers };
};
