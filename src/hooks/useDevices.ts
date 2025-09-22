import { useEffect, useState } from 'react';
import { getDevices } from '../services/api';
import type { Device } from '../types';

export const useDevices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDevices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getDevices();
      setDevices(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load devices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDevices();
  }, []);

  return { devices, loading, error, refetch: loadDevices };
};
