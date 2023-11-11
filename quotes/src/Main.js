import React from "react";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import store from "./store/store";

/**
 * Main component
 *
 * Initializes Redux store and Router.
 */
function Main() {
  const router = createBrowserRouter(routes);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default Main;
