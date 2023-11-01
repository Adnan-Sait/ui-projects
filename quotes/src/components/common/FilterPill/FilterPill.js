import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./FilterPill.module.css";
import useDropdownClose from "../../../hook/useDropdownClose";

/**
 *
 * @param {Object} param0 Prop
 * @param {String} param0.title Title for the filter
 * @param {import("../../../slices/quotesSlice").FilterData[]} param0.filterItems Filter Items to be shown in dropdown
 */
function FilterPill({ title, filterItems }) {
  const dropdownRef = useRef();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const closeDropdownCallback = useCallback(closeDropdown, []);

  useDropdownClose(dropdownRef, closeDropdownCallback);

  useEffect(() => {
    const currentSelectedFilters = filterItems.filter(
      (item) => item.isSelected
    );
    setSelectedFilters(currentSelectedFilters);
  }, [filterItems]);

  /**
   * Clears all the filters.
   *
   * @param {Event} event
   */
  function clearAllFilters(event) {
    closeDropdown();
  }

  /**
   * Save Filters.
   *
   * @param {Event} event
   */
  function saveFilters(event) {
    closeDropdown();
  }

  function closeDropdown() {
    setOpenDropdown(false);
  }

  /**
   *
   * @param {Event} event Event
   * @param {import("../../../slices/quotesSlice").FilterData} filter Selected filter
   * @returns
   */
  function checkboxChangeHandler(event, filter) {
    switch (event.currentTarget.checked) {
      case true: {
        setSelectedFilters((state) => {
          return [...state, filter];
        });
        break;
      }
      case false: {
        setSelectedFilters((state) => {
          return state.filter((item) => item.name !== filter.name);
        });
        break;
      }
      default: {
      }
    }
  }

  /**
   * Returns the Filter Items JSX.
   *
   * @returns JSX
   */
  function renderFilterItems() {
    return filterItems?.map((filter) => (
      <label
        htmlFor={filter.name}
        key={filter.name}
        className={styles.filterItem}
      >
        <input
          type="checkbox"
          name="Author"
          id={filter.name}
          value={filter.name}
          defaultChecked={filter.isSelected ?? false}
          onChange={(event) => checkboxChangeHandler(event, filter)}
        />
        <span>{filter.name}</span>
        <span className={styles.filterItemCount}>({filter.count})</span>
      </label>
    ));
  }

  return (
    <div ref={dropdownRef}>
      <button
        className={styles.filterPillBtn}
        onClick={() => setOpenDropdown((state) => !state)}
      >
        <span>{title}</span>
        <FontAwesomeIcon icon={faCaretDown} />
      </button>

      <div className={styles.dropdownWrapper}>
        {openDropdown && (
          <section className={styles.filterDropdown}>
            <header className={styles.filterHeader}>1 filter selected</header>

            <main className={styles.filterBody}>
              <div className={styles.filterItemsWrapper}>
                {renderFilterItems()}
              </div>
            </main>

            <footer className={styles.filterFooter}>
              <button
                className={classNames("primary-btn", styles.filterSaveBtn)}
                onClick={saveFilters}
              >
                Save
              </button>
              <button className="secondary-btn" onClick={clearAllFilters}>
                Clear
              </button>
            </footer>
          </section>
        )}
      </div>
    </div>
  );
}

export default FilterPill;
