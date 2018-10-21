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
	let outputText = freqAnalysis(inputText);
	document.getElementById('output').value = outputText;
}

//Copies output to clipboard
function copyOutput() {
	outputText = document.getElementById('output');
	outputText.select();
	document.execCommand('copy');
}

//Removes spaces & punctuation from string
function removePunc(str) {
	return str.replace(/[^a-z]/g, '');
}

//Removes spaces & punctuation then splits string into groups of n.
function splitString(str, n) {
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
	console.log(outputArr);
	return output;
}