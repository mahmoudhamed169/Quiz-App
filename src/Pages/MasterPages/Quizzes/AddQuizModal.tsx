import { Modal } from "flowbite-react";
import { Loader } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { apiClient } from "../../../Apis/EndPoints";
import toast from "react-hot-toast";
import { RefObject, useEffect, useState } from "react";
import { Group, QuizRequest } from "../../../InterFaces/Interfaces";
import { SelectInput } from "./SelectInput";

interface Props {
  handelCloseModle: () => void;
  openModal: boolean;
  modalRef: RefObject<HTMLDivElement>;
}

export default function AddQuizModal({
  openModal,
  handelCloseModle,
  modalRef,
}: Props) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();
  const [groups, setGroups] = useState<Group[]>([]);
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Processing...");
    try {
      const { Date, time, groupName, ...other } = data;
      const group = groups.find((group) => group.name == groupName);
      const schadule = `${Date}T${time}:00`;
      const finalData = { group: group?._id, schadule, ...other };
      await apiClient.post<QuizRequest>("quiz", finalData);

      toast.success("Quiz Created Successfully", {
        id: toastId,
      });

      setTimeout(() => {
        reset();
        handelCloseModle();
      }, 500);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    }
  };
  const getAllGroups = async () => {
    try {
      const response = await apiClient.get<Group[]>("group");
      setGroups(response.data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred");
    }
  };
  useEffect(() => {
    getAllGroups();
  }, []);
  return (
    <Modal
      show={openModal}
      size="4xl"
      onClose={handelCloseModle}
      popup
      ref={modalRef}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between border-b items-center">
          <h5 className="font-bold text-xl leading-6 p-5">Set up a new quiz</h5>
          <div className="flex">
            <button
              type="submit"
              className={`text-2xl font-extrabold w-[80px] h-full border-l py-5${
                isSubmitting ? "cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}>
              {isSubmitting ? <Loader className="loader-spin m-auto" /> : "✓"}
            </button>

            <button
              type="button"
              className="text-2xl font-extrabold border-l py-5 w-[80px]"
              onClick={handelCloseModle}>
              {"✗"}
            </button>
          </div>
        </div>
        <Modal.Body className="mt-2 bg-white rounded-md">
          <h4 className="font-black my-1 mx-2">Details</h4>
          <div className="w-full flex flex-col gap-3">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <div className="relative w-full">
                <input
                  type="text"
                  className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[5rem] py-2 focus:border-[#C5D86D] focus:outline-none focus:ring-1 focus:ring-[#C5D86D]`}
                  placeholder="Enter Quiz Title"
                  {...register("title", { required: "Title is required" })}
                />
                <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                  Title:
                </label>
              </div>

              <ErrorSpan error={errors.title?.message?.toString()} />
            </div>
            {/* quiz options1 */}
            <div className="flex flex-col lg:flex-row gap-5 ">
              <div className="relative basis-1/3">
                <SelectInput
                  title={"Duration (in minutes)"}
                  options={["10", "20", "30"]}
                  {...register("duration", {
                    required: "Duration is required",
                  })}
                />
                <ErrorSpan error={errors.duration?.message?.toString()} />
              </div>
              <div className="relative basis-1/3">
                <SelectInput
                  title={"No. of questions"}
                  options={["15", "30", "45"]}
                  {...register("questions_number", {
                    required: "Questions number is required",
                  })}
                />
                <ErrorSpan
                  error={errors.questions_number?.message?.toString()}
                />
              </div>
              <div className="relative basis-1/3">
                <SelectInput
                  title={"Score per question"}
                  options={["1", "2", "3"]}
                  {...register("score_per_question", {
                    required: "Score per question is required",
                  })}
                />
              </div>
            </div>
            {/* quiz description */}
            <div>
              <div className="relative w-full">
                <textarea
                  rows={2}
                  className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[8.2rem] py-2 focus:border-[#C5D86D] focus:outline-none focus:ring-1 focus:ring-[#C5D86D] resize-none `}
                  placeholder="More details"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                <label className="font-extrabold absolute left-2 top-2 bottom-4 flex items-center text-black bg-[#FFEDDF] px-3 rounded-lg">
                  Description:
                </label>
              </div>
              <ErrorSpan error={errors.description?.message?.toString()} />
            </div>
            {/* quiz schedule */}
            <div className="relative w-full flex flex-col lg:flex-row gap-5">
              <div className="relative basis-1/2">
                <input
                  type="date"
                  className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[5rem] py-2 focus:border-[#C5D86D] focus:outline-none focus:ring-1 focus:ring-[#C5D86D]`}
                  placeholder="Enter Question Title"
                  {...register("Date", { required: "Date is required" })}
                />
                <ErrorSpan error={errors.Date?.message?.toString()} />
                <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                  Date:
                </label>
              </div>
              <div className="relative basis-1/2">
                <input
                  type="time"
                  className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[5rem] py-2 focus:border-[#C5D86D] focus:outline-none focus:ring-1 focus:ring-[#C5D86D]`}
                  placeholder="Enter Question Title"
                  {...register("time", { required: "time is required" })}
                />
                <ErrorSpan error={errors.time?.message?.toString()} />
                <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                  time:
                </label>
              </div>
            </div>
            {/* quiz option 2 */}
            <div className="flex flex-col lg:flex-row gap-5 ">
              <div className="relative basis-1/3">
                <SelectInput
                  title={"Difficulty level"}
                  options={["easy", "medium", "hard"]}
                  {...register("difficulty", {
                    required: "difficulty is required",
                  })}
                />
              </div>
              <div className="relative basis-1/3">
                <SelectInput
                  title={"Category type"}
                  options={["FE", "BE"]}
                  {...register("type", {
                    required: "Category type is required",
                  })}
                />
              </div>
              <div className="relative basis-1/3">
                <SelectInput
                  title={"Group name"}
                  options={groups.map((group) => group.name)}
                  {...register("groupName", {
                    required: "Group name is required",
                  })}
                />
                <ErrorSpan error={errors.groupName?.message?.toString()} />
              </div>
            </div>
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
}

const ErrorSpan = ({ error }: { error?: string }) => {
  return error ? <span className="text-red-600 ms-1">{error}</span> : null;
};
