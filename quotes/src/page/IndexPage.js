import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { saveQuotes } from "../slices/quotesSlice";
import quotesData from "../assets/quotes.json";
import Header from "../components/Header/Header";

/**
 * Entry Point of the Web Application.
 */
function IndexPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveQuotes(quotesData));
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default IndexPage;
