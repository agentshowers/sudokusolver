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
	this.innerBoard[x][y].setValue(value);
	this.revalidate();
}

board.prototype.getValue = function(x, y){
	return this.innerBoard[x][y].getValue();
}

board.prototype.hasValue = function(x, y){
	return this.innerBoard[x][y].hasValue();
}

board.prototype.clearValue = function(x, y){
	this.innerBoard[x][y].clearValue();
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

board.prototype.isValid = function (){
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++){
			if (!this.isSquareValid(i,j)){
				return false;
			}
		}
	}
	
	return true;
}

board.prototype.isSquareValid = function (x,y) {
	return this.innerBoard[x][y].isValid();
}

board.prototype.revalidate = function(){
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++){
			this.innerBoard[i][j].validate();
		}
	}
	
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++){
			this.revalidateSquare(i,j);
		}
	}
}

board.prototype.revalidateSquare = function(x,y) {
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++){
			if ((i === x || j === y || zone(x,y) === zone(i,j)) && (i !== x || j !== y)) {
				if (this.hasValue(i,j) && this.getValue(i,j) === this.getValue(x,y)){
					this.innerBoard[i][j].invalidate();
					this.innerBoard[x][y].invalidate();
				}
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
	var text = ' ----------------------------\n';
	for (var i=0;i<9;i++) {
		for (var j=0;j<9;j++) {
			text = text + (this.hasValue(i,j) ? this.getValue(i,j) : ' ') + ' ';
		}
		text = text + '\n';
	}
	text = text + ' ----------------------------\n';
	console.log(text);
}

var sudokuBoard = new board();