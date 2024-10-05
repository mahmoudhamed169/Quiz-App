import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found"; // Set the title here
  }, []);
  return <></>;
}
