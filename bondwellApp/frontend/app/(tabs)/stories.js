import {View, Text, StyleSheet} from 'react-native'

export default function Stories(){
    return(
    <View style={styles.container}>
        <Text style={styles.title}> Erotica Stories Coming Soon...</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: "#1C1C1E", // Dark background
    },
    title:{
        fontSize: 18,
        fontWeight: "600",
        color: "#E3B9BC", // Accent color for text
        textAlign: "center",
    }
})