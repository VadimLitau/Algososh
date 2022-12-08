import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import style from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { IBtnLoader, INewArr, IRadioInput } from "./types";
import {
  TIMER,
  bubbleSortAscGenerator,
  bubbleSortDescGenerator,
  choiceDescendensGenerator,
  choiceAscendensGenerator,
  DEF_BTN_LOADER,
  delay,
  getArr,
} from "./utils";

export const SortingPage: React.FC = () => {
  const first2 = [
    { item: 13, state: "default" },
    { item: 14, state: "default" },
    { item: 15, state: "default" },
  ];
  const second2 = [
    { item: 13, state: "default" },
    { item: 14, state: "default" },
    { item: 15, state: "default" },
  ];

  const isEqual = JSON.stringify(first2) === JSON.stringify(second2);
  console.log(isEqual);
  // console.log(isEquals);

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

    let generator = choiceDescendensGenerator(arr);
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        setNewArr(generator.next().value);
        await delay(TIMER);
        setNewArr(generator.next().value);
      }
    }
    setNewArr(generator.next().value);
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

    let generator = choiceAscendensGenerator(arr);
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        setNewArr(generator.next().value);
        await delay(TIMER);
        setNewArr(generator.next().value);
      }
    }
    setNewArr(generator.next().value);
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
    let generator = bubbleSortAscGenerator(arr);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setNewArr(generator.next().value);
        await delay(TIMER);
      }
    }
    setNewArr(generator.next().value);
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
    let generator = bubbleSortDescGenerator(arr);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setNewArr(generator.next().value);
        await delay(TIMER);
      }
    }
    setNewArr(generator.next().value);
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
