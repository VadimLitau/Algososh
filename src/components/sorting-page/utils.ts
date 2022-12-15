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

  const n = getRandomArbitrary(3, 5);
  const randomArr = Array(n)
    .fill(null)
    .map(() => Math.floor(Math.random() * 100));

  const arr = randomArr.map((item) => ({
    item,
    state: ElementStates.Default,
  }));
  return arr;
};
//Очередная интересная циганская магия)Видос ниже, чтобы не потерять
//https://www.youtube.com/watch?v=7wtbNNiOh30&t=3s
export function* choiceDescendensGenerator(
  arr: INewArr[]
): Generator<INewArr[]> {
  for (let i = 0; i < arr.length - 1; i++) {
    let maxInd = i;
    for (let j = i + 1; j < arr.length; j++) {
      arr[i].state = ElementStates.Changing;
      arr[j].state = ElementStates.Changing;
      yield [...arr];
      if (arr[maxInd].item < arr[j].item) {
        maxInd = j;
      }
      arr[j].state = ElementStates.Default;
      yield [...arr];
    }
    swap(arr, i, maxInd);
    arr[i].state = ElementStates.Modified;
  }
  if (arr[arr.length - 1]) {
    arr[arr.length - 1].state = ElementStates.Modified;
  }
  yield [...arr];
}
export function* choiceAscendensGenerator(
  arr: INewArr[]
): Generator<INewArr[]> {
  for (let i = 0; i < arr.length - 1; i++) {
    let minInd = i;
    for (let j = i + 1; j < arr.length; j++) {
      arr[i].state = ElementStates.Changing;
      arr[j].state = ElementStates.Changing;
      yield [...arr];
      if (arr[minInd].item > arr[j].item) {
        minInd = j;
      }
      arr[j].state = ElementStates.Default;
      yield [...arr];
    }
    swap(arr, i, minInd);
    arr[i].state = ElementStates.Modified;
  }
  if (arr[arr.length - 1]) {
    arr[arr.length - 1].state = ElementStates.Modified;
  }

  yield [...arr];
}

export function* bubbleSortDescGenerator(arr: INewArr[]): Generator<INewArr[]> {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      yield [...arr];
      if (arr[j].item < arr[j + 1].item) {
        swap(arr, j, j + 1);
      }
      arr[j].state = ElementStates.Default;
    }
    arr[arr.length - i - 1].state = ElementStates.Modified;
  }
  yield [...arr];
}

export function* bubbleSortAscGenerator(arr: INewArr[]): Generator<INewArr[]> {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      yield [...arr];
      if (arr[j].item > arr[j + 1].item) {
        swap(arr, j, j + 1);
      }
      arr[j].state = ElementStates.Default;
    }
    arr[arr.length - i - 1].state = ElementStates.Modified;
  }
  yield [...arr];
}
