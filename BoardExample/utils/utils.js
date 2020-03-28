exports.indexOf = function(arr, obj) {
	var index = -1;
	var keys = Object.keys(obj);

	var result = arr.filter(function(doc, idx) {
		var matched = 0;

		for (var i = keys.length - 1; i >= 0; i--) {
			if (doc[keys[i]] === obj[keys[i]]) {
				index = idx;
				return idx;
			}
		}
	});

	return index;
}