import { configureStore } from "@reduxjs/toolkit";
import quotesSlice from "./slices/quotesSlice";
import filtersSlice from "./slices/filtersSlice";

const store = configureStore({
  reducer: { quotes: quotesSlice, filters: filtersSlice },
});

export default store;
