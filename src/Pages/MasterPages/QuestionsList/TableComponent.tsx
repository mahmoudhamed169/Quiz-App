import { Eye, FilePenLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { IQuestion } from "../../../InterFaces/Interfaces";
import { apiClient } from "../../../Apis/EndPoints";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import Pagination from "./Pagination";
import TableLoader from "./TableSkeleton";
import TableSkeleton from "./TableSkeleton";

export default function TableComponent() {
  const [qustions, setQustions] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(4);
  const [itemPerPage] = useState<number>(8);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [paginatedQustions, setPaginatedQustions] = useState<IQuestion>([]);

  const getQustions = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<IQuestion[]>("question");
      setQustions(response.data);
      setTotalCount(response.data.length);
      console.log(totalCount);

      console.log(response.data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQustions();
  }, []);

  useEffect(() => {
    setPaginatedQustions(
      qustions.slice(
        (currentPage - 1) * itemPerPage + 1,
        currentPage * itemPerPage
      )
    );
  }, [qustions, itemPerPage, currentPage]);

  return (
    <>
      {loading ? (
        <TableSkeleton />
      ) : (
        <div>
          <table className="w-full mt-5 border-separate">
            <thead className="text-[#ffff] text-left border ">
              <tr>
                <th className="bg-[#0D1321] font-normal  py-2 text-xs rounded-s px-4 ">
                  Question Title
                </th>
                <th className="bg-[#0D1321] font-normal py-2 text-xs px-4 ">
                  Question Desc
                </th>
                <th className="bg-[#0D1321] font-normal py-2 text-xs px-4  ">
                  Question difficulty level
                </th>
                <th className="bg-[#0D1321]  font-normal py-2 text-xs px-4 ">
                  type
                </th>

                <th className="bg-[#0D1321] font-normal py-2 rounded-e text-xs px-4 ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedQustions &&
                paginatedQustions.map((qus, index) => (
                  <tr key={index}>
                    <td className=" py-2 px-4 border border-[#00000033] rounded-s">
                      {qus.title}
                    </td>
                    <td className=" py-2 px-4  border border-[#00000033]">
                      {qus.description}
                    </td>
                    <td className=" py-2 px-4  border border-[#00000033]">
                      {qus.difficulty}
                    </td>
                    <td className=" py-2 px-4  border border-[#00000033]">
                      {qus.type}
                    </td>
                    <td className=" py-2 px-4  border border-[#00000033] rounded-e flex gap-3 items-center text-[#FB7C19]">
                      <button>
                        <Eye className="hover:cursor-pointer" />
                      </button>
                      <button>
                        <FilePenLine className="hover:cursor-pointer" />
                      </button>
                      <button>
                        <Trash2 className="hover:cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))}
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
      )}
    </>
  );
}
