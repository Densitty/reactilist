// state is the inital value of the state
// action is what we are trying to do to act on the state
const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }

  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    };
  }

  if (action.type === "INCREASE") {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      // if the item doesn't match, return each item without manipulating any property in it
      return cartItem;
    });

    return {
      ...state,
      cart: tempCart,
    };
  }

  if (action.type === "DECREASE") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        // if the item doesn't match, return each item without manipulating any property in it
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);

    return {
      ...state,
      cart: tempCart,
    };
  }

  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        // get the amount and price properties from the cartItem
        const { price, amount } = cartItem;
        // get the total qty of the items
        cartTotal.amount += amount;

        // get the total cost of the items
        const itemTotal = price * amount;
        cartTotal.total += itemTotal;
        return cartTotal;
      },
      { total: 0, amount: 0 }
    );

    // parse the total to 2 decimal places
    total = parseFloat(total.toFixed(2));

    return {
      ...state,
      total,
      amount,
    };
  }

  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }

  if (action.type === "TOGGLE_AMOUNT") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === "INCREASE") {
            return { ...cartItem, amount: cartItem.amount + 1 };
          }

          if (action.payload.type === "DECREASE") {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);

    return { ...state, cart: tempCart };
  }

  throw new Error("no matching action type");
};

export default reducer;
