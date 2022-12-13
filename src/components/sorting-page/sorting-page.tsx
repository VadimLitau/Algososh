import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import style from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { IBtnLoader, INewArr, IRadioInput } from "./types";
import { swap, TIMER } from "./utils";
import { DEF_BTN_LOADER } from "./utils";
import { delay } from "./utils";
import { getArr } from "./utils";

export const SortingPage: React.FC = () => {
  const [buttonLoader, setButtonLoader] = useState<IBtnLoader>({
    ascendens: false,
    descendens: false,
    newArray: false,
    ascendensDisabled: false,
    descendensDisabled: false,
    newArrayDisabled: false,
  });
  const [radioInput, setRadioInput] = useState<IRadioInput>({
    choice: true,
    bubble: false,
  });
  const [newArr, setNewArr] = useState<INewArr[]>([]);

  const handleRandomArr = () => {
    const arr = getArr();
    setNewArr(arr);
  };
  useEffect(() => {
    const arr = getArr();
    setNewArr(arr);
  }, []);

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

  //выбором по убыванию
  const choiceDescendens = async (arr: INewArr[]) => {
    setButtonLoader({
      ...buttonLoader,
      descendens: true,
      ascendensDisabled: true,
      newArrayDisabled: true,
    });

    if (arr[0].state !== ElementStates.Default) {
      arr.forEach((item) => (item.state = ElementStates.Default));
    }
    for (let i = 0; i < arr.length - 1; i++) {
      let maxInd = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        setNewArr([...arr]);
        await delay(TIMER);
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
    setButtonLoader(DEF_BTN_LOADER);
  };

  //выбором по возрастанию
  const choiceAscendens = async (arr: INewArr[]) => {
    setButtonLoader({
      ...buttonLoader,
      ascendens: true,
      descendensDisabled: true,
      newArrayDisabled: true,
    });

    if (arr[0].state !== ElementStates.Default) {
      arr.forEach((item) => (item.state = ElementStates.Default));
    }
    for (let i = 0; i < arr.length - 1; i++) {
      let minInd = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        setNewArr([...arr]);
        await delay(TIMER);
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
    setButtonLoader(DEF_BTN_LOADER);
  };
  //пузырьком по увеличению
  const bubbleSortAsc = async (arr: INewArr[]) => {
    setButtonLoader({
      ...buttonLoader,
      ascendens: true,
      descendensDisabled: true,
      newArrayDisabled: true,
    });

    if (arr[0].state !== ElementStates.Default) {
      arr.forEach((item) => (item.state = ElementStates.Default));
    }

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setNewArr([...arr]);
        await delay(TIMER);
        if (arr[j].item > arr[j + 1].item) {
          swap(arr, j, j + 1);
        }
        arr[j].state = ElementStates.Default;
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
    }
    setNewArr([...arr]);
    setButtonLoader(DEF_BTN_LOADER);
  };

  //пузырьком по уменьшение
  const bubbleSortDesc = async (arr: INewArr[]) => {
    setButtonLoader({
      ...buttonLoader,
      descendens: true,
      ascendensDisabled: true,
      newArrayDisabled: true,
    });

    if (arr[0].state !== ElementStates.Default) {
      arr.forEach((item) => (item.state = ElementStates.Default));
    }

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setNewArr([...arr]);
        await delay(TIMER);
        if (arr[j].item < arr[j + 1].item) {
          swap(arr, j, j + 1);
        }
        arr[j].state = ElementStates.Default;
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
    }
    setNewArr([...arr]);
    setButtonLoader(DEF_BTN_LOADER);
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
          disabled={buttonLoader.ascendensDisabled}
          isLoader={buttonLoader.ascendens}
          onClick={() => {
            radioInput.choice ? choiceAscendens(newArr) : bubbleSortAsc(newArr);
          }}
        ></Button>
        <Button
          sorting={Direction.Descending}
          text="По убыванию"
          extraClass={style.buttonDown}
          disabled={buttonLoader.descendensDisabled}
          isLoader={buttonLoader.descendens}
          onClick={() => {
            radioInput.choice
              ? choiceDescendens(newArr)
              : bubbleSortDesc(newArr);
          }}
        ></Button>
        <Button
          disabled={buttonLoader.newArrayDisabled}
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
