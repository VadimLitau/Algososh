import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import useForm from "../../hooks/useForm";
import style from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [state, setState] = useState<any[]>([]);
  const [values, handleChange] = useForm();
  const [loader, setLoader] = useState(false);
  const fibonacciHandler = (e: FormEvent) => {
    e.preventDefault();
    fibonacciSequence(values.fibonacci);
    setLoader(true);
  };
  let element: void[] = [];
  const fibonacciSequence = (item: number) => {
    let series: any = new Array(item);
    element = series;
    for (let i = 0; i <= item; i++) {
      setTimeout(() => {
        if (i === 0) {
          series[0] = 1;
          setState([...series]);
        } else if (i === 1) {
          series[1] = 1;
          setState([...series]);
        } else {
          series[i] = series[i - 1] + series[i - 2];
          setState([...series]);
        }
        if (i > item - 1) {
          console.log(i);

          setLoader(false);
          return;
        }
      }, 500 * i);
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
          ></Input>
          <p className={style.inputSubtext}>Максимальное число — 19</p>
        </div>
        <Button
          text={"Рассчитать"}
          linkedList="small"
          isLoader={loader}
          type="submit"
          disabled={values.fibonacci < 1 || values.fibonacci > 19}
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
