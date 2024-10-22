import { Eye, FilePenLine, Trash2 } from "lucide-react";
import { IQuestion } from "../../../InterFaces/Interfaces";
import Pagination from "./Pagination";
import TableSkeleton from "./TableSkeleton";
import { useEffect, useState } from "react";
import QuestionData from "./QuestionData";
import { DeleteModal } from "../../../Components/MasterShared/DeleteModal/DeleteModal";
import toast from "react-hot-toast";
import { apiClient } from "../../../Apis/EndPoints";
import { AxiosError } from "axios";

interface TableComponentProps {
  questions: IQuestion[];
  loading: boolean;
  totalCount: number;
  getQuestions: () => void;
}

export default function TableComponent({
  questions,
  loading,
  totalCount,
  getQuestions,
}: TableComponentProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemPerPage] = useState<number>(8);
  const [paginatedQuestions, setPaginatedQuestions] = useState<IQuestion[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedQuestionData, setSelectedQuestionData] =
    useState<IQuestion | null>(null); // State for selected question
  const [mode, setMode] = useState<"add" | "edit" | "view">("view"); // State for the modal mode

  const handelOpenModle = (
    question?: IQuestion,
    mode?: "add" | "edit" | "view"
  ) => {
    if (question) {
      setSelectedQuestionData(question); // Set selected question data for viewing/editing
      console.log(question);
    } else {
      setSelectedQuestionData(null); // Reset for adding a new question
    }

    if (mode) {
      setMode(mode); // Set mode to the passed mode
      console.log(mode);
    }

    setOpenModal(true);
  };

  const handelCloseModle = () => {
    setOpenModal(false);
    setSelectedQuestionData(null);
    setMode("view"); // Reset mode to view when closing
  };

  useEffect(() => {
    const totalItems = questions.length;
    const startIndex = totalItems - currentPage * itemPerPage;

    setPaginatedQuestions(
      questions
        .slice(
          Math.max(startIndex, 0),
          totalItems - (currentPage - 1) * itemPerPage
        )
        .reverse()
    );
  }, [questions, itemPerPage, currentPage]);
  const deleteQuestion = async () => {
    const toastId = toast.loading("Processing...");
    console.log("ddd");
    try {
      await apiClient.delete(`question/${selectedQuestionData?._id}`);

      setOpenDeleteModal(false);
      toast.success("Question deleted successfully", {
        id: toastId,
      });
      getQuestions();
      setOpenDeleteModal(false);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    }
  };
  const test = () => {
    console.log("clicked");
  };
  return (
    <>
      {loading ? (
        <TableSkeleton />
      ) : (
        <div>
          <table className="w-full mt-5 border-separate">
            <thead className="text-[#ffff] text-left border ">
              <tr>
                <th className="bg-[#0D1321] font-normal py-2 text-xs rounded-s px-4 ">
                  Question Title
                </th>
                <th className="bg-[#0D1321] font-normal py-2 text-xs px-4 ">
                  Question Desc
                </th>
                <th className="bg-[#0D1321] font-normal py-2 text-xs px-4 ">
                  Question Difficulty Level
                </th>
                <th className="bg-[#0D1321] font-normal py-2 text-xs px-4 ">
                  Type
                </th>
                <th className="bg-[#0D1321] font-normal py-2 rounded-e text-xs px-4 ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedQuestions.map((qus, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border border-[#00000033] rounded-s">
                    {qus.title}
                  </td>
                  <td className="py-2 px-4 border border-[#00000033]">
                    {qus.description}
                  </td>
                  <td className="py-2 px-4 border border-[#00000033]">
                    {qus.difficulty}
                  </td>
                  <td className="py-2 px-4 border border-[#00000033]">
                    {qus.type}
                  </td>
                  <td className="py-2 px-4 border border-[#00000033] rounded-e flex gap-3 items-center text-[#FB7C19]">
                    <button onClick={() => handelOpenModle(qus, "view")}>
                      <Eye className="hover:cursor-pointer" />
                    </button>
                    <button onClick={() => handelOpenModle(qus, "edit")}>
                      <FilePenLine className="hover:cursor-pointer" />
                    </button>

                    <button
                      className="hover:cursor-pointer"
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setSelectedQuestionData(qus);
                      }}>
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <DeleteModal
            openModal={openDeleteModal}
            setOpenModal={setOpenDeleteModal}
            onConfirm={deleteQuestion}
            title="question"
          />
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
      <QuestionData
        handelCloseModle={handelCloseModle}
        openModal={openModal}
        mode={mode} // Pass the current mode
        questionData={selectedQuestionData}
        getQuestions={getQuestions}
      />
    </>
  );
}
