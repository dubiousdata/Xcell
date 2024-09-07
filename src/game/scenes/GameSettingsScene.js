class GameSettingsScene extends Phaser.Scene {
    constructor() {
        super('GameSettingsScene');
    }

    create() {
        // Play button
        const startButton = this.add.text(config.width / 2 , 200, 'PLAY', { fontSize: '24px', fill: '#0f0' }).setOrigin(0.5);
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene'); // Start the game scene
        });
    }
}