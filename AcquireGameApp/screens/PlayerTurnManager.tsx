import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { PlayerData } from '../types';
import { colors } from '../colors';

import mockData from '../mockData.json';
import mockMoves from '../mockMoves.json';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type PlayerTurnManagerRouteProp = RouteProp<RootStackParamList, 'PlayerTurnManager'>;

type Props = {
    route: PlayerTurnManagerRouteProp;
};

const hotelChains = [
    { id: 0, name: 'Luxor', color: colors.hotelColors[0] },
    { id: 1, name: 'Tower', color: colors.hotelColors[1] },
    { id: 2, name: 'American', color: colors.hotelColors[2] },
    { id: 3, name: 'Festival', color: colors.hotelColors[3] },
    { id: 4, name: 'Imperial', color: colors.hotelColors[4] },
    { id: 5, name: 'Worldwide', color: colors.hotelColors[5] },
    { id: 6, name: 'Continental', color: colors.hotelColors[6] },
];

const PlayerTurnManager: React.FC<Props> = ({ route }) => {
    const { players, initialBoard, cellSize, cellMargin } = route.params;
    const [currentTurn, setCurrentTurn] = useState(0);
    const [boardState, setBoardState] = useState(initialBoard);
    const [hotelStocks, setHotelStocks] = useState<number[]>([25, 25, 25, 25, 25, 25, 25]);
    const [currentPlayerAssets, setCurrentPlayerAssets] = useState({
        // cash: players[currentTurn].cash,
        cash: 6000,
        sharesCount: players[currentTurn].sharesCount,
        tiles: players[currentTurn].tiles,
    });

    const [moveIndex, setMoveIndex] = useState(0);

    const handleNextMove = () => {
        if (moveIndex < mockMoves.moves.length) {
            const move = mockMoves.moves[moveIndex];
            handlePlayerTurn(move.row, move.col, move.playerIndex);
            setMoveIndex(moveIndex + 1);
        } else {
            Alert.alert("Game Over", "No more predefined moves.");
        }
    };

    const handlePlayerTurn = (row: number, col: number, playerIndex: number) => {
        // const currentPlayer = players[currentTurn];
        // const isSelfMode = currentPlayer.mode === 'Self';

        // try {
        //     const body = isSelfMode
        //         ? { playerIndex: currentTurn, row, col }
        //         : { playerIndex: currentTurn };

        //     const response = await fetch('https://acquiregame.onrender.com/play', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(body),
        //     });

        //     if (!response.ok) throw new Error('Error sending player turn data');

        //     const result = await response.json();
        //     const { boardState: updatedBoardState, players: updatedPlayers, hotelsInfo } = result.state;

        //     setBoardState(updatedBoardState);
        //     setHotelStocks(hotelsInfo.hotelSharesCount);

        //     const updatedPlayerAssets = updatedPlayers[currentTurn];
        //     setCurrentPlayerAssets({
        //         cash: updatedPlayerAssets.cash,
        //         sharesCount: updatedPlayerAssets.sharesCount,
        //         tiles: updatedPlayerAssets.tiles,
        //     });

        //     setCurrentTurn((prevTurn) => (prevTurn + 1) % players.length);
        // } catch (error) {
        //     console.error('Error during player turn:', error);
        //     Alert.alert('Error', 'Failed to process player turn');
        // }
        const hotelColorIndex = moveIndex < 6 ? moveIndex : 6; // Use a unique color for the first 6 moves, fallback for extra moves
        const result = mockData.state;

        // Clone and update the board state for immediate UI feedback
        const updatedBoardState = boardState.map(row => [...row]);
        updatedBoardState[row][col] = hotelColorIndex; // Assign hotel color based on moveIndex

        setBoardState(updatedBoardState); // Update the board state for immediate effect

        // Update stocks and player assets
        const updatedPlayers = result.players;
        const hotelsInfo = result.hotelsInfo;

        setHotelStocks(hotelsInfo.hotelSharesCount);

        const updatedPlayerAssets = updatedPlayers[playerIndex];
        setCurrentPlayerAssets({
            cash: 6000, // Keep cash fixed at $6000
            sharesCount: updatedPlayerAssets.sharesCount,
            tiles: updatedPlayerAssets.tiles,
        });

        setCurrentTurn((prevTurn) => (prevTurn + 1) % players.length);
    };


    return (
        <ScrollView style={styles.container}>
        <Text style={styles.title}>Current Turn: {players[currentTurn].name}</Text>

            <View style={styles.board}>
                {boardState.map((rowData, rowIndex) => (
                    <View key={rowIndex} style={{ flexDirection: 'row' }}>
                        {rowData.map((cell, colIndex) => (
                            <TouchableOpacity
                                key={`${rowIndex}-${colIndex}`}
                                style={{
                                    width: cellSize,
                                    height: cellSize,
                                    margin: cellMargin,
                                    backgroundColor: colors.hotelColors[cell as keyof typeof colors.hotelColors],
                                    borderWidth: 1,
                                    borderColor: colors.tileBorder,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 4,
                                }}
                                // onPress={() => {
                                //     const currentPlayer = players[currentTurn];
                                //     if (currentPlayer.mode === 'Self' && currentTurn === players.findIndex(player => player.mode === 'Self')) {
                                //         handlePlayerTurn(rowIndex, colIndex);
                                //     } else if (currentPlayer.mode !== 'Self') {
                                //         handlePlayerTurn();
                                //     } else {
                                //         Alert.alert('Not your turn', 'Wait for your turn to play');
                                //     }
                                // }}
                            >
                                <Text style={{ color: colors.text, fontWeight: 'bold' }}>
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
                renderItem={({ item, index }) => (
                    <View style={[styles.hotelChainCard, { backgroundColor: item.color }]}>
                        <Text style={styles.hotelChainName}>{item.name}</Text>
                        <Text style={styles.hotelChainStocks}>Available Stocks: {hotelStocks[index]}</Text>
                    </View>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.hotelChainsList}
            />

            <Text style={styles.subtitle}>Current Player Assets</Text>
            <View style={styles.playerCard}>
                <Text style={styles.playerName}>{players[currentTurn].name}</Text>
                <Text style={styles.playerCash}>Cash: ${currentPlayerAssets.cash}</Text>
                {/* <Text style={styles.playerStocks}>Shares Count: {currentPlayerAssets.sharesCount.join(', ')}</Text> */}
            </View>

            <TouchableOpacity style={styles.passTurnButton} onPress={handleNextMove}>
                <Text style={styles.passTurnText}>Pass Turn</Text>
            </TouchableOpacity>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        color: colors.text,
        marginBottom: 10,
    },
    board: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
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
        borderColor: colors.textSecondary,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        width: '90%',
        alignSelf: 'center',
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
    passTurnButton: {
        backgroundColor: colors.accent,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    passTurnText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default PlayerTurnManager;
