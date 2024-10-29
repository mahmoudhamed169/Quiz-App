import React, { forwardRef } from "react";

export const SelectInput = forwardRef(function SelectInput(
  {
    title,
    options,
    ...props
  }: {
    title: string;
    options: string[];
  },
  ref: Ref<HTMLSelectElement>
) {
  return (
    <>
      <select
        className={`w-full  placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[5rem] py-2 focus:border-[#C5D86D] focus:outline-none focus:ring-1 focus:ring-[#C5D86D]`}
        {...props}
        ref={ref}>
        {options.map((value) => (
          <option className="text-end font-bold">{value}</option>
        ))}
      </select>

      <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
        {title}
      </label>
    </>
  );
});
