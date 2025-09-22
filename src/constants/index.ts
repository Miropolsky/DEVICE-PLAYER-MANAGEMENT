// Константы приложения
export const APP_CONFIG = {
  API_DELAY: {
    DEVICES: 500,
    DEVICE: 300,
    UPDATE_BALANCE: 800,
  },
  ERROR_PROBABILITY: 0.1, // 10% вероятность ошибки
  MAX_AMOUNT: 999999999.99,
  MAX_DECIMAL_PLACES: 2,
  MAX_INPUT_LENGTH: 10,
} as const;

export const SERVER_ERRORS = [
  'Server temporarily unavailable',
  'Database connection failed',
  'Transaction timeout',
  'Invalid operation'
] as const;

export const ROUTES = {
  HOME: '/',
  DEVICE: (id: number) => `/device/${id}`,
} as const;

export const TOAST_CONFIG = {
  position: 'top-right' as const,
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
} as const;
