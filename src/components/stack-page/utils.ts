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
  getSize = () => this.container.length;
}
