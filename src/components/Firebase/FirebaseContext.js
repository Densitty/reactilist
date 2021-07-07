import React, { useContext } from "react";

export const FirebaseContext = React.createContext();

export const useFirebaseContext = () => useContext(FirebaseContext);
