import { useEffect, useState } from "react";

/**
 * Returns the active element
 */
function useActiveElement() {
  const [active, setActive] = useState(document.activeElement);

  /**
   * Handles element focus in.
   *
   * @param {Event} event
   */
  function handleFocusIn(event) {
    setActive(document.activeElement);
  }

  useEffect(() => {
    document.addEventListener("focusin", handleFocusIn);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, []);

  return active;
}

export default useActiveElement;
