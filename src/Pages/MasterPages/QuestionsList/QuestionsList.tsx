import CustomBtn from "../../../Components/MasterShared/CustomBtn/CustomBtn";
import TableComponent from "./TableComponent";

export default function QuestionsList() {

  







  return (
    <>
      <div className="questionList border p-7 min-h-[38rem] m-5 rounded-xl">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl">Bank Of Questions</h3>
          <CustomBtn text="Add Qustions" />
        </div>

        <div className="">
          <TableComponent />
        </div>
      </div>
    </>
  );
}
