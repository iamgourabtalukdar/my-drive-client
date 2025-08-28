import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import authService from "../../services/authService";
import useApi from "../../hooks/useApi";

const ProtectedRoutes = () => {
  const [authStatus, setAuthStatus] = useState(null); // null = loading, true/false = result
  const [authUserData, setAuthUserData] = useState({}); // null = loading, true/false = result

  const { execute: verifyLogin } = useApi(authService.verifyLogin);

  useEffect(() => {
    verifyLogin()
      .then((res) => {
        setAuthUserData(res.user || {});
        setAuthStatus(true);
      })
      .catch((err) => {
        setAuthStatus(false);
      });
  }, []);

  if (authStatus === null) {
    return <div>Loading...</div>;
  }

  return authStatus ? (
    <Outlet context={{ user: authUserData }} />
  ) : (
    <Navigate to={`/login`} />
  );
};

export default ProtectedRoutes;
