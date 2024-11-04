import React, { useState } from "react";
import UpcomingQuiz from "../../../Components/MasterShared/UpcomingQuiz/UpcomingQuiz";
import CompletedQuizzes from "../../MasterPages/Quizzes/CompletedQuizzes";
import ClockIcon from "../../../Icones/clockIcon";
import JoinQuizModel from "../../../Components/UserShared/JoinQuizModel/JoinQuizModel";

export default function QuizesStudent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <JoinQuizModel handelCloseModle={closeModal} openModal={isModalOpen} />

      <div className="p-5">
        <div className="m-5 W-[200px]">
          <button
            onClick={openModal}
            className="flex items-center flex-col border rounded-lg p-3 lg:p-8 w-[200px] hover:scale-90 duration-75 "
          >
            <ClockIcon className="w-[75%] h-[40px]" />

            <span className="font-bold mt-2 lg:text-xl">Join quiz</span>
          </button>
        </div>
        <div className="flex gap-5 m-5">
          <UpcomingQuiz minHeight="250px" />

          <CompletedQuizzes />
        </div>
      </div>
    </>
  );
}
