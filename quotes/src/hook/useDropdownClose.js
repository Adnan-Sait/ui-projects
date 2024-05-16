import { useEffect } from "react";
import useActiveElement from "./useActiveElement";

/**
 * Hook to trigger closeDropdown.
 * Triggers close dropdown when the focus moves outside the dropdown element and when click is detected outside the dropdown element.
 *
 * @param {import("react").RefObject<HTMLElement>} dropdownRef    Ref holding the dropdown element.
 * @param {Function} closeDropdown                          Function to close dropdown.
 */
function useDropdownClose(dropdownRef, closeDropdown) {
  const activeElement = useActiveElement();

  useEffect(() => {
    document.addEventListener("mousedown", triggerDropdownClose);

    return () => {
      document.removeEventListener("mousedown", triggerDropdownClose);
    };
  }, []);

  useEffect(() => {
    triggerDropdownClose();
  }, [activeElement, dropdownRef, closeDropdown]);

  /**
   * Checks the focus and determines if the dropdown should be closed.
   *
   * @param {Event} event Event
   */
  function triggerDropdownClose(event) {
    if (!dropdownRef.current?.contains(event?.target || activeElement))
      closeDropdown();
  }
}

export default useDropdownClose;
