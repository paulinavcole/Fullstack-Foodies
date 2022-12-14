import axios from "axios";

const cart = (state = { lineItems: [] }, action) => {
  if (action.type === "SET_CART") {
    state = action.cart;
  }
  return state;
};

export const processOrder = () => {
  return async (dispatch) => {
    const response = await axios.post("/api/orders", {
      headers: {
        authorization: window.localStorage.getItem("token"),
      },
    });
    console.log(response.data);
    dispatch({ type: "SET_CART", cart: response.data });
  };
};

export const addToCart = (dish, diff) => {
  return async (dispatch, getState) => {
    const lineItem = getState().cart.lineItems.find(
      (lineItem) => lineItem.dishId === dish.id
    ) || { quantity: 0 };

    const response = await axios.put(
      "/api/orders/cart",
      { dish, quantity: diff },
      {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      }
    );
    dispatch({ type: "SET_CART", cart: response.data });
  };
};

export const clearCart = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/orders/empty-cart", {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      dispatch({ type: "SET_CART", cart: response.data });
    } catch (ex) {
      console.log(ex);
    }
  };
};

export const fetchCart = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/orders/cart", {
      headers: {
        authorization: window.localStorage.getItem("token"),
      },
    });
    dispatch({ type: "SET_CART", cart: response.data });
  };
};

export const getCartTotal = () => {
  const lineItems = getState().cart.lineItems;
  const cartTotal =
    lineItems &&
    lineItems.reduce((acc, item) => {
      acc += item.quantity * item.dish?.price;
      return acc;
    }, 0);
  return cartTotal * 1;
};

export default cart;
