QUnit.test("Validate board from text", function( assert ) {
	var fromText = boardFromText(textEmptyBoard);
	assert.boardEquals(fromText, emptyBoard, "Check if empty board is correctly read from text");
	
	fromText = boardFromText(textSomeBoard);
	assert.boardEquals(fromText, someBoard, "Check if random board is correctly read from text");
	
	fromText = boardFromText(textFullBoard);
	assert.boardEquals(fromText, fullBoard, "Check if full board is correctly read from text");
});

QUnit.test("Validate board to text", function( assert ) {
	var text = emptyBoard.toText();
	assert.equal(text, textEmptyBoard, "Check if empty board is correctly written to text");
	
	text = someBoard.toText();
	assert.equal(text, textSomeBoard, "Check if random board is correctly written to text");
	
	text = fullBoard.toText();
	assert.equal(text, textFullBoard, "Check if full board is correctly written to text");
});

QUnit.test("Validate changes to possible values", function( assert ) {
	var aBoard = new board();
	aBoard.setValue(0,0,1);
	
	assert.ok(isEqArrays(aBoard.getPossibleValues(0,0),[1]), "Check that 1 is the only possibility at 0,0");
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

QUnit.test("Validate isSolved()", function( assert ) {
	assert.ok(!emptyBoard.isSolved(), "Validate that empty board is not solved");
	assert.ok(!someBoard.isSolved(), "Validate that random board is not solved");
	assert.ok(fullBoard.isSolved(), "Validate that full board is solved");
});