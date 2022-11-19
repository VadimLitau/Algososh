import React, { useState, useEffect } from "react";
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
    //choiceDescendens(newArr);
    console.log(newArr);
  };
  // useEffect(() => {
  //   choiceDescendens(newArr);
  //   console.log(newArr);
  // }, []);

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
    setNewArr([...arr]);
    return;
  }

  // const getRandomArr = () => {
  //   getArr();
  //   console.log(newArr);
  // };
  const swap = (
    arr: number[],
    firstIndex: number,
    secondIndex: number
  ): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  //выбором по убыванию
  const choiceDescendens = (arr: number[]) => {
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      setTimeout(() => {
        let minInd = i; //2
        for (let j = i + 1; j < length; j++) {
          //j=3
          if (arr[j] > arr[minInd]) {
            //4>0
            minInd = j;
          }
        }
        if (minInd > i) swap(arr, i, minInd); //1>1
        setNewArr([...arr]);
      }, 1000 * i);
    }
    return arr;
  };

  //выбором по возрастанию
  const choiceAscendens = (arr: number[]) => {
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      setTimeout(() => {
        let maxInd = i; //2
        //setNewArr([...arr]);

        for (let j = i + 1; j < length; j++) {
          //j=3
          if (arr[j] < arr[maxInd]) {
            //4>0
            maxInd = j;
          }
        }

        if (maxInd > i) swap(arr, i, maxInd); //1>1
        setNewArr([...arr]);
      }, 500 * i);
    }
    return arr;
  };
  // if (typeSorting.choice) {
  //   asOrDes.ascendens ? choiceDescendens(newArr) : choiceAscendens(newArr);
  // }
  //console.log(choiceDescendens(newArr));
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
          onClick={() => {
            choiceAscendens(newArr);
            //setAsOrDes({ ascendens: false, descendens: true });
          }}
        ></Button>
        <Button
          sorting={Direction.Descending}
          text="По убыванию"
          extraClass={style.buttonDown}
          onClick={() => {
            choiceDescendens(newArr);
            //setAsOrDes({ ascendens: true, descendens: false });
          }}
        ></Button>
        <Button
          text="Новый массив"
          extraClass={style.button}
          onClick={() => {
            handleRandomArr();
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
