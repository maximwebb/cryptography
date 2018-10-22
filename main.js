let alphabet = 'abcdefghijklmnopqrstuvwxyz';

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
	return outputArr;
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

//Performs a monoalphabetic substitution encryption/decryption
function monoSub(str, type='encrypt', key='zyxwabcdefghijklmnopqrstuv') {
	let encrypt = (type === 'encrypt');
	let strArr = str.split('');
	let outputStr = '';

	let keyArr = new Array(26).fill([]);
	keyArr = keyArr.map((x, index) => [alphabet.charAt(index), key.charAt(index)]);
	if (type === 'decrypt') {
		keyArr.sort((a, b) => a[1].charCodeAt(0) - b[1].charCodeAt(0));
	}

	for (i = 0; i < strArr.length; i++) {
		let charNum = strArr[i].charCodeAt(0);
		if (charNum >= 97 && charNum <= 122) outputStr += keyArr[charNum - 97][+encrypt];
		else if (charNum >= 65 && charNum <= 90) outputStr += (keyArr[charNum - 65][+encrypt]).toUpperCase();
		else outputStr += strArr[i];
	}
	return outputStr;
}

//Determines the length of gaps between repeated substrings of length n (Kasiski analysis).
function substringGaps(str, gap_length) {
	let gapsArr = [];
	for (let i = 0; i < str.length - gap_length; i++) {
		let substr = str.substring(i, i + gap_length);
		for (let j = i + gap_length - 1; j < str.length - gap_length; j++) {
			if (str.substring(j, j + gap_length) === substr) {
				gapsArr.push(j - i);
			}
		}
	}
	return gapsArr.sort((a, b) => (a - b));
}