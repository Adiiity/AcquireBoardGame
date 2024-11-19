# How Turns Work in the Acquire Game (Bot Gameplay)

In Acquire Game, each turn for a bot player consists of three main phases: **Tile Placement**, **Stock Purchase**, and **Turn Management**. The flow is designed to be automated for bots, while the user can observe and interact with the game as needed.

---

## Turn Phases for Bot Players

1. **Tile Placement**:
   - The bot places a tile on the board based on its selected strategy:
     - **Smallest-Anti Bot**:
       - Places the **numerically smallest tile** available from its hand.
       - If multiple options exist, prioritizes alphabetically earlier hotels for tile placement.
     - **Largest-Alpha Bot**:
       - Places the **numerically largest tile** available.
       - Prioritizes expanding or merging into larger hotel chains.
     - **Random Bot**:
       - Randomly selects and places a tile from its hand.
   - Tile placement actions trigger the following:
     - **Founding a hotel** if the tile starts a new chain.
     - **Growing a hotel** if the tile expands an existing chain.
     - **Merging hotels** if the tile connects two or more chains.

2. **Buy Stocks**:
   - After placing a tile, the bot automatically purchases stocks based on its strategy.
   - The **stock purchase modal** appears during this phase, but the input from the user won't affect bot decisions.
   - Stock decisions:
     - **Smallest-Anti Bot**:
       - Buys stocks from the alphabetically first available hotel.
     - **Largest-Alpha Bot**:
       - Buys stocks from the largest chain to maximize future asset value.
     - **Random Bot**:
       - Randomly selects a hotel to buy stocks from.

3. **Turn Management**:
   - Once the bot completes the tile placement and stock purchase phases:
     - **Pass Turn Button**:
       - Allows progression to the next player's turn (the next bot or user).
     - **Finish Game Button**:
       - Ends the game immediately and navigates to the **Winner Page**.

---

## Ending the Game

When the **Finish Game Button** is pressed:
1. The game evaluates the total assets for all players.
2. **Total Assets** are calculated as:
   - **Cash**: The amount of cash the player holds.
   - **Stock Value**: Based on the size of each hotel chain and the number of stocks the player holds (calculated using the `getStockPrice` function).
3. The player with the highest total assets is declared the **Winner**.

---

## Key Notes for Bot Gameplay
1. **Automation**:
   - Bots automatically handle tile placement and stock purchases based on their strategy.
   - Users do not need to provide inputs for bots, and bot actions are visible for observation.

2. **Modal Behavior**:
   - The stock purchase modal displays during the **Buy Stocks** phase but does not accept user input for bots.

3. **Notifications**:
   - Vibrations and notifications alert players during significant actions:
     - Hotel **Founding**, **Growing**, or **Merging**.

4. **Interactive Controls**:
   - The **Pass Turn Button** passes control to the next player (bot or user).
   - The **Finish Game Button** ends the game and declares the winner.

---

## Example Gameplay Flow
1. **Player 1 (Bot)**:
   - Places a tile based on strategy (e.g., **Smallest-Anti**).
   - Automatically buys stocks (e.g., prioritizes alphabetically first hotel).
   - Enables **Pass Turn** or **Finish Game** buttons.

2. **Player 2 (Bot)**:
   - Similar flow as Player 1, with tile placement and stock purchase dictated by its strategy.

3. **Finish Game**:
   - On pressing the **Finish Game Button**, the winner is calculated, considering:
     - **Cash held** by each player.
     - **Stock value** based on the hotel sizes at the end of the game.

4. **Winner Page**:
   - Displays the winner's name and total assets, calculated as `cash + stock value`.

