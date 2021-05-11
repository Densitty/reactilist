import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // fucntion to clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // remove a single item
  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  // increase qty of an item
  const increase = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };

  // decrease qty of an item
  const decrease = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  // fetch data from api
  const fetchData = async () => {
    // before we get the items from the API
    dispatch({ type: "LOADING" });

    const response = await fetch(url);
    const cart = await response.json();
    // when the items have arrived
    dispatch({ type: "DISPLAY_ITEMS", payload: cart });
  };

  /* to refactor the decrease and increase btn functions */
  const toggleAmount = (id, type) => {
    dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } });
  };

  useEffect(() => {
    // run the function when the browser loads the components
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
