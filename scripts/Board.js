function board (){
	this.innerBoard = [];
	for(var i=0; i<9; i++) {
		this.innerBoard[i] = new Array(9);
		for (var j=0; j<9; j++) {
			this.innerBoard[i][j] = new square(i,j);
		}
	}
}

board.prototype.setValue = function(x, y, value){
	if (value === undefined){
		return;
	}
	
	var currentValue = this.innerBoard[x][y].getValue();
	if (currentValue !== undefined){
		this.restorePossibilities(x,y,currentValue);
	}
	this.removePossibilities(x,y,value);
	this.innerBoard[x][y].setValue(value);
}

board.prototype.getValue = function(x, y){
	return this.innerBoard[x][y].getValue();
}

board.prototype.hasValue = function(x, y){
	return this.innerBoard[x][y].hasValue();
}

board.prototype.clearValue = function(x, y){
	var currentValue = this.innerBoard[x][y].getValue();
	
	if (currentValue !== undefined){
		this.restorePossibilities(x,y,currentValue);
	}
	this.innerBoard[x][y].clearValue();
	this.recalculatePossibleValues(x,y);

}

board.prototype.getPossibleValues = function(x,y){
	return this.innerBoard[x][y].possibleValues;
}

board.prototype.isValuePossible = function(x, y, value){
	return this.innerBoard[x][y].isValuePossible(value);
}

board.prototype.removePossibilities = function(x, y, value){
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++){
			if (i === x || j === y || this.innerBoard[x][y].zone() === this.innerBoard[i][j].zone()) {
				this.innerBoard[i][j].removePossibleValue(value);
			}
		}
	}
}	

board.prototype.restorePossibilities = function(x, y, value){
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++){
			if (i === x || j === y || this.innerBoard[x][y].zone() === this.innerBoard[i][j].zone()) {
				this.innerBoard[i][j].restorePossibleValue(value);
				this.innerBoard[x][y].removePossibleValue(this.getValue(i,j));
			}
		}
	}
}

board.prototype.recalculatePossibleValues = function (x, y, value){
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++){
			if (i === x || j === y || this.innerBoard[x][y].zone() === this.innerBoard[i][j].zone()) {
				this.innerBoard[x][y].removePossibleValue(this.getValue(i,j));
			}
		}
	}
}

board.prototype.isSolved = function (){
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++){
			if (!this.hasValue(i,j)) {
				return false;
			}
		}
	}
	
	return true;
}

board.prototype.clone = function (){
	var clonedBoard = new board();
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++){
			clonedBoard.innerBoard[i][j] = this.innerBoard[i][j].clone();
		}
	}
	return clonedBoard;
}


board.prototype.toText = function(){
	return this.innerBoard.map ( 
		function(row) {
			return row.map(valueToText).reduce(function(a, b) {return a + '' + b;}, '');
		})
		.reduce(function(a, b) {return a + '' + b;}, '');
}

function valueToText (elem) {
	if (elem.value === undefined) {
		return '0';
	} 
	return elem.value;
}
	
function boardFromText (text){
	var newBoard = new board();
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++){
			newBoard.setValue(i,j,textToValue(text.charAt(i*9+j)));
		}
	}

	return newBoard;
}

function textToValue (text) {
	if (text === '0') {
		return undefined;
	}
	return +text;
}


board.prototype.debug = function (){
	var text = ' -----------------------------------------------------------------------\n';
	for (var row=0;row<9;row++) {
		for (var subline=0;subline<3;subline++){
			text = text + '| ';
			for (var column=0;column<9;column++) {
				for (var subcolumn=0;subcolumn<3;subcolumn++){
					text = text + this.toString(row,column,subline*3 + subcolumn + 1) + ' ';
				}
				text = text + '| ';
			}
			text = text + '\n';
		}
		text = text + ' -----------------------------------------------------------------------\n';
	}
	console.log(text);
}

board.prototype.toString = function(x, y, possible) {
	if (this.innerBoard[x][y].isValuePossible(possible)) {
		return possible;
	}
	return ' ';
}

var sudokuBoard = new board();