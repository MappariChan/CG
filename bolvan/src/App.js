import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import FractalLayout from "./layouts/FractalLayout";
import MandelbrotPage from "./pages/MandelbrotPage";
import KochCurvePage from "./pages/KochCurvePage";
import MinkowskiIslandPage from "./pages/MinkowskiIslandPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "fractals",
          element: <FractalLayout />,
          children: [
            { path: "mandelbrot", element: <MandelbrotPage /> },
            { path: "koch_curve", element: <KochCurvePage /> },
            { path: "minkowski_island", element: <MinkowskiIslandPage /> },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
