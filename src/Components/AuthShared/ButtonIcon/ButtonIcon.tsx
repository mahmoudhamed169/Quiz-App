import { ReactNode } from "react";

interface ButtonIconProps {
  icone: ReactNode;
  text: string;
  color: string;
  onClick: () => void;
}

function ButtonIcon({ icone, text, color, onClick }: ButtonIconProps) {
  return (
    <button
      onClick={onClick}
      className="w-[170px] h-[120px] rounded-lg border-[5px] bg-[#333333] flex flex-col justify-center items-center gap-2"
      style={{ borderColor: color }}
    >
      {icone}
      <p>{text}</p>
    </button>
  );
}

export default ButtonIcon;
