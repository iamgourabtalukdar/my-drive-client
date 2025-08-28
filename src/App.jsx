import { Route, Routes } from "react-router";
import { useContext } from "react";
import Home from "./pages/Home";
import Trash from "./pages/Trash";
import Recent from "./pages/Recent";
import Starred from "./pages/Starred";
import DriveLayout from "./layouts/DriveLayout";
import { ThemeContext } from "./contexts/ThemeContext";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./pages/auth/ProtectedRoutes";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";

function App() {
  const [theme] = useContext(ThemeContext);
  return (
    <div className={`${theme} bg-color text-color dark:bg-sub-color`}>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="drive" element={<DriveLayout />}>
            <Route index element={<Home />} />
            <Route path="folder">
              <Route index element={<Home />} />
              <Route path=":folderId" element={<Home />} />
            </Route>
            <Route path="recent" element={<Recent />} />
            <Route path="starred" element={<Starred />} />
            <Route path="trash" element={<Trash />} />
          </Route>
        </Route>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>

      <ToastContainer
        className="print:hidden"
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
