import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticate } from "./fetchApi";

const CartProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const cart = localStorage.getItem("cart");
      const cartItems = cart ? JSON.parse(cart) : [];
      return cartItems.length !== 0 && isAuthenticate() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);

export default CartProtectedRoute;
