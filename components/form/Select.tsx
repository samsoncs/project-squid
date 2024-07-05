import { DefaultInputClasses } from "./constants";

interface Props {
  name: string;
  options: { id: string; name: string }[];
}

const Select: React.FC<Props> = ({ name, options }) => (
  <select className={DefaultInputClasses} name={name}>
    {options.map((o) => (
      <option value={o.id}>{o.name}</option>
    ))}
  </select>
);

export default Select;
