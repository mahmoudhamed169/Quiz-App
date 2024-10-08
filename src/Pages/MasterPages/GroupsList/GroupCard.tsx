import { FilePenLine, Trash } from "lucide-react";
import React from "react";
import { Group } from "../../../InterFaces/Interfaces";

interface Iprops {
  group: Group;
}

export default function GroupCard({ group }: Iprops) {
  return (
    <>
      <div className="groupCard border-gray-300 border rounded-lg w-[30rem] h-[4.5rem]   flex justify-between p-5 items-center">
        <div className="flex flex-col gap-1">
          <h6 className="font-semibold text-lg leading-6">
            Group : {group.name}
          </h6>
          <p className="font-medium text-[#0D1321CC] text-sm">
            No. of students : {group.max_students}
          </p>
        </div>
        <div className="icones flex gap-[6px]">
          <FilePenLine />
          <Trash />
        </div>
      </div>
    </>
  );
}
