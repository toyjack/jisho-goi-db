"use client";

import { UseFormRegister } from "react-hook-form";

interface SelectOption {
  value: string | undefined;
  label: string;
}

interface SelectProps {
  labelLeftUppon: string;
  labelRightUppon?: string;
  labelLeftBottom?: string;
  labelRightBottom?: string;
  placeholder?: string;
  name: string;
  register: UseFormRegister<any>;
  defaultValue?: string;
  options?: SelectOption[];
}

function Select({
  labelLeftUppon,
  labelRightUppon,
  labelLeftBottom,
  labelRightBottom,
  name,
  register,
  defaultValue,
  options,
}: SelectProps) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{labelLeftUppon}</span>
        <span className="label-text-alt">{labelRightUppon}</span>
      </div>
      <select
        className="select select-bordered"
        {...register(name)}
        defaultValue={defaultValue}
      >
        {Array.isArray(options) &&
          options.map((option: SelectOption, index: number) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      <div className="label">
        <span className="label-text-alt">{labelLeftBottom}</span>
        <span className="label-text-alt">{labelRightBottom}</span>
      </div>
    </label>
  );
}

export default Select;
