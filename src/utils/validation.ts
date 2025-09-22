
import { APP_CONFIG } from '../constants';

export const validateAmount = (amount: string): { isValid: boolean; error?: string } => {
  if (!amount.trim()) {
    return { isValid: false, error: 'Amount is required' };
  }
  
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) {
    return { isValid: false, error: 'Amount must be a valid number' };
  }
  
  if (numAmount <= 0) {
    return { isValid: false, error: 'Amount must be greater than 0' };
  }
  
  const decimalPlaces = (amount.split('.')[1] || '').length;
  if (decimalPlaces > APP_CONFIG.MAX_DECIMAL_PLACES) {
    return { isValid: false, error: `Amount cannot have more than ${APP_CONFIG.MAX_DECIMAL_PLACES} decimal places` };
  }
  
  if (numAmount > APP_CONFIG.MAX_AMOUNT) {
    return { isValid: false, error: 'Amount is too large' };
  }
  
  return { isValid: true };
};

export const formatAmount = (amount: number): string => {
  // Если дробная часть равна 0, не показываем .00
  if (amount % 1 === 0) {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  // Показываем до 2 знаков после запятой, убираем лишние нули
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatAmountWithCurrency = (amount: number, currency: string): string => {
  return `${formatAmount(amount)} ${currency}`;
};

export const sanitizeAmountInput = (input: string): string => {
  let cleaned = input.replace(/[^\d.,]/g, '');
  cleaned = cleaned.replace(',', '.');
  
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    cleaned = parts[0] + '.' + parts.slice(1).join('');
  }
  
  // Ограничиваем до максимального количества знаков после запятой
  if (parts.length === 2 && parts[1].length > APP_CONFIG.MAX_DECIMAL_PLACES) {
    cleaned = parts[0] + '.' + parts[1].substring(0, APP_CONFIG.MAX_DECIMAL_PLACES);
  }
  
  return cleaned;
};
