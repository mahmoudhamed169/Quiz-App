import { Button, Modal } from "flowbite-react";
import { Trash, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { DeleteModalType } from "../../../InterFaces/Interfaces";
import deleteImg from "../../../../src/assets/delete.png";

export function DeleteModal({
  setOpenModal,
  openModal,
  onConfirm,
  title,
}: DeleteModalType) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenModal(false);
        console.log(modalRef);
      }
    };

    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal, setOpenModal]);
  return (
    <>
      <Modal show={openModal} size="md" ref={modalRef} popup>
        <Modal.Header onClick={() => setOpenModal(false)} />
        <Modal.Body>
          <div className="text-center">
            <div className="flex justify-center">
              <img className="w-3/4" src={deleteImg} />
            </div>

            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {`Are you sure you want to delete this ${title}?`}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={onConfirm}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
