import img1 from "../../../assets/Vector2.svg";
import img2 from "../../../assets/Vector.svg";
import ButtonIcon from "../../../Components/AuthShared/ButtonIcon/ButtonIcon";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../../Components/AuthShared/TextInput/TextInput";
import PasswordInput from "../../../Components/AuthShared/PasswordInput/PasswordInput";
import ButtonForm from "../../../Components/AuthShared/ButtonForm/ButtonForm";
export default function Login() {
  const navigate = useNavigate();
  const naviagteLogin = () => {
    navigate("/login");
  };
  const navigateRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="mt-[3.2rem]">
        <p className="font-bold text-2xl text-[#C5D86D] pt-4">
          Continue your learning journey with QuizWiz!
        </p>

        <div className="mt-10 flex w-[45%] justify-between ">
          <ButtonIcon
            img={img1}
            color={"#C5D86D"}
            text={"Sign In"}
            onClick={naviagteLogin}
          />
          <ButtonIcon
            img={img2}
            color={"#333333"}
            text={"Sign up"}
            onClick={navigateRegister}
          />
        </div>
        <form className="w-[90%] mt-12">
          <TextInput>
            <svg
              width="25"
              height="19"
              viewBox="0 0 25 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5264 6.19141C24.7168 6.04004 25 6.18164 25 6.4209V16.4062C25 17.7002 23.9502 18.75 22.6562 18.75H2.34375C1.0498 18.75 0 17.7002 0 16.4062V6.42578C0 6.18164 0.27832 6.04492 0.473633 6.19629C1.56738 7.0459 3.01758 8.125 7.99805 11.7432C9.02832 12.4951 10.7666 14.0771 12.5 14.0674C14.2432 14.082 16.0156 12.4658 17.0068 11.7432C21.9873 8.125 23.4326 7.04102 24.5264 6.19141ZM12.5 12.5C13.6328 12.5195 15.2637 11.0742 16.084 10.4785C22.5635 5.77637 23.0566 5.36621 24.5508 4.19434C24.834 3.97461 25 3.63281 25 3.27148V2.34375C25 1.0498 23.9502 0 22.6562 0H2.34375C1.0498 0 0 1.0498 0 2.34375V3.27148C0 3.63281 0.166016 3.96973 0.449219 4.19434C1.94336 5.36133 2.43652 5.77637 8.91602 10.4785C9.73633 11.0742 11.3672 12.5195 12.5 12.5Z"
                fill="white"
              />
            </svg>
          </TextInput>

          <PasswordInput />

          <div className="flex justify-between mt-10 items-center">
            <ButtonForm text={"Sign In"} />
            <p className="font-semibold text-lg">
              Forgot password?{" "}
              <Link
                to={"/forget-password"}
                className="text-[#C5D86D] underline"
              >
                click here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
