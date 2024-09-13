class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
		
		console.log('GameScene create function called');
		
		this.input.on('pointerdown', function (pointer) {
			console.log('Scene clicked at:', pointer.x, pointer.y);
		});

		const testRect = this.add.rectangle(100, 100, 50, 50, 0x00ff00).setInteractive();
		testRect.on('pointerdown', function () {
			console.log('Test rectangle clicked');
		});

        const gridSize = 8;    // Size of the grid (8x8 grid)
        const squareSize = 32; // Size of each square in pixels

        // Total width and height of the grid
        const gridWidth = gridSize * squareSize;
        const gridHeight = gridSize * squareSize;

        // Center the grid
        const offsetX = (this.scale.width - gridWidth) / 2;
        const offsetY = (this.scale.height - gridHeight) / 2;

        // Arrays to store edge data
        this.horizontalEdges = [];
        this.verticalEdges = [];

        // Create the grid of edges
        for (let row = 0; row <= gridSize; row++) {  // Rows for vertical edges
            this.horizontalEdges[row] = [];
            this.verticalEdges[row] = [];

            for (let col = 0; col <= gridSize; col++) {  // Columns for horizontal edges
			
                // Horizontal edge (between two points horizontally)
                if (col < gridSize) { // Prevent drawing extra horizontal edges on the last column
                    const x = offsetX + col * squareSize;
                    const y = offsetY + row * squareSize;
                    const horizontalEdge = this.add.line(0,0,x, y, x + squareSize, y, 0xffffff)
                        .setOrigin(0, 0)
                        .setInteractive(new Phaser.Geom.Rectangle(x-10, y-10, squareSize, 20), Phaser.Geom.Rectangle.Contains);
                    this.horizontalEdges[row][col] = horizontalEdge;

                    // Add click event for horizontal edges
					
                    horizontalEdge.on('pointerdown', () => {
                        console.log('Horizontal edge clicked');
                        this.handleEdgeClick(horizontalEdge, 'horizontal', row, col);
                    });
				}
				
                // Vertical edge (between two points vertically)
                if (row < gridSize) { // Prevent drawing extra vertical edges on the last row
                    const x = offsetX + col * squareSize;
                    const y = offsetY + row * squareSize;
                    const verticalEdge = this.add.line(0, 0, x, y, x, y + squareSize, 0xff00ff)
                        .setOrigin(0, 0)
                        .setInteractive(new Phaser.Geom.Rectangle(x-10, y-10, 20, squareSize), Phaser.Geom.Rectangle.Contains);
                    this.verticalEdges[row][col] = verticalEdge;

                    // Add click event for vertical edges
                    verticalEdge.on('pointerdown', () => {
                        console.log('Vertical edge clicked');
                        this.handleEdgeClick(verticalEdge, 'vertical', row, col);
                    });
				}
            }
        } //end of grid creation for loop
		
		this.children.each(function (child) {
        console.log('GameObject:', child, 'Depth:', child.depth);
    });
    }

    handleEdgeClick(edge, type, row, col) {
        console.log(`Edge clicked: ${type}, Row: ${row}, Col: ${col}`);
        edge.setStrokeStyle(2, 0xff0000);  // Example: change color to red for testing
    }
}
