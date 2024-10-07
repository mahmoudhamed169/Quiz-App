import { useLocation, useNavigate } from "react-router-dom";
import ButtonForm from "../../../Components/AuthShared/ButtonForm/ButtonForm";
import PasswordInput from "../../../Components/AuthShared/PasswordInput/PasswordInput";
import TextInput from "../../../Components/AuthShared/TextInput/TextInput";
import EmailIcone from "../../../Icones/EmailIcone";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { AUTHENTICATION_URLS } from "../../../Apis/EndPoints";
import PasswordKeyIcone from "../../../Icones/PasswordKeyIcone";
import { useEffect } from "react";

export default function ResetPassword() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setFocus,
    watch,
  } = useForm();

  const { state } = useLocation();
  const navigate = useNavigate();
  const onSumbit: SubmitHandler = async (data: {
    otp: string;
    email: string;
    password: string;
  }) => {
    const toastId = toast.loading("Processing...");
    console.log(data);
    try {
      const { confirmPassword, ...submitData } = data;
      const response = await axios.post(
        AUTHENTICATION_URLS.resetPassword,
        submitData
      );
      toast.success(response.data.message, {
        id: toastId,
      });

      navigate("/login");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(error.response.data.message, {
        id: toastId,
      });
    }
  };
  useEffect(() => {
    if (state?.data?.email) {
      return setFocus("otp");
    }
    setFocus("email");
  }, []);
  return (
    <div className="">
      <p className="font-bold text-2xl text-[#C5D86D] pt-4">Reset Password</p>

      <form className="w-[90%] mt-12" onSubmit={handleSubmit(onSumbit)}>
        <TextInput
          startIcone={<EmailIcone />}
          label="Your email address"
          defaultValue={state?.data?.email || ""}
          placeholder="Type your email"
          {...register("email", { required: "email is required" })}
          type="email"
          error={errors?.email?.message && String(errors.email.message)}
        />

        <TextInput
          startIcone={<PasswordKeyIcone />}
          label="OTP"
          defaultValue={state?.data?.email || ""}
          placeholder="Type your otp"
          {...register("otp", { required: "otp is required" })}
          type="number"
          error={errors?.otp?.message && String(errors.otp.message)}
        />

        <PasswordInput
          label="Password"
          error={errors?.password?.message && String(errors.password.message)}
          {...register("password", { required: "Password is required" })}
        />
        <PasswordInput
          label="Confirm Password"
          error={
            errors?.confirmPassword?.message &&
            String(errors.confirmPassword.message)
          }
          {...register("confirmPassword", {
            required: "Password is required",
            validate: (value) =>
              value === watch("password") || "Passwords does not match",
          })}
        />
        <div className="flex justify-between mt-10 items-center">
          <ButtonForm text={"Reset"} isSubmitting={isSubmitting} />
        </div>
      </form>
    </div>
  );
}
