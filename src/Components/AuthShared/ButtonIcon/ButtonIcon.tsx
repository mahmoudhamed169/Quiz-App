import React from "react";

export default function ButtonIcon({ img, text, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-[170px] h-[120px] rounded-lg border-[5px] bg-[#333333] border-[${color}] flex flex-col justify-center items-center `}
    >
      <img src={img} alt="" className="m-2 w-[43px]" />
      <p className="mt-1">{text}</p>
    </button>
  );
}
