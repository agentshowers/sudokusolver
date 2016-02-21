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
	var currentValue = this.innerBoard[x][y].getValue();
	if (currentValue !== undefined){
		this.restorePossibilities(x,y,currentValue);
	}
	this.innerBoard[x][y].setValue(value);
	this.removePossibilities(x,y,value);
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
			}
		}
	}
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

board.prototype.toJSON = function(){
	return JSON.stringify(this.innerBoard);
}
	
function boardFromJSON (json){
	var newBoard = new board();
	var inner = [];
	var obj = JSON.parse(json);
	for (var i=0;i<9;i++){
		inner[i] = new Array(9);
		for (var j=0;j<9;j++){
			inner[i][j] = new square(i,j,obj[i][j].possibleValues,obj[i][j].value);
		}
	}
	newBoard.innerBoard = inner;
	return newBoard;
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