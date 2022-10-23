import { createHashRouter } from "react-router-dom";
import { About } from "./About";
import { Game } from "./Game";
import { Home } from "./Home";

export default createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/play/:mode",
    element: <Game />,
  },
  {
    path: "/about",
    element: <About />,
  },
], {
  basename: '/',
});
