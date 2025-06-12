# Architecture and Design Choices
This project follows a MVP architecture, designed for clarity, and separation concerns, and maintainability. The entry point is the SlotController, which acts as the Presenter. It initializes all core components, manages their communication and passes data between them.

-Core Modules
 1. SlotController
    Acts as the main coordinator, sets up event listeners and process game result.
 2. ReelController
    ReelController controls each individual Reel and notify its state to external script by using Event
 3. Reel
    Represent the visual container of symbols. Handles the movement/spin of each symbol and emit events to pass the result to external/parent system
 4. Paytable
    Stores all win condition/combinations multipliers
 5. Balance
    Represents player current available balance
 6. Bet
    Defines the amount wagered per spin. This value multliplied by the paytable multipliers to calculate total winning.

# Stretch Goal
 1. The WILD
    I implemented support for a special WILD symbol that can substitute for any other symbol to form a winning combination.

    Technical Approach:

    After collecting visible symbols from each reel, I grouped them by row.
    For each row:
        1. I created a Map<string, number> to count how many times each symbol appeared
        2. I retrieved the number of WILD symbols in that row.
        3. For every symbol in the map (excluding WILD), I added the number of wilds to its count.
            This simulates the wilds acting as that symbol.
        4. I then checked if any adjusted count met a winning condition in the paytable.

# Data Driven

# Challenges
    1. Reel Animation Handling
        One of the key challenges I encountered was managing the reel animation. I faced issues such as:
        1. Symbols not aligned correctly.
            Solved with carefully manage symbol position using a fixed [itemSpacing]
        2. Symbol not snapping
            Solved by using custom Snap() method at the end of the reel animation

# Features to Add
    1. More polished Data Driven, each Reel can be modified by JSON data,
    2. Free Spin mode

# Instructions
  1. Open the Project
  2. Open Gameplay Scene
  3. Press Play button
