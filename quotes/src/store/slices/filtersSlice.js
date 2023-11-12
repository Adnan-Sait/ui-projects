import { createSlice } from "@reduxjs/toolkit";
import {
  FILTER_GROUP_SEPARATOR,
  FILTER_KEY_VALUE_SEPARATOR,
  FILTER_SEPARATOR,
} from "../../utils/label";

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
    /**
     * Formats the filter string and saves it into the slice state.
     * If payload is empty, the state is reset.
     *
     * @param {FiltersSlice} state Slice state
     * @param {import("@reduxjs/toolkit").PayloadAction<String>} action
     */
    formatSaveFilters(state, action) {
      const filterQueryStr = action.payload;

      if (!filterQueryStr) {
        state.selectedFilter = { ...filtersInitialState.selectedFilter };
      } else {
        const filterCategories = filterQueryStr.split(FILTER_GROUP_SEPARATOR);

        const tempSelectedFilter = { ...filtersInitialState.selectedFilter };
        filterCategories.forEach((filter) => {
          if (filter) {
            const [key, value] = filter.split(FILTER_KEY_VALUE_SEPARATOR);

            tempSelectedFilter[key] = value
              ?.split(FILTER_SEPARATOR)
              .filter((item) => item);
          }
        });

        state.selectedFilter = tempSelectedFilter;
      }
    },
  },
});

export const { formatSaveFilters } = filtersSlice.actions;

export const filtersSelector = (state) => state.filters;
export const selectedFiltersSelector = (state) => state.filters.selectedFilter;

export default filtersSlice.reducer;
