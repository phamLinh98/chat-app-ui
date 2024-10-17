/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import ModalComponent from "../SideComponent/ModalComponent";

export const SortedContentsContext = createContext();

export const SortedContentsProvider = ({ children }) => {
  const [contextUserLoginAndUserClicked, setContextUserLoginAndUserClicked] =
    useState(null);
  const [indexfind, setIndex] = useState(1);
  const [modalOpen, setModalOpen] = useState(false); // Trạng thái mở modal

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <SortedContentsContext.Provider
      value={{
        contextUserLoginAndUserClicked,
        setContextUserLoginAndUserClicked,
        indexfind,
        setIndex,
        openModal,
      }}
    >
      {children}
      <ModalComponent open={modalOpen} onClose={closeModal} />
    </SortedContentsContext.Provider>
  );
};
