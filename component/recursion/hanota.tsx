export const hanota = (n: number, start: number, end: number) => {
  if (n == 1) {
    return 1;
  } else {
    const other = 6 - (start + end);
    return hanota(n - 1, start, other) + 1 + hanota(n - 1, other, end);
  }
};
console.log(hanota(4, 1, 3));
