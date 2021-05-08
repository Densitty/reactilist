import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";

import { AppContext, useGlobalContext } from "./context";

const Home = () => {
  /* to access the contextAPI we can use the useContext */
  // const data = useContext(AppContext);

  /* or use the custom hook */
  const { openSidebar, openModal } = useGlobalContext();

  return (
    <main>
      <button className="sidebar-toggle" onClick={openSidebar}>
        <FaBars />
      </button>
      <button className="btn" onClick={openModal}>
        show modal
      </button>
    </main>
  );
};

export default Home;
