import React from "react";
import styles from "./QuotesFilter.module.css";
import FilterPill from "../common/FilterPill/FilterPill";
import { useSelector } from "react-redux";
import { quotesSelector } from "../../slices/quotesSlice";

function QuotesFilter() {
  const { authors, categories } = useSelector(quotesSelector);

  /**
   * @type {import("../../slices/quotesSlice").FilterData[]}
   */
  const authorFilterData = React.useMemo(() => {
    const tempState = [];
    Object.keys(authors).forEach((authorName) => {
      const author = {};
      author.name = authorName;
      author.count = authors[authorName]?.length ?? 0;
      tempState.push(author);
    });
    sortFilterData(tempState);
    return tempState;
  }, [authors]);

  const categoryFilterData = React.useMemo(() => {
    const tempState = [];
    Object.keys(categories).forEach((categoryName) => {
      const category = {};
      category.name = categoryName;
      category.count = categories[categoryName]?.length ?? 0;
      tempState.push(category);
    });
    sortFilterData(tempState);
    return tempState;
  }, [categories]);

  /**
   *
   * @param {import("../../slices/quotesSlice").FilterData[]} filterData
   */
  function sortFilterData(filterData) {
    filterData.sort((a, b) => {
      if (b.isSelected) {
        return 1;
      }
      return b.count - a.count;
    });
  }

  return (
    <div>
      <section className={styles.filterSection}>
        <FilterPill title={"Author"} filterItems={authorFilterData} />
        <FilterPill title={"Category"} filterItems={categoryFilterData} />
      </section>
      <section className="activeFiltersSection"></section>
    </div>
  );
}

export default QuotesFilter;
