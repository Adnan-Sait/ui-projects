import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { saveQuotes } from "../store/slices/quotesSlice";
import Header from "../components/Header/Header";
import quotesData from "../assets/quotes.json";

/**
 * Entry Point of the Web Application.
 */
function IndexPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveQuotes(quotesData));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default IndexPage;
