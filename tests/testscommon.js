QUnit.assert.boardEquals = function(obtained, expected, message) {
	var ok = true;
	
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++){
			if (obtained.getValue(i,j) !== expected.getValue(i,j)){
				this.push (false, obtained.getValue(i,j), expected.getValue(i,j), message + ": failed comparing value at "+i+","+j);
				ok = false;
			}
		}
	}
	
	if (ok) {
		this.push (ok, obtained, expected, message);
	}
}