import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        isSidebarOpen,
        openModal,
        closeModal,
        openSidebar,
        closeSidebar,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

// setup a custom hook - any name can be used as long as -use- prefixes it
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
