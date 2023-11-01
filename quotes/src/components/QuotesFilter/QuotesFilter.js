import React from "react";
import styles from "./QuotesFilter.module.css";
import FilterPill from "../common/FilterPill/FilterPill";
import { useSelector } from "react-redux";
import { quotesSelector } from "../../slices/quotesSlice";

function QuotesFilter() {
  const { authors, categories } = useSelector(quotesSelector);

  return (
    <div>
      <section className={styles.filterSection}>
        <FilterPill title={"Author"} categoryData={authors} />
        <FilterPill title={"Category"} categoryData={categories} />
      </section>
      <section className="activeFiltersSection"></section>
    </div>
  );
}

export default QuotesFilter;
