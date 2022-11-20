import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./utils";
import { ElementStates } from "../../types/element-states";
import useForm from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";

export const StackPage: React.FC = () => {
  const [state, setState] = useState<string[]>([]);
  const [color, setColor] = useState<boolean>(false);
  const [values, handleChange] = useForm();
  const stack = React.useMemo(() => {
    return new Stack<string>();
  }, []);
  const addItem = (e: FormEvent) => {
    e.preventDefault();
    stack.push(values.stack);
    setColor(true);
    setState([...stack.getItems()]);
    setTimeout(() => {
      setColor(false);
    }, 1000);
    values.stack = "";
  };
  const deleteItem = () => {
    setColor(true);
    setTimeout(() => {
      stack.pop();
      setState([...stack.getItems()]);
      setColor(false);
    }, 1000);
  };
  const clearStack = () => {
    stack.clear();
    setState([]);
  };
  return (
    <SolutionLayout title="Стек">
      <section className={style.content}>
        <form className={style.form} onSubmit={addItem}>
          <span className={style.input}>
            <Input
              isLimitText
              maxLength={4}
              name="stack"
              onChange={handleChange}
              value={values.stack || ""}
            ></Input>
          </span>
          <Button
            text={"Добавить"}
            extraClass="ml-6"
            type="submit"
            disabled={values.stack ? false : true}
          ></Button>
          <Button
            text={"Удалить"}
            extraClass="mr-40 ml-6"
            onClick={() => {
              deleteItem();
            }}
            disabled={state.length ? false : true}
          ></Button>
          <Button
            text={"Очистить"}
            onClick={() => {
              clearStack();
            }}
            disabled={state.length ? false : true}
          ></Button>
        </form>
      </section>
      <div className={style.homeForCircles}>
        {state &&
          state.map((i, index: number) => {
            return (
              <Circle
                letter={i}
                key={index}
                extraClass={"pr-12"}
                index={index}
                head={state.length - 1 === index ? "top" : ""}
                state={
                  index === state.length - 1 && color
                    ? ElementStates.Changing
                    : ElementStates.Default
                }
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
