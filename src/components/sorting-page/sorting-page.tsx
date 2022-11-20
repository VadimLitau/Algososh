import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import style from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
interface INewArr {
  item: number;
  state?: ElementStates;
}
interface IRadioInput {
  choice: boolean;
  bubble: boolean;
}
export const SortingPage: React.FC = () => {
  const [btnLoader, setBtnLoader] = useState<boolean>(false);
  const [radioInput, setRadioInput] = useState<IRadioInput>({
    choice: true,
    bubble: false,
  });
  const [newArr, setNewArr] = useState<INewArr[]>([]);
  const [typeSorting, setTypeSorting] = useState<IRadioInput>({
    choice: true,
    bubble: false,
  });
  const [asOrDes, setAsOrDes] = useState({
    ascendens: false,
    descendens: true,
  });
  const handleRandomArr = () => {
    getArr();
  };
  useEffect(() => {
    getArr();
  }, []);
  const delay = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));
  const editRadioInput = (item: string) => {
    if (item === "choice") {
      radioInput.choice
        ? setRadioInput({ ...radioInput, choice: false })
        : setRadioInput({ choice: true, bubble: false });
    }
    if (item === "bubble") {
      radioInput.bubble
        ? setRadioInput({ ...radioInput, bubble: false })
        : setRadioInput({ choice: false, bubble: true });
    }
  };

  const getArr = () => {
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

    setNewArr(arr);
  };
  const swap = (
    arr: INewArr[],
    firstIndex: number,
    secondIndex: number
  ): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  //выбором по убыванию
  const choiceDescendens = async (arr: INewArr[]) => {
    setBtnLoader(true);

    if (arr[0].state !== ElementStates.Default) {
      arr.forEach((item) => (item.state = ElementStates.Default));
    }
    for (let i = 0; i < arr.length - 1; i++) {
      let minInd = i;
      let maxInd = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        setNewArr([...arr]);
        await delay(500);
        if (arr[maxInd].item < arr[j].item) {
          maxInd = j;
        }
        arr[j].state = ElementStates.Default;
        setNewArr([...arr]);
      }
      swap(arr, i, maxInd);
      arr[i].state = ElementStates.Modified;
    }
    arr[arr.length - 1].state = ElementStates.Modified;
    setNewArr([...arr]);
    setBtnLoader(false);
  };

  //выбором по возрастанию
  const choiceAscendens = async (arr: INewArr[]) => {
    setBtnLoader(true);

    if (arr[0].state !== ElementStates.Default) {
      arr.forEach((item) => (item.state = ElementStates.Default));
    }
    for (let i = 0; i < arr.length - 1; i++) {
      let minInd = i;
      let maxInd = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        setNewArr([...arr]);
        await delay(500);
        if (arr[minInd].item > arr[j].item) {
          minInd = j;
        }
        arr[j].state = ElementStates.Default;
        setNewArr([...arr]);
      }
      swap(arr, i, minInd);
      arr[i].state = ElementStates.Modified;
    }
    arr[arr.length - 1].state = ElementStates.Modified;
    setNewArr([...arr]);
    setBtnLoader(false);
  };
  //пузырьком по увеличению
  const bubbleSortAsc = async (arr: INewArr[]) => {
    setBtnLoader(true);

    if (arr[0].state !== ElementStates.Default) {
      arr.forEach((item) => (item.state = ElementStates.Default));
    }

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setNewArr([...arr]);
        await delay(500);
        if (arr[j].item > arr[j + 1].item) {
          swap(arr, j, j + 1);
        }
        arr[j].state = ElementStates.Default;
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
    }
    setNewArr([...arr]);
    setBtnLoader(false);
  };

  //пузырьком по уменьшение
  const bubbleSortDesc = async (arr: INewArr[]) => {
    setBtnLoader(true);

    if (arr[0].state !== ElementStates.Default) {
      arr.forEach((item) => (item.state = ElementStates.Default));
    }

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setNewArr([...arr]);
        await delay(500);
        if (arr[j].item < arr[j + 1].item) {
          swap(arr, j, j + 1);
        }
        arr[j].state = ElementStates.Default;
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
    }
    setNewArr([...arr]);
    setBtnLoader(false);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={style.control}>
        <RadioInput
          label="Выбор"
          checked={radioInput.choice}
          onChange={() => {
            editRadioInput("choice");
          }}
        ></RadioInput>
        <RadioInput
          label="Пузырёк"
          extraClass={style.radio}
          checked={radioInput.bubble}
          onChange={() => {
            editRadioInput("bubble");
          }}
        ></RadioInput>
        <Button
          sorting={Direction.Ascending}
          text="По возрастанию"
          extraClass={style.button}
          isLoader={btnLoader}
          onClick={() => {
            radioInput.choice ? choiceAscendens(newArr) : bubbleSortAsc(newArr);
          }}
        ></Button>
        <Button
          sorting={Direction.Descending}
          text="По убыванию"
          extraClass={style.buttonDown}
          isLoader={btnLoader}
          onClick={() => {
            radioInput.choice
              ? choiceDescendens(newArr)
              : bubbleSortDesc(newArr);
          }}
        ></Button>
        <Button
          isLoader={btnLoader}
          text="Новый массив"
          extraClass={style.button}
          onClick={() => {
            handleRandomArr();
          }}
        ></Button>
      </section>
      <section className={style.columnsWrap}>
        <div className={style.columns}>
          {newArr.map((item, index) => {
            return (
              <Column
                index={item.item}
                key={index}
                extraClass="mr-3 ml-3"
                state={item.state}
              ></Column>
            );
          })}
        </div>
      </section>
    </SolutionLayout>
  );
};
