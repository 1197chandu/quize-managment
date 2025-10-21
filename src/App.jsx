import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import TakeQuiz from "./pages/TakeQuiz";
import Login from "./pages/login";

const App = () => {
  const isAdmin = localStorage.getItem("isAdmin");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:id" element={<TakeQuiz />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={isAdmin ? <Admin /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
