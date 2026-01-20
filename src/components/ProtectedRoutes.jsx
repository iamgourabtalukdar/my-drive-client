import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { me } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const [storageInfo, setStorageInfo] = useState(null); // null = loading, true/false = result
  const [authUser, setAuthUser] = useState(null); // null = loading, true/false = result

  const fetchAuthUser = asyncHandler(
    async () => {
      const { data } = await me();
      setAuthUser({
        email: data.user.email || "",
        name: data.user.name || "",
        picture: data.user.picture || "",
      });
      setStorageInfo({
        storageSize: data.user.storageSize,
        usedStorage: data.user.usedStorage,
      });
    },
    {
      onError: (error) => {
        if (error.response && error.response.status === 401) {
          return navigate(`/login`);
        }
        console.error("Error fetchAuthUser data:", error);
        setAuthUser(null);
      },
    },
  );

  useEffect(() => {
    fetchAuthUser();
  }, []);

  if (authUser === null) {
    return <div>Loading...</div>;
  }

  return authUser ? (
    <Outlet
      context={{
        user: authUser,
        setUser: setAuthUser,
        storageInfo,
        setStorageInfo,
      }}
    />
  ) : (
    <Navigate to={`/login`} />
  );
};

export default ProtectedRoutes;
