import { createHashRouter } from "react-router-dom";
import { About } from "@pages/About";
import { Game } from "@pages/Game";
import { Home } from "@pages/Home";

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
