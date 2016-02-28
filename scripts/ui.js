function resize() {
	var cw = $('#board').width();
	var tilesize = cw/9;
	$('#board').css({
		'height': cw + 'px'
	});
	
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++) {
			var tileId = '#tile_'+i+'_'+j;
			$(tileId).css({
				'width':tilesize + 'px',
				'height':tilesize + 'px',
				'left': j*tilesize + 'px',
				'top': i*tilesize + 'px'
			});
		}
	}
}

function addtiles() {
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++) {
			var $newTile = $('<div id="tile_'+i+'_'+j+'" class="tile"></div>');
			if (i%3 === 2)
				$newTile.addClass('thirdvertical');
			if (j%3 === 2)
				$newTile.addClass('thirdhorizontal');
			
			var $newInput = $('<input id="input_'+i+'_'+j+'" class=tile_input></input>');
			$newTile.append($newInput);
			$('#board').append($newTile);
			
			function changeHandler(x,y){
				$('#board').on('change', '#input_'+i+'_'+j, function() {
					setValue(x,y,+this.value)
				});
			}
			
			changeHandler(i,j);
		}
	}
}

function refresh(){
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++) {
			refreshTile(i,j);
		}
	}
}

function refreshTile(i, j){
	var tileId = '#input_'+i+'_'+j;
	var value;
	var color;
	if (sudokuBoard.hasValue(i,j)) {
		value = sudokuBoard.getValue(i,j);
	}
	else {
		value = ' ';
	}
	if (sudokuBoard.isSquareValid(i,j)){
		color = 'black';
	} else {
		color = 'red';
	}
	
	$(tileId).val(value);
	$(tileId).css({
		'color':color,
	});
}

function setValue (i, j, value) {
	if (!isValidValue(value)){
		if (value === 0) { //value was deleted
			sudokuBoard.clearValue(i,j);
		}
	} else {
		sudokuBoard.setValue(i,j,value);
	}
	refresh();
}

function isValidValue (value) {
	return !isNaN(value) && value >= 1 && value <= 9 && Math.floor(value/1) === value;
}

function debugBoard(){
	sudokuBoard.debug();
}

function solveBoard(){
	try {
		var solver = new sudokuSolver(sudokuBoard);
		sudokuBoard = solver.solve();
		refresh();
	} catch (e) {
		alert (e);
	}
}

function saveBoard() {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(sudokuBoard.toText()));
	element.setAttribute('download', 'board.txt');
	element.style.display = 'none';
	 
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

function loadBoard (event) {
	var reader = new FileReader();

	reader.onload = function(event) {
		sudokuBoard = boardFromText(event.target.result);
		refresh();
	}
	reader.readAsText(event.target.files[0]);
}

function clearBoard() {
	sudokuBoard = new board();
	refresh();
}

function loadEasy (){
	sudokuBoard = boardFromText('003020600900305001001806400008102900700000008006708200002609500800203009005010300');
	refresh();
}
