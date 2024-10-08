import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import CustomBtn from "../../../Components/MasterShared/CustomBtn/CustomBtn";

export default function GroupDataModel() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CustomBtn text="Add Group" onClick={() => setIsOpen(true)} />
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-lg transition-transform transform-gpu translate-y-0 animate-slide-in">
            <div className="flex justify-between border-b items-center ">
              <h5 className="font-bold text-xl leading-6 p-5">
                Set up a new Group
              </h5>
              <div className="flex">
                <button className="text-2xl font-extrabold w-[80px] h-full border-l py-5">
                  {"\u2713"}
                </button>
                <button className="text-2xl font-extrabold border-l py-5 w-[80px]">
                  {"\u2717"}
                </button>
              </div>
            </div>

            <p>This will permanently deactivate your account.</p>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Deactivate
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <style jsx>{`
        .animate-slide-in {
          opacity: 0;
          transform: translateY(-20px);
          animation: slideIn 0.3s forwards;
        }

        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
