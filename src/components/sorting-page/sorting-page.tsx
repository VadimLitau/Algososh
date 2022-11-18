import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import style from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
interface IRadioInput {
  choice: boolean;
  bubble: boolean;
}

export const SortingPage: React.FC = () => {
  const [radioInput, setRadioInput] = useState<IRadioInput>({
    choice: true,
    bubble: false,
  });
  const [newArr, setNewArr] = useState<number[]>([]);

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

  function rand(min: any, max: any) {
    if (max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      return Math.floor(Math.random() * (min + 1));
    }
  }

  // функция генерации массива заполненного случайными числами
  function getArr() {
    let limit = Math.floor(Math.random() * (17 - 3 + 1)) + 3;
    let min = 0;
    let max = 100;
    let arr = new Array(limit);

    for (var i = 0; i < limit; i++) {
      arr[i] = rand(min, max);
    }
    setNewArr(arr);
    return;
  }

  const getRandomArr = () => {
    getArr();
    console.log(newArr);
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
        ></Button>
        <Button
          sorting={Direction.Descending}
          text="По убыванию"
          extraClass={style.buttonDown}
        ></Button>
        <Button
          text="Новый массив"
          extraClass={style.button}
          onClick={() => {
            getRandomArr();
          }}
        ></Button>
      </section>
      <section className={style.columnsWrap}>
        <div className={style.columns}>
          {newArr.map((item: any, index: number) => {
            return (
              <Column index={item} key={index} extraClass="mr-3 ml-3"></Column>
            );
          })}
        </div>
      </section>
    </SolutionLayout>
  );
};
