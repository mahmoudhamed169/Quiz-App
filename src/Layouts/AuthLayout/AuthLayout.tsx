import { Outlet } from "react-router-dom";
import AuthPagesTitles from "../../Utils/AuthPagesTitles";
import img from "../../assets/auth-img.png";
import logo from "../../assets/logo.png";

export default function AuthLayout() {
  AuthPagesTitles();

  return (
    <>
      <div className="min-h-screen max-h-full bg-[#0D1321] flex flex-col md:flex-row">
        <div className="text-white md:w-1/2 m-10 flex flex-col justify-center items-center md:items-start">
          <div className="w-[200px] mb-10">
            <img src={logo} alt="logo" className="w-full" />
          </div>
          <div className="lg:w-[90%] w-full flex-grow">
            <Outlet />
          </div>
        </div>

        <div className="hidden lg:flex text-white bg-[#FFEDDF] lg:w-1/2 rounded-lg justify-center items-center p-5 lg:fixed lg:right-0 lg:top-0 lg:bottom-0 lg:m-10">
          <img
            src={img}
            alt="Auth illustration"
            className="w-[80%] object-contain"
          />
        </div>
      </div>
    </>
  );
}
