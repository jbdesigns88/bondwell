import {View, Text, StyleSheet} from 'react-native'
import { Link } from 'expo-router'
// import Login from '../login'
import Login from '../components/Login'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home () {

    return (
      <Login />
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: "#1C1C1E", // Dark background
    }
})



// container: {
//     flex: 1,
//     backgroundColor: "#1C1C1E", // Dark background
//     justifyContent: "center", // Center vertically
//     alignItems: "center", // Center horizontally
//     padding: 20,
// },