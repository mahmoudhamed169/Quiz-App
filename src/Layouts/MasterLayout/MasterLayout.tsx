
import { Outlet } from "react-router-dom";
import SideBar from "../../Pages/sideBar/SideBar";

export default function MasterLayout() {
  return (
    <>
    <div>
<SideBar/>
    </div>
      <Outlet />
    </>
  );
}
