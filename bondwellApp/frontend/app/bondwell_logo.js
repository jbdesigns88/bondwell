import { View,Text } from 'react-native'
const BondwellLogo  = () => {
    return (
        <>
            <View style={styles.logoContainer}>
                <Text style = {styles.logoText}>Bondwell</Text>
                <Text style = {styles.subline}>The Intimacy App</Text>
            </View>
                
        </>
    )
}


const styles = {
    logoContainer:{
        backgroundColor:'#8B0000',
        borderRadius:'10px',
        marginBottom:10,
        padding:10
    },

    logoText:{
        fontSize:60,
        fontWeight:'bold',
        color:'white',
        textTransform:'uppercase',
        lineHeight:60
       
    },
    subline:{
        fontWeight:300,
        fontSize:24,
        textAlign:"center",
        letterSpacing:5,
        color:"#fff"
    }
}
export default BondwellLogo