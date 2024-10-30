import React, { usequiz, useState } from "react";
import ArrowIcon from "../../../Icones/ArrowIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { Quiz } from "../../../InterFaces/Interfaces";
import SechudleIcon from "../../../Icones/SechudleIcon";
import {
  Clock10Icon,
  DeleteIcon,
  Edit2Icon,
  Edit3Icon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import TextInput from "../../../Components/AuthShared/TextInput/TextInput";
import { Button } from "flowbite-react";
import { DeleteModal } from "../../../Components/MasterShared/DeleteModal/DeleteModal";
import useOpenCloseModal from "../../../Hooks/useClickOutside";
import toast from "react-hot-toast";
import { apiClient } from "../../../Apis/EndPoints";
import { AxiosError } from "axios";
import { EditQuizModal } from "../../../Components/MasterShared/EditQuizModal.tsx/EditQuizModal";

export default function QuizData() {
  const { state }: { quiz: Quiz } = useLocation();
  const [quiz, setQuiz] = useState<Quiz>(state);
  const quizId = quiz._id;
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    openModal: openDeleteModal,
    setOpenModal: setOpenDeleteModal,
    modalRef: deleteModalRef,
  } = useOpenCloseModal();
  const {
    openModal: openUpdateModal,
    setOpenModal: setOpenUpdateModal,
    modalRef: updateModalRef,
  } = useOpenCloseModal();

  const convertDate = (date: string) => {
    const dateFromApi = new Date(date);
    const readableDate = dateFromApi.toLocaleString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    return readableDate;
  };
  const convertClock = (date: string) => {
    const dateFromApi = new Date(date);
    const readableDate = dateFromApi.toLocaleString("en-US", {
      minute: "numeric",
      hour: "numeric",
    });
    return readableDate;
  };
  const deleteQuiz = async () => {
    const toastId = toast.loading("Processing...");
    setLoading(true);
    try {
      await apiClient.delete(`quiz/${quiz?._id}`);

      setOpenDeleteModal(false);
      toast.success("Quiz deleted successfully", {
        id: toastId,
      });
      navigate("../Quizzes");

      setLoading(false);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    }
  };
  const getQuizById = async (id: string) => {
    try {
      const response = await apiClient.get(`quiz/${id}`);
      setQuiz(response.data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred");
    }
  };

  const updateQuiz = async (newTitle: string) => {
    const toastId = toast.loading("Processing...");
    setLoading(true);
    try {
      await apiClient.put(`quiz/${quiz?._id}`, { title: newTitle });
      getQuizById(quizId);

      setOpenUpdateModal(false);
      toast.success("Quiz updated successfully", {
        id: toastId,
      });

      setLoading(false);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex  justify-center py-5">
      <div className="border-2 rounded-md w-1/3 p-5 ">
        <div className="box-head flex items-center font-bold text-lg">
          <span
            className="font-bold cursor-pointer"
            onClick={() => navigate("../quizzes")}>
            Quizzes
          </span>
          <span className="ml-10">
            {" "}
            <ArrowIcon />{" "}
          </span>
          <span className="ml-10">{quiz.title}</span>
        </div>
        <div className="box-title mt-5">
          <span className="font-bold text-3xl">{quiz.title}</span>
        </div>
        <div className="box-date flex flex-row gap-7 text-lg mt-5">
          <div className="flex flex-row items-center gap-3 text-lg font-bold">
            <SechudleIcon />
            <span>{convertDate(quiz.createdAt)}</span>
          </div>
          <div className="flex flex-row items-center gap-3 text-lg font-bold">
            <Clock10Icon />
            <span>{convertClock(quiz.createdAt)}</span>
          </div>
        </div>
        <div className="inputs mt-5">
          <CustomTextInput
            title={"Number of questions"}
            value={String(quiz.questions_number)}
          />
          <CustomTextInput
            title={"Score per question"}
            value={String(quiz.score_per_question + "  Points")}
          />
          <CustomTextInput title={"Description"} value={quiz.description} />
          <CustomTextInput title={"Difficulty"} value={quiz.difficulty} />
          <CustomTextInput title={"Type"} value={quiz.type} />
          <CustomTextInput title={"Code"} value={quiz.code} />
        </div>
        <div className="buttons flex justify-between mt-5">
          <button
            onClick={() => setOpenDeleteModal(true)}
            className="flex items-center gap-2 bg-red-700 text-white rounded-lg p-3">
            <TrashIcon /> <span>Delete</span>
          </button>
          <button
            onClick={() => setOpenUpdateModal(true)}
            className="bg-black flex items-center gap-2  text-white rounded-lg p-3">
            <EditIcon />
            <span>Edit</span>
          </button>
        </div>
        <DeleteModal
          openModal={openDeleteModal}
          setOpenModal={setOpenDeleteModal}
          onConfirm={deleteQuiz}
          modalRef={deleteModalRef}
          loading={loading}
          title="quiz"
        />
        <EditQuizModal
          openModal={openUpdateModal}
          setOpenModal={setOpenUpdateModal}
          onConfirm={updateQuiz}
          modalRef={updateModalRef}
          title={quiz.title}
          loading={loading}
        />
      </div>
    </div>
  );
}

const CustomTextInput = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="flex flex-col gap-1 mt-5">
      <div className="relative w-full">
        <input
          type="text"
          value={value}
          readOnly
          className={`w-full bg-transparent pl-[15rem] placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[5rem] py-2 focus:border-[#C5D86D] focus:outline-none focus:ring-1 focus:ring-[#C5D86D]`}
          placeholder="Enter Quiz Title"
        />
        <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
          {title}
        </label>
      </div>
    </div>
  );
};
