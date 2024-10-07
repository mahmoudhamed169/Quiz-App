import { CircleArrowRight, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

import image from "../../../assets/auth-img.png";

export default function UpcomingQuiz() {
  return (
    <>
      <div className="w-[550px]  p-3 border-[1px]  border-gray-300 rounded-[10px] m-4 min-h-[607px]">
        <div className="flex justify-between items-center">
          <h6 className="text-xl font-bold">Upcoming 5 quizzes</h6>
          <Link
            to={"/dashboard/home"}
            className="flex gap-1 items-center font-normal text-xs"
          >
            Quiz directory{" "}
            <MoveRight color="#C5D86D" height={"30px"} width={"18.31px"} />
          </Link>
        </div>
        <div className="w-full mt-5">
          <div className="flex h-[120px] border-[1px]  border-gray-300 rounded-[10px] ">
            <div className="w-[120px] h-full rounded-[10px]  bg-[#FFEDDF] p-2">
              <img className="w-full h-full" src={image} />
            </div>
            <div className="mt-6 px-3 min-w-[400px]">
              <h6 className="text-lg font-bold">
                Introduction to computer programming
              </h6>
              <p className="font-normal text-xs">12 / 03 / 2023</p>
              <div className="flex items-center justify-between mt-4">
                <h6 className="text-sm font-bold ">
                  No. of student’s enrolled: 32
                </h6>
                <Link
                  to={"/dashboard/home"}
                  className="flex gap-1 items-center font-normal text-xs"
                >
                  Quiz directory{" "}
                  <CircleArrowRight
                    color="#C5D86D"
                    height={"30px"}
                    width={"18.31px"}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
