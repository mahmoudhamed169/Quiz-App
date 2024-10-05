interface ButtonIconProps {
  img: string;
  text: string;
  color: string;
  onClick: () => void;
}

function ButtonIcon({ img, text, color, onClick }: ButtonIconProps) {
  return (
    <button
      onClick={onClick}
      className="w-[170px] h-[120px] rounded-lg border-[5px] bg-[#333333] flex flex-col justify-center items-center"
      style={{ borderColor: color }}
    >
      <img src={img} alt="" className="m-2 w-[43px]" />
      <p className="mt-1">{text}</p>
    </button>
  );
}

export default ButtonIcon;
