/* Some methods for generating training data */
let res = [];

function fetchData(a, b) {
	let c = Math.floor(Math.random() * 200);
	fetch('resources/english_text.txt')
		.then(response => response.text())
		.then(text => bar(text.slice(a, b)));
}

function bar(str) {
	res.push(str);
}

function fetchSeqData(n, start = 0) {
	let num = start;
	var t = setInterval(function() {
		fetchData(num * 200000, (num + 1) * 200000);
		num++;
		if (num > n + start) {
			genCaesar();
			clearInterval(t);
		}
	}, 500);
}

function genPlayfair() {
	for (let i = 0; i < res.length; i++) {
		let randNum = Math.floor(Math.random() * 80);
		document.getElementById('output').value += playfair(res[i], res[i].slice(20, 28));
	}
}

function genViginere() {
	for (let i = 0; i < res.length; i++) {
		let randNum = Math.floor(Math.random() * 8 + 4);
		document.getElementById('output').value += viginere(res[i], 'encrypt', res[i].slice(20, 20 + randNum));
	}
}

function genCaesar() {
	for (let i = 0; i < res.length; i++) {
		let randNum = Math.floor(Math.random() * 25 + 1);
		document.getElementById('output').value += caesarShift(res[i], 'encrypt', randNum);
	}
}