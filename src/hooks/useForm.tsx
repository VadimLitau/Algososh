import React, { ChangeEvent, SetStateAction, useState } from "react";

const useForm = () => {
  interface IUseForm {
    string: string;
  }
  const [state, setState] = useState<IUseForm & any>({
    string: "",
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
//с формами я обязательно разберусь =)
