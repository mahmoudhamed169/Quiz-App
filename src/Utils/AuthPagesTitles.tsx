import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AuthPagesTitles() {
  const location = useLocation();
  console.log(location);
  const { pathname } = location;

  useEffect(() => {
    switch (pathname) {
      case "/":
        document.title = "Quiz App - Login";
        break;
      case "/login":
        document.title = "Quiz App - Login";
        break;
      case "/register":
        document.title = "Quiz App - Register";
        break;
      case "/reset-password":
        document.title = "Quiz App - Reset Password";
        break;
      case "/forget-password":
        document.title = "Quiz App - Forget Password";
        break;
      default:
        document.title = "Quiz App ";
    }
  }, [pathname]);
  return <div>AuthPagesTitles</div>;
}
