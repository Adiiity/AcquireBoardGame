import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { PlayerData } from '../types';
import { getStockPrice } from '../utils';

type WinnerScreenRouteProp = RouteProp<RootStackParamList, 'Winner'>;

type Props = {
  route: WinnerScreenRouteProp;
  navigation: any;
};

const Winner: React.FC<Props> = ({ route, navigation }) => {
  const { players } = route.params;

  // Calculate total assets for each player
  const playerEvaluations = players.map((player) => {
    const totalStocksValue = player.sharesCount.reduce((total, count, index) => {
      const stockPrice = getStockPrice(index, count);
      return total + stockPrice * count;
    }, 0);
    return {
      ...player,
      totalAssets: player.cash + totalStocksValue,
    };
  });

  // Determine the winner based on total assets
  const winner = playerEvaluations.reduce((prev, current) =>
    prev.totalAssets > current.totalAssets ? prev : current
  );

  // Start a new game
  const handleNewGame = () => {
    navigation.navigate('PlayerConfig');
  };

  // Exit the app
  const handleExit = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Winner</Text>
      <Text style={styles.winnerName}>{winner.name}</Text>
      <Text style={styles.winnerAssets}>Total Assets: ${winner.totalAssets.toFixed(2)}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.newGameButton} onPress={handleNewGame}>
          <Text style={styles.newGameText}>New Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <Text style={styles.exitText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Winner;

// Styles for Winner screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  winnerName: {
    fontSize: 24,
    color: '#2E8B57', // Green for winner's name
    fontWeight: 'bold',
    marginBottom: 10,
  },
  winnerAssets: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newGameButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginRight: 10,
  },
  newGameText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  exitButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  exitText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
