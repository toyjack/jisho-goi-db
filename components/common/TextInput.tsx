"use client";

import { UseFormRegister } from "react-hook-form";

interface InputProps {
  labelLeftUppon: string;
  labelRightUppon?: string;
  labelLeftBottom?: string;
  labelRightBottom?: string;
  placeholder?: string;
  name: string;
  register: UseFormRegister<any>;
}

function TextInput({
  labelLeftUppon,
  labelRightUppon,
  labelLeftBottom,
  labelRightBottom,
  placeholder,
  name,
  register,
}: InputProps) {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{labelLeftUppon}</span>
        <span className="label-text-alt">{labelRightUppon}</span>
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
        {...register(name)}
      />
      <label className="label">
        <span className="label-text-alt">{labelLeftBottom}</span>
        <span className="label-text-alt">{labelRightBottom}</span>
      </label>
    </div>
  );
}

export default TextInput;
