import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
