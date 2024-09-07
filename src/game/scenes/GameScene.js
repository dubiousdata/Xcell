class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
		//set grid size
		const gridSize = 8; 	//Taille de la grille
		const squareSize = 64; 	//Taille des carrées en pixel
		const offsetX = 100;	//Offset pour centrer la grille ????????????????????? wdym ?????
		const offsetY = 100; 
		
		//Arrays to store edge data
		this.horizontalEdges = [];
		this.verticalEdges = [];
		
		//Create the grid of edges
		for(let row = 0; row < gridSize; row++){
			this.horizontalEdges[row] = [];
			this.verticalEdges[row] = [];
			
			for(let col = 0; col < gridSize; col++) {
				//Horizontal edge (between two points horizontally)
				if (row < gridSize - 1){
					const x = offsetX + col * squareSize;
					const y = offsetY + row * squareSize;
					const horizontalEdge = this.add.line(0, 0, x, y, x + squareSize, y, 0xffffff).setOrigin(0, 0).setInteractive();
					this.horizontalEdges[row][col] = horizontalEdge;
					
					//Add click event for horizontal edges
					horizontalEdge.on('pointerdown', () => this.handleEdgeClick(horizontalEdge, 'horizontal', row, col));
				}
				
				//Vertical edge
				if (col < gridSize -1){
					const x = offsetX + col * squareSize;
					const y = offsetY + row * squareSize;
					const verticalEdge = this.add.line(0, 0, x, y, x, y + squareSize, 0xffffff).setOrigin(0, 0).setInteractive();
					this.verticalEdges[row][col] = verticalEdge;
					
					//Add click event for vertical edgesà
					verticalEdge.on('pointerdown', () => this.handleEdgeClick(verticalEdge, 'vertical', row, col));
				}
			}
		}
	}	
		handleEdgeClick(edge, type, row, col) {
			// Placeholder for handling edge click logic
			// Will change color or indicate that this edge is claimed by the current player
			console.log(`Edge clicked: ${type}, Row: ${row}, Col: ${col}`);
			edge.setStrokeStyle(2, 0xff0000); // Example: change color to red for testing		
    }
}