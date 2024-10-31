export interface PlayerData {
    id: number;
    name: string;
    mode: 'Self' | 'Strategy 1' | 'Strategy 2' | 'Strategy 3' | 'Strategy 4';
    cash: number;
    stocks: { [hotelChainId: number]: number },
  }

  export interface HotelChain {
    id: number;
    name: string;
    color: string;
    availableStocks: number;
  }

  export interface BoardTile {
    row: number;
    col: number;
    hotelChainId: number | null; // Null if unoccupied
  }

  export interface GameState {
    board: BoardTile[][];
    hotelChains: HotelChain[];
    currentPlayerId: number;
   // Need to refer backend
  }