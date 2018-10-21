var inputText = "";
function setup() {
	document.getElementById('split-input').addEventListener('change', function(e) {
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

function changeDropdown(target) {
	if (target === 'split') {
		document.getElementById(target + '-btn').setAttribute('onclick', 'execMethod("splitstr", [' + document.getElementById(target + '-input').value + '])');
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