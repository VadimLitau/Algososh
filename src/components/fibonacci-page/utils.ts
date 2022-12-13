export const MIN_VALUE = 1;
export const MAX_VALUE = 19;
export const TIMER = 500;
export const getFibonacciNumbers = (item: number) => {
  const series: any = [item];
  for (let i = 0; i <= item; i++) {
    if (i === 0) {
      series[0] = 1;
    } else if (i === 1) {
      series[1] = 1;
    } else {
      series[i] = series[i - 1] + series[i - 2];
    }
  }
  return series;
};
