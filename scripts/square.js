function square(x, y, possibleValues, value) {
	this.x = x;
	this.y = y;
	if (possibleValues === undefined) {
		this.possibleValues = [1,2,3,4,5,6,7,8,9];
	}
	else {
		this.possibleValues = possibleValues;
	}
	this.value = value;
}

square.prototype.zone = function () {
	var x_zone = Math.floor(this.x / 3);
	var y_zone = Math.floor(this.y / 3);
	return y_zone * 3 + x_zone;
}

square.prototype.hasValue = function () {
	return this.value !== undefined;
}

square.prototype.getValue = function () {
	return this.value;
}

square.prototype.setValue = function (newValue) {
	this.value = newValue;
}

square.prototype.clearValue = function () {
	this.value = undefined;
}

square.prototype.isValuePossible = function (value) {
	return this.possibleValues.indexOf(value) > -1;
}

square.prototype.removePossibleValue = function (oldValue) {
	var index = this.possibleValues.indexOf(oldValue);
	if (index > -1) {
		this.possibleValues.splice(index,1);
	}
}

square.prototype.restorePossibleValue = function (newValue) {
	var index = this.possibleValues.indexOf(newValue);
	if (index === -1) {
		this.possibleValues.push(newValue);
	}
}


