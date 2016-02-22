QUnit.assert.boardEquals = function(obtained, expected, message) {
	var ok = true;
	
	for (var i=0;i<9;i++){
		for (var j=0;j<9;j++){
			if (obtained.getValue(i,j) !== expected.getValue(i,j)){
				this.push (false, obtained.getValue(i,j), expected.getValue(i,j), message + ": failed comparing value at "+i+","+j);
				ok = false;
			}
			if (!isEqArrays(obtained.getPossibleValues(i,j),expected.getPossibleValues(i,j))){
				this.push (false, obtained.getPossibleValues(i,j), expected.getPossibleValues(i,j), message + ": failed comparing possible values at "+i+","+j);
				ok = false;
			}
		}
	}
	
	if (ok) {
		this.push (ok, obtained, expected, message);
	}
}

function inArray(array, el) {
  for ( var i = array.length; i--; ) {
    if ( array[i] === el ) return true;
  }
  return false;
}

function isEqArrays(arr1, arr2) {
  if ( arr1.length !== arr2.length ) {
    return false;
  }
  for ( var i = arr1.length; i--; ) {
    if ( !inArray( arr2, arr1[i] ) ) {
      return false;
    }
  }
  return true;
}