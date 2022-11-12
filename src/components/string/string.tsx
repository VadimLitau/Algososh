import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import style from "./string.module.css";

export const StringComponent: React.FC = () => {
  const reverseString = (str: string) => {
    const item: string[] = str.split("");
    const nums: any[] = str.split("");
    const size: number = item.length;
    let start = 0;
    let end = nums.length - 1;
    let curr = 0;

    const swap = (
      arr: string[],
      firstIndex: number,
      secondIndex: number
    ): void => {
      const temp = arr[firstIndex];
      arr[firstIndex] = arr[secondIndex];
      arr[secondIndex] = temp;
    };
    while (curr < (item.length - 1) / 2) {
      swap(item, start + curr, end - curr);
      console.log(item);

      curr++;
    }
    return item;
  };

  const string: string[] = reverseString("hello");
  console.log(string);

  return (
    <SolutionLayout title="Строка">
      <section className={style.content}>
        <div className={style.input}>
          <Input></Input>
          <p className={style.inputSubtext}>Максимум — 11 символов</p>
        </div>
        <Button text={"Развернуть"} />
      </section>
      {string.map((i, index: number) => {
        console.log(index);
        return <Circle letter={i} key={index} />;
      })}
    </SolutionLayout>
  );
};
