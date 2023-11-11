import React from "react";
import styles from "./QuotesFilter.module.css";
import FilterPill from "../common/FilterPill/FilterPill";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  FILTER_GROUP_SEPARATOR,
  FILTER_KEYS,
  FILTER_SEPARATOR,
} from "../../utils/label";
import { quotesSelector } from "../../store/slices/quotesSlice";

function QuotesFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { authors, categories } = useSelector(quotesSelector);

  /**
   *
   * @param {String} key                  Identifier for the filter.
   * @param {String[]} selectedFilters    Selected filter values.
   */
  function saveFilters(key, selectedFilters) {
    setSearchParams((state) => {
      let filterValue;

      if (key && selectedFilters?.length > 0) {
        filterValue = selectedFilters.join(FILTER_SEPARATOR);
        filterValue = `${key}:${filterValue}`;
      }

      const currentFilters = state.get(FILTER_KEYS.filter);
      let filterArr = [];

      if (currentFilters) {
        filterArr = currentFilters
          .split(FILTER_GROUP_SEPARATOR)
          .filter((item) => !item.startsWith(`${key}:`));
      }

      if (filterValue) {
        filterArr.push(filterValue);
      }

      if (filterArr.length === 0) {
        state.delete(FILTER_KEYS.filter);
      } else {
        const value =
          filterArr.join(FILTER_GROUP_SEPARATOR) + FILTER_GROUP_SEPARATOR;
        state.set(FILTER_KEYS.filter, value);
      }

      return state;
    });
  }

  return (
    <div>
      <section className={styles.filterSection}>
        <FilterPill
          filterId={FILTER_KEYS.author}
          title={"Author"}
          categoryData={authors}
          saveFilters={saveFilters}
        />
        <FilterPill
          filterId={FILTER_KEYS.category}
          title={"Category"}
          categoryData={categories}
          saveFilters={saveFilters}
        />
      </section>
      <section className="activeFiltersSection"></section>
    </div>
  );
}

export default QuotesFilter;
