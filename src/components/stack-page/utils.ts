export class Stack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length !== 0) {
      this.container.pop();
    }
  };

  clear = () => {
    this.container = [];
  };
  getItems = () => {
    const arr = [];
    for (let i of this.container) arr.push(i);
    return arr;
  };
}

export const TIMER = 1000;
