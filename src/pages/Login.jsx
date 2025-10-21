import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin123") {
      localStorage.setItem("isAdmin", true);
      navigate("/admin");
    } else {
      alert("Invalid password!");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white p-6 rounded-lg shadow-md w-[50%] flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
      <input
        type="password"
        placeholder="Enter admin password"
        className=" border rounded px-3 py-2 mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 w-[10%]"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
