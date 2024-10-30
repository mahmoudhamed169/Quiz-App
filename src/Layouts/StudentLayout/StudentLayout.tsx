import { Outlet } from "react-router-dom";
import NavBar from "../../Components/Common/Navbar/Navbar";
import SideBar from "../../Components/Common/SideBar/SideBar";

export default function StudentLayout() {
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
