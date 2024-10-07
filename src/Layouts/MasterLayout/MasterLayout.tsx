import { Outlet } from "react-router-dom";
import NavBar from "../../Components/Common/Navbar/Navbar";

export default function MasterLayout() {
  return (
    <>
      {/* NAVbasr */}
      <NavBar />
      <div>
        {/* sideBar */}
        <Outlet />
      </div>
    </>
  );
}
