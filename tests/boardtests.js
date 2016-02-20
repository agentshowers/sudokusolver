QUnit.test( "Validate board from JSON", function( assert ) {
	var newBoard = new board();
	var fromJSON = boardFromJSON(jsonEmptyBoard);
	assert.boardEquals(fromJSON, newBoard, "Check if empty board is correctly read from JSON");
	
	var someBoard = createSomeBoard();
	fromJSON = boardFromJSON(jsonSomeBoard);
	assert.boardEquals(fromJSON, someBoard, "Check if random board is correctly read from JSON");
});