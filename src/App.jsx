import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="drive">
          <Route index element={<Home />} />
          <Route path="folder/:folderId?" element={<Home />} />
        </Route>
        {/* <Route path="drive/:folderId?" element={<Home />} /> */}
        <Route index element={<Login />} />
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
