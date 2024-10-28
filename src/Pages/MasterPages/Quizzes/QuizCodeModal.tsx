import { Button, Modal, TextInput } from "flowbite-react";
import { Trash, Trash2 } from "lucide-react";
import { RefObject, useEffect, useRef, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { DeleteModalType } from "../../../InterFaces/Interfaces";
import deleteImg from "../../../../src/assets/delete.png";
import TrueIcon from "../../../Icones/TrueIcon";
import EmailIcone from "../../../Icones/EmailIcone";
import CopyIcon from "../../../Icones/CopyIcon";
import toast from "react-hot-toast";

interface Props {
  code: string;
  handelCloseModle: (value: boolean) => void;
  openModal: boolean;
  modalRef: RefObject<HTMLDivElement>;
}
export default function QuizCodeModal({
  code,
  openModal,
  handelCloseModle,
  modalRef,
}: Props) {
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code is copied");
    handelCloseModle(false);
  };
  return (
    <Modal show={openModal} size="lg" popup ref={modalRef}>
      <Modal.Header onClick={() => handelCloseModle(false)} />
      <Modal.Body className="px-16">
        <div className="flex flex-col items-center gap-8">
          <TrueIcon />
          <span className="text-3xl text-center font-bold ">
            Quiz was created successfully
          </span>

          <div className="relative w-full mb-6">
            <input
              type="text"
              value={code}
              readOnly
              className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[5rem] py-2 focus:border-[#C5D86D] focus:outline-none focus:ring-1 focus:ring-[#C5D86D]`}
              placeholder="Enter Quiz Title"
            />
            <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
              Code:
            </label>
            <div
              className="absolute top-[0.7rem] right-2 cursor-pointer"
              onClick={copyCode}>
              <CopyIcon />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
