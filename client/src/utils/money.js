export const formatDollarsToCents = (value) => {
  value = String(value).replace(/[^\d.-]/g, '');
  if (value && value.includes('.')) {
    value = value.substring(0, value.indexOf('.') + 3);
  }

  return value ? Math.round(parseFloat(value) * 100) : 0;
};

export const formatCentsToDollars = (value) => {
  const cents = parseFloat(String(value).replace(/[^\d.-]/g, ''));
  return cents ? cents / 100 : 0;
};
