import {View, Text,StyleSheet} from 'react-native'
import BondwellChat from '../components/bondwellChat'
export default function Bondwell (){
    return(
        <BondwellChat/>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})