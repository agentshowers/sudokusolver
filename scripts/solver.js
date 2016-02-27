function sudokuSolver(boardToSolve) {
	this.board = boardToSolve.clone();
	this.possibleValues = [];
	for(var i=0; i<9; i++) {
		this.possibleValues[i] = new Array(9);
		for (var j=0; j<9; j++) {
			this.possibleValues[i][j] = [1,2,3,4,5,6,7,8,9];
		}
	}
}

sudokuSolver.prototype.solve = function(){
	this.calculatePossibilities();
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
	if (!this.board.isSolved()){
		this.bruteForce();
	}
	return this.board;
}

sudokuSolver.prototype.checkSingularTiles = function(){
	var changed = false;
	
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++) {
			if (this.possibleValues[i][j].length === 0){
				throw  'Impossible Board';
			}
			if (!this.board.hasValue(i,j) && this.possibleValues[i][j].length === 1){
				this.setValue(i,j,this.possibleValues[i][j][0]);
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
			} else if (this.isValuePossible(row,j,i+1)) {
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
				this.setValue(row,column,i+1);
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
			} else if (this.isValuePossible(i,column,j+1)) {
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
				this.setValue(row,column,j+1);
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
				} else if (this.isValuePossible(row,column,i+1)) {
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
				this.setValue(row,column,i+1);
				changed = true;
			}
		}
	}
	
	return changed;
}

sudokuSolver.prototype.bruteForce = function(){
	var row;
	var column;
	
	var i=0;
	do {
		var j=0;
		do {
			if (!this.board.hasValue(i,j)){
				row = i;
				column = j;
			}
			j++;
		} while (column === undefined && j<9);
		i++;
	} while (row === undefined && i<9);
	
	if (row === undefined) {
		throw 'Some error ocurred - can\'t find first empty square';
	}
	
	for (var i=0; i<this.possibleValues[row][column].length && !this.board.isSolved(); i++) {
		var value = this.possibleValues[row][column][i];
		var newSolver = new sudokuSolver(this.board);
		newSolver.setValue(row,column,value);
		try {
			this.board = newSolver.solve();
		}
		catch (e) {
			//path was impossible to solve
		}
	}
	
	if (!this.board.isSolved()) {
		throw 'Impossible Board';
	}
}

sudokuSolver.prototype.calculatePossibilities = function() {
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++){
			if (this.board.hasValue(i,j)) {
				this.removePossibilities (i,j,this.board.getValue(i,j));
			}
		}
	}
}

sudokuSolver.prototype.setValue = function(x,y,value) {
	this.board.setValue(x,y,value);
	this.removePossibilities(x,y,value);
}

sudokuSolver.prototype.removePossibilities = function (x,y,value) {
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++){
			if (i === x || j === y || zone(x,y) === zone(i,j)) {
				var index = this.possibleValues[i][j].indexOf(value);
				if (index > -1) {
					this.possibleValues[i][j].splice(index,1);
				}
			}
		}
	}
	this.possibleValues[x][y] = [value];
}

sudokuSolver.prototype.isValuePossible = function (x,y,value) {
	return this.possibleValues[x][y].indexOf(value) > -1;
}