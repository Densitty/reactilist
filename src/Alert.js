import React, { useEffect } from "react";

const Alert = ({ msg, type, alert, list }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      alert();
    }, 2000);
    return () => clearTimeout(timer);
    /* passing the list as a dependency such that whenever an alert pops up, each alert will be 2secs before, even if another alert comes up before the previous alert finished displaying on the screen */
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
