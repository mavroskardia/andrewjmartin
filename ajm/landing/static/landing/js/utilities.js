define([], function () {

	var Utilities = {};

	Utilities.remove_class = function (eltid, classname) {
		var elt = document.getElementById(eltid);
		elt.className = elt.className.replace(classname, '');
		return Utilities;
	};

	Utilities.add_class = function (eltid, classname) {
		var elt = document.getElementById(eltid);
		if (elt.className.indexOf(classname) == -1) {
			if (elt.className != '')
				elt.className += ' ';
			elt.className += classname;
		}
		return Utilities;
	};

	Utilities.getElementByInnerText = function (innertext) {
		function search(node) {			
			for (var i = 0; i < node.childNodes.length; i++) {
				child = node.childNodes[i];				
				if (child.nodeType === 3 && child.nodeValue.indexOf(innertext) != -1) {
					return node;
				}
				if (child.nodeType === 1) {
					var result = search(child);
					if (result) return result;
				}
			}
			return null;
		}

		return search(document.body);
	}

	return Utilities;

});