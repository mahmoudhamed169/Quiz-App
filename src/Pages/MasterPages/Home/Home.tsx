import ChangePasswordModel from "../../../Components/AuthShared/ChangePasswordModel/ChangePasswordModel";
import TopFiveStudents from "../../../Components/MasterShared/TopFiveStudents/TopFiveStudents";
import UpcomingQuiz from "../../../Components/MasterShared/UpcomingQuiz/UpcomingQuiz";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-10  p-3 lg:p-6">
        {/* Upcoming Quiz */}
        <div className="lg:w-[50%] ">
          <UpcomingQuiz minHeight={"607px"} />
        </div>

        {/* Top Five Students */}
        <div className=" lg:w-[50%]">
          <TopFiveStudents />
        </div>
      </div>
    </div>
  );
}
