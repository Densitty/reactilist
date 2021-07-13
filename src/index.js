import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import Firebase from "./components/Firebase/Firebase";
// import { FirebaseContext } from "./components/Firebase/FirebaseContext";

ReactDOM.render(
  <React.StrictMode>
    {/* <FirebaseContext.Provider value={new Firebase()}> */}
    <App />
    {/* </FirebaseContext.Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
