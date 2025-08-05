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
import Login from "./Authentication/Login";
import { useUser } from "./hooks/useUser";
import { supabase } from "./lib/supabase";
import { AuthApiError } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
const Welcome = ({ username }) => (
    <View style={styles.container}>
        <Text style={styles.WelcomeMessage}>
            Welcome to the Bondwell App, {username}. I’m here to help improve your intimate life and connect you with your special someone on a deeper level.
        </Text>
    </View>
);

const LoginScreen = () => {
 
    
    const { width } = useWindowDimensions();
    const storedUsername = localStorage.getItem("bondwell:username");
    const {LoginUser, isLoggedIn,isLoading} = useUser()
 
    const router = useRouter()
    useEffect(() => {
        if(!isLoggedIn) {return }
        router.replace('/');
    }),[isLoggedIn]


    const handleSubmission = async (valid,data) => {
        console.log(`handling log in user with the data`)
        console.log(data)
        console.log('and the value')
        console.log(`value`)
        try{
            if(!valid) return
            await LoginUser(data)

        }
        catch(err){
            console.log(`message `)
            console.log(err.message)
            if(err instanceof AuthApiError){
                console.log(err.message)
            }
            console.log('issue ',err)
        }
    }

    return (
    
        <>
         <Login callback={(valid,data) => { handleSubmission(valid,data)}}/>
    
        </>
    )
};

// Disable header
 
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

export default LoginScreen;
