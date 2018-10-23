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
	for (i = 0; i < arr.length + 1; i++) {
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
	for (i = 0; i < 26; i++) {
		let letter = String.fromCharCode(i + 97);
		if (!(outputArr.find( (a) => a[0] === letter) )) {
			console.log(letter + " not found!");
			outputArr.push([letter, 0]);
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

//Performs a Caesar shift encryption/decryption.
function caesarShift(str, type='encrypt', rot) {
	if (type === 'decrypt') rot = 26 - rot;
	let shiftStr = '';
	for (i = 0; i < str.length; i++) {
		let charNum = str.charCodeAt(i);
		if (charNum >= 97 && charNum <= 122) shiftStr += String.fromCharCode(((str.charCodeAt(i) - 97 + rot) % 26) + 97);
		else if (charNum >= 65 && charNum <= 90) shiftStr += String.fromCharCode(((str.charCodeAt(i) - 65 + rot) % 26) + 65);
		else shiftStr += str.slice(i, i + 1);

	}
	return shiftStr;
}

//Performs a monoalphabetic substitution encryption/decryption.
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
		let charNum = str.charCodeAt(i);
		if (charNum >= 97 && charNum <= 122) outputStr += keyArr[charNum - 97][+encrypt];
		else if (charNum >= 65 && charNum <= 90) outputStr += (keyArr[charNum - 65][+encrypt]).toUpperCase();
		else outputStr += str.slice(i, i + 1);
	}
	return outputStr;
}

//Determines the length of gaps between repeated substrings of length n (Kasiski analysis).
function substringGaps(str, substr_length) {
	let gapsArr = [];
	for (let i = 0; i < str.length - substr_length; i++) {
		let substr = str.substring(i, i + substr_length);
		for (let j = i + substr_length - 1; j < str.length - substr_length; j++) {
			if (str.substring(j, j + substr_length) === substr) {
				gapsArr.push(j - i);
			}
		}
	}
	return gapsArr.sort((a, b) => (a - b));
}

//Performs a Viginere encryption/decryption.
function viginere(str, type, key) {
	let keyArr = [];
	let outputStr = '';
	let count = 0;

	//Sets up array of shifted alphabets.
	for (let i = 0; i < key.length; i++) {
		keyArr.push(caesarShift(alphabet, type, (key.charCodeAt(i)-97)));
	}

	for (let i = 0; i < str.length; i++) {
		let charNum = str.charCodeAt(i);
		if (charNum >= 97 && charNum <= 122) {
			outputStr += keyArr[count % key.length][charNum - 97];
			count++;
		}
		else if (charNum >= 65 && charNum <= 90) {
			outputStr += keyArr[count % key.length][charNum - 65];
			count++;
		}
		else {
			outputStr += str.slice(i, i + 1);
		}
	}
	return outputStr;
}