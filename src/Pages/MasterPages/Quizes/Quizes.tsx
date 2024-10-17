import React from "react";
import UpcomingQuiz from "../../../Components/MasterShared/UpcomingQuiz/UpcomingQuiz";
import TopFiveStudents from "../../../Components/MasterShared/TopFiveStudents/TopFiveStudents";
import ClockIcon from "../../../Icones/clockIcon";
import QuestionBankIcon from "../../../Icones/QuestionBankIcon";

export default function Quizzes() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-9">
        {/* Add Question */}
        <div className="lg:w-[50%] pl-2 lg:pl-3 pt-4 pr-3 lg:pr-0 flex flex-row gap-7 h-max">
          <button className="flex items-center flex-col border rounded-lg p-3 lg:p-8 w-[50%]">
            <ClockIcon className="w-[40px] h-[40px]" />

            <span className="font-bold mt-2 lg:text-xl">Set up a new quiz</span>
          </button>
          <button className="flex items-center flex-col border rounded-lg p-3 lg:p-8 w-[50%]">
            <QuestionBankIcon className="w-[40px] h-[40px]" />

            <span className="font-bold mt-2 lg:text-xl">Question Bank</span>
          </button>
        </div>

        {/* Upcoming Quizzes */}
        <div className=" lg:w-[50%] pl-2 lg:pl-0  pr-3 max-h-[300px]">
          <UpcomingQuiz />
        </div>
      </div>
    </div>
  );
}
