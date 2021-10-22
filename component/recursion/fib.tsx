const fiSequence = (n: number) => {
  if (n == 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    return fiSequence(n - 2) + fiSequence(n - 1);
  }
};
console.log('result:' + fiSequence(1));
