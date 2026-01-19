import { Route, Routes } from "react-router";
import { useContext, useEffect } from "react";
import Home from "./pages/Home";
import Trash from "./pages/Trash";
import Starred from "./pages/Starred";
import DriveLayout from "./layouts/DriveLayout";
import { ThemeContext } from "./contexts/ThemeContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import DriveHome from "./pages/DriveHome";
import { Toaster } from "react-hot-toast";
import VerifyOTP from "./pages/VerifyOTP";

function App() {
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.classList = theme;
  }, [theme]);

  return (
    <div className="bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="drive" element={<DriveLayout />}>
            <Route index element={<DriveHome />} />
            <Route path="folder">
              <Route index element={<DriveHome />} />
              <Route path=":folderId" element={<DriveHome />} />
            </Route>
            <Route path="starred" element={<Starred />} />
            <Route path="trash" element={<Trash />} />
          </Route>
        </Route>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
      </Routes>

      <Toaster
      // toastOptions={{
      //   style: {
      //     textAlign: "center",
      //     backgroundColor: theme === "dark" ? "#1a202c" : "#fff",
      //     color: theme === "dark" ? "#f7fafc" : "#1a202c",
      //   },
      // }}
      />
    </div>
  );
}

export default App;
