// src/mockData.ts

import { GameState, PlayerData, HotelChain, BoardTile } from './types';

// Mock players (you can adjust based on your needs)
// export const MOCK_PLAYERS: PlayerData[] = [
//   { id: 1, name: 'Alice', mode: 'Self' },
//   { id: 2, name: 'Bob', mode: 'Strategy 1' },
// ];

// Mock hotel chains
export const MOCK_HOTEL_CHAINS: HotelChain[] = [
  { id: 1, name: 'Luxor', color: '#FF0000', availableStocks: 25 },
  { id: 2, name: 'Tower', color: '#FFFF00', availableStocks: 25 },
  { id: 3, name: 'American', color: '#0000FF', availableStocks: 25 },
  { id: 4, name: 'Worldwide', color: '#8B4513', availableStocks: 25 },
  { id: 5, name: 'Festival', color: '#008000', availableStocks: 25 },
  { id: 6, name: 'Imperial', color: '#FFC0CB', availableStocks: 25 },
  { id: 7, name: 'Continental', color: '#40E0D0', availableStocks: 25 },
];

// Mock board data
const numRows = 9;
const numCols = 12;

const MOCK_BOARD: BoardTile[][] = Array.from({ length: numRows }, (_, row) =>
  Array.from({ length: numCols }, (_, col) => ({
    row,
    col,
    hotelChainId: null, // All tiles unoccupied initially
  }))
);

// Mock game state
export const MOCK_GAME_STATE: GameState = {
  board: MOCK_BOARD,
  hotelChains: MOCK_HOTEL_CHAINS,
  currentPlayerId: 1, // Assuming Alice starts
};
