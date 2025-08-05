import { Stack } from 'expo-router/stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { UserProvider } from './hooks/useUser'



export default function Layout() {
    return (
        <UserProvider>
     
            <Stack >
                <Stack.Screen name="(tabs)"  options={{headerShown:false}} />
                <Stack.Screen name="login"  options={{headerShown:false}} />
                <Stack.Screen name="register"  options={{headerShown:false}} />

                
            </Stack>
        </UserProvider>

        
    )
}

