class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        const gridSize = 8;    // Size of the grid (8x8 grid)
        const squareSize = 64; // Size of each square in pixels
/*
        // Total width and height of the grid
        const gridWidth = (gridSize - 1) * squareSize;
        const gridHeight = (gridSize - 1) * squareSize;

        // Center the grid
        const offsetX = (this.scale.width - gridWidth) / 2;
        const offsetY = (this.scale.height - gridHeight) / 2;
*/
        // Arrays to store edge data
        this.horizontalEdges = [];
        this.verticalEdges = [];

        // Create the grid of edges
        for (let row = 0; row < gridSize - 1; row++) {  // Rows
            this.horizontalEdges[row] = [];
            this.verticalEdges[row] = [];

            for (let col = 0; col < gridSize - 1; col++) {  // Columns
                // Horizontal edge (between two points horizontally)
                const x = offsetX + col * squareSize;
                const y = offsetY + row * squareSize;

                const horizontalEdge = this.add.line(0, 0, x, y, x + squareSize, y, 0x00ff00)
                    .setOrigin(0, 0)
                    .setInteractive();
                this.horizontalEdges[row][col] = horizontalEdge;

                // Add click event for horizontal edges
                horizontalEdge.on('pointerdown', () => this.handleEdgeClick(horizontalEdge, 'horizontal', row, col));

                // Vertical edge (between two points vertically)
                const verticalEdge = this.add.line(0, 0, x, y, x, y + squareSize, 0x00ff00)
                    .setOrigin(0, 0)
                    .setInteractive();
                this.verticalEdges[row][col] = verticalEdge;

                // Add click event for vertical edges
                verticalEdge.on('pointerdown', () => this.handleEdgeClick(verticalEdge, 'vertical', row, col));
            }
        }
    }

    handleEdgeClick(edge, type, row, col) {
        console.log(`Edge clicked: ${type}, Row: ${row}, Col: ${col}`);
        edge.setStrokeStyle(2, 0xff0000);  // Example: change color to red for testing
    }
}
