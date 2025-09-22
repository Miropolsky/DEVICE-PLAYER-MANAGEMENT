import { APP_CONFIG, SERVER_ERRORS } from '../constants';
import type { ApiResponse, BalanceOperation, Device, Player } from '../types';

// Mock данные на основе реальной структуры API
const mockDevices: Device[] = [
  {
    "id": 1,
    "name": "Test Device 1",
    "places": [
      {
        "device_id": 1,
        "place": 1,
        "currency": "KES",
        "balances": 568123
      },
      {
        "device_id": 1,
        "place": 2,
        "currency": "KES",
        "balances": 284800
      }
    ],
    "created_at": "2025-08-29T13:23:57.796Z",
    "updated_at": "2025-08-29T13:23:57.796Z"
  },
  {
    "id": 2,
    "name": "Test Device 2",
    "places": [
      {
        "device_id": 2,
        "place": 1,
        "currency": "KES",
        "balances": 254200
      },
      {
        "device_id": 2,
        "place": 2,
        "currency": "KES",
        "balances": 123308800
      },
      {
        "device_id": 2,
        "place": 3,
        "currency": "KES",
        "balances": -37400
      }
    ],
    "created_at": "2025-08-29T13:23:57.799Z",
    "updated_at": "2025-08-29T13:23:57.799Z"
  },
  {
    "id": 3,
    "name": "Test Device 3",
    "places": [
      {
        "device_id": 3,
        "place": 1,
        "currency": "KES",
        "balances": 142200
      },
      {
        "device_id": 3,
        "place": 2,
        "currency": "KES",
        "balances": -620400
      }
    ],
    "created_at": "2025-08-29T13:23:57.801Z",
    "updated_at": "2025-08-29T13:23:57.801Z"
  },
  {
    "id": 4,
    "name": "Test Device 4",
    "places": [
      {
        "device_id": 4,
        "place": 1,
        "currency": "KES",
        "balances": 375800
      },
      {
        "device_id": 4,
        "place": 2,
        "currency": "KES",
        "balances": -322800
      },
      {
        "device_id": 4,
        "place": 3,
        "currency": "KES",
        "balances": -43200
      }
    ],
    "created_at": "2025-08-29T13:23:57.805Z",
    "updated_at": "2025-08-29T13:23:57.805Z"
  },
  {
    "id": 5,
    "name": "Test Device 5",
    "places": [
      {
        "device_id": 5,
        "place": 1,
        "currency": "KES",
        "balances": -634200
      },
      {
        "device_id": 5,
        "place": 2,
        "currency": "KES",
        "balances": 405298
      }
    ],
    "created_at": "2025-08-29T13:23:57.808Z",
    "updated_at": "2025-08-29T13:23:57.808Z"
  }
];

// Симуляция задержки API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export const getDevices = async (): Promise<ApiResponse<Device[]>> => {
  try {
    await delay(APP_CONFIG.API_DELAY.DEVICES);
    
    return {
      data: mockDevices,
      success: true,
      message: 'Devices loaded successfully'
    };
  } catch (error) {
    console.error('Error fetching devices:', error);
    throw new Error('Failed to fetch devices');
  }
};

export const getDeviceById = async (deviceId: number): Promise<ApiResponse<Device>> => {
  try {
    await delay(APP_CONFIG.API_DELAY.DEVICE);
    
    const device = mockDevices.find(d => d.id === deviceId);
    if (!device) {
      throw new Error(`Device with ID ${deviceId} not found`);
    }
    
    return {
      data: device,
      success: true,
      message: 'Device loaded successfully'
    };
  } catch (error) {
    console.error('Error fetching device:', error);
    throw error;
  }
};


export const updatePlayerBalance = async (operation: BalanceOperation): Promise<ApiResponse<Player>> => {
  try {
    await delay(APP_CONFIG.API_DELAY.UPDATE_BALANCE);

    const deviceId = Math.floor(operation.playerId / 100);
    const place = operation.playerId % 100;

    const device = mockDevices.find(d => d.id === deviceId);
    if (!device) {
      throw new Error('Device not found');
    }

    const placeData = device.places.find(p => p.place === place);
    if (!placeData) {
      throw new Error('Place not found');
    }

    if (operation.amount <= 0) {
      throw new Error('Invalid amount');
    }

    if (operation.operation === 'withdraw' && placeData.balances < operation.amount) {
      throw new Error('Insufficient funds');
    }

    // Симуляция случайных ошибок сервера
    if (Math.random() < APP_CONFIG.ERROR_PROBABILITY) {
      const randomError = SERVER_ERRORS[Math.floor(Math.random() * SERVER_ERRORS.length)];
      throw new Error(randomError);
    }

    // Обновляем баланс в mock данных
    const delta = operation.operation === 'deposit' ? operation.amount : -operation.amount;
    placeData.balances += delta;

    const updatedPlayer: Player = {
      id: operation.playerId,
      name: `Player ${place}`,
      balance: placeData.balances,
      deviceId: deviceId,
      place: place,
      currency: placeData.currency,
      lastActivity: new Date().toISOString()
    };

    return {
      data: updatedPlayer,
      success: true,
      message: `Balance ${operation.operation === 'deposit' ? 'increased' : 'decreased'} successfully`
    };
  } catch (error) {
    console.error('Error updating balance:', error);
    throw error;
  }
};
