import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { verifyLogin } from "../../services/authService";
import useApi from "../../hooks/useApi";

const ProtectedRoutes = () => {
  const [authStatus, setAuthStatus] = useState(null); // null = loading, true/false = result
  const [authUserData, setAuthUserData] = useState({}); // null = loading, true/false = result

  const { execute: verifyLoginHandler } = useApi(verifyLogin);

  useEffect(() => {
    verifyLoginHandler()
      .then((res) => {
        setAuthUserData(res.user || {});
        setAuthStatus(true);
      })
      .catch((err) => {
        console.log(err);
        setAuthStatus(false);
      });
  }, []);

  if (authStatus === null) {
    return <div>Loading...</div>;
  }

  return authStatus ? (
    <Outlet context={{ user: authUserData, setUser: setAuthUserData }} />
  ) : (
    <Navigate to={`/login`} />
  );
};

export default ProtectedRoutes;
