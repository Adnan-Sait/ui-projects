import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import quotesSlice from "./slices/quotesSlice";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes";

/**
 * Main component
 *
 * Initializes Redux store and Router.
 */
function Main() {
  const router = createBrowserRouter(routes);
  const store = configureStore({
    reducer: { quotes: quotesSlice },
  });

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default Main;
