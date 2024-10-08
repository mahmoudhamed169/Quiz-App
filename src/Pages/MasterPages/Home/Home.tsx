import ChangePasswordModel from "../../../Components/AuthShared/ChangePasswordModel/ChangePasswordModel";
import TopFiveStudents from "../../../Components/MasterShared/TopFiveStudents/TopFiveStudents";
import UpcomingQuiz from "../../../Components/MasterShared/UpcomingQuiz/UpcomingQuiz";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-10  ms-11">
        {/* Upcoming Quiz */}
        <div className="lg:w-[50%] ">
          <UpcomingQuiz />
        </div>

        {/* Top Five Students */}
        <div className=" lg:w-[550px]">
          <TopFiveStudents />
        </div>
      </div>
    </div>
  );
}
