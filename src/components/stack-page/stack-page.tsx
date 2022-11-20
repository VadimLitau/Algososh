import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./utils";
import { ElementStates } from "../../types/element-states";
interface IStack {
  item: string;
  state: ElementStates;
}
const stack = Stack;
export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <section className={style.content}>
        <form className={style.form}>
          <span className={style.input}>
            <Input isLimitText maxLength={4}></Input>
          </span>
          <Button text={"Добавить"} extraClass="ml-6"></Button>
          <Button text={"Удалить"} extraClass="mr-40 ml-6"></Button>
          <Button text={"Очистить"}></Button>
        </form>
      </section>
    </SolutionLayout>
  );
};
