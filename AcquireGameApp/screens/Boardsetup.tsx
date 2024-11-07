import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, useWindowDimensions, ScrollView, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { RouteProp } from '@react-navigation/native';
import { colors } from '../colors';

import { HotelChain } from '../types';
import PlayerTurnManager from './PlayerTurnManager';

type BoardNavigationProp= StackNavigationProp<RootStackParamList,'BoardSetup'>;

type Props={
    navigation: BoardNavigationProp,
    route: RouteProp<RootStackParamList,'BoardSetup'>;
};

const BoardSetup: React.FC<Props> = ({ navigation, route }) => {
    // Define board dimensions
    const numRows = 9;
    const numCols = 12;

    const windowDimensions = useWindowDimensions();
    const cellMargin = 2; // Margin around each cell
    const boardWidth = windowDimensions.width - 20; // Subtract any container padding
    const cellSize = (boardWidth - cellMargin * 2 * numCols) / numCols;

    const hotelChains: HotelChain[] = [
        { id: 1, name: 'Luxor', color: '#FFD700', availableStocks: 25 },
        { id: 2, name: 'Tower', color: '#800080', availableStocks: 25 },
        { id: 3, name: 'American', color: '#FF0000', availableStocks: 25 },
        { id: 4, name: 'Festival', color: '#008000', availableStocks: 25 },
        { id: 5, name: 'Imperial', color: '#0000FF', availableStocks: 25 },
        { id: 6, name: 'Worldwide', color: '#FFA500', availableStocks: 25 },
        { id: 7, name: 'Continental', color: '#A52A2A', availableStocks: 25 },
      ];

    // For now, we'll use placeholder data
    const { players } = route.params; // Assuming you pass players from previous screen
  
    // Generate board data
     const boardData = Array.from({ length: numRows }, () =>
        Array.from({ length: numCols }, () => -2) // -2 indicates unoccupied
    );
  
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Acquire</Text>
        <View style={styles.board}>
          {boardData.map((rowData, rowIndex) => (
             <View key={rowIndex} style={styles.row}>
             {rowData.map((cell, colIndex) => (
                 <TouchableOpacity
                     key={`${rowIndex}-${colIndex}`}
                     style={[styles.cell, { width: cellSize, height: cellSize, margin: cellMargin }]}
                     onPress={() => Alert.alert(`Cell Pressed: ${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`)}
                 >
                     <Text style={styles.cellText}>
                         {String.fromCharCode(65 + rowIndex)}{colIndex + 1}
                     </Text>
                 </TouchableOpacity>
             ))}
         </View>
          ))}
        </View>
            <Text style={styles.subtitle}>Available Hotel Chains:</Text>
            <FlatList
                data={hotelChains}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <View style={[styles.hotelChainCard, { backgroundColor: item.color }]}>
                    <Text style={styles.hotelChainName}>{item.name}</Text>
                    <Text style={styles.hotelChainStocks}>Available Stocks: {item.availableStocks}</Text>
                </View>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.hotelChainsList}
            />
            <Text style={styles.subtitle}>Player Assets:</Text>
            <FlatList
            data={players}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.playerCard}>
                <Text style={styles.playerName}>{item.name}</Text>
                <Text style={styles.playerCash}>Cash: ${item.cash}</Text>
                <Text style={styles.playerStocks}>Stocks: None</Text>
                </View>
            )}
            />
            <TouchableOpacity
                style={styles.startGameButton}
                onPress={() =>
                    navigation.navigate('PlayerTurnManager', {
                        players,
                        initialBoard: boardData,
                        cellSize,
                        cellMargin,
                    })
                }
            >
                <Text style={styles.buttonText}>Start Game</Text>
            </TouchableOpacity>
      </ScrollView>
    );
  };
  
  export default BoardSetup;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor:colors.background,
    //   alignItems: 'center',
    },
    title: {
      fontSize: 28,
      marginBottom: 10,
      textAlign: 'center',
      color: colors.text,
    },
    startGameButton: {
      backgroundColor: colors.accent,
      padding: 15,
      marginTop: 20,
      borderRadius: 8,
      alignItems: 'center',
  },
  buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
  },
    board: {
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 20,
    },
    row: {
      flexDirection: 'row',
    },
    cell: {
      width: Dimensions.get('window').width / 13, // Adjust based on screen width
      height: Dimensions.get('window').width / 13,
      borderWidth: 1,
      borderColor: colors.tileBorder,
    //   backgroundColor: colors.tileBackground,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cellText: {
        color: colors.text,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 22,
        marginTop: 20,
        marginBottom: 10,
        color: colors.text,
      },
      hotelChainCard: {
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        alignItems: 'center',
        width: 120,
      },
      hotelChainName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
      },
      hotelChainStocks: {
        fontSize: 16,
        color: '#FFFFFF',
      },
      hotelChainsList: {
        paddingVertical: 10,
      },
      playerCard: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        width: '90%',
      },
      playerName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      playerCash: {
        fontSize: 16,
      },
      playerStocks: {
        fontSize: 16,
      },      
    
  });
  
