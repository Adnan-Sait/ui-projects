/**
 * @typedef     {Object}    Quotes
 * @property    {number}    id
 * @property    {string}    quote
 * @property    {string[]}  category
 * @property    {string}    author
 */

/**
 * @typedef     {Object}                        QuotesSlice
 * @property    {Quotes[]}                      quotes
 * @property    {Object.<string, number[]>}     authors
 * @property    {Object.<string, number[]>}     categories
 */

const { createSlice } = require("@reduxjs/toolkit");

/**
 * @type {QuotesSlice}
 */
export const quotesInitialState = {
  quotes: [],
  authors: {},
  categories: {},
};

/**
 * Creates the author-contentId object and saves it in the state.
 *
 * @param {QuotesSlice} state
 */
function updateAuthorsState(state) {
  state.authors = state.quotes.reduce((acc, value) => {
    if (acc[value.author]) {
      acc[value.author].push(value.id);
    } else {
      acc[value.author] = [value.id];
    }

    return acc;
  }, {});
}

/**
 * Creates the category-contentId object and saves it in the state.
 *
 * @param {QuotesSlice} state
 */
function updateCategoriesState(state) {
  state.categories = state.quotes.reduce((acc, value) => {
    value.category.forEach((item) => {
      if (acc[item]) {
        acc[item].push(value.id);
      } else {
        acc[item] = [value.id];
      }
    });

    return acc;
  }, {});
}

const quotesSlice = createSlice({
  name: "quotes",
  initialState: quotesInitialState,
  reducers: {
    saveQuotes(state, action) {
      const { payload } = action;

      state.quotes = payload;
      updateAuthorsState(state);
      updateCategoriesState(state);
    },
  },
});

export const { saveQuotes } = quotesSlice.actions;

export const quotesSelector = (state) => state.quotes;

export default quotesSlice.reducer;
