import { useForm } from "react-hook-form";
import ButtonIcon from "../../../Components/AuthShared/ButtonIcon/ButtonIcon";
import UserPlus from "../../../Icones/UserPlus";
import UserTie from "../../../Icones/UserTie";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../../Components/AuthShared/TextInput/TextInput";
import EmailIcone from "../../../Icones/EmailIcone";
import PasswordInput from "../../../Components/AuthShared/PasswordInput/PasswordInput";
import ButtonForm from "../../../Components/AuthShared/ButtonForm/ButtonForm";
import NameIcon from "../../../Icones/NameIcon";
import SelectOption from "../../../Components/AuthShared/SelectOption/SelectOption";

export default function Register() {
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
      <div className="h-auto bg-[#0D1321]">
        <p className="font-bold text-2xl text-[#C5D86D] pt-4">
          Create your account and start using QuizWiz!
        </p>

        <div className="mt-5 flex  gap-5">
          <ButtonIcon
            icone={<UserTie color="#ffff" />}
            color={"#3333"}
            text={"Sign In"}
            onClick={naviagteLogin}
          />
          <ButtonIcon
            icone={<UserPlus color="#C5D86D" />}
            color={"#C5D86D"}
            text={"Sign up"}
            onClick={navigateRegister}
          />
        </div>

        <form
          className="w-[90%] mt-8"
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <div className="flex gap-4 ">
            <TextInput
              startIcone={<NameIcon />}
              label="Your first name"
              placeholder="Type your email"
              {...register("email", { required: "email is required" })}
              type="email"
              error={errors?.email?.message && String(errors.email.message)}
            />
            <TextInput
              startIcone={<NameIcon />}
              label="Your last name"
              placeholder="Type your email"
              {...register("email", { required: "email is required" })}
              type="email"
              error={errors?.email?.message && String(errors.email.message)}
            />
          </div>

          <TextInput
            startIcone={<EmailIcone />}
            label="Your email address"
            placeholder="Type your email"
            {...register("email", { required: "email is required" })}
            type="email"
            error={errors?.email?.message && String(errors.email.message)}
          />
          <SelectOption
            label="Role"
            {...register("Role", { required: "Role is required" })}
            error={errors?.Role?.message && String(errors.Role.message)}
          />

          <PasswordInput
            label="Password"
            error={errors?.password?.message && String(errors.password.message)}
            {...register("password", { required: "password is required" })}
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
