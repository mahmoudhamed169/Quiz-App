import React, { useEffect, useState } from "react";
import UpcomingQuiz from "../../../Components/MasterShared/UpcomingQuiz/UpcomingQuiz";
import TopFiveStudents from "../../../Components/MasterShared/TopFiveStudents/TopFiveStudents";
import ClockIcon from "../../../Icones/clockIcon";
import QuestionBankIcon from "../../../Icones/QuestionBankIcon";
import CustomBtn from "../../../Components/MasterShared/CustomBtn/CustomBtn";
import { apiClient } from "../../../Apis/EndPoints";
import { Group, Quiz } from "../../../InterFaces/Interfaces";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react";
import AddQuizModal from "./AddQuizModal";
import Skeleton from "react-loading-skeleton";
import useOpenCloseModal from "../../../Hooks/useClickOutside";
import QuizCodeModal from "./QuizCodeModal";
import Pagination from "../QuestionsList/Pagination";
import CompletedQuizzes from "./CompletedQuizzes";

export const convertDate = (date: string) => {
  const dateFromApi = new Date(date);
  const readableDate = dateFromApi.toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return readableDate;
};
export default function Quizzes() {
  const [quizCode, setQuizCode] = useState<string>("");
  const { openModal, setOpenModal, modalRef } = useOpenCloseModal();
  const {
    openModal: openQuizCodeModal,
    setOpenModal: setOpenQuizCodeModal,
    modalRef: quizCodeModalRef,
  } = useOpenCloseModal();
  const navigate = useNavigate();
  const handelOpenModle = () => {
    setOpenModal(true);
  };

  const handelCloseModle = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-9">
        {/* Add Quiz */}
        <div className="lg:w-[50%] pl-2 lg:pl-3 pt-4 pr-3 lg:pr-0 flex flex-row gap-7 h-max">
          <button
            onClick={handelOpenModle}
            className="flex items-center flex-col border rounded-lg p-3 lg:p-8 w-[50%]">
            <ClockIcon className="w-[40px] h-[40px]" />

            <span className="font-bold mt-2 lg:text-xl">Set up a new quiz</span>
          </button>
          <button
            className="flex items-center flex-col border rounded-lg p-3 lg:p-8 w-[50%]"
            onClick={() => navigate("/dashboard/Questions")}>
            <QuestionBankIcon className="w-[40px] h-[40px]" />

            <span className="font-bold mt-2 lg:text-xl">Question Bank</span>
          </button>
        </div>

        {/* Upcoming Quizzes */}
        <div className=" lg:w-[50%] pl-2 lg:pl-0  pr-3 pt-4 ">
          <UpcomingQuiz minHeight={"300px"} />
          <div className=" border p-7  mt-3 rounded-xl">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xl">Completed Quizzes</h3>

              <div className="flex justify-between items-center">
                <Link
                  to={"/dashboard/results"}
                  className="flex gap-1 items-center font-normal text-xs">
                  Results
                  <MoveRight
                    color="#C5D86D"
                    height={"30px"}
                    width={"18.31px"}
                  />
                </Link>
              </div>
            </div>
            <CompletedQuizzes />
          </div>
        </div>
      </div>
      <AddQuizModal
        openModal={openModal}
        handelCloseModle={handelCloseModle}
        modalRef={modalRef}
        setOpenQuizCodeModal={setOpenQuizCodeModal}
        setQuizCode={setQuizCode}
      />
      <QuizCodeModal
        code={quizCode}
        openModal={openQuizCodeModal}
        handelCloseModle={setOpenQuizCodeModal}
        modalRef={quizCodeModalRef}
      />
    </div>
  );
}
