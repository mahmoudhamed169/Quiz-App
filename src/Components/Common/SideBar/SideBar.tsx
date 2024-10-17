import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import BlackLogo from "../../../Icones/BlackLogo";
import { MenuIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { setCollapsed } from "../../../slices/sidebarSlice";
// import "tailwindcss/tailwind.css";
const SideBar = () => {
  // const [isCollapsed, setIsCollapsed] = useState(true);
  const isCollapsed = useSelector(
    (state: RootState) => state.collapse.collpased
  );
  const dispatch = useDispatch();
  const [isShowModel, setShowModel] = useState(false);

  const handleToggle = () => {
    dispatch(setCollapsed());
  };

  return (
    <>
      <Sidebar
        collapsed={isCollapsed}
        style={{
          transition: "all .7s ease-in-out",
        }}
        className="h-screen bg-[#fff]">
        <Menu>
          <MenuItem
            style={{ height: "75px" }}
            className="border-b  pb-1 be-2  "
            onClick={handleToggle}
            icon={<MenuIcon />}>
            <p className="text-[19px] group-hover:tracking-wide font-bold ">
              <BlackLogo />
            </p>
          </MenuItem>
          <MenuItem
            className={
              "px-[20px] py-[16px]   group     hover:border-r-4 border-black "
            }
            icon={
              <i
                className={`mr-6     group-hover:scale-75  group-hover:bg-black    duration-500 transition     group-hover:text-white  bg-[rgba(255,_237,_223,_1)] p-[.8rem] rounded-[10px]  `}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6">
                  <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                  <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>
              </i>
            }
            component={<Link to="/dashboard" />}>
            <p className="text-[19px] group-hover:tracking-wide font-bold ">
              Dashboard
            </p>
          </MenuItem>
          <MenuItem
            className={
              "px-[20px] py-[16px]   group     hover:border-r-4 border-black      "
            }
            icon={
              <i
                className={`mr-6     group-hover:scale-75  group-hover:bg-black    duration-500 transition     group-hover:text-white  bg-[rgba(255,_237,_223,_1)] p-[.8rem] rounded-[10px]  `}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6">
                  <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                </svg>
              </i>
            }
            component={<Link to="/dashboard/students" />}>
            <p className="text-[19px] group-hover:tracking-wide font-bold ">
              Students
            </p>
          </MenuItem>
          <MenuItem
            className={
              "px-[20px] py-[16px]   group     hover:border-r-4 border-black      "
            }
            icon={
              <i
                className={`mr-6    group-hover:scale-75   group-hover:bg-black    duration-500 transition     group-hover:text-white  bg-[rgba(255,_237,_223,_1)] p-[.8rem] rounded-[10px]  `}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                    clipRule="evenodd"
                  />
                  <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                </svg>
              </i>
            }
            component={<Link to="/dashboard/groups" />}>
            <p className="text-[19px] group-hover:tracking-wide font-bold  ">
              Groups
            </p>
          </MenuItem>

          <MenuItem
            className={
              "px-[20px] py-[16px]   group     hover:border-r-4 border-black      "
            }
            icon={
              <i
                className={`mr-6    group-hover:scale-75     group-hover:bg-black    group-hover:text-white duration-500 transition bg-[rgba(255,_237,_223,_1)] p-[.8rem] rounded-[10px]`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.798v5.02a3 3 0 0 1-.879 2.121l-2.377 2.377a9.845 9.845 0 0 1 5.091 1.013 8.315 8.315 0 0 0 5.713.636l.285-.071-3.954-3.955a3 3 0 0 1-.879-2.121v-5.02a23.614 23.614 0 0 0-3 0Zm4.5.138a.75.75 0 0 0 .093-1.495A24.837 24.837 0 0 0 12 2.25a25.048 25.048 0 0 0-3.093.191A.75.75 0 0 0 9 3.936v4.882a1.5 1.5 0 0 1-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0 1 15 8.818V3.936Z"
                    clipRule="evenodd"
                  />
                </svg>
              </i>
            }
            component={<Link to="/dashboard/quizzes" />}>
            <p className="text-[19px] group-hover:tracking-wide font-bold ">
              Quiz
            </p>
          </MenuItem>
          <MenuItem
            className={
              "px-[20px] py-[16px]   group     hover:border-r-4 border-black      "
            }
            icon={
              <i
                className={`mr-6    group-hover:scale-75     group-hover:bg-black    group-hover:text-white duration-500 transition bg-[rgba(255,_237,_223,_1)] p-[.8rem] rounded-[10px]`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.798v5.02a3 3 0 0 1-.879 2.121l-2.377 2.377a9.845 9.845 0 0 1 5.091 1.013 8.315 8.315 0 0 0 5.713.636l.285-.071-3.954-3.955a3 3 0 0 1-.879-2.121v-5.02a23.614 23.614 0 0 0-3 0Zm4.5.138a.75.75 0 0 0 .093-1.495A24.837 24.837 0 0 0 12 2.25a25.048 25.048 0 0 0-3.093.191A.75.75 0 0 0 9 3.936v4.882a1.5 1.5 0 0 1-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0 1 15 8.818V3.936Z"
                    clipRule="evenodd"
                  />
                </svg>
              </i>
            }
            component={<Link to="/dashboard/questions" />}>
            <p className="text-[19px] group-hover:tracking-wide font-bold ">
            Questions
            </p>
          </MenuItem>
          <MenuItem
            className={
              "px-[20px] py-[16px]      group     hover:border-r-4 border-black       "
            }
            icon={
              <i
                className={`mr-6     group-hover:bg-black    group-hover:scale-75  group-hover:text-white  duration-500 transition bg-[rgba(255,_237,_223,_1)] p-[.8rem] rounded-[10px]`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </i>
            }
            component={<Link to="/dashboard/results" />}>
            <p className="text-[19px] group-hover:tracking-wide font-bold ">
              Results
            </p>
          </MenuItem>

          <MenuItem
            className={
              "px-[20px] py-[16px]   group     hover:border-r-4 border-black      "
            }
            icon={
              <i
                className={`mr-6   group-hover:scale-75    group-hover:bg-black    duration-500 transition     group-hover:text-white  bg-[rgba(255,_237,_223,_1)] p-[.8rem] rounded-[10px]  `}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </i>
            }
            component={<Link to="/login" />}>
            <p className="text-[19px] group-hover:tracking-wide font-bold ">
              Help
            </p>
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SideBar;
