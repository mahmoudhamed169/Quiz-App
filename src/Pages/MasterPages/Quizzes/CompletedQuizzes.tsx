import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { apiClient } from "../../../Apis/EndPoints";
import { Quiz } from "../../../InterFaces/Interfaces";
import { convertDate } from "./Quizzes";
import Pagination from "../QuestionsList/Pagination";

export default function CompletedQuizzes() {
  const [completedQuiz, setCompletedQuiz] = useState<Quiz[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemPerPage] = useState<number>(3);
  const [paginatedQuizzes, setPaginatedQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getCompletedQuizzes = async () => {
    try {
      const response = await apiClient.get<Quiz[]>("quiz/completed");
      console.log(response.data);

      setCompletedQuiz(response.data);
      setTotalCount(response.data.length);
      setLoading(false);
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    getCompletedQuizzes();
  }, []);

  useEffect(() => {
    const totalItems = completedQuiz.length;
    const startIndex = totalItems - currentPage * itemPerPage;

    setPaginatedQuizzes(
      completedQuiz.slice(
        Math.max(startIndex, 0),
        totalItems - (currentPage - 1) * itemPerPage
      )
    );
  }, [completedQuiz, currentPage]);
  return (
    <>
      <div className="flex flex-col w-full">
        <table className="w-full mt-5 border-separate">
          <thead className="text-[#ffff] text-left border ">
            <tr>
              {["Title", "Code", "Status", "Date"].map((heading, index) => (
                <th
                  key={index}
                  className={`bg-[#0D1321] font-normal py-2 text-xs ${
                    index === 0 ? "rounded-s" : ""
                  }  px-4 `}
                >
                  <p className="flex justify-center">{heading}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                {Array(4)
                  .fill(null)
                  .map(() => (
                    <SkeletonRow />
                  ))}
              </tr>
            ) : paginatedQuizzes.length > 0 ? (
              paginatedQuizzes.map((quiz, index) => (
                <QuizRow quiz={quiz} key={index} />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  No completed quizzes available.
                </td>
              </tr>
            )}
            {}
          </tbody>
        </table>
        <div className="flex justify-center mt-7">
          <Pagination
            totalCount={totalCount}
            setCurrentPage={setCurrentPage}
            itemPerPage={itemPerPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
}

const QuizRow = ({ quiz }: { quiz: Quiz }) => {
  return (
    <tr>
      <td className="py-2 px-4 border border-[#00000033] rounded-s">
        <p className="flex justify-center"> {quiz.title}</p>
      </td>
      <td className="py-2 px-4 border border-[#00000033]">
        <p className="flex justify-center">{quiz.code || "N/A"}</p>
      </td>
      <td className="py-2 px-4 border border-[#00000033] ">
        <div className="flex justify-center">
          <p className="bg-red-300 text-red-600 rounded-lg flex justify-center  p-1 w-20">
            {quiz.status}
          </p>
        </div>
      </td>
      <td className="py-2 px-4 border border-[#00000033]">
        <p className="flex justify-center">{convertDate(quiz.updatedAt)}</p>
      </td>
    </tr>
  );
};

const SkeletonRow = () => {
  return (
    <td>
      <Skeleton width={150} />
      <Skeleton width={150} />
      <Skeleton width={150} />
    </td>
  );
};
