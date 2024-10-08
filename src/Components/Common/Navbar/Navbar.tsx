import { useEffect, useState } from "react";
import { Dropdown, Modal } from "flowbite-react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import BlackLogo from "../../../Icones/BlackLogo";
import ClockIcon from "../../../Icones/clockIcon";
import EmailIcone from "../../../Icones/EmailIcone";
import NotificationIcon from "../../../Icones/NotificationIcon";
import { AxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { apiClient, AUTHENTICATION_URLS } from "../../../Apis/EndPoints";
import {
  ChangePasswordReguest,
  ChangePasswordResponse,
} from "../../../InterFaces/Interfaces";
import { PasswordValidation } from "../../../Validation/Validation";
import ButtonForm from "../../AuthShared/ButtonForm/ButtonForm";
import PasswordInput from "../../AuthShared/PasswordInput/PasswordInput";
import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
export default function NavBar() {
  return (
    <div className="border-b px-0 py-0 flex items-center h-20 ">
      <div className="px-8">
        <BlackLogo />
      </div>
      <div className="flex justify-between border-x gap-4  flex-1 h-full items-center">
        <span className=" text-xl md:text-2xl font-bold ml-1 md:ml-5">
          Groups
        </span>
        <button className="border text-base rounded-full flex px-4 w-max  py-2 font-bold items-center mr-1 md:mr-5">
          <ClockIcon /> <span className="pl-1">New quiz</span>
        </button>
      </div>
      <div className="flex w-max h-full">
        <IconsBlock />
        <ProfileInfo />
      </div>
    </div>
  );
}

const IconsBlock = () => {
  return (
    <div className="md:flex hidden   items-center ">
      <div className="h-full border-r  flex justify-center items-center relative ">
        <EmailIcone className="mx-7 " color="black" />
        <div className="curcle bg-pink-200 w-5 h-5 text-xs text-center leading-5 rounded-full font-bold absolute top-3 right-3">
          10
        </div>
      </div>

      <div className="h-full border-r  flex justify-center items-center relative">
        <NotificationIcon className="mx-7 " />
        <div className="curcle bg-pink-200 w-5 h-5 text-xs text-center leading-5 rounded-full font-bold absolute top-3 right-5">
          5
        </div>
      </div>
    </div>
  );
};

const ProfileInfo = () => {
  const [openModal, setOpenModal] = useState(false);
  const userInfo = useSelector((state: RootState) => state.userInfo.value);
  const navigate = useNavigate();
  console.log(userInfo);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    setFocus,
  } = useForm();
  console.log(openModal);

  const onSubmit: SubmitHandler<ChangePasswordReguest> = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      const { Confirm_Password, ...submitData } = data;

      const response = await apiClient.post<ChangePasswordResponse>(
        AUTHENTICATION_URLS.changePassword,
        submitData
      );

      setOpenModal(false);
      toast.success("Paswword is changed Successfully", {
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
    setFocus("password");
  }, []);
  return (
    <div className="flex flex-row items-center ml-2 md:ml-10 mr-8">
      <div className="flex flex-col text-base md:mr-12">
        <span className="font-bold">
          {userInfo.first_name} {userInfo?.last_name}
        </span>
        <span className="text-slate-300">{userInfo?.role}</span>
      </div>

      <Dropdown dismissOnClick={false} inline size="xl" placement="bottom">
        <Dropdown.Item
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}>
          Sign out
        </Dropdown.Item>
        <Dropdown.Item as={"span"} onClick={() => setOpenModal(true)}>
          Change password
        </Dropdown.Item>
      </Dropdown>
      <Modal
        show={openModal}
        size="3xl"
        onClose={() => setOpenModal(false)}
        popup>
        <Modal.Header className="bg-[#0D1321]" />
        <Modal.Body className="bg-[#0D1321]">
          <div>
            <div className="w-[200px]">
              <img src={logo} alt="Logo" />
            </div>
            <p className="font-bold text-2xl text-[#C5D86D] pt-4">
              Change Password
            </p>
            <form
              className="my-7 flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}>
              <PasswordInput
                label="Password"
                error={
                  errors?.password?.message && String(errors.password.message)
                }
                {...register("password", { required: "Password is required" })}
              />
              <PasswordInput
                label="New Password"
                error={
                  errors?.password_new?.message &&
                  String(errors.password_new.message)
                }
                {...register("password_new", PasswordValidation(8))}
              />
              <PasswordInput
                label="Confirm Password"
                error={
                  errors?.Confirm_Password?.message &&
                  String(errors.Confirm_Password.message)
                }
                {...register("Confirm_Password", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password_new") || "Passwords do not match",
                })}
              />

              <div className="flex justify-start gap-4 mt-3">
                <ButtonForm isSubmitting={isSubmitting} text="Change" />
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

// const ChangePassword = ({ setOpenModal, openModal }) => {
//   const {
//     register,
//     formState: { errors, isSubmitting },
//     handleSubmit,
//     watch,
//     setFocus,
//   } = useForm();
//   console.log(openModal);
//   const onSubmit: SubmitHandler<ChangePasswordReguest> = async (data) => {
//     const toastId = toast.loading("Processing...");
//     try {
//       const { Confirm_Password, ...submitData } = data;

//       const response = await apiClient.post<ChangePasswordResponse>(
//         AUTHENTICATION_URLS.changePassword,
//         submitData
//       );

//       setOpenModal(false);
//       toast.success("Paswword is changed Successfully", {
//         id: toastId,
//       });
//     } catch (error) {
//       const axiosError = error as AxiosError<{ message: string }>;
//       toast.error(axiosError.response?.data?.message || "An error occurred", {
//         id: toastId,
//       });
//     }
//   };
//   useEffect(() => {
//     setFocus("password");
//   }, []);

//   return (
//     <>
//       <span>Change Password</span>
//       <Modal
//         show={openModal}
//         size="3xl"
//         onClose={() => setOpenModal(false)}
//         popup>
//         <Modal.Header className="bg-[#0D1321]" />
//         <Modal.Body className="bg-[#0D1321]">
//           <div>
//             <div className="w-[200px]">
//               <img src={logo} alt="Logo" />
//             </div>
//             <p className="font-bold text-2xl text-[#C5D86D] pt-4">
//               Change Password
//             </p>
//             <form
//               className="my-7 flex flex-col gap-3"
//               onSubmit={handleSubmit(onSubmit)}>
//               <PasswordInput
//                 label="Password"
//                 error={
//                   errors?.password?.message && String(errors.password.message)
//                 }
//                 {...register("password", { required: "Password is required" })}
//               />
//               <PasswordInput
//                 label="New Password"
//                 error={
//                   errors?.password_new?.message &&
//                   String(errors.password_new.message)
//                 }
//                 {...register("password_new", PasswordValidation(8))}
//               />
//               <PasswordInput
//                 label="Confirm Password"
//                 error={
//                   errors?.Confirm_Password?.message &&
//                   String(errors.Confirm_Password.message)
//                 }
//                 {...register("Confirm_Password", {
//                   required: "Confirm Password is required",
//                   validate: (value) =>
//                     value === watch("password_new") || "Passwords do not match",
//                 })}
//               />

//               <div className="flex justify-start gap-4 mt-3">
//                 <ButtonForm isSubmitting={isSubmitting} text="Change" />
//               </div>
//             </form>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };
