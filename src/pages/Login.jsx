import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000); // Hide after 3 seconds
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showNotification("⚠️ Please enter email and password.", "error");
    } else {
      showNotification("✅ Login successful!", "success");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Notification */}
        {notification.message && (
          <div
            className={`absolute top-2 right-2 px-4 py-2 rounded-lg text-sm text-white ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            } transition-opacity duration-500`}
          >
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
