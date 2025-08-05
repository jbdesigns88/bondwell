import { useEffect, useState } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Touchable,
  ImageBackground,
  useWindowDimensions
} from "react-native";
import BondwellLogo from "../bondwell_logo";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ENDPOINTS from "../config/app";


export default function Register() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [counter, setCounter] = useState(0);
  const [response, setResponse] = useState("");
  const { width } = useWindowDimensions();
  const [errorMessage,setErrorMessage] = useState("")
  const router = useRouter()
  const backgroundImage =
    width <= 360
      ? require("../../images/mobile_background.jpg")
      : width <= 414
      ? require("../../images/mobile_background_bigger.jpg")
      : require("../../images/web_background.jpg");

  useEffect(() => {
    setCounter((prev) => prev + 1);
  }, []);

  const handleSubmission = async (event) => {
    let data = {
      email,
      username,
      firstname,
      lastname,
      password,
    };
   try{
      const response = await fetch(ENDPOINTS.USERS.CREATE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      console.log(`response status is: ${response.status}`)
      if(response.status === 201){
        console.log(`created`)
        router.replace('login')
      }
   }
   catch(err){
      console.log(`ran into an error we should log: `,err)
      setErrorMessage("Issue with creating account refresh and try again.")
   }



    console.log(`response: ${response.data}`);

  
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      imageStyle={styles.image} // Ensures image is centered and responsive
    >
      <SafeAreaView style={styles.mainContainer}>
        <BondwellLogo/>
        <View style={styles.container}>
        <Text style={styles.introText}>Improve your relationships:</Text>
          <TextInput
            style={styles.input}
            placeholder="firstname"
            placeholderTextColor="#B8868B"
            value={firstname}
            onChangeText={setFirstname}
          />
          <TextInput
            style={styles.input}
            placeholder="lastname"
            placeholderTextColor="#B8868B"
            value={lastname}
            onChangeText={setLastname}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#B8868B"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#B8868B"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            type="password"
            placeholder="password"
            placeholderTextColor="#B8868B"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={handleSubmission} style={styles.button}>
            <Text style={styles.buttonText}>Join Today</Text>
          </TouchableOpacity>
         
        </View>

              <View style={{ marginTop: 20, alignItems: "center" }}>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={{ color: "blue", textDecorationLine: "underline" }}>
            Already have an account? Login here
          </Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 1,
    maxWidth: "600px",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    width: "100%",
  },
  input: {
    border: "1px solid #8B0000",
    color:'#E3B9BC',
    borderRadius: 5,
    alignSelf: "stretch",
    marginTop:8,
    marginBottom:8,
    padding: 8,
  },
  button: {
    backgroundColor: "#8B0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: "#ffffff",
    fontSize: 18,
    borderRadius: 5,
    marginTop:5,
    fontWeight: "bold",
    cursor: "pointer",
  },
      background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    container: {
        backgroundColor: "rgba(0,0,0,0.7)",
        padding: 30,
        borderRadius: 10,
        alignItems: "center",
    },
    image: {
        resizeMode: "cover",
        alignSelf: "center",
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
    logoContainer: {
        backgroundColor: "#8B0000",
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
    },
    logoText: {
        fontSize: 60,
        fontWeight: "bold",
        color: "white",
        textTransform: "uppercase",
        lineHeight: 60,
        textAlign: "center",
    },
    subline: {
        fontWeight: "300",
        fontSize: 24,
        textAlign: "center",
        letterSpacing: 5,
        color: "#fff",
    },
    WelcomeMessage: {
        fontSize: 22,
        fontWeight: "600",
        color: "#E3B9BC", // Soft peach color to complement the dark background
        textAlign: "center",
        lineHeight: 40,
        padding: 20,
        maxWidth:600,
        marginVertical: 20,
      
        borderRadius: 15,
        overflow: "hidden",
    
      
    }

  
});



