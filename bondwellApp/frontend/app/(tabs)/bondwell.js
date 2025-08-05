import {View, Text,StyleSheet} from 'react-native'
import BondwellChat from '../components/bondwellChat'
import ProtectedRoutes from '../Authentication/ProtectedRoutes'
export default function Bondwell (){
    return(
        <ProtectedRoutes>
        <BondwellChat/>
        </ProtectedRoutes>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})