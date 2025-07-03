import { Stack } from 'expo-router/stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'


export default function Layout() {
    return (
        
        <Stack >
            <Stack.Screen name="(tabs)"  options={{headerShown:false}} />

            
        </Stack>
   

        
    )
}

