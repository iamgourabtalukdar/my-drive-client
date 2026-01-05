import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { verifyLogin } from "../../services/authService";
import useApi from "../../hooks/useApi";

const ProtectedRoutes = () => {
  const [authStatus, setAuthStatus] = useState(null); // null = loading, true/false = result
  const [storageInfo, setStorageInfo] = useState(null); // null = loading, true/false = result
  const [authUserData, setAuthUserData] = useState({}); // null = loading, true/false = result

  const { execute: verifyLoginHandler } = useApi(verifyLogin);

  useEffect(() => {
    verifyLoginHandler()
      .then((res) => {
        setAuthUserData({
          email: res.user.email || "",
          name: res.user.name || "",
          picture: res.user.picture || "",
        });
        setStorageInfo({
          storageSize: res.user.storageSize,
          usedStorage: res.user.usedStorage,
        });
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
    <Outlet
      context={{
        user: authUserData,
        setUser: setAuthUserData,
        storageInfo,
        setStorageInfo,
      }}
    />
  ) : (
    <Navigate to={`/login`} />
  );
};

export default ProtectedRoutes;
