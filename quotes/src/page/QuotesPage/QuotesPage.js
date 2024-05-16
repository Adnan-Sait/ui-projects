import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { quotesSelector } from "../../store/slices/quotesSlice";
import styles from "./QuotesPage.module.css";
import classNames from "classnames";
import QuotesCard from "../../components/QuotesCard/QuotesCard";
import QuotesFilter from "../../components/QuotesFilter/QuotesFilter";
import { selectedFiltersSelector } from "../../store/slices/filtersSlice";

function QuotesPage() {
  /**
   * @type {{quotes: import("../../store/slices/quotesSlice").Quotes[]}}
   */
  const { quotes } = useSelector(quotesSelector);
  /**
   * @type {{author: string[], category: string[]}}
   */
  const { author: authorSelectedFilters, category: categorySelectedFilters } =
    useSelector(selectedFiltersSelector);

  const filteredQuotes = useMemo(filterQuotes, [
    quotes,
    authorSelectedFilters,
    categorySelectedFilters,
  ]);

  /**
   * Filters the quotes based on the selected filters.
   *
   * @returns {import("../../store/slices/quotesSlice").Quotes[]}
   */
  function filterQuotes() {
    const authorCheck = authorSelectedFilters?.length > 0;
    const categoryCheck = categorySelectedFilters?.length > 0;

    return quotes.filter((item) => {
      if (authorCheck && !authorSelectedFilters.includes(item.author)) {
        return false;
      }
      if (
        categoryCheck &&
        !item.category.some((item) => categorySelectedFilters.includes(item))
      ) {
        return false;
      }
      return true;
    });
  }

  return (
    <div className={classNames("container", styles.quotesPageContainer)}>
      <div className={styles.quotesGrid}>
        <div className={styles.filterColumn}>
          <QuotesFilter />
        </div>
        {filteredQuotes.map((quoteItem) => {
          return <QuotesCard key={quoteItem.id} quote={quoteItem} />;
        })}
      </div>
    </div>
  );
}

export default QuotesPage;
