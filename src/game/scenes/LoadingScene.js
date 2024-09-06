export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super('LoadingScene');
    }

    preload() {
        // Load assets here
        this.load.image('logo', 'src/assets/images/logo.png');
        // Add more asset loading as needed
    }

    create() {
        // After loading, transition to the main menu
        this.scene.start('MainMenuScene');
    }
}