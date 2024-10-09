import { useEffect, useState } from "react";
import CustomBtn from "../../../Components/MasterShared/CustomBtn/CustomBtn";

import GroupCard from "./GroupCard";
import { Group } from "../../../InterFaces/Interfaces";
import { apiClient } from "../../../Apis/EndPoints";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { DeleteModal } from "../../../Components/MasterShared/DeleteModal/DeleteModal";

export default function GroupsList() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllGroups = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<Group[]>("group");
      setGroups(response.data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllGroups();
  }, []);
  return (
    <section className="m-5 ">
      <div className="flex justify-end ">
        <CustomBtn text="Add Group" />
      </div>
      <div className="group-list lg:h-[509px] border-gray-300 border rounded-lg  mt-4">
        <h5 className="font-medium  text-xl leading-7 mt-4 ms-5">
          Groups list
        </h5>
        <div className="cards flex flex-wrap mt-7 gap-[15px] ms-5">
          {groups &&
            groups.map((group, index) => (
              <GroupCard
                key={index}
                group={group}
                getAllGroups={getAllGroups}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
