let alphabet = 'abcdefghijklmnopqrstuvwxyz';
let engFreqAnalysis = [
	['a', 8.167],
	['b', 1.492],
	['c', 2.782],
	['d', 4.253],
	['e', 12.702],
	['f', 2.228],
	['g', 2.015],
	['h', 6.094],
	['i', 6.966],
	['j', 0.153],
	['k', 0.772],
	['l', 4.025],
	['m', 2.406],
	['n', 6.749],
	['o', 7.507],
	['p', 1.929],
	['q', 0.095],
	['r', 5.987],
	['s', 6.327],
	['t', 9.056],
	['u', 2.758],
	['v', 0.978],
	['w', 2.36],
	['x', 0.15],
	['y', 1.974],
	['z', 0.074]
];

let engBigramAnalysis = [
	[],
];


//Removes spaces & punctuation from string
function removePunc(str) {
	return (str.toLowerCase()).replace(/[^a-z]/g, '');
}

//Removes spaces & punctuation then splits string into groups of n.
function splitString(str, n = 3) {
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

//Extracts every n-th letter, returning result as an array of strings.
function extractStrings(str, n) {
	str = removePunc(str);
	let strArr = [];
	let extractStr = '';

	for (let i = 0; i < n; i++) {
		for (let j = i; j < str.length; j+= n) {
			extractStr += str.slice(j, j + 1);
		}
		strArr.push(extractStr);
		extractStr = '';
	}
	return strArr;
}

//Performs a frequency analysis on a string
function freqAnalysis(str, relative = true) {
	let arr = removePunc(str).split('');
	arr.sort();

	let pos = arr[0];
	let count = 0;
	let output = "";
	let outputArr = [];
	for (i = 0; i < arr.length + 1; i++) {
		if (arr[i] !== pos) {
			outputArr.push([]);
			if (relative) {
				outputArr[outputArr.length - 1] = [arr[i - 1], Math.round(count * 10000 / arr.length)/100];
			}
			else {
				outputArr[outputArr.length - 1] = [arr[i - 1], count];
			}
			count = 1;
			pos = arr[i];
		}
		else if (i === arr.length) {
			if (relative) {
				outputArr[outputArr.length] = [arr[i-1], Math.round(count * 10000 / arr.length)/100];
			}
			else {
				outputArr[outputArr.length] = [arr[i-1], count];
			}
		}
		else {
			count++;
		}
	}

	//Adds in missing frequencies
	for (i = 0; i < 26; i++) {
		let letter = String.fromCharCode(i + 97);
		if (!(outputArr.find( (a) => a[0] === letter) )) {
			outputArr.push([letter, 0]);
		}
	}

	outputArr.sort( (a, b) => b[1] - a[1]);
	return outputArr;
}

//Performs an n-gram analysis on a string, for n = len, returning a specified number of results.
function nGramAnalysis(input, len, outputNum = 50, relative = true) {

	let substrArr = [];
	let outputArr = [];
	let count = 1;

	//Allows for input as an array or a string (ie. array of numbers).
	if (typeof(input) === 'string') {
		let str2 = removePunc(input);

		//Create ordered array of substrings
		for (let i = 0; i < str2.length - len + 1; i++) {
			substrArr.push(str2.substr(i, len));
		}
		substrArr.sort();
	}
	else {
		substrArr = input.sort();
	}


	let pos = substrArr[0];
	for (let i = 1; i <= substrArr.length; i++) {
		if (pos !== substrArr[i]) {
			pos = substrArr[i];
			if (relative) {
				outputArr.push([substrArr[i-1], Math.round(count * 10000/substrArr.length)/100]);
			}
			else {
				outputArr.push([substrArr[i-1], count]);
			}
			count = 1;
		}
		else if (i === substrArr.length) {
			pos = substrArr[i];
			if (relative) {
				outputArr.push([substrArr[i-1], Math.round(count * 10000/substrArr.length)/100]);
			}
			else {
				outputArr.push([substrArr[i-1], count]);
			}
		}
		else {
			count++;
		}
	}
	outputArr.sort( (a, b) => b[1] - a[1]);

	if (outputNum === 0) return outputArr;
	else return outputArr.splice(0, outputNum);
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
			outputStr += keyArr[count % key.length][charNum - 65].toUpperCase();
			count++;
		}
		else {
			outputStr += str.slice(i, i + 1);
		}
	}
	return outputStr;
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
	let rpStr = removePunc(str);
	let gapsArr = [];
	for (let i = 0; i < rpStr.length - substr_length; i++) {
		let substr = rpStr.substring(i, i + substr_length);
		for (let j = i + substr_length - 1; j < rpStr.length - substr_length; j++) {
			if (rpStr.substring(j, j + substr_length) === substr) {
				gapsArr.push(j - i);
			}
		}
	}
	return gapsArr.sort((a, b) => (a - b));
}

//Determines length of key word in Viginere ciphers.
function findViginereKeyLength(str) {
	let keyArr = substringGaps(str, 3);
	let resArr = [];
	let maxCount = 2;
	for (let i = 2; i < 16; i++) {
		resArr.push([i, 0, 0]);
		for (let j = 0; j < keyArr.length; j++) {
			if (!(keyArr[j] % i)) {
				resArr[i - 2][1]++;
			}
		}
		resArr[i - 2][2] = Math.pow(resArr[i - 2][0], 0.25) * resArr[i - 2][1];
		if (resArr[i - 2][2] > resArr[maxCount - 2][2]) {
			maxCount = resArr[i - 2][0];
		}
	}
	return maxCount;
}

//Matches frequency analysis result to closest Caesar shift alphabet.
function determineShift(arr) {
	let inputArr = arr.sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0));
	let shiftFreqArr = engFreqAnalysis;
	let count = 0;
	let minRes = [-1, Infinity];
	for (let i = 0; i < 26; i++) {
		count = 0;
		for (let j = 0; j < arr.length; j++) {
			count += Math.abs(shiftFreqArr[j][1] - arr[j][1]);
		}
		if (count < minRes[1]) {
			minRes = [i, count];
		}
		shiftFreqArr.unshift(shiftFreqArr.pop());
	}
	return minRes[0];
}

//Completely solves a Caesar shift cipher, given ciphertext only.
function solveCaesar(str) {
	let key = determineShift(freqAnalysis(str));
	return caesarShift(str, 'decrypt', key);
}

//Completely solves a Viginere cipher, given ciphertext only.
function solveViginere(str) {
	let keyLen = findViginereKeyLength(str);
	let strArr = extractStrings(str, keyLen);
	let key = '';

	for (let m = 0; m < keyLen; m++) {
		key += String.fromCharCode(determineShift(freqAnalysis(strArr[m])) + 97);
	}

	return viginere(str, 'decrypt', key);

}

//Performs a playfair encryption/decryption.
function playfair(str, type, key) {
	let keyTemp = new Set(key.replace(/j/g, 'i') + alphabet.replace(/j/g, 'i'));
	key = '';
	keyTemp.forEach((a) => key += a);
	//key = key.replace(/j/, 'i');
	let keyArr = [];
	let keyObj = {};
	for (let i = 0; i < 5; i++) {
		keyArr.push([]);
		for (let j = 0; j < 5; j++) {
			keyArr[i].push(key[i * 5 + j]);
			keyObj[key[i * 5 + j]] = [i, j];
		}
	}

	str = removePunc(str.replace(/j/g, '')).split('');
	if (str[str.length - 1] === 'x') {
		str = str.slice(0, -1);
	}
	let strArr = [];


	//Inserts x's where necessary
	for (let i = 0; i < str.length; i += 2) {
		if (type === 'encrypt') {
			if (!str[i + 1] && str.length % 2) {
				str.push('x')
			}
			if (str[i] === str[i + 1]) {
				str.splice(i + 1, 0, 'x');
			}
		}
		strArr.push(str[i] + str[i + 1]);
	}

	let output = '';

	if (type === 'encrypt') {
		for (let i = 0; i < strArr.length; i++) {
			//Set a & b to coords of 1st & 2nd letter in plaintext pair respectively. a[0] = row num, a[1] = col num.
			let a = keyObj[strArr[i][0]];
			let b = keyObj[strArr[i][1]];

			if (a[0] === b[0]) output += (keyArr[a[0]][(a[1] + 1) % 5] + keyArr[b[0]][(b[1] + 1) % 5]);
			else if (a[1] === b[1]) output += (keyArr[(a[0] + 1) % 5][a[1]] + keyArr[(b[0] + 1) % 5][b[1]]);
			else output += (keyArr[a[0]][b[1]] + keyArr[b[0]][a[1]]);
		}
	}
	else {
		for (let i = 0; i < strArr.length; i++) {
			//Set a & b to coords of 1st & 2nd letter in plaintext pair respectively. a[0] = row num, a[1] = col num.
			let a = keyObj[strArr[i][0]];
			let b = keyObj[strArr[i][1]];

			if (a[0] === b[0]) output += (keyArr[a[0]][(a[1] + 4) % 5] + keyArr[b[0]][(b[1] + 4) % 5]);
			else if (a[1] === b[1]) output += (keyArr[(a[0] + 4) % 5][a[1]] + keyArr[(b[0] + 4) % 5][b[1]]);
			else output += (keyArr[a[0]][b[1]] + keyArr[b[0]][a[1]]);
		}
	}
	return output;
}


//Performs a bigram analysis on a string split into pairs: 'abcd' -> 'ab', 'cd'.
function playfairBigrams(str, relative = false) {
	let pairsArr = splitString(str, 2).split(' ');
	return nGramAnalysis(pairsArr, 2, 0, relative);
}

