import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <>
      {/* NAVbasr */}
      <div>
        {/* sideBar */}
        <Outlet />
      </div>
    </>
  );
}
