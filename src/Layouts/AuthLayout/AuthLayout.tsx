import { Outlet } from "react-router-dom";
import AuthPagesTitles from "../../Utils/AuthPagesTitles";
import img from "../../assets/auth-img.png";
import logo from "../../assets/logo.png";

export default function AuthLayout() {
  AuthPagesTitles();

  return (
    <>
      <div className="h-auto bg-[#0D1321] flex">
        <div className="text-white w-1/2 m-10 ">
          <div className="w-[200px]">
            <img src={logo} alt="logo" className="w-full" />
          </div>
          <Outlet />
        </div>
        <div className="text-white m-8 bg-[#FFEDDF] w-1/2 rounded-lg flex justify-center h-[39rem]">
          <img src={img} alt="" className="w-[90%]" />
        </div>
      </div>
    </>
  );
}
