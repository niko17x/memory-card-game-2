
# Create a very simply version of the memory card game (build upon it later). Completing this project is the most important over details of the game.
# Brainstorm - Think and draw out every part of the game before coding a single line.

# Basic outline of the game:
  • Player is presented with 12 total cards (4 each row).
  • The cards will be in the hidden position at start.
  • When player starts the game, the cards will be displayed for 8 seconds then hidden again.
  • If an incorrect matching card is found, the 2 cards will be hidden.
  • If the correct matching pair is found, the 2 cards remains visible.
  • If 4 incorrect attempts, player loses and game is over.
  • If all cards are correctly paired, player wins and game is won.

# Card game logic:
  • During the beginning of the game, 12 random cards will be generated and hidden:
  • Player clicking on a card will initiate the game by revealing that single card by keeping track of React state.
  • If there is an active 'revealed' card, the second card will check if it matches the first revealed card.
  • If it matches, both cards remain revealed and becomes non clickable. If it does not match, both cards become hidden again. React state should track incorrect attempts.
  • If all cards have been paired, then the game is over. React state should track if game is in play game/end game status.


