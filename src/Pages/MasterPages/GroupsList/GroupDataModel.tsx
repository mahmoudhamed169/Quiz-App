import { Modal } from "flowbite-react";
import { RefObject, useEffect, useState } from "react";
import CustomBtn from "../../../Components/MasterShared/CustomBtn/CustomBtn";
import { Student } from "../../../InterFaces/Interfaces";
// import { apiClient } from "../../../Apis/EndPoints";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { apiClient } from "./../../../Apis/EndPoints";
import { Group } from "../../../InterFaces/Interfaces";
import useOpenCloseModal from "../../../Hooks/useClickOutside";

export default function GroupDataModel({
  getAllGroups,
}: {
  getAllGroups: () => void;
}) {
  // const [openModal, setOpenModal] = useState(false);
  const {
    openModal: openAddModal,
    setOpenModal: setOpenAddModal,
    modalRef: updateModalRef,
    handelOpenModle: handelOpenUpdateModal,
    handelCloseModle: handelCloseUpdateModal,
  } = useOpenCloseModal();

  return (
    <>
      <CustomBtn text="Add Group" onClick={() => setOpenAddModal(true)} />
      <GroupFormModal
        openModal={openAddModal}
        setOpenModal={setOpenAddModal}
        modalRef={updateModalRef}
        getAllGroups={getAllGroups}
      />
    </>
  );
}

export const GroupFormModal = ({
  getAllGroups,
  openModal,
  setOpenModal,
  modalRef,
  group,
}: {
  getAllGroups: () => void;
  openModal?: boolean;
  setOpenModal: (value: boolean) => void;
  group?: Group;
  modalRef: RefObject<HTMLDivElement>;
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [allStudent, setAllStudent] = useState<Student[]>([]);
  const [allStudentWithOutGroup, setIsAllStudentWithOutGroup] = useState<
    Student[]
  >([]);
  const [previousSelectedStudents, setPreviousSelectedStudents] = useState<
    string[]
  >([]);
  const [unselectedStudents, setUnselectedStudents] = useState<string[]>([]);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setFocus,
    reset,
  } = useForm<{ name: string; students: string[] }>();

  const handleCloseModal = () => {
    setOpenModal(false);
    reset();
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    const unselected = previousSelectedStudents.filter(
      (studentId) => !selectedOptions.includes(studentId)
    );
    setUnselectedStudents((prev) => [...prev, ...unselected]);
    setPreviousSelectedStudents(selectedOptions);
  };

  const deleteStudentFromGroup = async (studentId: string) => {
    setLoading(true);
    try {
      const response = await apiClient.delete(
        `student/${studentId}/${group?._id}`
      );
      setUnselectedStudents([]);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: { name: string; students: string[] }) => {
    const toastId = toast.loading("Processing...");

    try {
      if (unselectedStudents.length > 0) {
        await Promise.all(
          unselectedStudents.map((studentId) =>
            deleteStudentFromGroup(studentId)
          )
        );
      }

      const response = group
        ? await apiClient.put(`/group/${group._id}`, data)
        : await apiClient.post("/group", data);

      toast.success(
        group ? "Group updated successfully!" : "Group created successfully!",
        {
          id: toastId,
        }
      );

      handleCloseModal();
      getAllGroups();
      getAllStudent();
      getAllStudentWithOutGroup();
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    }
  };

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

  const getAllStudentWithOutGroup = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<Student[]>("student/without-group");
      setIsAllStudentWithOutGroup(response.data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllStudent();
    getAllStudentWithOutGroup();
    setFocus("name");
    if (group) {
      setPreviousSelectedStudents(group.students);
    }
  }, []);

  return (
    <Modal show={openModal} onClose={handleCloseModal} ref={modalRef}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between border-b items-center ">
          <h5 className="font-bold text-xl leading-6 p-5">
            {group ? "Update group" : "Set up a new Group "}
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
                  defaultValue={group?.name}
                  {...register("name", { required: "Name is required" })}
                />
                <label className="font-bold absolute left-[0.9px] top-[0.8px] bottom-[0.8px] text-black bg-[#FFEDDF] py-3 px-3 border-e-0 flex items-center justify-center rounded-lg border border-transparent text-center text-sm transition-all shadow-sm">
                  Group Name
                </label>
              </div>
              {errors.name && (
                <span className="text-red-600 ms-1">{errors.name.message}</span>
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
                  onChange={handleSelectChange}
                  className="appearance-none w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-[#C5D86D] focus:border-transparent">
                  <option value="" disabled>
                    Select Students List
                  </option>
                  {allStudentWithOutGroup?.map((student) => (
                    <option
                      value={student._id}
                      selected={group?.students?.includes(student._id)}
                      key={student._id}
                      className="text-slate-700 disabled-option hover:bg-[#C5D86D] hover:text-white">
                      {`${student.first_name} ${student.last_name}`}
                    </option>
                  ))}
                  {group
                    ? allStudent?.map((student) => {
                        if (group?.students?.includes(student._id)) {
                          return (
                            <option
                              value={student._id}
                              selected={true}
                              key={student._id}
                              className="text-slate-700 disabled-option hover:bg-[#C5D86D] hover:text-white">
                              {`${student.first_name} ${student.last_name}`}
                            </option>
                          );
                        }
                      })
                    : ""}
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
  );
};
