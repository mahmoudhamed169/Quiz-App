import React, { useEffect, useRef, useState } from "react";

export default function useOpenCloseModal() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handelOpenModle = () => {
    setOpenModal(true);
  };

  const handelCloseModle = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenModal(false);
        console.log(modalRef);
      }
    };

    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal, setOpenModal]);
  return {
    openModal,
    setOpenModal,
    handelOpenModle,
    handelCloseModle,
    modalRef,
  };
}
