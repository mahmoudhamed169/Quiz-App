import { MoveRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudentCard from "./StudentCard";
import { Student } from "../../../InterFaces/Interfaces";
import { apiClient } from "../../../Apis/EndPoints";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import StudentCardSkeleton from "./StudentCardSkeleton";

export default function TopFiveStudents() {
  const [studenet, setStudent] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const arr = [1, 2, 3, 4, 5];

  const getStudenet = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<Student>("/student/top-five");
      //   console.log(response.data);
      setStudent(response.data);
      console.log(studenet);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getStudenet();
  }, []);

  return (
    <>
      <div className="w-full  p-3 border-[1px]  border-gray-300 rounded-[10px] m-4 lg:min-h-[607px]">
        {!loading ? (
          <div className="flex justify-between items-center">
            <h6 className="text-xl font-medium">Top 5 Students </h6>
            <Link
              to={"/dashboard/home"}
              className="flex gap-1 items-center font-normal text-xs"
            >
              All Students
              <MoveRight color="#C5D86D" height={"30px"} width={"18.31px"} />
            </Link>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <Skeleton count={1} height={24} width={200} />
            <Skeleton count={1} height={18} width={100} />
          </div>
        )}

        <>
          {loading
            ? arr.map((item, index) => <StudentCardSkeleton />)
            : studenet &&
              studenet.map((student, index) => (
                <StudentCard student={student} index={index} key={index} />
              ))}
        </>
      </div>
    </>
  );
}
