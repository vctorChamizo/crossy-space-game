# Crossy Space | Game
Crossy Space is the first project of IronHack bootcamp Web Developmet that consists in a game based on retro game [Frogger](https://en.wikipedia.org/wiki/Frogger) developed with web technologies.

## Introduction
The player plays a battle spaceship that wants to cross the space to get the star. Along the way you will find various obstacles that you must avoid in order not to lose your lives.

The game consists of several levels of difficulty and the battle sapce ship will lose their lives if one of the obstacles hits it or if it does not get the star in the safe area of the sapce before the countdown ends.

## Project Content
```
.
├── index.html
├── js
│   ├── audio_data.js
│   ├── audio.js
│   ├── game.js
│   ├── index.js
│   ├── mission.js
│   ├── obstacle_data.js
│   ├── obstacle.js
│   ├── player.js
│   ├── preload_obstacle.js
│   ├── space_ship_data.js
│   └── toxic.js
├── README.md
├── res
│   ├── audio
│   ├── font
│   └── img
│       ├── crossy-space-favicon.ico
│       ├── death.svg
│       ├── obstacles
│       ├── poison.svg
│       ├── spaces_ships_player
│       ├── star-empty.svg
│       └── star.svg
└── stylesheet
    ├── reset.css
    └── style.css
 ```

## Technologies
- **HTML - CSS**: used for project web layout.
- **Canvas**: used to implement the main game mechanics and user interaction.
- **JavaScript**: used for the development of game logic and the treatment of game DOM.

## Setup
When starting the game we must choose the type of spaceship with which we want to play.

Once starting we must get to the other side of the board to catch the star. We must do it before time runs out and without colliding with obstacles.

The spaceship moves as follows:
- ↑ : move forward.
- ↓ : move backward.
- ← : move left.
- → : move right.

## Author

The project has been carried out by [Victor Chamizo](https://github.com/vctorChamizo).

Enjoy it! 💻
