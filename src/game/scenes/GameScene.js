class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
		
		//debug loooooogs
		console.log('GameScene create function called');
		
		this.input.on('pointerdown', function (pointer) {
			console.log('Scene clicked at:', pointer.x, pointer.y);
		});



        // Track the current player (Player 1 starts)
        this.currentPlayer = 1;

        // Text to show the current player's turn
        this.playerTurnText = this.add.text(16, 16, 'Player 1 Turn', { fontSize: '32px', fill: '#ffffff' });



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
		this.claimedEdges = new Set();  // Set to track claimed edges

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
                        .setInteractive(new Phaser.Geom.Rectangle(x+5, y-5, squareSize-10, 10), Phaser.Geom.Rectangle.Contains);
					
					horizontalEdge.isClaimed = false; // Track if the edge has been clicked
                    this.horizontalEdges[row][col] = horizontalEdge;

                    // Add click event for horizontal edges
					
                    horizontalEdge.on('pointerdown', () => {
                        this.handleEdgeClick(horizontalEdge, 'horizontal', row, col);
                    });
					
                    // Add hover effect (change color on hover)
                    horizontalEdge.on('pointerover', () => {
                        if (!horizontalEdge.isClaimed) {
                            horizontalEdge.setStrokeStyle(2, 0xffff00); // Highlight in yellow
                        }
                    });

                    horizontalEdge.on('pointerout', () => {
                        if (!horizontalEdge.isClaimed) {
                            horizontalEdge.setStrokeStyle(1, 0xffffff); // Revert to original color
                        }
                    });
				}
				
                // Vertical edge (between two points vertically)
                if (row < gridSize) { // Prevent drawing extra vertical edges on the last row
                    const x = offsetX + col * squareSize;
                    const y = offsetY + row * squareSize;
                    const verticalEdge = this.add.line(0, 0, x, y, x, y + squareSize, 0xff00ff)
                        .setOrigin(0, 0)
                        .setInteractive(new Phaser.Geom.Rectangle(x-5, y+5, 10, squareSize-10), Phaser.Geom.Rectangle.Contains);
                    verticalEdge.isClaimed = false; // Track if the edge has been clicked
					this.verticalEdges[row][col] = verticalEdge;

                    // Add click event for vertical edges
                    verticalEdge.on('pointerdown', () => {
                        this.handleEdgeClick(verticalEdge, 'vertical', row, col);
                    });
					
                    // Add hover effect (change color on hover)
                    verticalEdge.on('pointerover', () => {
                        if (!verticalEdge.isClaimed) {
                            verticalEdge.setStrokeStyle(2, 0xffff00); // Highlight in yellow
                        }
                    });

                    verticalEdge.on('pointerout', () => {
                        if (!verticalEdge.isClaimed) {
                            verticalEdge.setStrokeStyle(1, 0xffffff); // Revert to original color
                        }
                    });
				}
            }
        } //end of grid creation for loop
    }

    handleEdgeClick(edge, type, row, col) {
        if (edge.isClaimed) return;  // Prevent interaction if the edge is already claimed

        console.log(`Edge clicked: ${type}, Row: ${row}, Col: ${col}`);

        edge.setStrokeStyle(2, this.currentPlayer === 1 ? 0xff0000 : 0x0000ff);  // Change color based on the player (if 1 = red; else = blue)
        edge.isClaimed = true;  // Mark the edge as claimed

        // Add edge to claimedEdges set (for future reference if needed)
        this.claimedEdges.add({ type, row, col });

        // Disable further interaction for the claimed edge
        edge.disableInteractive();
		
		// Switch to the next player
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        this.playerTurnText.setText(`Player ${this.currentPlayer} Turn`);  // Update the displayed turn
    }
}
