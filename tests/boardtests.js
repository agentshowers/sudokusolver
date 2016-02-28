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

QUnit.test("Check board validation", function( assert ) {
	var aBoard = new board();
	
	assert.ok(aBoard.isValid(), "Check if empty board is valid");
	
	aBoard.setValue(0,0,1);
	aBoard.setValue(0,3,1);
	aBoard.setValue(3,0,1);

	assert.ok(!aBoard.isValid(), "Check that board is invalid");
	assert.ok(!aBoard.isSquareValid(0,0), "Check that 0,0 is invalid");
	assert.ok(!aBoard.isSquareValid(0,3), "Check that 0,3 is invalid");
	assert.ok(!aBoard.isSquareValid(3,0), "Check that 3,0 is invalid");
	
	aBoard.setValue(3,0,2);
	
	assert.ok(!aBoard.isValid(), "Check that removing only one conflict still keeps an invalid board");
	assert.ok(!aBoard.isSquareValid(0,0), "Check that 0,0 is invalid");
	assert.ok(!aBoard.isSquareValid(0,3), "Check that 0,3 is invalid");
	assert.ok(aBoard.isSquareValid(3,0), "Check that 3,0 is valid");
});