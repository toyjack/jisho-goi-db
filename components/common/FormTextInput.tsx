"use client";

function FormTextInput({
  labelLeftUppon,
  labelRightUppon,
  labelLeftBottom,
  labelRightBottom,
  placeholder,
  inputValue,
  getInputValue,
}: {
  labelLeftUppon?: string;
  labelRightUppon?: string;
  labelLeftBottom?: string;
  labelRightBottom?: string;
  placeholder?: string;
  inputValue?: string;
  getInputValue: (value: string) => void;
}) {
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
        value={inputValue}
        onChange={(e) => getInputValue(e.target.value)}
      />
      <label className="label">
        <span className="label-text-alt">{labelLeftBottom}</span>
        <span className="label-text-alt">{labelRightBottom}</span>
      </label>
    </div>
  );
}

export default FormTextInput;
