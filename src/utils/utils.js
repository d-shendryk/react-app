import { ItemStatuses } from './constants';

export const formatPrice = (cents) =>
  (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

export const checkAvailable = (status) => status === ItemStatuses.Available;

export const checkFileRequired = (data) =>
  typeof data === 'string' || Boolean(data.length);

export const checkFileSize = (data) => {
  // No need to check previously saved image
  if (typeof data === 'string') return true;

  const maxFileSize = 5 * 10 ** 6; // around 5 megabytes
  return data[0]?.size <= maxFileSize;
};
