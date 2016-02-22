function sudokuSolver(boardToSolve) {
	this.board = boardToSolve;
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
	} while(changed && !this.board.isSolved());
}

sudokuSolver.prototype.checkSingularTiles = function(){
	var changed = false;
	
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++) {
			if (!this.board.hasValue(i,j) && this.board.getPossibleValues(i,j).length === 0){
				throw  'Impossible Board';
			}
			if (!this.board.hasValue(i,j) && this.board.getPossibleValues(i,j).length === 1){
				this.board.setValue(i,j,this.board.getPossibleValues(i,j)[0]);
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
			if (this.board.hasValue(row,j)){
				availableSquares[this.board.getValue(row,j) - 1].push(j);
			} else if (this.board.isValuePossible(row,j,i+1)) {
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
			if (!this.board.hasValue(row,column)){
				this.board.setValue(row,column,i+1);
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
			if (this.board.hasValue(i,column)){
				availableSquares[this.board.getValue(i,column) - 1].push(i);
			} else if (this.board.isValuePossible(i,column,j+1)) {
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
			if (!this.board.hasValue(row,column)){
				this.board.setValue(row,column,j+1);
				changed = true;
			}
		}
	}
	return changed;
}

sudokuSolver.prototype.checkSingleZone = function(zone) {
	var changed = false;
	var x_zone = Math.floor(zone / 3);
	var y_zone = zone % 3;
	
	var availableSquares = [];
	for(var i=0; i<9; i++) {
		availableSquares[i] = new Array();
	}
	
	for(var i=0; i<9; i++) {
		for (var r=0; r<3; r++) {
			for (var c=0; c<3; c++) {
				var row = x_zone * 3 + r;
				var column = y_zone * 3 + c;
				if (this.board.hasValue(row,column)){
					availableSquares[this.board.getValue(row,column) - 1].push({x:row, y:column});
				} else if (this.board.isValuePossible(row,column,i+1)) {
					availableSquares[i].push({x:row, y:column});
				}
			}
		}
	}
	
	for(var i=0; i<9; i++) {
		if (availableSquares[i].length === 0) {
			throw 'Impossible Board';
		}
		if (availableSquares[i].length === 1) {
			var row = availableSquares[i][0].x;
			var column = availableSquares[i][0].y;
			if (!this.board.hasValue(row,column)){
				this.board.setValue(row,column,i+1);
				changed = true;
			}
		}
	}
	
	return changed;
}