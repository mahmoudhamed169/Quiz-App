import { CircleArrowRight, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { apiClient } from "../../../Apis/EndPoints";
import { Quiz } from "../../../InterFaces/Interfaces";
import toast from "react-hot-toast";
import QuizCard from "../QuizCard/QuizCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import QuizCardSkeleton from "../QuizCard/QuizCardSkeleton";

export default function UpcomingQuiz() {
  const [quizes, setQuizes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const arr = [1, 2, 3, 4];

  const getQuizes = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<Quiz[]>("/quiz/incomming");
      // console.log(response.data);
      setQuizes(response.data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuizes();
  }, []);

  return (
    <>
      <div className="w-full  p-3 border-[1px]  border-gray-300 rounded-[10px] m-4 min-h-[607px]">
        {!loading ? (
          <div className="flex justify-between items-center">
            <h6 className="text-xl font-bold">Upcoming 5 quizzes</h6>
            <Link
              to={"/dashboard/home"}
              className="flex gap-1 items-center font-normal text-xs"
            >
              Quiz directory{" "}
              <MoveRight color="#C5D86D" height={"30px"} width={"18.31px"} />
            </Link>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <Skeleton count={1} height={24} width={200} />
            <Skeleton count={1} height={18} width={100} />
          </div>
        )}

        {/*  mappinf=g */}
        {loading
          ? arr.map((item, index) => <QuizCardSkeleton key={index} />)
          : quizes &&
            quizes.map((quiz, index) => (
              <QuizCard key={index} index={index} quiz={quiz} />
            ))}
      </div>
    </>
  );
}
