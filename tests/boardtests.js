QUnit.test("Validate board from JSON", function( assert ) {
	var fromJSON = boardFromJSON(jsonEmptyBoard);
	assert.boardEquals(fromJSON, emptyBoard, "Check if empty board is correctly read from JSON");
	
	fromJSON = boardFromJSON(jsonSomeBoard);
	assert.boardEquals(fromJSON, someBoard, "Check if random board is correctly read from JSON");
	
	fromJSON = boardFromJSON(jsonFullBoard);
	assert.boardEquals(fromJSON, fullBoard, "Check if full board is correctly read from JSON");
});

QUnit.test("Validate board to JSON", function( assert ) {
	var json = emptyBoard.toJSON();
	assert.equal(json, jsonEmptyBoard, "Check if empty board is correctly written to JSON");
	
	json = someBoard.toJSON();
	assert.equal(json, jsonSomeBoard, "Check if random board is correctly written to JSON");
	
	json = fullBoard.toJSON();
	assert.equal(json, jsonFullBoard, "Check if full board is correctly written to JSON");
});

QUnit.test("Validate changes to possible values", function( assert ) {
	var aBoard = new board();
	aBoard.setValue(0,0,1);
	
	assert.ok(!aBoard.isValuePossible(0,0,1), "Check if 1 is not possible at 0,0");
	for (var i=1;i<9;i++){
		assert.ok(!aBoard.isValuePossible(0,i,1), "Check if 1 is not possible at 0,"+i);
		assert.ok(!aBoard.isValuePossible(i,0,1), "Check if 1 is not possible at "+i+",0");
	}
	
	for (var i=1;i<3;i++){
		for (var j=1;j<3;j++){
			assert.ok(!aBoard.isValuePossible(i,j,1), "Check if 1 is not possible at "+i+","+j);
		}
	}
	
	var otherBoard = aBoard.clone();
	otherBoard.setValue(0,0,1);
	assert.boardEquals(otherBoard, aBoard, "Check if setting the same value doesn't change the board");
	
	otherBoard.clearValue(0,0);
	assert.boardEquals(otherBoard, emptyBoard, "Check if resetting a value will reset the possible values");

});

QUnit.test("Validate board.clone()", function( assert ) {
	var aBoard = someBoard.clone();
	assert.boardEquals(aBoard, someBoard, "Check if cloned board is equal to the original");
	
	aBoard.setValue(0,0,9);
	assert.equal(someBoard.getValue(0,0), 1, "Check if changes to cloned board don't affect original board");
});