import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogIn,
  FiGithub,
  FiTwitter,
  FiFacebook,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("gourab talukdar");
  const [email, setEmail] = useState("hello@gmail.com");
  const [password, setPassword] = useState("abcd@123");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (password && password.length < 4)
      newErrors.password = "Password must be at least 4 characters";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/signup`,
        {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.status === 201 && data.status) {
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        setErrors(data.errors);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-white"
            >
              Create an Account
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-green-100 mt-1"
            >
              Join us today!
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative "
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                    errors.name ? "focus:ring-red-500" : "focus:ring-indigo-500"
                  } focus:border-transparent transition`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-600 absolute">{errors.name}</p>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "focus:ring-red-500"
                      : "focus:ring-indigo-500"
                  } focus:border-transparent transition`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 absolute">{errors.email}</p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pl-10 pr-10 py-2 border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "focus:ring-red-500"
                      : "focus:ring-indigo-500"
                  } focus:border-transparent transition`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="text-gray-400" />
                  ) : (
                    <FiEye className="text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 absolute">
                  {errors.password}
                </p>
              )}
            </motion.div>

            {/* Submit button with loading state */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="relative"
            >
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full mt-8 flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                  isLoading
                    ? "bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing up...
                  </>
                ) : (
                  <>
                    <FiLogIn className="mr-2" />
                    Sign up
                  </>
                )}
              </button>
              <p className="text-center text-red-500 text-sm absolute left-1/2 transform -translate-x-1/2">
                {errors.message}
              </p>
            </motion.div>
          </form>
          {/* Footer with login link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="px-6 py-4 bg-gray-50 text-center"
          >
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
