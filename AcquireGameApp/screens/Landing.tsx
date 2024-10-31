import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import React from "react";
import { Animated,View, Text, StyleSheet, TouchableOpacity,ImageBackground } from "react-native";

type LandingScreenNavigationProp = StackNavigationProp<RootStackParamList,'Landing'>;

type Props={
    navigation: LandingScreenNavigationProp;
};
const Landing:React.FC<Props>=({navigation})=>{
    return(
        <ImageBackground
      source={require('../assests/background.png')}
      style={styles.background}
    >
        <View style={styles.overlay}>
            <Text style={styles.title}>Acquire Game</Text>
            <Text style={styles.tagline}>Build your Empire and outsmart your opponents</Text>
        
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PlayerConfig')}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
    )
}
export default Landing;

// const styles=StyleSheet.create({
// container:{
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#FFFFFF',
// },
// title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#000000', // Black text
//   },
//   tagline: {
//     fontSize: 16,
//     marginBottom: 40,
//     color: '#555555', // Dark grey text
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: '#007AFF', // iOS default blue color
//     paddingVertical: 15,
//     paddingHorizontal: 60,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: '#FFFFFF', // White text
//     fontSize: 18,
//     fontWeight: 'bold',
//   },

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent overlay
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#FFFFFF', // White text for contrast
      textAlign: 'center',
    },
    tagline: {
      fontSize: 18,
      marginBottom: 40,
      color: '#DDDDDD', // Light grey text
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#FFC107', // Gold color to signify wealth
      paddingVertical: 15,
      paddingHorizontal: 60,
      borderRadius: 8,
    },
    buttonText: {
      color: '#000000', // Black text for contrast
      fontSize: 18,
      fontWeight: 'bold',
    },
});