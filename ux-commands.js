//Attaches event handlers to various inputs
function setup() {

	//On scroll of mouse wheel while 'split-input' is focused call scrollDropdown with target 'split'
	document.getElementById("splitstr-input").addEventListener('wheel', function(e) {
		scrollDropdown("splitstr", e);
	});

	//On change to the 'split-input' call changeDropdown with target 'split'
	document.getElementById('splitstr-input').addEventListener('change', function() {
		changeDropdown('splitstr');
	});
}

//Enters input text, and executes a specified command on it.
function execMethod(command, params = []) {
	inputText = document.getElementById('input').value;
	let outputText = '';
	if (command === 'freqan') {
		outputText = freqAnalysis(inputText);
	}
	else if (command === 'rempunc') {
		outputText = removePunc(inputText);
	}
	else if (command === 'splitstr') {
		outputText = splitString(inputText, params[0]);
	}

	document.getElementById('output').value = outputText;
}

//Change onclick attribute of button, such that it passes the correct parameter value to the corresponding function
function changeDropdown(target) {
	document.getElementById(target + '-btn').setAttribute('onclick', 'execMethod(\'' + target + '\', [' + document.getElementById(target + '-input').value + '])');
}

//Fires on scroll event, and checks if the mouse is scrolled up (deltaY = -100) or down (deltaY = 100) and changes accordingly.
function scrollDropdown(target, e) {
	let length = parseInt(document.getElementById(target + "-input").value);
	if (e.deltaY < 0) {
		document.getElementById(target + "-btn").setAttribute("onclick", 'execMethod(\'' + target + '\', [' + (length+1) + '])');
	}
	else if (e.deltaY > 0 && length >= document.getElementById(target + "-btn").min ) {
		document.getElementById(target + "-btn").setAttribute('onclick', 'execMethod(\'' + target + '\', [' + (length-1) + '])');
	}
}

//Copies output to clipboard
function copyOutput() {
	let outputText = document.getElementById('output');
	outputText.select();
	document.execCommand('copy');
}