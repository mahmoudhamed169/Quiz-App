import React, { forwardRef, ComponentProps } from "react";
import AddIcone from "../../../Icones/AddIcone";

interface IProps extends ComponentProps<"button"> {
  text: string;
}

const CustomBtn = forwardRef<HTMLButtonElement, IProps>(
  ({ text, ...rest }: IProps, ref) => {
    return (
      <button
        ref={ref}
        className="flex items-center gap-[5px] border border-[#0000005b] h-[40px] p-3 rounded-3xl"
        {...rest}
      >
        <AddIcone />
        <p>{text}</p>
      </button>
    );
  }
);

export default CustomBtn;
