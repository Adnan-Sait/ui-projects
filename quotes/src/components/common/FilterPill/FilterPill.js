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
 * @param {Object.<string, number[]>} param0.categoryData Filter Items to be shown in dropdown
 * @param {Function} param0.saveFilters Function to save the filter values
 * @param {String} param0.filterId Filter Identifier
 */
function FilterPill({ title, categoryData, saveFilters, filterId }) {
  const dropdownRef = useRef();

  /**
   * Controls the dropdown display
   * @type {[Boolean[], React.Dispatch<Boolean[]>]}
   */
  const [openDropdown, setOpenDropdown] = useState(false);
  /**
   * Filters applied.
   * @type {[String[], React.Dispatch<String[]>]}
   */
  const [selectedFilters, setSelectedFilters] = useState([]);

  /**
   * The filters shown in the dropdown.
   * @type {[import("../../../slices/quotesSlice").FilterData[], React.Dispatch<import("../../../slices/quotesSlice").FilterData[]>]}
   */
  const [filterData, setFilterData] = useState([]);

  const closeDropdownCallback = useCallback(closeDropdown, []);

  useDropdownClose(dropdownRef, closeDropdownCallback);

  useEffect(() => {
    if (!openDropdown) setSelectedFilters([]);
  }, [openDropdown]);

  /**
   * Initializing the filter data.
   */
  useEffect(() => {
    const tempState = [];
    Object.keys(categoryData).forEach((authorName) => {
      const filter = {};
      filter.name = authorName;
      filter.count = categoryData[authorName]?.length ?? 0;
      tempState.push(filter);
    });
    sortFilterData(tempState);

    setFilterData(tempState);
  }, [categoryData]);

  /**
   * Setting the selected flag based on the selected filters.
   */
  useEffect(() => {
    setFilterData((state) => {
      const tempState = [...state];
      tempState.forEach((filter) => {
        const isSelected = selectedFilters.some((item) => item === filter.name);
        filter.isSelected = isSelected;
      });

      return tempState;
    });
  }, [selectedFilters]);

  const selectedFiltersCount = selectedFilters.length;

  /**
   * Sorts the data.
   * Prioritizes selected filters. Then sorts the filters by the count.
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

  /**
   * Clears all the filters.
   *
   * @param {Event} event
   */
  function clearAllFilters(event) {
    setSelectedFilters([]);
  }

  /**
   * Save Filters.
   *
   * @param {Event} event
   */
  function handleFilterApply(event) {
    saveFilters(filterId, selectedFilters);
    closeDropdown();
  }

  /**
   * Closes the dropdown
   */
  function closeDropdown() {
    setOpenDropdown(false);
  }

  /**
   * Handles filter checkbox change events.
   * If the filter is selected, it is added to selectedFilters state.
   * If the filter is unselected, it is removed from selectedFilters state.
   *
   * @param {Event} event Event
   * @returns
   */
  function checkboxChangeHandler(event) {
    const value = event.currentTarget.value;
    switch (event.currentTarget.checked) {
      case true: {
        setSelectedFilters((state) => {
          return [...state, value];
        });
        break;
      }
      case false: {
        setSelectedFilters((state) => {
          return state.filter((item) => item !== value);
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
    return filterData?.map((filter) => (
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
          checked={filter.isSelected}
          onChange={(event) => checkboxChangeHandler(event)}
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
            <header className={styles.filterHeader}>
              {selectedFiltersCount} filter(s) selected
            </header>

            <main className={styles.filterBody}>
              <div className={styles.filterItemsWrapper}>
                {renderFilterItems()}
              </div>
            </main>

            <footer className={styles.filterFooter}>
              <button
                className={classNames("primary-btn", styles.filterSaveBtn)}
                onClick={handleFilterApply}
              >
                Apply
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
