import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import CustomBtn from "../../../Components/MasterShared/CustomBtn/CustomBtn";
import { Student } from "../../../InterFaces/Interfaces";
// import { apiClient } from "../../../Apis/EndPoints";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { apiClient } from "./../../../Apis/EndPoints";

export default function GroupDataModel() {
  const [allStudent, setAllStudent] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState(false);
  console.log(allStudent);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setFocus,
    reset,
  } = useForm<{ name: string; students: string[] }>();

  const getAllStudent = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<Student[]>("student");
      setAllStudent(response.data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    reset();
  };

  useEffect(() => {
    getAllStudent();
  }, []);

  useEffect(() => {
    setFocus("name");
  }, []);

  const onSubmit = async (data: { name: string; students: string[] }) => {
    const toastId = toast.loading("Processing...");

    try {
      const response = await apiClient.post("/group", data);
      console.log(data);
      console.log(response);

      toast.success("Group created successfully!", {
        id: toastId,
      });

      handleCloseModal();
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred", {
        id: toastId,
      });
      console.log(axiosError);
    }
  };

  return (
    <>
      <CustomBtn text="Add Group" onClick={() => setOpenModal(true)} />
      <Modal show={openModal} onClose={handleCloseModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between border-b items-center ">
            <h5 className="font-bold text-xl leading-6 p-5">
              Set up a new Group
            </h5>
            <div className="flex">
              <button
                type="submit"
                className="text-2xl font-extrabold w-[80px] h-full border-l py-5"
                disabled={isSubmitting || loading}>
                {isSubmitting ? (
                  <Loader className="loader-spin m-auto " />
                ) : (
                  "\u2713"
                )}
              </button>
              <button
                type="button"
                className="text-2xl font-extrabold border-l py-5 w-[80px]"
                onClick={handleCloseModal}>
                {"\u2717"}
              </button>
            </div>
          </div>
          <Modal.Body className="overflow-hidden">
            <div className="w-full relative mt-4 flex flex-col gap-8 ">
              <div className="flex flex-col gap-1">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[7.3rem] py-2 focus:border-[#C5D86D] focus:outline-none focus:ring-1 focus:ring-[#C5D86D]"
                    placeholder="Enter Group Name"
                    {...register("name", { required: "Name is required" })}
                  />
                  <label className="font-bold absolute left-[0.9px] top-[0.8px] bottom-[0.8px] text-black bg-[#FFEDDF] py-3 px-3 border-e-0 flex items-center justify-center rounded-lg border border-transparent text-center text-sm transition-all shadow-sm">
                    Group Name
                  </label>
                </div>
                {errors.name && (
                  <span className="text-red-600 ms-1">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <div className="border w-full border-slate-400 rounded-lg">
                  <label className="font-bold text-black bg-[#FFEDDF] py-3 px-3 border-e-0 flex items-center justify-center rounded-lg border border-transparent text-center text-sm transition-all shadow-sm">
                    Select Students List
                  </label>
                  <select
                    multiple
                    {...register("students", {
                      required: "At least one student must be selected",
                    })}
                    className="appearance-none w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-[#C5D86D] focus:border-transparent">
                    <option value="" disabled>
                      Select Students List
                    </option>
                    {allStudent.map((student) => (
                      <option
                        value={student._id}
                        key={student._id}
                        className="text-slate-700 hover:bg-[#C5D86D] hover:text-white">
                        {`${student.first_name} ${student.last_name}`}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.students && (
                  <span className="text-red-600 ms-1">
                    {errors.students.message}
                  </span>
                )}
              </div>
            </div>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}
