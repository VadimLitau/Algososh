import { ElementStates } from "../../types/element-states";
export interface INewArr {
  item: number;
  state?: ElementStates;
}
export interface IRadioInput {
  choice: boolean;
  bubble: boolean;
}

export interface IBtnLoader {
  ascendens: boolean;
  descendens: boolean;
  newArray: boolean;
  ascendensDisabled: boolean;
  descendensDisabled: boolean;
  newArrayDisabled: boolean;
}
