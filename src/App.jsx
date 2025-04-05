import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

const serverURL = "http://127.0.0.5:4000";
function App() {
  return (
    <>
      <Routes>
        <Route path="drive" element={<Home serverURL={serverURL} />} />
        <Route index element={<Login serverURL={serverURL} />} />
        <Route path="signin" element={<Login serverURL={serverURL} />} />
        <Route path="signup" element={<SignUp serverURL={serverURL} />} />
      </Routes>
    </>
  );
}

export default App;
