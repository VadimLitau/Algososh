import { IBtnLoader, INewArr } from "./types";
import { ElementStates } from "../../types/element-states";
export const swap = (
  arr: INewArr[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const DEF_BTN_LOADER: IBtnLoader = {
  ascendens: false,
  descendens: false,
  newArray: false,
  ascendensDisabled: false,
  descendensDisabled: false,
  newArrayDisabled: false,
};

export const TIMER = 500;

export const delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const getArr = () => {
  const getRandomArbitrary = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const n = getRandomArbitrary(3, 18);
  const randomArr = Array(n)
    .fill(null)
    .map(() => Math.floor(Math.random() * 100));

  const arr = randomArr.map((item) => ({
    item,
    state: ElementStates.Default,
  }));
  return arr;
};
