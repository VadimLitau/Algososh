export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export interface ILinkedItem {
  value: string;
  up: React.ReactElement | null;
  down: React.ReactElement | null;
  next: boolean;
}

interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor(defaultValues?: T[]) {
    this.head = null;
    this.size = 0;
    if (defaultValues) {
      defaultValues.forEach((value) => this.append(value));
    }
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index >= this.size) {
      return;
    }
    const node = new Node(element);

    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let curr = this.head;
      let currIndex = 0;
      while (currIndex < index - 1) {
        curr = curr!.next;
        currIndex++;
      }
      node.next = curr!.next;
      curr!.next = node;
    }

    this.size++;
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
    }
  }

  removeFrom(index: number) {
    if (index > 0 && index > this.size) return -1;
    //else {
    let current,
      previous,
      it = 0;
    current = this.head;
    previous = current;

    if (index == 0) {
      this.head = current ? current : null;
    } else {
      while (it < index) {
        it++;
        previous = current;
        if (current) {
          current = current.next;
        }
      }
      if (previous) {
        previous.next = current ? current.next : null;
      }
    }
    this.size--;
    //}
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res: ILinkedItem[] = [];
    while (curr) {
      res = [
        ...res,
        {
          value: `${curr.value}`,
          next: curr.next ? true : false,
          down: null,
          up: null,
        },
      ];
      curr = curr.next;
    }
    return res;
  }
}

export const DEF_LOADER_STATE = {
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
};

export const TIME = 1000;

export const INPUT_MAX_VALUE = 4;
