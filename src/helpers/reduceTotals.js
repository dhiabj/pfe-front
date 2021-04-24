export const reduceTotals = (items, key) => {
  return items?.reduce(
    (accumulator, currentValue) => accumulator + currentValue[key],
    0
  );
};
