import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin");
  if (!isAdmin) {
    return <Navigate to="/login" replace />; // redirect to home/login if not admin
  }
  return children;
};

export default ProtectedRoute;
