
export const unwrapValue = (value: any) => {
  if (value.hasOwnProperty('next')) {
    return value.next().value;
  }

  if (typeof value === 'function') {
    return value();
  }

  return value;
};
