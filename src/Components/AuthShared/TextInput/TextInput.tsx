import React, { ComponentProps, ReactNode } from "react";

type TextInputProps = {
  label: string;
  startIcone: ReactNode;
  error?: string | undefined;
} & ComponentProps<"input">;

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, startIcone, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 mb-3 w-full">
        <label
          htmlFor={props.id}
          className="block  text-[#ffff] ms-6 font-bold text-lg">
          {label}
        </label>
        <div className="relative ">
          <div className="absolute inset-y-0 start-5 flex items-center pointer-events-none">
            {startIcone}
          </div>
          <input
            ref={ref}
            type="text"
            className={`focus:ring-0 bg-[#0D1321] border-[3px] focus:outline-none ${
              error
                ? "focus:border-red-500 border-red-500"
                : "focus:border-[#C5D86D] border-[#fff]"
            } text-[#ffff] text-lg h-[50px] rounded-lg block w-full ps-[3.5rem] p-7`}
            {...props}
          />
        </div>
        {error && <p className="text-red-500 ms-6">{error}</p>}
      </div>
    );
  }
);

export default TextInput;
