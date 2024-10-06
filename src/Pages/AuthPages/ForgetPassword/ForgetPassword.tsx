import { SubmitHandler, useForm } from "react-hook-form";
import ButtonForm from "../../../Components/AuthShared/ButtonForm/ButtonForm";
import TextInput from "../../../Components/AuthShared/TextInput/TextInput";
import EmailIcone from "../../../Icones/EmailIcone";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { AUTHENTICATION_URLS } from "../../../Apis/EndPoints";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const onSumbit: SubmitHandler = async (data: { email: string }) => {
    const toastId = toast.loading("Processing...");

    try {
      const response = await axios.post(
        AUTHENTICATION_URLS.forgetPassword,
        data
      );
      toast.success(response.data.message, {
        id: toastId,
      });

      navigate("/reset-password", { state: { data } });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(error.response.data.message, {
        id: toastId,
      });
    }
  };
  return (
    <div className="mt-[3.2rem]">
      <p className="font-bold text-2xl text-[#C5D86D] pt-4">Forget password</p>

      <form className="lg:w-[90%] mt-12" onSubmit={handleSubmit(onSumbit)}>
        <TextInput
          startIcone={<EmailIcone />}
          label="ُEmail address"
          placeholder="Type your email"
          {...register("email", { required: "email is required" })}
          type="email"
          error={errors?.email?.message && String(errors.email.message)}
        />

        <div className="flex justify-between mt-10 items-center">
          <ButtonForm text={"Send email"} isSubmitting={isSubmitting} />
        </div>
      </form>
    </div>
  );
}
