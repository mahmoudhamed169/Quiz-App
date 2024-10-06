import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import ButtonForm from "../../../Components/AuthShared/ButtonForm/ButtonForm";
import ButtonIcon from "../../../Components/AuthShared/ButtonIcon/ButtonIcon";
import PasswordInput from "../../../Components/AuthShared/PasswordInput/PasswordInput";
import TextInput from "../../../Components/AuthShared/TextInput/TextInput";
import EmailIcone from "../../../Icones/EmailIcone";
import UserTie from "../../../Icones/UserTie";
import { useForm } from "react-hook-form";

export default function ResetPassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  return <></>;
}
