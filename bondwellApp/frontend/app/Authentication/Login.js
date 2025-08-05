import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import BondwellLogo from "../bondwell_logo";
import { useUser } from "../hooks/useUser";
import { useRouter } from "expo-router";

const Login = ({ callback = (success = false, data = {}) => {} }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const { width } = useWindowDimensions();
  const router = useRouter()
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  }, [email]);

  useEffect(() => {
    const unsafeChars = /[<>"']/;
    if (password && unsafeChars.test(password)) {
      setError("Password contains invalid characters.");
    } else {
      setError("");
    }
  }, [password]);



  // Determine background image based on screen width
  const backgroundImage =
    width <= 360
      ? require("../../images/mobile_background.jpg")
      : width <= 414
      ? require("../../images/mobile_background_bigger.jpg")
      : require("../../images/web_background.jpg");

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      imageStyle={styles.image} // Ensures image is centered and responsive
    >
      <SafeAreaView style={styles.loginContainer}>
        <BondwellLogo />

        <View style={styles.container}>
          <Text style={styles.introText}>
            Enter a username to join the chat:
          </Text>

          <TextInput
            style={styles.input}
            placeholder="email"
            placeholderTextColor="#B8868B"
            value={email}
            onChangeText={setEmail}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="password"
            placeholderTextColor="#B8868B"
            value={password}
            onChangeText={setPassword}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              const valid = !error && email && password;

              if (valid) {
                console.log("Submitting valid form");
                await callback(true, { email, password });
              } else {
                console.log("Form is invalid");
                setError("Please enter a valid email and password");
              }
            }}
          >
            <Text style={styles.buttonText}>Join</Text>
          </TouchableOpacity>
        </View>
                            <View style={{ marginTop: 20, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => router.push('/register')}>
                  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                    Do not have an account? Register here
                  </Text>
                </TouchableOpacity>
              </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
    width: "100%",
    height: "100%",
  },

  container: {
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 30,
    borderRadius: "10px",
  },

  image: {
    resizeMode: "cover", // Adjusts image to cover the whole screen
    alignSelf: "center", // Centers the image
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  introText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#E3B9BC",
  },
  input: {
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "#2D2D2D",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    color: "#E3B9BC",
    width: "100%",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#8B0000",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#FFDAB9",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default Login;
