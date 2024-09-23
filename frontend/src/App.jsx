import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth.jsx";
import FoodTracker from "./pages/FoodTracker.jsx";
import AddFood from "./pages/AddFood.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/food-tracker",
    element: <FoodTracker />,
  },
  {
    path: "/food-tracker/add-food",
    element: <AddFood />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
