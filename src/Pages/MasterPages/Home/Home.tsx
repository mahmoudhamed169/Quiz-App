import ChangePasswordModel from "../../../Components/AuthShared/ChangePasswordModel/ChangePasswordModel";
import TopFiveStudents from "../../../Components/MasterShared/TopFiveStudents/TopFiveStudents";
import UpcomingQuiz from "../../../Components/MasterShared/UpcomingQuiz/UpcomingQuiz";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Upcoming Quiz */}
        <div className="w-full lg:w-[550px]">
          <UpcomingQuiz />
        </div>

        {/* Top Five Students */}
        <div className="w-full lg:w-[450px]">
          <TopFiveStudents />
        </div>
      </div>
    </div>
  );
}
