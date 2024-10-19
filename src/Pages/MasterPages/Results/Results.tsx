import { Eye, FilePenLine, Trash2 } from "lucide-react";
import { ResultResponse } from "../../../InterFaces/Interfaces";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { apiClient } from "../../../Apis/EndPoints";
import toast from "react-hot-toast";
import TableSkeleton from "../QuestionsList/TableSkeleton";
import Pagination from "../QuestionsList/Pagination";
import { convertDate } from "../Quizzes/Quizzes";

export default function Results() {
  const [results, setResults] = useState<ResultResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemPerPage] = useState<number>(8);
  const [paginatedResults, setPaginatedResult] = useState<ResultResponse[]>([]);

  const getResults = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<ResultResponse[]>("/quiz/result");
      setResults(response.data);
      setTotalCount(response.data.length);

      console.log("Fetched Results:", response.data); // Debugging log
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  useEffect(() => {
    const totalItems = results.length;
    const startIndex = totalItems - currentPage * itemPerPage;

    setPaginatedResult(
      results
        .slice(
          Math.max(startIndex, 0),
          totalItems - (currentPage - 1) * itemPerPage
        )
        .reverse()
    );
  }, [results, itemPerPage, currentPage]);

  return (
    <>
      <div className="border rounded-[10px] w-[95%] m-auto mt-5 lg:min-h-[509px]">
        <div className="p-4">
          <h3 className="font-bold color-[#0D1321] text-xl">
            Completed Quizzes
          </h3>
          {loading ? (
            <TableSkeleton addition={true}/>
          ) : results.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <table className="w-full mt-3 border-separate">
              <thead className="text-[#ffff] text-left border">
                <tr>
                  <th className="bg-[#0D1321] font-normal py-2 text-base rounded-s px-4">
                    Title
                  </th>
                  <th className="bg-[#0D1321] font-normal py-2 text-base px-4">
                    Description
                  </th>
                  <th className="bg-[#0D1321] font-normal py-2 text-base px-4">
                    Difficulty
                  </th>

                  <th className="bg-[#0D1321] font-normal py-2 text-base px-4">
                    Closed At
                  </th>
                  <th className="bg-[#0D1321] font-normal py-2 text-base px-4">
                   Score per ques
                  </th>
                  <th className="bg-[#0D1321] font-normal py-2 rounded-e text-base px-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedResults.map((res, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border border-[#00000033] rounded-s">
                      {res?.quiz?.title || "N/A"}{" "}
                      {/* Handle undefined values */}
                    </td>
                    <td className="py-2 px-4 border border-[#00000033]">
                      {res.quiz?.description || "N/A"}
                    </td>
                    <td className="py-2 px-4 border border-[#00000033]">
                      {res.quiz?.difficulty || "N/A"}
                    </td>

                    <td className="py-2 px-4 border border-[#00000033]">
                      {convertDate(res.quiz?.closed_at || "N/A")}
                    </td>
                    <td className="py-2 px-4 border text-center border-[#00000033]">
                      {res.quiz?.score_per_question || "N/A"}
                    </td>
                    <td className="py-2 px-4 border border-[#00000033]">
                      <button className="bg-[#C5D86D] w-[85px] h-[30px] rounded-xl font-bold text-lg">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="flex justify-center mt-7">
            <Pagination
              totalCount={totalCount}
              setCurrentPage={setCurrentPage}
              itemPerPage={itemPerPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
