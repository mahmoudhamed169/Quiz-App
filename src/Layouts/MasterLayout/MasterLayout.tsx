import { Outlet } from "react-router-dom";
import TopFiveStudents from "../../Components/MasterShared/TopFiveStudents/TopFiveStudents";
import UpcomingQuiz from "../../Components/MasterShared/UpcomingQuiz/UpcomingQuiz";
import NavBar from "../../Components/Common/Navbar/Navbar";
import SideBar from "../../Components/Common/SideBar/SideBar";

export default function MasterLayout() {
  return (
    <>
      <div className="flex w-full">
        <div className=" bg-[#ffff] ">
          <SideBar />
        </div>
        <div className="w-full ">
          <NavBar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
