import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthUser} = useAuthContext();
  const navigate = useNavigate();

  async function login(evt){
    evt.preventDefault();
    try{
      await axios.post('http://localhost:8000/login', {username, password});
      console.log("Logged in");
      localStorage.setItem("accUser", JSON.stringify(username));
      setAuthUser(username);
      navigate('/');
    }
    catch(err){
      console.log('Invalid credentials', err);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-teal-800 
    to-black w-full">
      <div className="flex justify-center items-center mb-6">
        <img
          src="../assets/logo.png"
          alt="logo"
          className="h-24 w-24 mr-2 mb-3"
        />
        <h1 className="text-6xl font-bold text-white font-serif">
          BookLog
        </h1>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={login}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username :
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="form-input w-full p-2 border border-gray-300 rounded"
              name="username"
              onChange={(evt) => setUsername(evt.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="passwd" className="block text-gray-700 mb-2">
              Password :
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-input w-full p-2 border border-gray-300 rounded"
              name="passwd"
              onChange={(evt) => setPassword(evt.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
          <div className="flex justify-center items-center mt-4">
            <h2 className="mr-2 text-gray-600">Don't have an account yet?</h2>
            <Link to="/register" className="text-blue-700 hover:underline">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
