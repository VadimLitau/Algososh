import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import useForm from "../../hooks/useForm";
import style from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { TIMER, MIN_VALUE, MAX_VALUE, INPUT_LENGTH } from "./utils";

export const StringComponent: React.FC = () => {
  const [stringArray, setStringArray] = useState<string[]>([]);
  const [values, handleChange] = useForm();
  const [count, setCount] = useState({
    start: MIN_VALUE,
    end: MAX_VALUE,
    loader: false,
  });
  const stringHandler = (e: FormEvent) => {
    e.preventDefault();
    reverseString(values.string);
    setCount({ ...count, start: MIN_VALUE, end: MAX_VALUE, loader: true });
  };
  const swap = (
    arr: string[],
    firstIndex: number,
    secondIndex: number
  ): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    setCount({
      ...count,
      start: firstIndex + 1,
      end: secondIndex - 1,
      loader: true,
    });
    if (firstIndex + 1 === secondIndex || firstIndex === secondIndex) {
      setCount({
        ...count,
        start: firstIndex + secondIndex + 1,
        end: MAX_VALUE,
        loader: false,
      });
    }
  };

  const reverseString = (str: string) => {
    const item: string[] = str.split("");
    const nums: any[] = str.split("");
    let start = 0;
    let end = nums.length - 1;
    let curr = 1;
    while (start <= end) {
      setStringArray([...item]);
      (function (start, end, curr) {
        setTimeout(function () {
          swap(item, start, end);
          setStringArray([...item]);
        }, TIMER * curr);
      })(start++, end--, curr++);
    }
  };

  return (
    <SolutionLayout title="Строка">
      <form className={style.content} onSubmit={stringHandler}>
        <div className={style.input}>
          <Input
            type="text"
            isLimitText
            maxLength={INPUT_LENGTH}
            name="string"
            value={values.string || ""}
            onChange={handleChange}
          ></Input>
        </div>
        <Button
          text={"Развернуть"}
          type="submit"
          isLoader={count.loader}
          disabled={!(values.string.length > 0)}
        />
      </form>
      <section className={style.string}>
        {stringArray.map((i, index: number) => {
          return (
            <Circle
              letter={i}
              key={index}
              extraClass={"pr-12"}
              state={
                index === count.start || index === count.end
                  ? ElementStates.Changing
                  : index > count.start && index < count.end
                  ? ElementStates.Default
                  : ElementStates.Modified
              }
            />
          );
        })}
      </section>
    </SolutionLayout>
  );
};
