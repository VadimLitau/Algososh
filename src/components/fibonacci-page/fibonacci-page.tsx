import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import useForm from "../../hooks/useForm";
import style from "./fibonacci-page.module.css";
import { getFibonacciNumbers, MAX_VALUE, MIN_VALUE, TIMER } from "./utils";

export const FibonacciPage: React.FC = () => {
  const [state, setState] = useState<any[]>([]);
  const [values, handleChange] = useForm();
  const [loader, setLoader] = useState(false);
  const fibonacciHandler = (e: FormEvent) => {
    e.preventDefault();
    const fibNum: any = getFibonacciNumbers(values.fibonacci);
    getFibonacciVisual(fibNum);
    setLoader(true);
    values.fibonacci = "";
  };

  const getFibonacciVisual = (item: []) => {
    const series: any = [];
    for (let i = 0; i < item.length; i++) {
      setTimeout(() => {
        //i === item.length - 1 ? setLoader(false) : null;
        series.push(item[i]);
        setState([...series]);
        if (i === item.length - 1) {
          setLoader(false);
        }
      }, TIMER * i);
    }
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.content} onSubmit={fibonacciHandler}>
        <div className={style.input}>
          <Input
            value={values.fibonacci || ""}
            onChange={handleChange}
            type="text"
            name="fibonacci"
            isLimitText
            maxLength={MAX_VALUE}
          ></Input>
        </div>
        <Button
          text={"Рассчитать"}
          linkedList="small"
          isLoader={loader}
          type="submit"
          disabled={
            values.fibonacci < MIN_VALUE || values.fibonacci > MAX_VALUE
          }
        />
      </form>
      <section className={style.homeForCircles}>
        {state.map((item, index) => {
          return (
            <Circle
              letter={item}
              key={index}
              index={index}
              extraClass={"mr-4 ml-4"}
            />
          );
        })}
      </section>
    </SolutionLayout>
  );
};
