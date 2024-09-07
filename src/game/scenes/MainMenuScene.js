class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }

    create() {
        // Add main menu text
        this.add.text(config.width / 2 , 100, 'Main Menu', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Start Game button
        const startButton = this.add.text(config.width / 2 , 200, 'Start Game', { fontSize: '24px', fill: '#0f0' }).setOrigin(0.5);
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('GameSettingsScene'); // Start the game scene
        });

        // Settings button
        const settingsButton = this.add.text(config.width / 2 , 250, 'Settings', { fontSize: '24px', fill: '#0f0' }).setOrigin(0.5);
        settingsButton.setInteractive();
        settingsButton.on('pointerdown', () => {
            this.scene.start('SettingsScene'); // Transition to settings scene
        });
    }

}
