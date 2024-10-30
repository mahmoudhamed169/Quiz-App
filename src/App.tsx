import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "flowbite";

import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/AuthPages/Login/Login";
import Register from "./Pages/AuthPages/Register/Register";
import ResetPassword from "./Pages/AuthPages/ResetPassword/ResetPassword";
import ForgetPassword from "./Pages/AuthPages/ForgetPassword/ForgetPassword";
import MasterLayout from "./Layouts/MasterLayout/MasterLayout";
import UserLayout from "./Layouts/UserLayout/UserLayout";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/MasterPages/Home/Home";
import GroupsList from "./Pages/MasterPages/GroupsList/GroupsList";
import QuestionsList from "./Pages/MasterPages/QuestionsList/QuestionsList";
import Result from "./Pages/MasterPages/Results/Results";
import Quizzes from "./Pages/MasterPages/Quizzes/Quizzes";
import StudententsList from "./Pages/MasterPages/StudententsList/StudententsList";
import ProtectedRoute from "./Components/Common/ProtectedRoute/ProtectedRoute";
import QuizeResult from "./Pages/MasterPages/Results/QuizeResult";
import QuizData from "./Pages/MasterPages/Quizzes/QuizData";
import StudentLayout from "./Layouts/StudentLayout/StudentLayout";
import QuizesStudent from "./Pages/SrudentPages/Quizes/QuizesStudent";
import ResultsStudent from "./Pages/SrudentPages/Results/ResultsStudent";

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
        { path: "reset-password", element: <ResetPassword /> },
        { path: "forget-password", element: <ForgetPassword /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "groups", element: <GroupsList /> },
        { path: "questions", element: <QuestionsList /> },
        { path: "results", element: <Result /> },
        { path: "quize-result", element: <QuizeResult /> },
        { path: "quizzes", element: <Quizzes /> },
        { path: "quiz-data/:id", element: <QuizData /> },
        { path: "students", element: <StudententsList /> },
      ],
    },
    {
      path: "student",
      element: <StudentLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <QuizesStudent /> },
        { path: "quizzes", element: <QuizesStudent /> },
        { path: "results", element: <ResultsStudent /> },
      ],
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
