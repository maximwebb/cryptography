var inputText = "";
function setup() {
	document.getElementById('input').addEventListener('keydown', function(e) {
		if (e.keyCode === 13) {
			enterInput();
		}
	});
}


function enterInput() {
	inputText = document.getElementById('input').value;
	let outputText = splitString(inputText, 4);
	document.getElementById('output').value = outputText;
}

//Removes spaces & punctuation from string
function removePunc(str) {
	return str.replace(/\W+/g, '');
}

//Removes spaces & punctuation then splits string into groups of n.
function splitString(str, n) {
	str = removePunc(str);
	str = str.split('');
	for (i = n; i < str.length; i+= (n+1)) {
		str.splice(i, 0, " ");
	}
	return str.join('');
}