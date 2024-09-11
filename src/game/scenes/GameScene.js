class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // Set grid size and square size
        const gridSize = 8;    // Size of the grid (8x8 grid)
        const squareSize = 64; // Size of each square in pixels

        // Calculate dynamic offsets to center the grid
        const gridWidth = (gridSize - 1) * squareSize;  // Total width of the grid
        const gridHeight = (gridSize - 1) * squareSize; // Total height of the grid

        const offsetX = (this.scale.width - gridWidth) / 2;  // Center horizontally
        const offsetY = (this.scale.height - gridHeight) / 2; // Center vertically
        
        // Arrays to store edge data
        this.horizontalEdges = [];
        this.verticalEdges = [];
        
        // Create the grid of edges
        for (let row = 0; row < gridSize; row++) {
            this.horizontalEdges[row] = [];
            this.verticalEdges[row] = [];
            
            for (let col = 0; col < gridSize; col++) {
                // Horizontal edge (between two points horizontally)
                if (row < gridSize - 1) {
                    const x = offsetX + col * squareSize;
                    const y = offsetY + row * squareSize;
                    const horizontalEdge = this.add.line(0, 0, x, y, x + squareSize, y, 0xffffff).setOrigin(0, 0).setInteractive();
                    this.horizontalEdges[row][col] = horizontalEdge;
                    
                    // Add click event for horizontal edges
                    horizontalEdge.on('pointerdown', () => this.handleEdgeClick(horizontalEdge, 'horizontal', row, col));
                }
                
                // Vertical edge (between two points vertically)
                if (col < gridSize - 1) {
                    const x = offsetX + col * squareSize;
                    const y = offsetY + row * squareSize;
                    const verticalEdge = this.add.line(0, 0, x, y, x, y + squareSize, 0xffffff).setOrigin(0, 0).setInteractive();
                    this.verticalEdges[row][col] = verticalEdge;
                    
                    // Add click event for vertical edges
                    verticalEdge.on('pointerdown', () => this.handleEdgeClick(verticalEdge, 'vertical', row, col));
                }
            }
        }
    }

    handleEdgeClick(edge, type, row, col) {
        // Placeholder for handling edge click logic
        console.log(`Edge clicked: ${type}, Row: ${row}, Col: ${col}`);
        edge.setStrokeStyle(2, 0xff0000); // Example: change color to red for testing
    }
}
