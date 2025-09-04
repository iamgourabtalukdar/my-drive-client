import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useApi from "../../hooks/useApi";
import authService from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const { loading, error, serverErrors, setError, makeSignIn } = useAuth();
  const [email, setEmail] = useState("hello@gmail.com");
  const [password, setPassword] = useState("abcd@123");
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const { loading: loginLoading, execute: login } = useApi(authService.login);
  // const { error, validate } = useValidator();

  // Clear errors when user starts typing

  useEffect(() => {
    if (email && validationErrors.email) {
      setValidationErrors((prev) => ({ ...prev, email: undefined }));
    }
  }, [email]);

  useEffect(() => {
    if (password && validationErrors.password) {
      setValidationErrors((prev) => ({ ...prev, password: undefined }));
    }
  }, [password]);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Please enter a valid email";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 4)
      newErrors.password = "Password must be at least 4 characters";

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Combine client and server errors
  const getFieldError = (field) => {
    return validationErrors[field] || serverErrors[field];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      toast.error("Something went wrong.");
      return;
    }

    try {
      await login({ email, password });
      navigate("/drive/folder");
    } catch (apiError) {
      toast.error(apiError?.message || "Failed to login . Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-white"
            >
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-1 text-green-100"
            >
              Sign in to your account
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
              >
                {error}
              </motion.div>
            )}
            {serverErrors.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600"
              >
                {serverErrors.message}
              </motion.div>
            )}

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative mb-5"
            >
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full border bg-white py-2 pr-3 pl-10 text-black ${
                    getFieldError("email")
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-lg shadow-sm focus:ring-2 focus:outline-none ${
                    getFieldError("email")
                      ? "focus:ring-red-500"
                      : "focus:ring-indigo-500"
                  } transition focus:border-transparent`}
                  placeholder="you@example.com"
                />
              </div>
              {getFieldError("email") && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute text-sm text-red-600"
                >
                  {getFieldError("email")}
                </motion.p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="relative mb-5"
            >
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full border bg-white py-2 pr-10 pl-10 text-black ${
                    getFieldError("password")
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-lg shadow-sm focus:ring-2 focus:outline-none ${
                    getFieldError("password")
                      ? "focus:ring-red-500"
                      : "focus:ring-indigo-500"
                  } transition focus:border-transparent`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 transition-colors hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="text-gray-400" />
                  ) : (
                    <FiEye className="text-gray-400" />
                  )}
                </button>
              </div>
              {getFieldError("password") && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute text-sm text-red-600"
                >
                  {getFieldError("password")}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 flex items-center justify-between"
            >
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 bg-white text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </motion.div>

            {/* Submit button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-4"
            >
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full items-center justify-center rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${
                  loading
                    ? "cursor-not-allowed bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } transition focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none`}
              >
                {loading ? (
                  <>
                    <svg
                      className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
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
                    Signing in...
                  </>
                ) : (
                  <>
                    <FiLogIn className="mr-2" />
                    Sign in
                  </>
                )}
              </button>
            </motion.div>
          </form>

          {/* Footer with login link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-50 px-6 py-4 text-center"
          >
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Signup
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
