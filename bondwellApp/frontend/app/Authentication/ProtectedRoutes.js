import Loading from "../components/Loading";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";

import { useRouter } from "expo-router";

const ProtectedRoutes = ({ children }) => {
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoading, isLoggedIn]);

  if (isLoading) return <Loading />;

  return children;
};

export default ProtectedRoutes 