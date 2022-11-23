import React, { useMemo, useState, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./utils";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from "./queue-page.module.css";
import useForm from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";

export const QueuePage: React.FC = () => {
  const [state, setState] = useState<(string | null)[]>([]);
  const [color, setColor] = useState({ head: false, tail: false });
  const [values, handleChange] = useForm();
  const queue = useMemo(() => {
    const queue = new Queue<string>(7);
    setState([...queue.getItems()]);
    return queue;
  }, []);

  let head = queue.head;
  let tail = queue.tail;

  const addItem = (e: FormEvent) => {
    setColor({ head: false, tail: true });
    e.preventDefault();
    queue.enqueue(values.queue);
    setState([...queue.getItems()]);
    setTimeout(() => {
      setColor({ head: false, tail: false });
    }, 500);
    values.queue = "";
  };
  const deleteItem = () => {
    setColor({ head: true, tail: false });
    setTimeout(() => {
      queue.dequeue();
      setState([...queue.getItems()]);
      setColor({ head: false, tail: false });
    }, 500);
  };
  const clearQueue = () => {
    queue.clear();
    setState([...queue.getItems()]);
  };

  return (
    <SolutionLayout title="Очередь">
      <section className={style.content}>
        <form className={style.form} onSubmit={addItem}>
          <span className={style.input}>
            <Input
              isLimitText
              maxLength={4}
              name="queue"
              onChange={handleChange}
              value={values.queue || ""}
            ></Input>
          </span>
          <Button
            text={"Добавить"}
            extraClass="ml-6"
            type="submit"
            disabled={values.queue && tail != queue.size ? false : true}
          ></Button>
          <Button
            text={"Удалить"}
            extraClass="mr-40 ml-6"
            onClick={() => {
              deleteItem();
            }}
            disabled={head === tail ? true : false}
          ></Button>
          <Button
            text={"Очистить"}
            onClick={() => {
              clearQueue();
            }}
          ></Button>
        </form>
      </section>
      <section className={style.homeForCircles}>
        {state.map((i, index: number) => {
          return (
            <Circle
              letter={i ? i : ""}
              key={index}
              index={index}
              head={index === head && state[index] ? "head" : ""}
              tail={index === tail - 1 && state[index] ? "tail" : ""}
              state={
                (index === head && color.head) ||
                (index === tail - 1 && color.tail)
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
            />
          );
        })}
      </section>
    </SolutionLayout>
  );
};
