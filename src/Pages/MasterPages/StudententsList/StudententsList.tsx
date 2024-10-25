import { AxiosError } from "axios";
import { apiClient } from "../../../Apis/EndPoints";
import CustomBtn from "../../../Components/MasterShared/CustomBtn/CustomBtn";
import { Student } from "../../../InterFaces/Interfaces";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import StudentCardSkeleton from "../../../Components/MasterShared/TopFiveStudents/StudentCardSkeleton";
import StudentCard from "../../../Components/MasterShared/TopFiveStudents/StudentCard";
import Pagination from "../QuestionsList/Pagination";

export default function StudentsList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemPerPage] = useState<number>(15);
  const [totalCount, setTotalCount] = useState<number>(0);

  const arr = Array.from({ length: 15 }, (_, index) => index + 1);

  const getStudents = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<Student[]>("/student");
      setStudents(response.data);
      console.log("Fetched students:", response.data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    setTotalCount(filteredStudents.length);
  }, [filteredStudents]);

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="border p-7 min-h-[38rem] m-5 rounded-xl">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl">Students list</h3>
          {/* <CustomBtn text="Add Student" /> */}
        </div>

        <div className="mt-8 mb-3">
          <div className="flex flex-col gap-1">
            <div className="relative w-full">
              <input
                type="text"
                className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[6rem] py-2 focus:border-[#C5D86D] focus:outline-none focus:ring-1 focus:ring-[#C5D86D]`}
                placeholder="Search by first name or last name"
                onChange={handleSearchChange}
              />
              <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                Search:
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          {loading ? (
            arr.map((item, index) => <StudentCardSkeleton key={index} />)
          ) : paginatedStudents.length > 0 ? (
            paginatedStudents.map((student, index) => (
              <StudentCard student={student} index={index} key={index} />
            ))
          ) : (
            <p>No students found</p>
          )}
        </div>

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
