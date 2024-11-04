import { AxiosError } from "axios";
import { Button, Modal } from "flowbite-react";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { apiClient } from "../../../Apis/EndPoints";
import { joinQuiz } from "../../../InterFaces/Interfaces";

interface Props {
  handelCloseModle: () => void;
  openModal: boolean;
}

export default function JoinQuizModel({ handelCloseModle, openModal }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setValue,
  } = useForm<{ code: string }>();
  const handleClose = () => {
    reset();
    handelCloseModle();
  };
  const onSubmit: SubmitHandler<{ code: string }> = async (data) => {
    const toastId = toast.loading("Processing...");
    setLoading(true);
    try {
      const response = await apiClient.post<joinQuiz>("/quiz/join", data);
      console.log(response);
      toast.success("Successfully joined the quiz!", { id: toastId });
      handleClose();
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={openModal} onClose={handelCloseModle} size="xl">
      <Modal.Body className="pb-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[80%] m-auto text-center flex flex-col gap-11 mt-16 ">
            <h2 className="font-extrabold text-3xl ">Join Quiz</h2>
            <div className="flex flex-col gap-3">
              <p className="font-medium text-lg">
                Input the code received for the quiz below to join
              </p>
              <div className="flex flex-col gap-1">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[5rem] py-2 focus:border-[#C5D86D] focus:outline-none focus:ring-1 focus:ring-[#C5D86D]"
                    placeholder="Enter Quiz code"
                    {...register("code", { required: "code is required" })}
                  />
                  <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                    code:
                  </label>
                </div>
                {errors.code && (
                  <span className="text-red-600 ms-1">
                    {errors.code.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex border-l border-t border-r w-[200px] m-auto rounded-[10px]">
              <button
                type="submit"
                className="text-2xl font-extrabold w-[100px] h-full border-r py-5"
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? (
                  <Loader className="loader-spin m-auto " />
                ) : (
                  "\u2713"
                )}
              </button>
              <button
                type="button"
                className="text-2xl font-extrabold py-5 w-[100px]"
                onClick={handleClose}
              >
                {"\u2717"}
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
