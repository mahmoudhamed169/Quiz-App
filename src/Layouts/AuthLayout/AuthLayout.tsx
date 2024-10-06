import { Outlet } from "react-router-dom";
import AuthPagesTitles from "../../Utils/AuthPagesTitles";
import img from "../../assets/auth-img.png";
import logo from "../../assets/logo.png";

export default function AuthLayout() {
  AuthPagesTitles();

  return (
    <>
      <div className="min-h-screen max-h-full bg-[#0D1321] flex flex-col md:flex-row">
        <div className="text-white md:w-1/2 m-10">
          <div className="w-[200px] ">
            <img src={logo} alt="logo" className="w-full" />
          </div>
          <div className="lg:w-[90%]">
            <Outlet />
          </div>
        </div>
        <div className="text-white m-8 bg-[#FFEDDF] lg:w-1/2 rounded-lg flex justify-center  lg:fixed lg:-right-0 lg:-top-3">
          <img src={img} alt="" className="w-[90%]" />
        </div>
      </div>
    </>
  );
}
