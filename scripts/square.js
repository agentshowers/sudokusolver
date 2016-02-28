function square(x, y, value) {
	this.x = x;
	this.y = y;
	this.value = value;
	this.valid = true;
}

square.prototype.hasValue = function() {
	return this.value !== undefined;
}

square.prototype.getValue = function() {
	return this.value;
}

square.prototype.setValue = function(newValue) {
	this.value = newValue;
}

square.prototype.clearValue = function() {
	this.value = undefined;
}

square.prototype.clone = function(){
	return $.extend(true,{},this);
}

square.prototype.isValid = function(){
	return this.valid;
}

square.prototype.validate = function(){
	this.valid = true;
}

square.prototype.invalidate = function(){
	this.valid = false;
}

function zone(x, y) {
	var x_zone = Math.floor(x / 3);
	var y_zone = Math.floor(y / 3);
	return y_zone * 3 + x_zone;
}
