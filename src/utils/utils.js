export function formatPrice(cents) {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

export function checkAvailable(status) {
  return status === 'available';
}

export const checkFileRequired = (data) => {
  if (typeof data === 'string' || data.length) return true;
  return false;
};
export const checkFileSize = (data) => {
  // No need to check previously saved image
  if (typeof data === 'string') return true;

  return data.length && data[0].size <= 5 * 10 ** 6;
};
