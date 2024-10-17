import { useEffect, useState } from "react";
import CustomBtn from "../../../Components/MasterShared/CustomBtn/CustomBtn";
import QuestionData from "./QuestionData";
import TableComponent from "./TableComponent";
import { IQuestion } from "../../../InterFaces/Interfaces"; // Make sure to import IQuestion
import { apiClient } from "../../../Apis/EndPoints";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export default function QuestionsList() {
  const [openModal, setOpenModal] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  const handelOpenModle = () => {
    setOpenModal(true);
  };

  const handelCloseModle = () => {
    setOpenModal(false);
  };

  const getQuestions = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<IQuestion[]>("question");
      setQuestions(response.data);
      setTotalCount(response.data.length);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      <QuestionData
        handelCloseModle={handelCloseModle}
        openModal={openModal}
        getQuestions={getQuestions}
        mode="add"
      />
      <div className="questionList border p-7 min-h-[38rem] m-5 rounded-xl">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl">Bank Of Questions</h3>
          <CustomBtn text="Add Questions" onClick={handelOpenModle} />
        </div>

        <div>
          <TableComponent
            questions={questions}
            loading={loading}
            totalCount={totalCount}
            getQuestions={getQuestions}
          />
        </div>
      </div>
    </>
  );
}
