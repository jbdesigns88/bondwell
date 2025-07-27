import React, { useState, useEffect } from "react";
import { 
    View, 
    ImageBackground, 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    useWindowDimensions 
} from "react-native";

const Welcome = ({ username }) => (
    <View style={styles.container}>
        <Text style={styles.WelcomeMessage}>
            Welcome to the Bondwell App, {username}. I’m here to help improve your intimate life and connect you with your special someone on a deeper level.
        </Text>
    </View>
);

const Login = ({ callback = (success = false) => {} }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success,setSuccess] = useState(false)
    const [error, setError] = useState("");
    const { width } = useWindowDimensions();
    const storedUsername = localStorage.getItem("bondwell:username");

    useEffect(() => {
        if (!/^[a-zA-Z0-9]+$/.test(username) && username) {
            setError("Username must be alphanumeric only (A-Z, 0-9).");
        } else {
            setError("");
        }
    }, [username]);

    // Determine background image based on screen width
    const backgroundImage =
        width <= 360
            ? require("../images/mobile_background.jpg")
            : width <= 414
            ? require("../images/mobile_background_bigger.jpg")
            : require("../images/web_background.jpg");


    const handleSubmission = async () => {
        if (!error && username ) {
            await axios.post('/api/v1/user', {
                data: {
                    username,
                    password,
                },
            })
            .then(response => {
                console.log("User created successfully:", response.data);   
            })
            .catch(error => {
                console.error("Error creating user:", error);
                setError("Error creating user. Please try again.");
            });
            localStorage.setItem("bondwell:username", username);
            setSuccess(true);
        }
            
    }
    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.background}
            imageStyle={styles.image}
        >
            <SafeAreaView style={styles.loginContainer}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Bondwell</Text>
                    <Text style={styles.subline}>The Intimacy App</Text>
                </View>

                {storedUsername && success ? (
                    <Welcome username={storedUsername} />
                ) : (
                    <View style={styles.container}>
                        <Text style={styles.introText}>Enter a username to join:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            placeholderTextColor="#B8868B"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#B8868B"
                            value={username}
                            onChangeText={setPassword}
                        />
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                if (!error && username) {
                                    localStorage.setItem("bondwell:username", username);
                                    setUsername(username)
                                    setSuccess(true)
                                    if(callback){

                                        callback(true, username);
                                    }
                                } else {
                                    if(callback){

                                        callback(false, username);
                                    }
                                }
                            }}
                        >
                            <Text style={styles.buttonText}>Join</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
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
    
      
    },
});

export default Login;
