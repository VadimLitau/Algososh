import React, { useState, useMemo } from "react";
import style from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./utils";
import { ILinkedItem } from "./utils";

interface IButtonLoaderState {
  addToHead: boolean;
  addToHeadLoading: boolean;
  addToTail: boolean;
  addToTailLoading: boolean;
  removeFromHead: boolean;
  removeFromHeadLoading: boolean;
  removeFromTail: boolean;
  removeFromTailLoading: boolean;
  addByIndex: boolean;
  addByIndexLoading: boolean;
  removeByIndex: boolean;
  removeByIndexLoading: boolean;
}
export const ListPage: React.FC = () => {
  const [state, setState] = useState<ILinkedItem[]>([]);
  const [color, setColor] = useState({ index: 0, color: false });
  const [value, setValue] = useState("");
  const [index, setIndex] = useState("");
  const [moveIndex, setMoveIndex] = useState(-1);
  const [loaderState, setLoaderState] = useState<IButtonLoaderState>({
    addToHead: false,
    addToHeadLoading: false,
    addToTail: false,
    addToTailLoading: false,
    removeFromHead: false,
    removeFromHeadLoading: false,
    removeFromTail: false,
    removeFromTailLoading: false,
    addByIndex: false,
    addByIndexLoading: false,
    removeByIndex: false,
    removeByIndexLoading: false,
  });
  const defaulLoaderState = () => {
    setLoaderState({
      addToHead: false,
      addToHeadLoading: false,
      addToTail: false,
      addToTailLoading: false,
      removeFromHead: false,
      removeFromHeadLoading: false,
      removeFromTail: false,
      removeFromTailLoading: false,
      addByIndex: false,
      addByIndexLoading: false,
      removeByIndex: false,
      removeByIndexLoading: false,
    });
  };
  const changeValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const changeIndex = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(evt.target.value);
  };
  const time = 1000;
  const linkedList = useMemo(() => {
    const list = new LinkedList<string>();
    const items = ["0", "34", "8", "1"];
    let i = 0;
    let j = 4;
    while (i != j) {
      list.append(items[i]);
      i++;
    }
    setState([...list.print()]);
    return list;
  }, []);

  const addInHead = () => {
    linkedList.insertAt(value, 0);
    state[0] = {
      ...state[0],
      up: (
        <Circle letter={value} state={ElementStates.Changing} isSmall={true} />
      ),
    };
    setLoaderState({
      ...loaderState,
      addToHeadLoading: true,
      addToTail: true,
      removeFromHead: true,
      removeFromTail: true,
      addByIndex: true,
      removeByIndex: true,
    });
    setTimeout(() => {
      setState([...linkedList.print()]);
      setColor({ index: 0, color: true });
      setTimeout(() => {
        setColor({ index: 0, color: false });
        setValue("");
        defaulLoaderState();
      }, time);
    }, time);
  };

  const addInTail = () => {
    linkedList.append(value);
    state[state.length - 1] = {
      ...state[state.length - 1],
      up: (
        <Circle letter={value} state={ElementStates.Changing} isSmall={true} />
      ),
    };
    setLoaderState({
      ...loaderState,
      addToHead: true,
      addToTailLoading: true,
      removeFromHead: true,
      removeFromTail: true,
      addByIndex: true,
      removeByIndex: true,
    });
    setTimeout(() => {
      setState([...linkedList.print()]);
      setColor({ index: state.length, color: true });
      setTimeout(() => {
        setColor({ index: state.length, color: false });
        setValue("");
        defaulLoaderState();
      }, time);
    }, time);
  };

  const deleteInHead = () => {
    linkedList.deleteHead();
    setLoaderState({
      ...loaderState,
      addToHead: true,
      addToTail: true,
      removeFromHeadLoading: true,
      removeFromTail: true,
      addByIndex: true,
      removeByIndex: true,
    });
    const head = {
      ...state[0],
      down: (
        <Circle
          letter={state[0].value}
          state={ElementStates.Changing}
          isSmall={true}
        />
      ),
      value: "",
    };
    const list = [];
    for (let i of state) {
      if (state[0] !== i) {
        list.push(i);
      }
    }
    setState([head, ...list]);
    setTimeout(() => {
      setState([...linkedList.print()]);
      defaulLoaderState();
    }, time);
  };

  const deleteInTail = () => {
    linkedList.removeFrom(state.length - 1);

    setLoaderState({
      ...loaderState,
      addToHead: true,
      addToTail: true,
      removeFromHead: true,
      removeFromTailLoading: true,
      addByIndex: true,
      removeByIndex: true,
    });
    const tail = {
      ...state[state.length - 1],
      down: (
        <Circle
          letter={state[state.length - 1].value}
          state={ElementStates.Changing}
          isSmall={true}
        />
      ),
      value: "",
    };
    const list = [];
    for (let i of state) {
      if (state[state.length - 1] !== i) {
        list.push(i);
      }
    }
    setState([...list, tail]);
    setTimeout(() => {
      setState([...linkedList.print()]);
      defaulLoaderState();
    }, time);
  };

  const addByIndex = () => {
    if (index === "0") {
      addInHead();
    }
    if (Number(index) >= state.length) {
      return;
    } else {
      setLoaderState({
        ...loaderState,
        addToHead: true,
        addToTail: true,
        removeFromHead: true,
        removeFromTail: true,
        addByIndexLoading: true,
        removeByIndex: true,
      });
      linkedList.insertAt(value, Number(index));
      let i = 0;
      function moving() {
        setTimeout(() => {
          const arr = [];
          const item = {
            ...state[i],
            up: (
              <Circle
                letter={value}
                state={ElementStates.Changing}
                isSmall={true}
              />
            ),
          };
          for (let j of state) {
            if (state[i] !== j) {
              arr.push(j);
            } else {
              arr.push(item);
            }
          }
          setState([...arr]);
          if (i < Number(index)) {
            setTimeout(() => {
              setMoveIndex(i - 1);
            }, time);
          }
          i++;
          if (i <= Number(index) + 1) {
            moving();
          } else {
            setState([...linkedList.print()]);
            setColor({ index: i - 2, color: true });
            setMoveIndex(-1);
            setTimeout(() => {
              setColor({ index: i - 2, color: false });
              defaulLoaderState();
              setValue("");
              setIndex("");
            }, time);
          }
        }, time);
      }
      moving();
    }
  };

  const removeByIndex = () => {
    if (index === "0") {
      deleteInHead();
    }
    if (Number(index) >= state.length) {
      return;
    } else {
      setLoaderState({
        ...loaderState,
        addToHead: true,
        addToTail: true,
        removeFromHead: true,
        removeFromTail: true,
        addByIndex: true,
        removeByIndexLoading: true,
      });
      linkedList.removeFrom(Number(index));
      let i = 0;
      setMoveIndex(i);
      function move() {
        setTimeout(() => {
          setMoveIndex(i + 1);
          i++;
          if (i <= Number(index) - 1) {
            move();
          } else {
            setTimeout(() => {
              const arr = [];
              const item = {
                ...state[i - 1],
                down: (
                  <Circle
                    letter={state[i - 1].value}
                    state={ElementStates.Changing}
                    isSmall={true}
                  />
                ),
                value: "",
                next: Number(index) === state.length - 1 ? false : true,
              };
              for (let j of state) {
                if (state[i] !== j) {
                  arr.push(j);
                } else {
                  arr.push(item);
                }
              }
              setState([...arr]);
              setMoveIndex(i - 1);
              setTimeout(() => {
                setState([...linkedList.print()]);
                setMoveIndex(-1);
                setValue("");
                setIndex("");
                defaulLoaderState();
              }, time);
            }, time);
          }
        }, time);
      }
      move();
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={style.form}>
        <fieldset className={style.fieldset}>
          <Input
            type="text"
            placeholder="Введите значение"
            maxLength={4}
            isLimitText={true}
            extraClass={style.input}
            onChange={changeValue}
            value={value}
          />
          <Button
            linkedList="small"
            text="Добавить в head"
            type="button"
            onClick={addInHead}
            disabled={!(value.length > 0) || loaderState.addToHead}
            isLoader={loaderState.addToHeadLoading}
          />
          <Button
            linkedList="small"
            text="Добавить в tail"
            type="button"
            onClick={addInTail}
            disabled={!(value.length > 0) || loaderState.addToTail}
            isLoader={loaderState.addToTailLoading}
          />
          <Button
            linkedList="small"
            text="Удалить из head"
            type="button"
            onClick={deleteInHead}
            disabled={loaderState.removeFromHead}
            isLoader={loaderState.removeFromHeadLoading}
          />
          <Button
            linkedList="small"
            text="Удалить из tail"
            type="button"
            onClick={deleteInTail}
            disabled={loaderState.removeFromTail}
            isLoader={loaderState.removeFromTailLoading}
          />
        </fieldset>
        <fieldset className={style.fieldset}>
          <Input
            type="number"
            placeholder="Введите индекс"
            extraClass={style.input}
            onChange={changeIndex}
            max={state.length - 1}
            value={index}
            isLimitText={true}
          />
          <Button
            linkedList="big"
            text="Добавить по индексу"
            type="button"
            onClick={addByIndex}
            disabled={
              !(index.length > 0 && value.length > 0) || loaderState.addByIndex
            }
            isLoader={loaderState.addByIndexLoading}
          />
          <Button
            linkedList="big"
            text="Удалить по индексу"
            type="button"
            onClick={removeByIndex}
            disabled={!(index.length > 0) || loaderState.removeByIndex}
            isLoader={loaderState.removeByIndexLoading}
          />
        </fieldset>
      </form>
      <div className={style.circle_container}>
        {state.map((item, index) => (
          <div className={style.element} key={index}>
            <Circle
              letter={item.value}
              index={index}
              head={item.up ? item.up : index === 0 ? "head" : ""}
              tail={
                item.down ? item.down : index === state.length - 1 ? "tail" : ""
              }
              state={
                index === color.index && color.color
                  ? ElementStates.Modified
                  : index <= moveIndex
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
            />
            {item.next && <ArrowIcon />}
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
