import { Outlet } from "react-router-dom";
import TopFiveStudents from "../../Components/MasterShared/TopFiveStudents/TopFiveStudents";
import UpcomingQuiz from "../../Components/MasterShared/UpcomingQuiz/UpcomingQuiz";
import NavBar from "../../Components/Common/Navbar/Navbar";

export default function MasterLayout() {
  return (
    <>
      {/* NAVbasr */}
      {/* <div> */}
      {/* sideBar */}
      {/* <Outlet /> */}
      {/* </div> */}
      <NavBar />
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
    </>
  );
}
