import { Outlet } from "react-router-dom";
import TopFiveStudents from "../../Components/MasterShared/TopFiveStudents/TopFiveStudents";

export default function MasterLayout() {
  return (
    <>
      {/* NAVbasr */}
      {/* <div> */}
      {/* sideBar */}
      {/* <Outlet /> */}
      {/* </div> */}

      <div className="w-[450px] ">
        <TopFiveStudents />
      </div>
    </>
  );
}
