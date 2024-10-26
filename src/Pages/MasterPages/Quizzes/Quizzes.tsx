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
  const [completedQuiz, setCompletedQuiz] = useState<Quiz[]>([]);
  const [groupInfo, setGroupInfo] = useState<Group[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const { openModal, setOpenModal, modalRef } = useOpenCloseModal();
  const navigate = useNavigate();
  const handelOpenModle = () => {
    setOpenModal(true);
  };

  const handelCloseModle = () => {
    setOpenModal(false);
  };
  const getGroupInfo = async (id: string): Promise<Group[]> => {
    try {
      const response = await apiClient.get<Group[]>(`group/${id}`);

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred");
      return [];
    }
  };
  const getCompletedQuizzes = async () => {
    try {
      const response = await apiClient.get<Quiz[]>("quiz/completed");
      console.log(response.data);

      // const groupInformation = await Promise.all(
      //   response.data.map((quiz) => getGroupInfo(quiz.group))
      // );
      setCompletedQuiz(response.data);
      // setGroupInfo(groupInformation.flat());
      setLoading(false);
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError<{ message: string }>;
      // toast.error(axiosError.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    getCompletedQuizzes();
  }, []);
  return (
    <div>
      <AddQuizModal
        openModal={openModal}
        handelCloseModle={handelCloseModle}
        modalRef={modalRef}
      />
      <div className="flex flex-col lg:flex-row gap-9">
        {/* Add Quiz */}
        <div className="lg:w-[50%] pl-2 lg:pl-3 pt-4 pr-3 lg:pr-0 flex flex-row gap-7 h-max">
          <button
            onClick={handelOpenModle}
            className="flex items-center flex-col border rounded-lg p-3 lg:p-8 w-[50%]"
          >
            <ClockIcon className="w-[40px] h-[40px]" />

            <span className="font-bold mt-2 lg:text-xl">Set up a new quiz</span>
          </button>
          <button
            className="flex items-center flex-col border rounded-lg p-3 lg:p-8 w-[50%]"
            onClick={() => navigate("/dashboard/Questions")}
          >
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
                  className="flex gap-1 items-center font-normal text-xs"
                >
                  Results
                  <MoveRight
                    color="#C5D86D"
                    height={"30px"}
                    width={"18.31px"}
                  />
                </Link>
              </div>
            </div>

            <table className="w-full mt-5 border-separate">
              <thead className="text-[#ffff] text-left border ">
                <tr>
                  <th className="bg-[#0D1321] font-normal py-2 text-xs rounded-s px-4 ">
                    <p className="flex justify-center">Title</p>
                  </th>
                  <th className="bg-[#0D1321] font-normal py-2 text-xs px-4 ">
                    <p className="flex justify-center"> code</p>
                  </th>
                  <th className="bg-[#0D1321] font-normal py-2 text-xs px-4 ">
                    <p className="flex justify-center">Status</p>
                  </th>
                  <th className="bg-[#0D1321] font-normal py-2 text-xs px-4 ">
                    <p className="flex justify-center"> Date</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td>
                      <Skeleton width={150} />
                      <Skeleton width={150} />
                    </td>
                    <td>
                      <Skeleton width={150} />
                      <Skeleton width={150} />
                    </td>
                    <td>
                      <Skeleton width={150} />
                      <Skeleton width={150} />
                    </td>
                    <td>
                      <Skeleton width={150} />
                      <Skeleton width={150} />
                    </td>
                  </tr>
                ) : completedQuiz.length > 0 ? (
                  completedQuiz.map((quiz, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border border-[#00000033] rounded-s">
                        <p className="flex justify-center"> {quiz.title}</p>
                      </td>
                      <td className="py-2 px-4 border border-[#00000033]">
                        <p className="flex justify-center">
                          {quiz.code || "N/A"}
                        </p>
                      </td>
                      <td className="py-2 px-4 border border-[#00000033] ">
                        <div className="flex justify-center">
                          <p className="bg-red-300 text-red-600 rounded-lg flex justify-center  p-1 w-20">
                            {quiz.status}
                          </p>
                        </div>
                      </td>
                      <td className="py-2 px-4 border border-[#00000033]">
                        <p className="flex justify-center">
                          {convertDate(quiz.updatedAt)}
                        </p>
                      </td>
                    </tr>
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
          </div>
        </div>
      </div>
    </div>
  );
}
