import {View, Text, StyleSheet} from 'react-native'
import Quizzes from '../components/Quizzes'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { useRouter } from 'expo-router'
import ProtectedRoutes from '../Authentication/ProtectedRoutes'

export default function Quiz (){
 
        return (
        <ProtectedRoutes>
                <Quizzes/>
        </ProtectedRoutes>
              
         
        )
}


// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         justifyContent:'center',
//         alignItems:'center',
//         backgroundColor: "#1C1C1E", // Dark background
//     }
// })