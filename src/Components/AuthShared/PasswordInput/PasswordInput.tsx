import { Eye, EyeOff } from "lucide-react";
import React, { ComponentProps, useState } from "react";

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
      <div className="flex flex-col gap-2">
        <label
          htmlFor={props.id || "password-input"}
          className="block  text-[#ffff] ms-6 font-bold text-lg"
        >
          {label}
        </label>
        <div className="relative  flex items-center">
          <div className="absolute inset-y-0 start-[1rem] flex items-center pointer-events-none">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 8.5938C25 13.34 21.1524 17.1875 16.4062 17.1875C15.8584 17.1875 15.3228 17.1356 14.8034 17.0376L13.6309 18.3567C13.521 18.4804 13.3861 18.5794 13.2351 18.6472C13.0841 18.715 12.9205 18.75 12.755 18.75H10.9375V20.7031C10.9375 21.3503 10.4128 21.875 9.76562 21.875H7.8125V23.8281C7.8125 24.4753 7.28784 25 6.64062 25H1.17188C0.524658 25 0 24.4753 0 23.8281V20.0167C0 19.7059 0.123486 19.4078 0.343213 19.188L8.2437 11.2875C7.96426 10.4401 7.8125 9.53472 7.8125 8.59375C7.8125 3.84756 11.66 4.88286e-05 16.4062 4.66434e-10C21.1664 -4.88277e-05 25 3.83355 25 8.5938ZM16.4062 6.25C16.4062 7.54443 17.4556 8.59375 18.75 8.59375C20.0444 8.59375 21.0938 7.54443 21.0938 6.25C21.0938 4.95557 20.0444 3.90625 18.75 3.90625C17.4556 3.90625 16.4062 4.95557 16.4062 6.25Z"
                fill="white"
              />
            </svg>
          </div>
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            id={props.id || "password-input"}
            className={`bg-[#0D1321] border-[3px] focus:outline-[3px] focus:outline-[#ffff] border-[#fff] text-[#ffff] text-lg h-[50px] rounded-lg block w-full ps-[3.5rem] p-7 ${
              error ? "border-red-500" : ""
            }`}
            {...props}
            placeholder="Type your password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute end-5 text-white"
          >
            {showPassword ? <EyeOff size={30} /> : <Eye size={30} />}
          </button>
        </div>
        {error && <p className="text-red-500 ms-6">{error}</p>}
      </div>
    );
  }
);

export default PasswordInput;
