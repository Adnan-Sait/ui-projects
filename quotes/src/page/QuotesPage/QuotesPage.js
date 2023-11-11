import React from "react";
import { useSelector } from "react-redux";
import { quotesSelector } from "../../store/slices/quotesSlice";
import styles from "./QuotesPage.module.css";
import classNames from "classnames";
import QuotesCard from "../../components/QuotesCard/QuotesCard";
import QuotesFilter from "../../components/QuotesFilter/QuotesFilter";

function QuotesPage() {
  /**
   * @type {{quotes: import("../../store/slices/quotesSlice").Quotes[]}}
   */
  const { quotes } = useSelector(quotesSelector);

  return (
    <div className={classNames("container", styles.quotesPageContainer)}>
      <div className={styles.quotesGrid}>
        <div className={styles.filterColumn}>
          <QuotesFilter />
        </div>
        {quotes.map((quoteItem) => {
          return <QuotesCard key={quoteItem.id} quote={quoteItem} />;
        })}
      </div>
    </div>
  );
}

export default QuotesPage;
