import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useIsLoggedIn from "../hooks/user";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
