import { Button, Modal } from "flowbite-react";
import { Loader, Moon } from "lucide-react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { apiClient } from "../../../Apis/EndPoints";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { IQuestion } from "../../../InterFaces/Interfaces";

interface Props {
  handelCloseModle: () => void;
  openModal: boolean;
  getQuestions: () => void;
  mode: "view" | "edit" | "add";
  questionData?: IQuestion;
}

export default function QuestionData({
  handelCloseModle,
  openModal,
  getQuestions,
  mode,
  questionData,
}: Props) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setValue,
  } = useForm<QuestionData>();

  useEffect(() => {
    if (questionData) {
      setValue("title", questionData.title);
      setValue("description", questionData.description);
      setValue("options.A", questionData.options.A);
      setValue("options.B", questionData.options.B);
      setValue("options.C", questionData.options.C);
      setValue("options.D", questionData.options.D);
      setValue("answer", questionData.answer);
      setValue("difficulty", questionData.difficulty);
      setValue("type", questionData.type);
    }
  }, [mode, questionData, setValue]);

  const handleApiResponse = async (
    requestFunc: () => Promise<any>,
    successMessage: string
  ) => {
    const toastId = toast.loading("Processing...");
    try {
      await requestFunc();
      toast.success(successMessage, { id: toastId });
      getQuestions();
      handelCloseModle();
      reset();
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "An error occurred",
        {
          id: toastId,
        }
      );
      console.error(error);
    }
  };

  const addQuestion = async (data: QuestionData) => {
    await handleApiResponse(
      () => apiClient.post("/question", data),
      "Question created successfully!"
    );
  };

  const editQuestion = async (data: Pick<QuestionData, "answer">) => {
    if (!questionData?._id) {
      throw new Error("Question ID is missing.");
    }

    await handleApiResponse(
      () => apiClient.put(`/question/${questionData._id}`, data),
      "Question updated successfully!"
    );
  };

  const onSubmit = async (data: QuestionData) => {
    try {
      if (mode === "edit") {
        await editQuestion({ answer: data.answer });
      } else if (mode === "add") {
        await addQuestion(data);
      } else {
        toast.error("Invalid mode selected.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  const handleClose = () => {
    reset();
    handelCloseModle();
  };

  const isReadOnly = mode === "view" || (mode === "edit" && true);

  return (
    <Modal show={openModal} size="4xl" onClose={handleClose} popup>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between border-b items-center">
          <h5 className="font-bold text-xl leading-6 p-5">
            {mode === "view"
              ? "View Question"
              : mode === "edit"
              ? "Edit Question"
              : "Add Question"}
          </h5>
          <div className="flex">
            {mode !== "view" && (
              <button
                type="submit"
                className="text-2xl font-extrabold w-[80px] h-full border-l py-5"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader className="loader-spin m-auto" /> : "✓"}
              </button>
            )}
            <button
              type="button"
              className="text-2xl font-extrabold border-l py-5 w-[80px]"
              onClick={handleClose}
            >
              {"✗"}
            </button>
          </div>
        </div>
        <Modal.Body className="mt-2">
          <h4 className="font-black my-1 mx-2">Details</h4>
          <div className="w-full flex flex-col gap-3">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <div className="relative w-full">
                <input
                  type="text"
                  className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[5rem] py-2 focus:border-[#C5D86D] focus:outline-none focus:ring-1 focus:ring-[#C5D86D] ${
                    isReadOnly ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  placeholder="Enter Question Title"
                  readOnly={isReadOnly}
                  {...register("title", { required: "Title is required" })}
                />
                <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                  Title:
                </label>
              </div>
              {errors.title && (
                <span className="text-red-600 ms-1">
                  {errors.title.message}
                </span>
              )}
            </div>
            {/* Description */}
            <div className="flex flex-col gap-1">
              <div className="relative w-full">
                <textarea
                  rows="2"
                  className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[8.2rem] py-2 focus:border-[#C5D86D] focus:outline-none focus:ring-1 focus:ring-[#C5D86D] resize-none ${
                    isReadOnly ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  placeholder="More details"
                  readOnly={isReadOnly}
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                <label className="font-extrabold absolute left-2 top-2 bottom-4 flex items-center text-black bg-[#FFEDDF] px-3 rounded-lg">
                  Description:
                </label>
              </div>
              {errors.description && (
                <span className="text-red-600 ms-1">
                  {errors.description.message}
                </span>
              )}
            </div>
            {/* Options A, B, C, D (two per row) */}
            <div className="grid grid-cols-2 gap-3">
              {["A", "B", "C", "D"].map((option) => (
                <div key={option} className="flex flex-col gap-1">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[5rem] py-2 focus:border-[#C5D86D] focus:outline-none focus:ring-1 focus:ring-[#C5D86D] ${
                        isReadOnly ? "cursor-not-allowed opacity-50" : ""
                      }`}
                      placeholder={`Option ${option}`}
                      readOnly={isReadOnly}
                      {...register(`options.${option}`, {
                        required: `Option ${option} is required`,
                      })}
                    />
                    <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                      {option}:
                    </label>
                  </div>
                  {errors.options?.[option] && (
                    <span className="text-red-600 ms-1">
                      {errors.options[option]?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* Answer */}
            <div className="flex flex-col gap-1">
              <div className="relative w-full">
                <select
                  className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[7.5rem] py-2 focus:border-[#C5D86D] focus:outline-none focus:ring-1 focus:ring-[#C5D86D] ${
                    mode === "view" ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  {...register("answer", {
                    required: "Answer is required",
                  })}
                  disabled={mode === "view"}
                >
                  <option value="">Select Answer</option>
                  {["A", "B", "C", "D"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <label className="font-extrabold absolute left-2 top-2 flex items-center text-black bg-[#FFEDDF] px-3 rounded-lg">
                  Answer:
                </label>
              </div>
              {errors.answer && (
                <span className="text-red-600 ms-1">
                  {errors.answer.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Difficulty */}
              <div className="flex flex-col gap-1">
                <div className="relative w-full">
                  <select
                    className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[8rem] py-2 focus:border-[#C5D86D] focus:outline-none focus:ring-1 focus:ring-[#C5D86D] ${
                      isReadOnly ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    {...register("difficulty", {
                      required: "Difficulty is required",
                    })}
                    disabled={isReadOnly}
                  >
                    <option value="">Select Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                  <label className="font-extrabold absolute left-2 top-2 flex items-center text-black bg-[#FFEDDF] px-3 rounded-lg">
                    Difficulty:
                  </label>
                </div>
                {errors.difficulty && (
                  <span className="text-red-600 ms-1">
                    {errors.difficulty.message}
                  </span>
                )}
              </div>

              {/* Type */}
              <div className="flex flex-col gap-1">
                <div className="relative w-full">
                  <select
                    className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[7rem] py-2 focus:border-[#C5D86D] focus:outline-none focus:ring-1 focus:ring-[#C5D86D] ${
                      isReadOnly ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    {...register("type", {
                      required: "Type is required",
                    })}
                    disabled={isReadOnly}
                  >
                    <option value="">Select Type</option>
                    <option value="BE">Back-End</option>
                    <option value="FE">Front-End</option>
                    <option value="ShortAnswer">True/False</option>
                    <option value="MCQ">MCQ</option>
                  </select>
                  <label className="font-extrabold absolute left-2 top-2 flex items-center text-black bg-[#FFEDDF] px-3 rounded-lg">
                    Type:
                  </label>
                </div>
                {errors.type && (
                  <span className="text-red-600 ms-1">
                    {errors.type.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
}
