import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import style from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const n = 10;
  var series = new Array(n);
  series.fill(0);
  series[0] = 0;
  series[1] = 1;
  for (let i = 2; i < n; i++) {
    series[i] = series[i - 1] + series[i - 2];
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <section className={style.content}>
        <div className={style.input}>
          <Input></Input>
          <p className={style.inputSubtext}>Максимальное число — 19</p>
        </div>
        <Button text={"Рассчитать"} linkedList="small" isLoader={false} />
      </section>{" "}
      {series.map((item, index) => {
        return <Circle letter={item} key={index} />;
      })}
    </SolutionLayout>
  );
};
