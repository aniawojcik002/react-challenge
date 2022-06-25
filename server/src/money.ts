export const fromCents = (amount) => {
  if (!Number.isInteger(amount))
    throw new Error('Passed value is not an INT, ${number}');

  return amount / 100;
};
export const toCents = (amount) => {
  return Math.round(amount * 100);
};
