import { Eye, EyeOff } from "lucide-react";
import React, { ComponentProps, useState } from "react";
import PasswordKeyIcone from "../../../Icones/PasswordKeyIcone";

type PasswordInputProps = {
  label: string;
  error?: string;
} & ComponentProps<"input">;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="flex flex-col gap-2 mb-3">
        <label
          htmlFor={props.id || "password-input"}
          className="block  text-[#ffff] ms-6 font-bold text-lg">
          {label}
        </label>
        <div className="relative  flex items-center">
          <div className="absolute inset-y-0 start-[1rem] flex items-center pointer-events-none">
            <PasswordKeyIcone />
          </div>
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            id={props.id || "password-input"}
            className={`bg-[#0D1321] border-[3px] focus:outline-none focus:border-[#C5D86D] border-[#fff] text-[#ffff] text-lg h-[50px] rounded-lg block w-full ps-[3.5rem] p-7 ${
              error ? "border-red-500" : ""
            }`}
            {...props}
            placeholder="Type your password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute end-5 text-white">
            {showPassword ? <EyeOff size={30} /> : <Eye size={30} />}
          </button>
        </div>
        {error && <p className="text-red-500 ms-6">{error}</p>}
      </div>
    );
  }
);

export default PasswordInput;
