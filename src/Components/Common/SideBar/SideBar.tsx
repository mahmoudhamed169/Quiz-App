import { ReactNode, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import BlackLogo from "../../../Icones/BlackLogo";
import { MenuIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { setCollapsed } from "../../../slices/sidebarSlice";
import DashboardIcon from "../../../Icones/DashboardIcon";
import StudentsIcon from "../../../Icones/StudentsIcon";
import GroupsIcon from "../../../Icones/GroupsIcon";
import QuizIcon from "../../../Icones/QuizIcon";
import QuestionsIcon from "../../../Icones/QuestionsIcon";
import ResultsIcon from "../../../Icones/ResultsIcon";
import HelpIcon from "../../../Icones/HelpIcon";
// import "tailwindcss/tailwind.css";
const SideBar = () => {
  const isCollapsed = useSelector(
    (state: RootState) => state.collapse.collpased
  );
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(setCollapsed());
  };
  const isInstructor =
    JSON.parse(localStorage.getItem("loginInfo") || "{}")?.role ===
    "Instructor";
  return (
    <>
      <Sidebar
        collapsed={isCollapsed}
        style={{
          transition: "all .7s ease-in-out",
        }}
        className="h-screen bg-[#fff]"
      >
        <Menu>
          <MenuItem
            style={{ height: "75px" }}
            className="border-b  pb-1 be-2  "
            onClick={handleToggle}
            icon={<MenuIcon />}
          >
            <p className="text-[19px] group-hover:tracking-wide font-bold ">
              <BlackLogo />
            </p>
          </MenuItem>

          {isInstructor ? (
            <>
              {" "}
              <CustomMenuItem title="dashboard" icon={<DashboardIcon />} />
              <CustomMenuItem title="Students" icon={<StudentsIcon />} />
              <CustomMenuItem title="Questions" icon={<QuestionsIcon />} />
              <CustomMenuItem title="Groups" icon={<GroupsIcon />} />
            </>
          ) : (
            ""
          )}

          <CustomMenuItem title="Quizzes" icon={<QuizIcon />} />
          <CustomMenuItem title="Results" icon={<ResultsIcon />} />

          <CustomMenuItem title="help" icon={<HelpIcon />} />
        </Menu>
      </Sidebar>
    </>
  );
};

export default SideBar;

const CustomMenuItem = ({
  title,
  icon,
}: {
  title: string;
  icon: ReactNode;
}) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("loginInfo") || "{}")
  );
  const { role } = userInfo;
  let path;
  if (role === "Instructor") {
    path = "dashboard";
  } else {
    path = "student";
  }
  const { pathname } = useLocation();
  const pageTitle = (value: string) => {
    const arrayFromPath = pathname.split("/");
    const title =
      arrayFromPath.length > 2 ? arrayFromPath[2] : arrayFromPath[1];
    return title.slice(0) == value ? "active" : null;
  };
  return (
    <MenuItem
      className={`px-[20px] py-[16px]   group  ${
        pageTitle(title) && "border-r-4 "
      }hover:border-r-4 border-black`}
      icon={
        <i
          className={`mr-6 ${
            pageTitle(title) && "bg-black text-white"
          } group-hover:scale-75    group-hover:bg-black    duration-500 transition     group-hover:text-white  bg-[rgba(255,_237,_223,_1)] p-[.8rem] rounded-[10px]  `}
        >
          {icon}
        </i>
      }
      component={
        <Link to={title === path ? `/${path}` : `/${path}/${title}`} />
      }
    >
      <p className={`text-[19px] group-hover:tracking-wide font-bold`}>
        {title}
      </p>
    </MenuItem>
  );
};
