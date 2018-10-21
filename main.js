let inputText = '';
let alphabet = 'abcdefghijklmnopqrstuvwxyz';

function setup() {

	//On scroll of mouse wheel while 'split-input' is focused call scrollDropdown with target 'split'
	document.getElementById("split-input").addEventListener('wheel', function(e) {
		scrollDropdown("split");
	});
	
	//On change to the 'split-input' call changeDropdown with target 'split'
	document.getElementById('split-input').addEventListener('change', function() {
		changeDropdown('split');
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

//updates corresponding function parameters for inputs that can be altered indirectly
function changeDropdown(target) {
	//get split-btn element and change the contents of onclick to have the value of the split-input field (that might have been altered by buttons or scroll)
	if (target === 'split') {
		document.getElementById(target + '-btn').setAttribute('onclick', 'execMethod("splitstr", [' + document.getElementById(target + '-input').value + '])');
	}
}

//using the passed through scroll event, check if the mouse is scrolled up (deltaY = -100) or down (deltaY = 100) and incremant/decrement (unless at min value)
function scrollDropdown(target) {
	let length = document.getElementById(target + "-input").value
	if (e.deltaY < 0) {
		document.getElementById(target + "-btn").setAttribute("onclick", "execMethod('" + target + "str', [" + length+1 + "])");
	}
	else if (e.deltaY > 0 && length >= document.getElementById(target + "-btn").min ) {
		document.getElementById(target + "-btn").setAttribute("onclick", "execMethod('" + target + "str', [" + length-1 + "])");
	}
}

//Copies output to clipboard
function copyOutput() {
	outputText = document.getElementById('output');
	outputText.select();
	document.execCommand('copy');
}

//Removes spaces & punctuation from string
function removePunc(str) {
	return (str.toLowerCase()).replace(/[^a-z]/g, '');
}

//Removes spaces & punctuation then splits string into groups of n.
function splitString(str, n) {
	if (typeof(n) !== "number" || n < 1) {
		alert('Please enter a valid number.');
		return "error";
	}
	str = removePunc(str);
	let arr = str.split('');
	for (i = n; i < arr.length; i+= (n+1)) {
		arr.splice(i, 0, " ");
	}
	return arr.join('');
}

//Performs a frequency analysis on a string
function freqAnalysis(str) {
	let arr = removePunc(str).split('');
	arr.sort();

	let pos = arr[0];
	let count = 0;
	let output = "";
	let outputArr = [];
	for (i = 0; i < arr.length; i++) {
		if (arr[i] !== pos) {
			outputArr.push([]);
			outputArr[outputArr.length - 1] = [arr[i-1], Math.round(count * 10000 / arr.length)/100];
			output += arr[i-1] + ": " + (Math.round(count * 10000 / arr.length)/100) + "%, ";
			count = 1;
			pos = arr[i];
		}
		else if (i === arr.length - 1) {
			outputArr[outputArr.length - 1] = [arr[i-1], Math.round(count * 10000 / arr.length)/100];
			output += arr[i-1] + ": " + (Math.round(count * 10000 / arr.length)/100) + "%";
		}
		else {
			count++;
		}
	}
	outputArr.sort( (a, b) => b[1] - a[1]);
	return printFreqArr(outputArr);
}

//Returns frequency analysis array as a string
function printFreqArr(arr) {
	let str = '';
	for (i = 0; i < arr.length; i++) {
		str += arr[i][0] + ": " + arr[i][1] + "% \n";
	}
	return str;
}

//Performs a Caesar shift encryption/decryption
function caesarShift(str, type, rot) {
	if (type === 'decrypt') rot = 26 - rot;
	let arr = str.split('');
	let shiftStr = '';
	for (i = 0; i < arr.length; i++) {
		let charNum = arr[i].charCodeAt(0);
		if (charNum >= 97 && charNum <= 122) shiftStr += String.fromCharCode(((arr[i].charCodeAt(0) - 97 + rot) % 26) + 97);
		else if (charNum >= 65 && charNum <= 90) shiftStr += String.fromCharCode(((arr[i].charCodeAt(0) - 65 + rot) % 26) + 65);
		else shiftStr += arr[i];

	}
	return shiftStr;
}

