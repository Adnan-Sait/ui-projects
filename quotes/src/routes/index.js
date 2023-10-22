import App from "../components/App/App";
import IndexPage from "../page/IndexPage";
import QuotesPage from "../page/QuotesPage/QuotesPage";

/**
 * @type {import("react-router-dom").RouteObject[]} routes
 */
const routes = [
  {
    path: "*",
    element: <IndexPage />,
    children: [
      {
        path: "*",
        element: <App />,
      },
      {
        path: "quotes",
        element: <QuotesPage />,
      },
    ],
  },
];

export default routes;
