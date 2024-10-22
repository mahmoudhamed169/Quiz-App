import { FilePenLine, Trash, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { ChangePasswordResponse, Group } from "../../../InterFaces/Interfaces";
import { DeleteModal } from "../../../Components/MasterShared/DeleteModal/DeleteModal";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { apiClient, AUTHENTICATION_URLS } from "../../../Apis/EndPoints";
import { GroupFormModal } from "./GroupDataModel";

interface Iprops {
  group: Group;
  getAllGroups: () => void;
}

export default function GroupCard({ group, getAllGroups }: Iprops) {
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const deleteGroup = async () => {
    const toastId = toast.loading("Processing...");
    try {
      await apiClient.delete(`group/${group._id}`);

      setOpenModal(false);
      toast.success("Group deleted successfully", {
        id: toastId,
      });
      getAllGroups();
      setOpenModal(false);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    }
  };
  return (
    <>
      <div className="groupCard border-gray-300 border rounded-lg w-full h-[4.5rem] box-border basis-[32.5%] flex justify-between p-5 items-center">
        <div className="flex flex-col gap-1">
          <h6 className="font-semibold text-lg leading-6">
            Group : {group.name}
          </h6>
          <p className="font-medium text-[#0D1321CC] text-sm">
            No. of students : {group.max_students}
          </p>
        </div>
        <div className="icones flex gap-[6px]">
          <FilePenLine
            onClick={() => setOpenUpdateModal(true)}
            cursor={"pointer"}
          />
          <button
            className="hover:cursor-pointer"
            onClick={() => setOpenModal(true)}>
            <Trash2 />
          </button>
          <DeleteModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            onConfirm={deleteGroup}
            title="group"
          />
          <GroupFormModal
            getAllGroups={getAllGroups}
            group={group}
            openModal={openUpdateModal}
            setOpenModal={setOpenUpdateModal}
          />
        </div>
      </div>
    </>
  );
}
