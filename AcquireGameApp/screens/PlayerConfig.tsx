import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Alert } from 'react-native';

import { PlayerData } from "../types";

type PlayerConfigNavigatorProp=StackNavigationProp<RootStackParamList,'PlayerConfig'>;

type Props={
  navigation:PlayerConfigNavigatorProp;  
};

// interface PlayerData{
//     id:number;
//     name:string;
//     mode:'Self'| 'Strategy 1' | 'Strategy 2' | 'Strategy 3' | 'Strategy 4';
// }
const initialCash = 6000; // Each player starts with $6,000

const PlayerConfig: React.FC<Props>=({navigation})=>{
    const [numPlayers, setNumPlayers] = useState<number>(2);
    const [players, setPlayers] = useState<PlayerData[]>([]);
    
    
    React.useEffect(()=>{
        const initialPlayers=Array.from({length: numPlayers},(_,index)=> ({
            id: index,
            name: `Player ${index + 1}`,
            mode: 'Self' as 'Self',
            cash: initialCash,
            stocks: {}, // No stocks at the beginning
        }));
        setPlayers(initialPlayers);
    },[numPlayers]);

     // Handle changes to player data
    const handlePlayerChange = (id: number, field: keyof PlayerData, value: any) => {
        const updatedPlayers = players.map(player =>
        player.id === id ? { ...player, [field]: value } : player
        );
        setPlayers(updatedPlayers);
    };

    const handleProceed = async () => {
        // Validate inputs and navigate to the next screen
        // console.log('Players:', players);
        // here, navigation.navigate('NextScreen', { players });
        
        try{
          const response=await fetch('https://acquiregame.onrender.com/');
          const textResponse=await response.text();
          Alert.alert('Backend Response',textResponse);
          console.log(textResponse);
        }catch(error){
          console.error('Error fetching backend: ',error);
          Alert.alert('Error','Error occurred while connecting')
        }
        // After successfully fetching from backend, navigate to BoardSetup
        navigation.navigate('BoardSetup', { players });
    };
    
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Configure Players</Text>
    
          <Text style={styles.label}>Select Number of Players:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={numPlayers}
              onValueChange={(itemValue) => setNumPlayers(itemValue)}
              style={styles.picker}
            >
              {[2, 3, 4, 5, 6].map(number => (
                <Picker.Item key={number} label={`${number}`} value={number} />
              ))}
            </Picker>
          </View>
    
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {players.map(player => (
              <View key={player.id} style={styles.playerCard}>
                <Text style={styles.playerTitle}>Player {player.id + 1}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter name for Player ${player.id + 1}`}
                  value={player.name}
                  onChangeText={text => handlePlayerChange(player.id, 'name', text)}
                />
                <Text style={styles.label}>Select Mode:</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={player.mode}
                    onValueChange={(itemValue) => handlePlayerChange(player.id, 'mode', itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Self" value="Self" />
                    <Picker.Item label="Strategy 1" value="Strategy 1" />
                    <Picker.Item label="Strategy 2" value="Strategy 2" />
                    <Picker.Item label="Strategy 3" value="Strategy 3" />
                    <Picker.Item label="Strategy 4" value="Strategy 4" />
                  </Picker>
                </View>
              </View>
            ))}
          </ScrollView>
    
          <TouchableOpacity style={styles.button} onPress={handleProceed}>
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      );
};    

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#FFFFFF',
    },
    title: {
      fontSize: 28,
      marginBottom: 20,
      textAlign: 'center',
    },
    label: {
      fontSize: 16,
      marginBottom: 10,
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#777',
      borderRadius: 5,
      marginBottom: 20,
      overflow: 'hidden',
    },
    picker: {
      width: '100%',
    },
    scrollContainer: {
      paddingBottom: 20,
    },
    playerCard: {
      borderWidth: 1,
      borderColor: '#777',
      borderRadius: 5,
      padding: 15,
      marginBottom: 15,
    },
    playerTitle: {
      fontSize: 18,
      marginBottom: 10,
    },
    input: {
      borderColor: '#777',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
    },
    button: {
      backgroundColor: '#007AFF',
      paddingVertical: 15,
      paddingHorizontal: 60,
      borderRadius: 8,
      alignSelf: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  
export default PlayerConfig;