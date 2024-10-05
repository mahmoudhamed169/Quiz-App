import ButtonIcon from "../../../Components/AuthShared/ButtonIcon/ButtonIcon";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../../Components/AuthShared/TextInput/TextInput";
import PasswordInput from "../../../Components/AuthShared/PasswordInput/PasswordInput";
import ButtonForm from "../../../Components/AuthShared/ButtonForm/ButtonForm";
import { useForm } from "react-hook-form";

import EmailIcone from "../../../Icones/EmailIcone";
import UserTie from "../../../Icones/UserTie";
import UserPlus from "../../../Icones/UserPlus";
export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
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

        <div className="mt-10 flex  gap-5">
          <ButtonIcon
            icone={<UserTie color="#C5D86D" />}
            color={"#C5D86D"}
            text={"Sign In"}
            onClick={naviagteLogin}
          />
          <ButtonIcon
            icone={<UserPlus color="#ffff" />}
            color={"#333333"}
            text={"Sign up"}
            onClick={navigateRegister}
          />
        </div>
        <form
          className="w-[90%] mt-12"
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <TextInput
            startIcone={<EmailIcone />}
            label="Registered email address"
            placeholder="Type your email"
            {...register("email", { required: "email is required" })}
            type="email"
            error={errors?.email?.message && String(errors.email.message)}
          />

          <PasswordInput
            label="Password"
            error={errors?.password?.message && String(errors.password.message)}
            {...register("password", { required: "email is required" })}
          />

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
