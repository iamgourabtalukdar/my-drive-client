import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiEye, FiEyeOff, FiLock, FiLogIn, FiMail } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { login, loginWithGoogle } from "../../services/auth.service";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginPayload = {
      email: email.trim(),
      password: password.trim(),
    };

    try {
      setLoginLoading(true);

      const response = await login(loginPayload);
      if (response.error) {
        setError(response.error);
        return;
      }
      toast.success("Login successful");
      navigate("/drive/folder");
    } catch (err) {
      const error = err.response?.data || {};
      toast.error(error.error?.message || "Failed to login. Please try again.");
    } finally {
      setLoginLoading(false);
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
        <div className="overflow-hidden rounded-xl bg-white shadow-xl">
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
          <form onSubmit={handleLogin} className="space-y-4 p-6">
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
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-white py-2 pr-3 pl-10 text-black shadow-sm transition focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <p className="absolute -bottom-5 left-0 text-sm text-red-500">
                {error.email}
              </p>
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
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-white py-2 pr-10 pl-10 text-black shadow-sm transition focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
              <p className="absolute -bottom-5 left-0 text-sm text-red-500">
                {error.password}
              </p>
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
                disabled={loginLoading}
                className={`flex w-full items-center justify-center rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${
                  loginLoading
                    ? "cursor-not-allowed bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } transition focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none`}
              >
                {loginLoading ? (
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
        <div className="relative flex h-12 items-center justify-center">
          <span className="absolute top-1/2 left-0 inline-block w-full border-t border-gray-500/20"></span>
          <small className="relative z-10 bg-indigo-100 px-2 font-medium">
            or
          </small>
        </div>
        <div className="flex items-center justify-center">
          <GoogleLogin
            onSuccess={async ({ credential }) => {
              await loginWithGoogle({ idToken: credential });
              navigate("/drive/folder");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            shape="rectangular"
            theme="filled_blue"
            // useOneTap
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
