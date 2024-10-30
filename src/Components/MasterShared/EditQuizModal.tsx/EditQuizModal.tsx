import { Button, Modal } from "flowbite-react";
import { UpdateModalType } from "../../../InterFaces/Interfaces";
import { useState } from "react";

export function EditQuizModal({
  onConfirm,
  title,
  openModal,
  setOpenModal,
  modalRef,
  loading,
}: UpdateModalType) {
  const [quizTitle, setQuizTitle] = useState<string>(title);
  return (
    <>
      <Modal show={openModal} size="md" popup ref={modalRef}>
        <Modal.Header onClick={() => setOpenModal(false)} />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {`Update quiz title`}
            </h3>
            <div className="flex flex-col gap-1 mt-5">
              <div className="relative w-full">
                <input
                  type="text"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  className={`w-full bg-transparent pl-[5rem] placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[5rem] py-2 focus:border-[#C5D86D] focus:outline-none focus:ring-1 focus:ring-[#C5D86D]`}
                  placeholder="Enter Quiz Title"
                />
                <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                  Title
                </label>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-5">
              <Button
                disabled={loading}
                color="failure"
                onClick={() => onConfirm(quizTitle)}>
                {"Edit quiz"}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
