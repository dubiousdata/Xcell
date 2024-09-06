import LoadingScene from './game/scenes/LoadingScene.js';
import MainMenuScene from './game/scenes/MainMenuScene.js';
//import GameSettingsScene from './game/scenes/GameSettingsScene';
//import SettingsScene from './game/scenes/SettingsScene';
//import PauseMenuScene from './game/scenes/PauseMenuScene';
//import EndGameScene from './game/scenes/EndGameScene';

// Game configuration
var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 600,
	backgroundColor: '#000000',
    physics: {
        default: 'arcade',  // Choose your physics engine (e.g., 'arcade')
        arcade: {
            debug: false         // Enable/disable debug mode
        }
    },
    scene: [
        LoadingScene,        // Initial scene that preloads assets
        MainMenuScene,       // Main menu scene
        //GameSettingsScene,   // Game-specific settings scene
        //SettingsScene,       // General settings scene
        //PauseMenuScene,      // Pause menu scene
        //EndGameScene         // End game scene
    ]
};

// Initialize the Phaser game with the configuration
const game = new Phaser.Game(config);
