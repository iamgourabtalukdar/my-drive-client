import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Trash from "./pages/Trash";
import Recent from "./pages/Recent";
import Starred from "./pages/Starred";
import { DriveProvider } from "./contexts/DriveContext";
import DriveLayout from "./components/DriveLayout";

function App() {
  return (
    <DriveProvider>
      <Routes>
        <Route path="drive" element={<DriveLayout />}>
          <Route index element={<Home />} />
          <Route path="folder/:folderId?" element={<Home />} />
          <Route path="recent" element={<Recent />} />
          <Route path="starred" element={<Starred />} />
          <Route path="trash" element={<Trash />} />
        </Route>
        <Route index element={<Login />} />
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </DriveProvider>
  );
}

export default App;
