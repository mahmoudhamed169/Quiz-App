import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/AuthPages/Login/Login";
import Register from "./Pages/AuthPages/Register/Register";
import ResetPassword from "./Pages/AuthPages/ResetPassword/ResetPassword";
import ForgetPassword from "./Pages/AuthPages/ForgetPassword/ForgetPassword";
import MasterLayout from "./Layouts/MasterLayout/MasterLayout";
import UserLayout from "./Layouts/UserLayout/UserLayout";
import { Toaster } from "react-hot-toast";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "rest-password", element: <ResetPassword /> },
        { path: "forget-password", element: <ForgetPassword /> },
      ],
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [{}],
    },
    {
      path: "student",
      element: <UserLayout />,
      errorElement: <NotFound />,
      children: [{}],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
}

export default App;
