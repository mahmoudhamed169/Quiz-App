import { Button, Modal } from "flowbite-react";
import { Trash, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { DeleteModalType } from "../../../InterFaces/Interfaces";
import deleteImg from "../../../../src/assets/delete.png";
import useOpenCloseModal from "../../../Hooks/useClickOutside";

export function DeleteModal({
  onConfirm,
  title,
  openModal,
  setOpenModal,
  modalRef,
  loading,
}: DeleteModalType) {
  console.log(openModal);
  return (
    <>
      <Modal show={openModal} size="md" popup ref={modalRef}>
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
              <Button disabled={loading} color="failure" onClick={onConfirm}>
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
