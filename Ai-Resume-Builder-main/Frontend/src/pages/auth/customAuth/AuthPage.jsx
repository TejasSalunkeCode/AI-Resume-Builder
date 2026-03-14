import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { loginUser, registerUser } from "@/Services/login";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignInSubmit = async (event) => {
    setSignInError("");
    event.preventDefault();
    const { email, password } = event.target.elements;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const data = {
      email: email.value,
      password: password.value,
    };

    try {
      console.log("Login Started in Frontend");
      const user = await loginUser(data);
      console.log("Login Completed");

      if (user?.statusCode === 200) {
        navigate("/");
      }
      console.log(user);
    } catch (error) {
      setSignInError(error.message);
      console.log("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (event) => {
    setSignUpError("");
    event.preventDefault();
    const { fullname, email, password } = event.target.elements;

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    console.log("User Registration Started");
    const data = {
      fullName: fullname.value,
      email: email.value,
      password: password.value,
    };
    try {
      const response = await registerUser(data);
      if (response?.statusCode === 201) {
        console.log("User Registration Started");
        handleSignInSubmit(event);
      }
    } catch (error) {
      console.log("User Registration Failed");
      setSignUpError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-mesh">
      <motion.div
        className="relative w-full max-w-md p-10 glass border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex justify-between mb-10 p-1 bg-white/5 rounded-2xl border border-white/10">
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all duration-300 rounded-xl ${
              !isSignUp 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <FaSignInAlt className="text-lg" />
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all duration-300 rounded-xl ${
              isSignUp 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <FaUserPlus className="text-lg" />
            Sign Up
          </button>
        </div>

        <div className="relative min-h-[380px]">
          <motion.div
            className="w-full"
            initial={false}
            animate={{ 
              x: isSignUp ? 0 : -400,
              opacity: isSignUp ? 1 : 0,
              display: isSignUp ? "block" : "none"
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <h2 className="text-3xl font-extrabold mb-2 text-white tracking-tight">Create Account</h2>
            <p className="text-gray-400 mb-8 font-medium">Join us for a premium resume experience.</p>
            <form onSubmit={handleSignUpSubmit} className="space-y-5">
              <div className="group relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
                />
              </div>
              <div className="group relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="group relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder:text-gray-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98] flex justify-center items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <>Create Account <FaUserPlus className="text-lg" /></>
                )}
              </button>
              {signUpError && (
                <div className="text-rose-400 text-sm font-medium text-center bg-rose-400/10 py-2 rounded-lg border border-rose-400/20">
                  {signUpError}
                </div>
              )}
            </form>
          </motion.div>

          <motion.div
            className="w-full"
            initial={false}
            animate={{ 
              x: isSignUp ? 400 : 0,
              opacity: isSignUp ? 0 : 1,
              display: isSignUp ? "none" : "block"
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <h2 className="text-3xl font-extrabold mb-2 text-white tracking-tight">Welcome Back</h2>
            <p className="text-gray-400 mb-8 font-medium">Continue your career journey with AI.</p>
            <form onSubmit={handleSignInSubmit} className="space-y-5">
              <div className="group relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="group relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder:text-gray-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98] flex justify-center items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <>Sign In <FaSignInAlt className="text-lg" /></>
                )}
              </button>
              {signInError && (
                <div className="text-rose-400 text-sm font-medium text-center bg-rose-400/10 py-2 rounded-lg border border-rose-400/20">
                  {signInError}
                </div>
              )}
            </form>
          </motion.div>
        </div>

        <div className="mt-10 text-center border-t border-white/5 pt-6">
          <p className="text-gray-400 font-medium">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-indigo-400 hover:text-indigo-300 font-bold ml-1 transition-colors"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-indigo-400 hover:text-indigo-300 font-bold ml-1 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default AuthPage;
