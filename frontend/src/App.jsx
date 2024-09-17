import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth.jsx";
import FoodTracker from "./pages/FoodTracker.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/food-tracker",
    element: <FoodTracker />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
