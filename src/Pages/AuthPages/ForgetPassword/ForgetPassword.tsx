import { SubmitHandler, useForm } from "react-hook-form";
import ButtonForm from "../../../Components/AuthShared/ButtonForm/ButtonForm";
import TextInput from "../../../Components/AuthShared/TextInput/TextInput";
import EmailIcone from "../../../Icones/EmailIcone";
import toast from "react-hot-toast";
import axios from "axios";

export default function ForgetPassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSumbit: SubmitHandler = async (data) => {
    const toastId = toast.loading("Processing...");
    console.log(data);
    try {
      const response = await axios.post(AU);
    } catch (error) {}
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
          <ButtonForm text={"Send email"} />
        </div>
      </form>
    </div>
  );
}
