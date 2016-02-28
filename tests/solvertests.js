QUnit.test("Validate simple solver scenarios", function( assert ) {
	var aBoard = new board();
	aBoard.setValue(0,0,1);
	aBoard.setValue(0,1,2);
	aBoard.setValue(0,2,3);
	aBoard.setValue(1,0,4);
	aBoard.setValue(1,1,5);
	aBoard.setValue(1,2,6);
	aBoard.setValue(2,0,7);
	aBoard.setValue(2,1,8);
	
	var aSolver = new sudokuSolver(aBoard);
	aSolver.simpleSolve(); //don't call full solve to avoid going through the brute force
	
	assert.equal(aSolver.board.getValue(2,2),9,"Expected solver to identify single possibility for tile");
	
	aBoard = new board();
	aBoard.setValue(0,0,1);
	aBoard.setValue(0,1,2);
	aBoard.setValue(1,4,3);
	aBoard.setValue(2,7,3);
	
	aSolver = new sudokuSolver(aBoard);
	aSolver.simpleSolve(); //don't call full solve to avoid going through the brute force
	
	assert.equal(aSolver.board.getValue(0,2),3,"Expected solver to identify single possibility for row");
	
	aBoard = new board();
	aBoard.setValue(0,0,1);
	aBoard.setValue(1,0,2);
	aBoard.setValue(4,1,3);
	aBoard.setValue(7,2,3);
	
	aSolver = new sudokuSolver(aBoard);
	aSolver.simpleSolve(); //don't call full solve to avoid going through the brute force
	
	assert.equal(aSolver.board.getValue(2,0),3,"Expected solver to identify single possibility for column");
	
	aBoard = new board();
	aBoard.setValue(0,0,1);
	aBoard.setValue(0,1,2);
	aBoard.setValue(1,0,4);
	aBoard.setValue(1,2,6);
	aBoard.setValue(2,0,7);
	aBoard.setValue(2,2,9);
	aBoard.setValue(3,1,3);
	
	aSolver = new sudokuSolver(aBoard);
	aSolver.simpleSolve(); //don't call full solve to avoid going through the brute force
	
	assert.equal(aSolver.board.getValue(0,2),3,"Expected solver to identify single possibility for zone");
});

QUnit.test("Test that boards can be solved", function( assert ) {
	var boardToSolve = simpleBoard.clone();
	var aSolver = new sudokuSolver(boardToSolve);
	boardToSolve = aSolver.solve();
	assert.ok(boardToSolve.isSolved(),"Expected simple board to be solved");
	
	boardToSolve = new board();
	aSolver = new sudokuSolver(boardToSolve);
	boardToSolve = aSolver.solve();
	assert.ok(boardToSolve.isSolved(),"Expected empty board to be solved");
});

QUnit.test("Test that impossible boards are detected", function( assert ) {
	var boardToSolve = new board();
	boardToSolve.setValue(0,0,1);
	boardToSolve.setValue(0,1,2);
	boardToSolve.setValue(0,2,3);
	boardToSolve.setValue(1,3,4);
	boardToSolve.setValue(2,6,4);
	
	var aSolver = new sudokuSolver(boardToSolve);
	assert.raises(function() {aSolver.solve()}, /Impossible Board/, "Expected solver to detect that '4' can't be placed anywhere on row '0'");
	
	boardToSolve = new board();
	boardToSolve.setValue(0,0,1);
	boardToSolve.setValue(1,0,2);
	boardToSolve.setValue(2,0,3);
	boardToSolve.setValue(3,1,4);
	boardToSolve.setValue(6,2,4);
	
	aSolver = new sudokuSolver(boardToSolve);
	assert.raises(function() {aSolver.solve()}, /Impossible Board/, "Expected solver to detect that '4' can't be placed anywhere on column '0'");
	
	boardToSolve = new board();
	boardToSolve.setValue(0,0,1);
	boardToSolve.setValue(1,0,2);
	boardToSolve.setValue(2,3,4);
	boardToSolve.setValue(3,1,4);
	boardToSolve.setValue(6,2,4);
	
	aSolver = new sudokuSolver(boardToSolve);
	assert.raises(function() {aSolver.solve()}, /Impossible Board/, "Expected solver to detect that '4' can't be placed anywhere on zone '0'");
	
});

QUnit.test("Test that solver throws an exception when solving invalid board", function( assert ) {
	var boardToSolve = new board();
	
	boardToSolve.setValue(0,0,1);
	boardToSolve.setValue(0,3,1);
	
	aSolver = new sudokuSolver(boardToSolve);
	assert.raises(function() {aSolver.solve()}, /Can't solve invalid board/, "Expected solver to detect invalid board");
});