export const reduceItems = (items) => {
  if (!items) return 0;
  return items?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.Quantity,
    0
  );
};
