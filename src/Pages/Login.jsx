import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword, signInWithGoogle,auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [user, loading, authError] = useAuthState(auth);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);

    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long.");
    }

    if (validateEmail(email) && validatePassword(password)) {
      try {
        await logInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.error("Login failed:", err);
        setPasswordError("Login failed. Please check your email and password.");
      }
    }
  };

  const handleWithGoogle = async () => {
    try{
      await signInWithGoogle();
    } catch (err) {
      console.error("Google sign-in failed:", err);
    }
  };

  useEffect(() => {
    console.log('User:', user); // Log user state
    if (user) {
      console.log('Navigating to home page');
      navigate("/");
    }
  }, [user, navigate]);


  useEffect(() => {
    if (authError) {
      setPasswordError(authError);
    }
  }, [authError]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-teal-500">My indiaa</h1>
      <div className="w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 mt-8 p-6 bg-white border-4 border-black rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              id="email"
              className="w-full p-3 border rounded"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            {emailError && (
              <div className="text-red-600 text-sm mt-1">{emailError}</div>
            )}
          </div>
          <div className="mb-4">
            <input
              id="password"
              className="w-full p-3 border rounded"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            {passwordError && (
              <div className="text-red-600 text-sm mt-1">{passwordError}</div>
            )}
          </div>
          <button
            className="w-full py-3 mb-4 bg-black text-white font-bold rounded"
            type="submit"
          >
            Login
          </button>
        </form>
        <button
          className="w-full py-3 mb-4 border border-blue-500 text-blue-500 font-bold rounded flex items-center justify-center"
          onClick={handleWithGoogle}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Logo"
            className="w-6 h-6 mr-2"
          />
          Sign in with Google
        </button>
        <div className="text-center">
          Don't have an account? <Link to="/sign-up" className="text-blue-500">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;
