import React from "react";
import { useGlobalContext } from "./context";

const Buttons = () => {
  const { isLoading, page, numOfPages, handlePage } = useGlobalContext();

  return (
    <div className="btn-container">
      {/* before arrival of data from api, disable the btn */}
      <button disabled={isLoading} onClick={() => handlePage("dec")}>
        prev
      </button>
      <p>
        {page + 1} of {numOfPages}
      </p>
      <button disabled={isLoading} onClick={() => handlePage("inc")}>
        next
      </button>
    </div>
  );
};

export default Buttons;
