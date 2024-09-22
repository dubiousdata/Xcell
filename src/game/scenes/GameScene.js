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
        this.boxes = []; // To track claimed boxes
		
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
                    const verticalEdge = this.add.line(0, 0, x, y, x, y + squareSize, 0xffffff)
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
        this.claimedEdges.add({ type, row, col }); // Add edge to claimedEdges set (for future reference if needed)
		edge.disableInteractive(); // Disable further interaction for the claimed edge   
        
		const completedBoxes = this.checkForCompletedBoxes(type, row, col);
		
        if (completedBoxes.length > 0) {
            completedBoxes.forEach(box => {
                this.colorBox(box.row, box.col);
            });
        } else {
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
            this.playerTurnText.setText(`Player ${this.currentPlayer} Turn`);
        }
    }
	
	    checkForCompletedBoxes(type, row, col) {
        const completedBoxes = [];

        // Check horizontal or vertical edge completion for a box
        if (type === 'horizontal') {
            if (row > 0 && this.isBoxComplete(row - 1, col)) {
                completedBoxes.push({ row: row - 1, col });
            }
            if (row < this.horizontalEdges.length - 1 && this.isBoxComplete(row, col)) {
                completedBoxes.push({ row, col });
            }
        } else {
            if (col > 0 && this.isBoxComplete(row, col - 1)) {
                completedBoxes.push({ row, col: col - 1 });
            }
            if (col < this.verticalEdges[row].length - 1 && this.isBoxComplete(row, col)) {
                completedBoxes.push({ row, col });
            }
        }

        return completedBoxes;
    }

    isBoxComplete(row, col) {
        return (
            this.horizontalEdges[row][col].isClaimed &&
            this.horizontalEdges[row + 1][col].isClaimed &&
            this.verticalEdges[row][col].isClaimed &&
            this.verticalEdges[row][col + 1].isClaimed
        );
    }

    colorBox(row, col) {
        const x = this.horizontalEdges[row][col].geom.x1;
        const y = this.horizontalEdges[row][col].geom.y1;

        const color = this.currentPlayer === 1 ? 0xff0000 : 0x0000ff;
        this.add.rectangle(x + 16, y + 16, 32, 32, color);
        this.boxes.push({ row, col, player: this.currentPlayer });
    }
}

/*
class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {

        console.log('GameScene create function called');

        this.input.on('pointerdown', function (pointer) {
            console.log('Scene clicked at:', pointer.x, pointer.y);
        });

        this.currentPlayer = 1;
        this.playerTurnText = this.add.text(16, 16, 'Player 1 Turn', { fontSize: '32px', fill: '#ffffff' });

        const gridSize = 8;
        const squareSize = 32;
        const gridWidth = gridSize * squareSize;
        const gridHeight = gridSize * squareSize;
        const offsetX = (this.scale.width - gridWidth) / 2;
        const offsetY = (this.scale.height - gridHeight) / 2;

        this.horizontalEdges = [];
        this.verticalEdges = [];
        this.claimedEdges = new Set();  // Set to track claimed edges
        this.boxes = []; // To track claimed boxes

        for (let row = 0; row <= gridSize; row++) {
            this.horizontalEdges[row] = [];
            this.verticalEdges[row] = [];

            for (let col = 0; col <= gridSize; col++) {
                if (col < gridSize) {
                    const x = offsetX + col * squareSize;
                    const y = offsetY + row * squareSize;
                    const horizontalEdge = this.add.line(0, 0, x, y, x + squareSize, y, 0xffffff)
                        .setOrigin(0, 0)
                        .setInteractive(new Phaser.Geom.Rectangle(x + 5, y - 5, squareSize - 10, 10), Phaser.Geom.Rectangle.Contains);

                    horizontalEdge.isClaimed = false;
                    this.horizontalEdges[row][col] = horizontalEdge;

                    horizontalEdge.on('pointerdown', () => {
                        this.handleEdgeClick(horizontalEdge, 'horizontal', row, col);
                    });

                    horizontalEdge.on('pointerover', () => {
                        if (!horizontalEdge.isClaimed) {
                            horizontalEdge.setStrokeStyle(2, 0xffff00);
                        }
                    });

                    horizontalEdge.on('pointerout', () => {
                        if (!horizontalEdge.isClaimed) {
                            horizontalEdge.setStrokeStyle(1, 0xffffff);
                        }
                    });
                }

                if (row < gridSize) {
                    const x = offsetX + col * squareSize;
                    const y = offsetY + row * squareSize;
                    const verticalEdge = this.add.line(0, 0, x, y, x, y + squareSize, 0xff00ff)
                        .setOrigin(0, 0)
                        .setInteractive(new Phaser.Geom.Rectangle(x - 5, y + 5, 10, squareSize - 10), Phaser.Geom.Rectangle.Contains);

                    verticalEdge.isClaimed = false;
                    this.verticalEdges[row][col] = verticalEdge;

                    verticalEdge.on('pointerdown', () => {
                        this.handleEdgeClick(verticalEdge, 'vertical', row, col);
                    });

                    verticalEdge.on('pointerover', () => {
                        if (!verticalEdge.isClaimed) {
                            verticalEdge.setStrokeStyle(2, 0xffff00);
                        }
                    });

                    verticalEdge.on('pointerout', () => {
                        if (!verticalEdge.isClaimed) {
                            verticalEdge.setStrokeStyle(1, 0xffffff);
                        }
                    });
                }
            }
        }
    }

    handleEdgeClick(edge, type, row, col) {
        if (edge.isClaimed) return;

        edge.setStrokeStyle(2, this.currentPlayer === 1 ? 0xff0000 : 0x0000ff);
        edge.isClaimed = true;
        this.claimedEdges.add({ type, row, col });
        edge.disableInteractive();

        const completedBoxes = this.checkForCompletedBoxes(type, row, col);

        if (completedBoxes.length > 0) {
            completedBoxes.forEach(box => {
                this.colorBox(box.row, box.col);
            });
        } else {
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
            this.playerTurnText.setText(`Player ${this.currentPlayer} Turn`);
        }
    }

    checkForCompletedBoxes(type, row, col) {
        const completedBoxes = [];

        // Check horizontal or vertical edge completion for a box
        if (type === 'horizontal') {
            if (row > 0 && this.isBoxComplete(row - 1, col)) {
                completedBoxes.push({ row: row - 1, col });
            }
            if (row < this.horizontalEdges.length - 1 && this.isBoxComplete(row, col)) {
                completedBoxes.push({ row, col });
            }
        } else {
            if (col > 0 && this.isBoxComplete(row, col - 1)) {
                completedBoxes.push({ row, col: col - 1 });
            }
            if (col < this.verticalEdges[row].length - 1 && this.isBoxComplete(row, col)) {
                completedBoxes.push({ row, col });
            }
        }

        return completedBoxes;
    }

    isBoxComplete(row, col) {
        return (
            this.horizontalEdges[row][col].isClaimed &&
            this.horizontalEdges[row + 1][col].isClaimed &&
            this.verticalEdges[row][col].isClaimed &&
            this.verticalEdges[row][col + 1].isClaimed
        );
    }

    colorBox(row, col) {
        const x = this.horizontalEdges[row][col].geom.x1;
        const y = this.horizontalEdges[row][col].geom.y1;

        const color = this.currentPlayer === 1 ? 0xff0000 : 0x0000ff;
        this.add.rectangle(x + 16, y + 16, 32, 32, color);
        this.boxes.push({ row, col, player: this.currentPlayer });
    }
}
*/

