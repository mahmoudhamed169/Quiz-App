import { CircleChevronDown, ListFilter } from "lucide-react";
import React, { ComponentProps, ReactNode } from "react";

type SelectOptionProps = {
  label: string;
  startIcone: ReactNode;
  error?: string | undefined;
} & ComponentProps<"select">;

const SelectOption = React.forwardRef<HTMLSelectElement, SelectOptionProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 mb-3">
        <label
          htmlFor={props.id}
          className="block  text-[#ffff] ms-6 font-bold text-lg"
        >
          {label}
        </label>

        <div className="relative">
          <select

            className={`  text-lg ps-[3.7rem] block w-full appearance-none border-[3px] focus:outline-none focus:border-[${
              error ? "" : "#C5D86D"
            }] bg-[#0D1321] border-white rounded-lg py-3 pl-10 pr-10 text-white cursor-pointer ${
              error ? "border-red-500" : ""
            }`}
            ref={ref}
            {...props}
          >
            <option value="Choose your role"  selected disabled>Choose your role</option>
            <option value="Instractor" className="">Instractor</option>
            <option value="Student">Student</option>
          </select>
          {/* Start Icon */}
          <div className="absolute inset-y-0 start-5 flex items-center pointer-events-none">
          <ListFilter size={28} />
          </div>
          {/* End Icon */}
          <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
          <CircleChevronDown size={28} />
          </div>
        </div>
      </div>
    );
  }
);

export default SelectOption;
