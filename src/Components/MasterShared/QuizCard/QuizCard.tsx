import { ArrowRight, CircleArrowRight } from "lucide-react";

import { Link } from "react-router-dom";
import quizz1 from "../../../assets/quizz1.png";
import quizz2 from "../../../assets/quizz2.png";
import { Quiz } from "../../../InterFaces/Interfaces";
import { useState } from "react";

interface IProps {
  quiz: Quiz;
  index: number;
}

export default function QuizCard({ quiz, index }: IProps) {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("loginInfo") || "{}")
  );
  const { role } = userInfo;

  function formatDateTime(dateString: string) {
    const date = new Date(dateString);

    const formattedDate = `${date.getDate().toString().padStart(2, "0")} / ${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")} / ${date.getFullYear()}`;

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <>
      <div className="w-full mt-5">
        <div className="flex h-[120px] border-[1px]  border-gray-300 rounded-[10px] ">
          <div className="w-[120px] h-full rounded-[10px]  bg-[#FFEDDF] flex-shrink-0 p-4">
            <img
              className="w-full h-full object-cover"
              src={index % 2 == 0 ? quizz1 : quizz2}
            />
          </div>
          <div className="mt-6 px-3 w-full ">
            <h6 className="text-lg font-bold">{quiz.title}</h6>
            <p className="font-normal text-xs">
              {formatDateTime(quiz.schadule)}
            </p>
            <div className="flex items-center justify-between mt-4 relative">
              <h6 className="text-sm font-bold ">
                No. of Questions: {quiz.questions_number}
              </h6>
              <Link
                to={`/dashboard/quiz-data/${quiz._id}`}
                state={quiz}
                className="flex gap-1 items-center font-normal text-xs">
                Quiz directory{" "}
                <CircleArrowRight
                  color="#C5D86D"
                  height={"30px"}
                  width={"18.31px"}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
