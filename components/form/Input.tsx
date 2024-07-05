import { HTMLInputTypeAttribute } from "react";
import { DefaultInputClasses } from "./constants";

interface Props {
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
}

const Input: React.FC<Props> = ({ name, placeholder, required, type }) => (
  <input
    className={DefaultInputClasses}
    name={name}
    placeholder={placeholder}
    required={required}
    type={type}
  />
);

export default Input;
