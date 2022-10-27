import AppLayout from "@components/UI/AppLayout";
import { About } from "@pages/About";
import { Game } from "@pages/Game";
import { Home } from "@pages/Home";
import { createHashRouter } from "react-router-dom";

export default createHashRouter([
  {
    // Routes with layout
    element: <AppLayout />,
    children: [
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
    ],
  },
], {
  basename: '/',
});
