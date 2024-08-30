export const formatPrice = (cents) => {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const checkAvailable = (status) => {
  return status === 'available';
};

export const checkFileRequired = (data) =>
  typeof data === 'string' || Boolean(data.length);

export const checkFileSize = (data) => {
  // No need to check previously saved image
  if (typeof data === 'string') return true;

  const maxFileSize = 5 * 10 ** 6; // around 5 megabytes
  return data.length && data[0].size <= maxFileSize;
};
