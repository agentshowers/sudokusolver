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
	aSolver.solve();
	
	assert.equal(aBoard.getValue(2,2),9,"Expected solver to identify single possibility for tile");
	
	aBoard = new board();
	aBoard.setValue(0,0,1);
	aBoard.setValue(0,1,2);
	aBoard.setValue(1,4,3);
	aBoard.setValue(2,7,3);
	
	aSolver = new sudokuSolver(aBoard);
	aSolver.solve();
	
	assert.equal(aBoard.getValue(0,2),3,"Expected solver to identify single possibility for row");
	
	aBoard = new board();
	aBoard.setValue(0,0,1);
	aBoard.setValue(1,0,2);
	aBoard.setValue(4,1,3);
	aBoard.setValue(7,2,3);
	
	aSolver = new sudokuSolver(aBoard);
	aSolver.solve();
	
	assert.equal(aBoard.getValue(2,0),3,"Expected solver to identify single possibility for column");
	
	aBoard = new board();
	aBoard.setValue(0,0,1);
	aBoard.setValue(0,1,2);
	aBoard.setValue(1,0,4);
	aBoard.setValue(1,2,6);
	aBoard.setValue(2,0,7);
	aBoard.setValue(2,2,9);
	aBoard.setValue(3,1,3);
	
	aSolver = new sudokuSolver(aBoard);
	aSolver.solve();
	
	assert.equal(aBoard.getValue(0,2),3,"Expected solver to identify single possibility for zone");
});

QUnit.test("Test that a simple board can be solved", function( assert ) {
	var boardToSolve = simpleBoard.clone();
	var aSolver = new sudokuSolver(boardToSolve);
	aSolver.solve();
	assert.ok(boardToSolve.isSolved(),"Expected board to be solved");
});