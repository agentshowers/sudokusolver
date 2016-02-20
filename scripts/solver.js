function sudokuSolver(boardToSolve) {
	this.board = boardToSolve.innerBoard;
}

sudokuSolver.prototype.solve = function(){
	var changed;
	do {
		changed = false;
		changed = changed || this.checkSingularTiles();
		for (var i=0; i<9; i++) {
			changed = changed || this.checkSingleRow(i);
			changed = changed || this.checkSingleColumn(i);
			changed = changed || this.checkSingleZone(i);
		}
	} while(changed);
}

sudokuSolver.prototype.checkSingularTiles = function(){
	var changed = false;
	
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++) {
			if (!this.board[i][j].hasValue() && this.board[i][j].possibleValues.length === 0){
				throw  'Impossible Board';
			}
			if (!this.board[i][j].hasValue() && this.board[i][j].possibleValues.length === 1){
				this.board[i][j].setValue(this.board[i][j].possibleValues[0]);
				changed = true;
			}
		}
	}
	
	return changed;
}

sudokuSolver.prototype.checkSingleRow = function(row){
	var changed = false;
	
	var availableSquares = [];
	for(var i=0; i<9; i++) {
		availableSquares[i] = new Array();
	}
	
	for(var i=0; i<9; i++) {
		for (var j=0; j<9; j++) {
			if (this.board[row][j].hasValue()){
				availableSquares[this.board[row][j].value - 1].push(j);
			} else if (this.board[row][j].isValuePossible(i+1)) {
				availableSquares[i].push(j);
			}
		}
	}
	
	for(var i=0; i<9; i++) {
		if (availableSquares[i].length === 0) {
			throw 'Impossible Board';
		}
		if (availableSquares[i].length === 1) {
			var column = availableSquares[i][0];
			if (!this.board[row][column].hasValue()){
				this.board[row][column].setValue(i+1);
				changed = true;
			}
		}
	}
	return changed;
}

sudokuSolver.prototype.checkSingleColumn = function(column){
	var changed = false;
	
	var availableSquares = [];
	for(var j=0; j<9; j++) {
		availableSquares[j] = new Array();
	}
	
	for(var j=0; j<9; j++) {
		for (var i=0; i<9; i++) {
			if (this.board[i][column].hasValue()){
				availableSquares[this.board[i][column].value - 1].push(i);
			} else if (this.board[i][column].isValuePossible(j+1)) {
				availableSquares[j].push(i);
			}
		}
	}
	
	for(var j=0; j<9; j++) {
		if (availableSquares[j].length === 0) {
			throw 'Impossible Board';
		}
		if (availableSquares[j].length === 1) {
			var row = availableSquares[j][0];
			if (!this.board[row][column].hasValue()){
				this.board[row][column].setValue(j+1);
				changed = true;
			}
		}
	}
	return changed;
}

sudokuSolver.prototype.checkSingleZone = function(zone) {
	var changed = false;
	var availableSquares = [];
	
	return changed;
}