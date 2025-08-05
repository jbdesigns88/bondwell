import Register from "./Authentication/Register";
import { useUser } from "./hooks/useUser";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
const RegisterScreen = () => {
  const { isLoggedin } = useUser();
  const router = useRouter();

  useEffect(() => {
    isLoggedin ? router.replace("/") : null;
  }, [isLoggedin]);

  return (
    <>
      <Register />

    </>
  );
};

export default RegisterScreen;
