import ButtonIcon from "../../../Components/AuthShared/ButtonIcon/ButtonIcon";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../../Components/AuthShared/TextInput/TextInput";
import PasswordInput from "../../../Components/AuthShared/PasswordInput/PasswordInput";
import ButtonForm from "../../../Components/AuthShared/ButtonForm/ButtonForm";
import { SubmitHandler, useForm } from "react-hook-form";

import EmailIcone from "../../../Icones/EmailIcone";
import UserTie from "../../../Icones/UserTie";
import UserPlus from "../../../Icones/UserPlus";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { LoginRequest, LoginResponse } from "../../../InterFaces/Interfaces";
import { AUTHENTICATION_URLS } from "../../../Apis/EndPoints";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { setUserInfo } from "../../../slices/userInfoSlice";
export default function Login() {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setFocus,
  } = useForm();
  const navigate = useNavigate();
  const naviagteLogin = () => {
    navigate("/login");
  };
  const navigateRegister = () => {
    navigate("/register");
  };
  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      const response = await axios.post<LoginResponse>(
        AUTHENTICATION_URLS.login,
        data
      );
      const { accessToken } = response.data.data;

      localStorage.setItem("userToken", accessToken);
      navigate("/dashboard");

      dispatch(setUserInfo(response.data.data.profile));
      localStorage.setItem(
        "loginInfo",
        JSON.stringify(response.data.data.profile)
      );
      toast.success("Login Successfully", {
        id: toastId,
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    }
  };
  useEffect(() => {
    setFocus("email");
  }, []);

  return (
    <>
      <div className="">
        <p className="font-bold text-2xl text-[#C5D86D] pt-4">
          Continue your learning journey with QuizWiz!
        </p>

        <div className="mt-5 flex  gap-5">
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
        <form className="w-[90%] mt-10" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            startIcone={<EmailIcone />}
            label="Registered email address"
            placeholder="Type your email"
            {...register("email", { required: "Email is required" })}
            type="email"
            error={errors?.email?.message && String(errors.email.message)}
          />

          <PasswordInput
            label="Password"
            error={errors?.password?.message && String(errors.password.message)}
            {...register("password", { required: "Password is required" })}
          />

          <div className="flex  justify-between mt-10 items-center">
            <ButtonForm text={"Sign In"} isSubmitting={isSubmitting} />
            <p className="font-semibold text-lg">
              Forgot password?{" "}
              <Link
                to={"/forget-password"}
                className="text-[#C5D86D] underline">
                click here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
