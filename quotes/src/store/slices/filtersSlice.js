import { createSlice } from "@reduxjs/toolkit";

/**
 * @typedef     {Object}        SelectedFilter
 * @property    {string[]}      author
 * @property    {string[]}      category
 */

/**
 * @typedef     {Object}            FiltersSlice
 * @property    {SelectedFilter}    selectedFilter
 */

/**
 * @type {FiltersSlice}
 */
export const filtersInitialState = {
  selectedFilter: {
    author: [],
    category: [],
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: filtersInitialState,
  reducers: {
    formatSaveFilters(state, action) {},
  },
});

export const { formatSaveFilters } = filtersSlice.actions;

export const filtersSelector = (state) => state.filters;

export default filtersSlice.reducer;
