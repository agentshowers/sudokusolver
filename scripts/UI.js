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
	if (sudokuBoard.hasValue(i,j)) {
		$('#input_'+i+'_'+j).val(sudokuBoard.getValue(i,j));
	}
	else {
		$('#input_'+i+'_'+j).val('');
	}
}

function setValue (i, j, value) {
	if (!isValidValue(value)){
		if (value === 0) { //value was deleted
			sudokuBoard.clearValue(i,j);
		}
		refreshTile(i,j);
	} else {
		sudokuBoard.setValue(i,j,value);
	}
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
		var isSolved = solver.solve();
		refresh();
		if (isSolved) {
			alert('Great Success');
		}
	} catch (e) {
		alert (e);
	}
}

function saveBoard() {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(sudokuBoard.toJSON()));
	element.setAttribute('download', 'board.json');
	element.style.display = 'none';
	 
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

function loadBoard (event) {
	var reader = new FileReader();

	reader.onload = function(event) {
		sudokuBoard = boardFromJSON(event.target.result);
		refresh();
	}
	reader.readAsText(event.target.files[0]);
}
