import { CircleChevronDown, ListFilter } from "lucide-react";
import React, { ComponentProps } from "react";

type SelectOptionProps = {
  label: string;

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
            className={` appearance-none focus:ring-0   text-lg ps-[3.7rem] block w-full  border-[3px] focus:outline-none focus:border-[${
              error ? "#C5D86D" : "#C5D86D"
            }] bg-[#0D1321] rounded-lg py-3 pl-10 pr-10 text-white cursor-pointer ${
              error ? "border-red-500" : "border-white"
            }`}
            ref={ref}
            {...props}
          >
            <option value="" selected disabled>
              Choose your role
            </option>
            <option value="Instructor">Instractor</option>
            <option value="Student">Student</option>
          </select>

          <div className="absolute inset-y-0 start-5 flex items-center pointer-events-none">
            <ListFilter size={28} />
          </div>

          {/* <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
            <CircleChevronDown size={28} />
          </div> */}
        </div>

        {error && <p className="text-red-500 ms-6">{error}</p>}
      </div>
    );
  }
);

export default SelectOption;
