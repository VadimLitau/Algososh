import React, { ChangeEvent, SetStateAction, useState } from "react";

const useForm = () => {
  interface IUseForm {
    string: string;
    fibonacci: number;
  }
  const [state, setState] = useState<IUseForm & any>({
    string: "",
    fibonacci: 0,
  });

  const handleChange = (
    e: SetStateAction<IUseForm> & ChangeEvent<HTMLInputElement>
  ) => {
    e.persist();
    setState((state: IUseForm) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  return [state, handleChange];
};
export default useForm;
