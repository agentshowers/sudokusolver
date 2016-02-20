QUnit.test( "Validate board from JSON", function( assert ) {
	var newBoard = new board();
	var fromJSON = boardFromJSON(jsonEmptyBoard);
	assert.boardEquals(fromJSON, newBoard, "Check if empty board is correctly read from JSON");
	
	var someBoard = createSomeBoard();
	fromJSON = boardFromJSON(jsonSomeBoard);
	assert.boardEquals(fromJSON, someBoard, "Check if random board is correctly read from JSON");
	
	var fullBoard = createFullBoard();
	fromJSON = boardFromJSON(jsonFullBoard);
	assert.boardEquals(fromJSON, fullBoard, "Check if full board is correctly read from JSON");
});

QUnit.test( "Validate board to JSON", function( assert ) {
	var aBoard = new board();
	var json = aBoard.toJSON();
	assert.equal(json, jsonEmptyBoard, "Check if empty board is correctly written to JSON");
	
	aBoard = createSomeBoard();
	json = aBoard.toJSON();
	assert.equal(json, jsonSomeBoard, "Check if random board is correctly written to JSON");
	
	aBoard = createFullBoard();
	json = aBoard.toJSON();
	assert.equal(json, jsonFullBoard, "Check if full board is correctly written to JSON");
});