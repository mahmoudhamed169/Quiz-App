import { useForm } from "react-hook-form";
import ButtonForm from "../../../Components/AuthShared/ButtonForm/ButtonForm";
import TextInput from "../../../Components/AuthShared/TextInput/TextInput";
import EmailIcone from "../../../Icones/EmailIcone";

export default function ForgetPassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  return (
    <div className="mt-[3.2rem]">
      <p className="font-bold text-2xl text-[#C5D86D] pt-4">
        Continue your learning journey with QuizWiz!
      </p>

      <form
        className="w-[90%] mt-12"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}>
        <TextInput
          startIcone={<EmailIcone />}
          label="Registered email address"
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
