import React from "react";
import styles from "./QuotesCard.module.css";

/**
 *
 * @param {Object} param0
 * @param {import("../../slices/quotesSlice").Quotes} param0.quote
 */
function QuotesCard({ quote }) {
  return (
    <figure className={styles.wrapper} tabIndex={0}>
      <blockquote className={styles.quote}>{quote.quote}</blockquote>

      <figcaption className={styles.caption}>
        <p className={styles.author}>{quote.author}</p>
        <div className={styles.category}>
          {quote.category.map((category, index) => {
            return (
              <React.Fragment key={category}>
                {index > 0 && <span>, </span>}
                <span key={category}>{category}</span>
              </React.Fragment>
            );
          })}
        </div>
      </figcaption>
    </figure>
  );
}

export default QuotesCard;
