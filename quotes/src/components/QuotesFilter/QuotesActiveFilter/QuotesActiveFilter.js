/**
 * @typedef     {Object}        ActiveFilters
 * @property    {String}        key
 * @property    {String}        value
 */

import React, { useMemo } from "react";
import { selectedFiltersSelector } from "../../../store/slices/filtersSlice";
import { useSelector } from "react-redux";
import { FILTER_KEYS } from "../../../utils/label";
import styles from "./QuotesActive.module.css";

function QuotesActiveFilter() {
  /**
   * @type {{author: string[], category: string[]}}
   */
  const { author: authorSelectedFilters, category: categorySelectedFilters } =
    useSelector(selectedFiltersSelector);

  /**
   * @type  {ActiveFilters[]}
   */
  const activeFilters = useMemo(createActiveFilters, [
    authorSelectedFilters,
    categorySelectedFilters,
  ]);

  /**
   * Creates the active filter array by combining all active filters across the different categories.
   *
   * @returns {ActiveFilters[]}
   */
  function createActiveFilters() {
    const authorActiveFilters = createActiveFiltersForCategory(
      FILTER_KEYS.author,
      authorSelectedFilters
    );
    const categoryActiveFilters = createActiveFiltersForCategory(
      FILTER_KEYS.category,
      categorySelectedFilters
    );

    return [...authorActiveFilters, ...categoryActiveFilters];
  }

  /**
   * Creates a list of active filter objects.
   *
   * @param {String} key Key to be used
   * @param {String[]} filterArr Selected filter values
   *
   * @returns {ActiveFilters[]}
   */
  function createActiveFiltersForCategory(key, filterArr) {
    return (
      filterArr.map((item) => {
        const keyProper = `${key[0].toUpperCase()}${key.substring(1)}`;
        return { key: keyProper, value: item };
      }) || []
    );
  }

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className={styles.activeFilterWrapper}>
      {activeFilters.map((item) => (
        <button
          key={`${item.key}-${item.value}`}
          className={styles.activeFilterBtn}
        >
          <span className={styles.filterCategory}>{item.key}: </span>
          <span className={styles.filterValue}>{item.value}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={styles.closeIcon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      ))}
      {activeFilters.length > 1 && (
        <button className="link-btn">Clear All</button>
      )}
    </div>
  );
}

export default QuotesActiveFilter;
