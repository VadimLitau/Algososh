import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack, TIMER } from "./utils";
import { ElementStates } from "../../types/element-states";
import useForm from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { IButtonColor, DEF_COLOR } from "./types";

export const StackPage: React.FC = () => {
  const [state, setState] = useState<string[]>([]);
  const [color, setColor] = useState<IButtonColor>({
    color: false,
    add: false,
    del: false,
    addDisable: false,
    delDisable: false,
    clearDisable: false,
  });
  const [values, handleChange] = useForm();
  const stack = React.useMemo(() => {
    return new Stack<string>();
  }, []);
  const addItem = (e: FormEvent) => {
    e.preventDefault();
    stack.push(values.stack);
    setColor({
      ...color,
      add: true,
      delDisable: true,
      clearDisable: true,
      color: true,
    });
    setState([...stack.getItems()]);
    setTimeout(() => {
      setColor(DEF_COLOR);
    }, TIMER);
    values.stack = "";
  };
  const deleteItem = () => {
    setColor({
      ...color,
      del: true,
      addDisable: true,
      clearDisable: true,
      color: true,
    });
    setTimeout(() => {
      stack.pop();
      setState([...stack.getItems()]);
      setColor(DEF_COLOR);
    }, TIMER);
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
            disabled={!(values.stack > 0) || color.addDisable}
            isLoader={color.add}
          ></Button>
          <Button
            text={"Удалить"}
            extraClass="mr-40 ml-6"
            onClick={() => {
              deleteItem();
            }}
            disabled={!(state.length > 0) || color.delDisable}
            isLoader={color.del}
          ></Button>
          <Button
            text={"Очистить"}
            onClick={() => {
              clearStack();
            }}
            disabled={!(state.length > 0) || color.clearDisable}
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
                  index === state.length - 1 && color.color
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
