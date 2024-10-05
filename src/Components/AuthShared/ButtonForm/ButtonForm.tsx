import React from "react";
import TrueIcone from "../../../Icones/TrueIcone";

export default function ButtonForm({ text }) {
  return (
    <button className="w-[150px] h-[50px] bg-[#F5F5F5] font-bold text-lg rounded-lg text-[#000] flex justify-center items-center  gap-2">
      <p>{text}</p>
      <TrueIcone />
    </button>
  );
}
