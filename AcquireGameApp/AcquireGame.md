# Acquire Game

Acquire Game is a strategy-based board game where players build hotel chains, acquire stocks, and compete to maximize their assets. Players can found, grow, or merge hotel chains to dominate the board and become the wealthiest player by the end of the game.

---

## How the Game Works

### Objective
The goal of the game is to accumulate the highest total assets, which consist of:
1. **Cash**: Earned through gameplay, mergers, and stock sales.
2. **Stock Value**: Determined by the hotel chains you hold shares in and their size at the end of the game.

### Actions in the Game
During each player's turn, they perform the following actions:

1. **Tile Placement**:
   - The player places a tile on the board, which can:
     - **Found a Hotel**: If the tile is not adjacent to an existing hotel chain, it starts a new chain.
     - **Grow a Hotel**: If the tile is adjacent to an existing hotel chain, it expands that chain.
     - **Merge Hotels**: If the tile connects two or more hotel chains, those chains merge into one larger chain.

2. **Stock Purchasing**:
   - After placing a tile, players can purchase stocks from any active hotel chain (up to a maximum of 3 stocks per turn). Stock values depend on the size of the hotel chain.

3. **Mergers**:
   - When two hotel chains merge, the larger chain absorbs the smaller one. Players with stocks in the absorbed chain are rewarded based on majority ownership and can choose to sell, trade, or keep their shares.

---

### Game Progression
1. Players take turns placing tiles and growing or founding hotel chains.
2. Mergers occur when tiles connect multiple hotel chains.
3. The game ends when:
   - A hotel chain becomes "safe" (reaches a size where it cannot merge with another chain).
   - The remaining tiles do not allow for further growth or mergers.

At the end of the game, the player's assets (cash + stock value) are calculated, and the winner is determined.

---

## Bot Strategies

### **Smallest-Anti Bot**
- **Tile Placement**: Plays the **smallest available tile** (numerically lowest) from its hand first.
- **Stock Purchasing**: Buys shares of the **alphabetically first hotel chain** available, prioritizing disruption of opponent growth.

### **Largest-Alpha Bot**
- **Tile Placement**: Plays the **largest available tile** (numerically highest) from its hand first.
- **Stock Purchasing**: Buys shares of the **largest hotel chain**, prioritizing maximizing its own asset value.

---

## Key Features

1. **Dynamic Notifications**:
   - Notifications with vibrations alert players to major actions:
     - **Founding a Hotel**: When a new hotel is started.
     - **Growing a Hotel**: When a hotel chain expands.
     - **Merging Hotels**: When two or more hotels merge.

2. **Automated Bot Actions**:
   - Bots automatically place tiles and purchase stocks based on their strategies. Stock purchases for bots occur without user input.

3. **Interactive Stock Modal**:
   - In **Self Mode**, players can manually choose which stocks to purchase. This modal works correctly and allows custom input.

4. **Intelligent Bot & Self Mode**:
   - Currently under development and will be implemented soon.

---

## Backend Integration

The backend is hosted on Render at:  
**[https://acquiregame.onrender.com](https://acquiregame.onrender.com)**

### Backend Notes:
- The backend handles critical game logic, such as bot strategies, tile placements, and determining winners.
- The backend may go into a "sleep" state after inactivity due to hosting limitations.  
  - The app automatically pings the backend to wake it up.
  - If this fails, visit the backend URL in your browser to activate it manually.

---

To Understand How Bot Game Plays and How turns work in this Acquire Game Implementation refer: **BotGamePlay.md**
