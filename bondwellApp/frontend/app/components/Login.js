import { useEffect,useState } from "react";
import { TextInput,Text,View , StyleSheet, Touchable} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ENDPOINTS from "../config/app";

 
export default function Login(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [counter,setCounter] = useState(0)
    const [response,setResponse] = useState("")

    useEffect(() => {

        setCounter(prev => prev + 1)

    },[])

    const handleSubmission = async (event) =>{

        let data = {
            email: email,
            username: username,
            password: password

        }
       const result =  `
        email:${email}
        username:${username}
        password:${password}
        `
       const response =  await fetch(ENDPOINTS.USERS.CREATE,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({data})
        })

        console.log(`response: ${response.data}`)

        setResponse(result)
    }

    return(
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.formContainer}>
                <TextInput 
                        style={ styles.input}
                        placeholder="Username"
                        placeholderTextColor="#B8868B"
                        value={username}
                        onChangeText={setUsername}
                />

                <TextInput 
                        style={ styles.input}
                        placeholder="Email"
                        placeholderTextColor="#B8868B"
                        value={email}
                        onChangeText={setEmail}
                />
                <TextInput 
                        style={ styles.input}
                        type="password"
                        placeholder="password"
                        placeholderTextColor="#B8868B"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={setPassword}
                />

                <TouchableOpacity onPress={handleSubmission}>
                    <Text style={styles.button}> Sign up</Text>
                </TouchableOpacity>
                {response !== "" && <Text>result: { response}</Text>}
            </View>
        </SafeAreaView>
    )
}

const styles =  StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        
      
       
    },
    formContainer:{
      flex:1,
      maxWidth:'600px',
      justifyContent:'center',
      alignItems:'center',
      gap:'20px',
      width:'100%',
       
    },
    input:{
        border:'1px solid #8B0000',
        borderRadius:5,
        alignSelf:'stretch',
      
        padding:8

    },
    button:{
        backgroundColor:'#8B0000',
        paddingVertical:10,
        paddingHorizontal:20,
        color:"#ffffff",
        fontSize:18,
        borderRadius:5,
        fontWeight:'bold',
        cursor:'pointer',
        
    }
})