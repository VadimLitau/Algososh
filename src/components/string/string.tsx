import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import style from "./string.module.css";

export const StringComponent: React.FC = () => {
  const swap = (
    arr: string[],
    firstIndex: number,
    secondIndex: number
  ): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const reverseString = (str: string) => {
    const item: string[] = str.split("");
    const nums: any[] = str.split("");
    let start = 0;
    let end = nums.length - 1;
    let curr = 0;
    while (curr <= end) {
      (function(curr, end) {
        setTimeout(function() {
          swap(item, start + curr, end);
          console.log(item);
        }, 1000 * curr);
      })(curr++, end--);
    }

    return item;
  };
  const string: string[] = reverseString("1234567890");
  console.log(string);

  return (
    <SolutionLayout title="Строка">
      <form className={style.content}>
        <div className={style.input}>
          <Input></Input>
          <p className={style.inputSubtext}>Максимум — 11 символов</p>
        </div>
        <Button text={"Развернуть"} />
      </form>
      <section className={style.string}>
        {string.map((i, index: number) => {
          console.log(index);
          return <Circle letter={i} key={index} extraClass={"pr-12"} />;
        })}
      </section>
    </SolutionLayout>
  );
};
