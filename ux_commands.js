let autoFillText = true;
let cryptType = 'encrypt';
let outputType = 'textbox';
let engMsg;
let foobar;
//Attaches event handlers to various inputs
function setup() {

	//On scroll of mouse wheel while 'split-input' is focused call scrollControlButton with target 'split'
	document.getElementById("splitstr-input").addEventListener('wheel', function(e) {
		scrollControlButton("splitstr", e);
	});
	//On change to the 'splitstr-input' call updateControlButton with target 'split'
	document.getElementById('splitstr-input').addEventListener('change', function() {
		updateControlButton('splitstr', 'number');
	});

	document.getElementById("cshift-input").addEventListener('wheel', function(e) {
		scrollControlButton("cshift", e);
	});
	document.getElementById('cshift-input').addEventListener('change', function() {
		updateControlButton('cshift', 'number');
	});

	document.getElementById("ngram-input").addEventListener('wheel', function(e) {
		scrollControlButton("ngram", e);
	});
	document.getElementById('ngram-input').addEventListener('change', function() {
		updateControlButton('ngram', 'number');
	});
	//On change to the 'monosub-input' call updateControlButton and updatePersPlaceholder with target 'monosub'
	document.getElementById('monosub-input').addEventListener('keypress', function() {
		updateControlButton('monosub', 'string');
		updatePersPlaceholder('monosub', 'abcdefghijklmnopqrstuvwxyz');
	});

	if (autoFillText) {
		/*document.getElementById('input').value = 'Applications of matrices are found in most scientific fields. In every ' +
			'branch of physics, including classical mechanics, optics, electromagnetism, quantum mechanics, and quantum ' +
			'electrodynamics, they are used to study physical phenomena, such as the motion of rigid bodies. In computer' +
			' graphics, they are used to manipulate 3D models and project them onto a 2-dimensional screen. In probability' +
			' theory and statistics, stochastic matrices are used to describe sets of probabilities; for instance, they are' +
			' used within the PageRank algorithm that ranks the pages in a Google search.[5] Matrix calculus generalizes ' +
			'classical analytical notions such as derivatives and exponentials to higher dimensions. Matrices are used in ' +
			'economics to describe systems of economic relationships.';*/

		engMsg = 'Concerning the history of Beowulf a whole library has been written, and scholars still differ too radically for us to express a positive judgment. This much, however, is clear,--that there existed, at the time the poem was composed, various northern legends of Beowa, a half-divine hero, and the monster Grendel. The latter has been interpreted in various ways,--sometimes as a bear, and again as the malaria of the marsh lands. For those interested in symbols the simplest interpretation of these myths is to regard Beowulfs successive fights with the three dragons as the overcoming, first, of the overwhelming danger of the sea, which was beaten back by the dykes; second, the conquering of the sea itself, when men learned to sail upon it and third, the conflict with the hostile forces of nature, which are overcome at last by mans indomitable will and perseverance.All this is purely mythical; but there are historical incidents to reckon with. About the year 520 a certain northern chief, called by the chronicler Chochilaicus (who is generally identified with the Hygelac of the epic), led a huge plundering expedition up the Rhine. After a succession of battles he was overcome by the Franks, but--and now we enter a legendary region once more--not until a gigantic nephew of Hygelac had performed heroic feats of valor, and had saved the remnants of the host by a marvelous feat of swimming. The majority of scholars now hold that these historical events and personages were celebrated in the epic; but some still assert that the events which gave a foundation for Beowulf occurred wholly on English soil, where the poem itself was undoubtedly written.			Poetical FormThe rhythm of Beowulf and indeed of all our earliest poetry depended upon accent and alliteration; that is, the beginning of two or more words in the same line with the same sound or letter. The lines were made up of two short halves, separated by a pause. No rime was used; but a musical effect was produced by giving each half line two strongly accented syllables. Each full line, therefore, had four accents, three of which (i.e. two in the first half, and one in the second) usually began with the same sound or letter. The musical effect was heightened by the harp with which the gleeman accompanied his singing.. The poetical form will be seen clearly in the following selection from the wonderfully realistic description of the fens haunted by Grendel. It will need only one or two readings aloud to show that many of these strange-looking words are practically the same as those we still use, though many of the vowel sounds were pronounced differently by our ancestors.';

		foobar = playfair(engMsg, removePunc(engMsg.slice(200, 207)));
		document.getElementById('input').value = foobar;
	}
}

//Solves a playfair cipher
function solvePlayfair(str) {
	//P(A <->) = 5/6
}

//Enters input text, and executes a specified command on it.
function execMethod(command, params = []) {
	inputText = document.getElementById('input').value;
	let outputText = '';
	if (command === 'ngram') {
		if (!params[1]) {
			params[1] = (params[0] === 1) ? 26 : 50;
		}

		if (outputType === 'graph') barChart(nGramAnalysis(inputText, params[0], params[1]), '', 'Frequency %');
		else document.getElementById('output').value = printFreqArr(nGramAnalysis(inputText, params[0]));
	}
	else if (command === 'rempunc') {
		document.getElementById('output').value = removePunc(inputText);
	}
	else if (command === 'splitstr') {
		document.getElementById('output').value = splitString(inputText, params[0]);
	}
	else if (command === 'cshift') {
		document.getElementById('output').value = caesarShift(inputText, cryptType, params[0]);
	}
	else if (command === 'ssgaps') {
		document.getElementById('output').value = substringGaps(inputText, params[0]);
	}
	else if (command === 'monosub') {
		document.getElementById('output').value = monoSub(inputText, cryptType, params[0]);
	}
}

//Change onclick attribute of button, such that it passes the correct parameter value to the corresponding function
function updateControlButton(target, type) {
	if (type === 'number') {
		document.getElementById(target + '-btn').setAttribute('onclick', 'execMethod(\'' + target + '\', [' + document.getElementById(target + '-input').value + '])')
	}
	else if (type === 'string') {
		document.getElementById(target + '-btn').setAttribute('onclick', 'execMethod(\'' + target + '\', [\'' + document.getElementById(target + '-input').value + '\'])')
	}
}

//(On scroll event) checks if the mouse is scrolled up (deltaY = -100) or down (deltaY = 100) and changes execMethod params accordingly.
function scrollControlButton(target, e) {
	let length = parseInt(document.getElementById(target + "-input").value);
	if (e.deltaY < 0 && length <= document.getElementById(target + "-btn").max ) {
		document.getElementById(target + "-btn").setAttribute("onclick", 'execMethod(\'' + target + '\', [' + (length+1) + '])');
	}
	else if (e.deltaY > 0 && length >= document.getElementById(target + "-btn").min ) {
		document.getElementById(target + "-btn").setAttribute('onclick', 'execMethod(\'' + target + '\', [' + (length-1) + '])');
	}
}

//Change the placeholder of a pers-plac input such that when typed over the placeholder is removed
function updatePersPlaceholder(target, placeholder) {
	let input = document.getElementById(target + "-input").value;
	//let placeholder = document.getElementById(target + "-plac").value;
	let blocks = input.split(" ");
	let currentStr = "";	//currentStr is the string currently being replaced with ␣'s
	let sum = 0;	//sum is the position through the placeholder from left to right
	for (i=0; i<blocks.length; i++) {
		currentStr = placeholder.substr(sum, blocks[i].length);	//sub string from current position(sum) and length of the current block(of text) from input
		placeholder = placeholder.replace(currentStr, ' '.repeat(blocks[i].length));	//replace equivalent of input text with ␣'s
		sum += blocks[i].length + 1;	//sum is updated to be the length of the input strings plus the space between them
	}
	document.getElementById(target + '-plac').setAttribute('value', placeholder);
}

//Changes the type (en/decrypt) as well as the image when the en/decrypt toggle image is clicked
function flipCryptType() {
	if (cryptType === 'encrypt') {
		document.getElementById("cryptTypeImg").setAttribute('src', './images/unlocked.png');
		cryptType = 'decrypt';
	}
	else if (cryptType === 'decrypt') {
		document.getElementById("cryptTypeImg").setAttribute('src', './images/locked.png');
		cryptType = 'encrypt';
	}
}

//Changes the output type (text/graph) as well as the image when the outputType image is clicked
function flipOutputType() {
	if (outputType === 'textbox') {
		document.getElementById("outputTypeImg").setAttribute('src', './images/graph.png');
		outputType = 'graph';
	}
	else if (outputType === 'graph') {
		document.getElementById("outputTypeImg").setAttribute('src', './images/textbox.png');
		outputType = 'textbox';
	}
}

//Copies output to clipboard
function copyOutput() {
	let outputText = document.getElementById('output');
	outputText.select();
	document.execCommand('copy');
}

//Changes between various views.
function toggleView(view) {
	document.querySelectorAll('.container').forEach((cont) => cont.style.display = "none");
	document.getElementById(view).style.display = "block";
}

//Displays a bar chart
function barChart(data, xAxis, yAxis, order = 'numeric') {
	//Formats data according to parameters
	if (order === 'alphabetic') data.sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0));
	else if (order === 'numeric') data.sort((a, b) => b[1] - a[1]);
	xData = data.map(el => el[0]);
	yData = data.map(el => el[1]);

	var ctx = document.getElementById('outputChart').getContext('2d');
	toggleView('graph-container');

	var outputChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: xData,
			datasets: [{
				label: yAxis,
				data: yData,
				backgroundColor: 'rgba(255, 99, 132, 0.8)',
				borderColor: 'rgba(255,99,132,1)',
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
}

var arr1 = [['a', 10], ['b', 20], ['d', 50]];

function playfairGrid(str) {
	let freqArr = freqAnalysis(str);
	let bigramArr = playfairBigrams(str);
	let bigramObj = {};

	for (let i = 0; i < bigramArr.length; i++) {
		bigramObj[bigramArr[i][0]] = bigramArr[i][1];
	}

	let outputHTML = '';
	toggleView('grid-container');
	for (let i = 0; i < 27; i++) {
		outputHTML += '<tr>';
		for (let j = 0; j < 28; j++) {
			if (i === 0 && j === 0) {
				outputHTML += '<td></td>';
			}
			else if (i === 0 && j === 1) {
				outputHTML += '<td><b>Frequency %</b></td>';
			}
			else if (i === 0 && j > 1) {
				outputHTML += '<td><b>' + String.fromCharCode(j + 63) + '</b></td>';
			}
			else if (i > 0 && j === 0) {
				outputHTML += '<td><b>' + String.fromCharCode(i + 64) + '</b></td>';
			}
			else if (i > 0 && j === 1) {
				outputHTML += '<td>' + freqArr[i - 1][1] + '</td>';
			}
			else {
				let row = String.fromCharCode(i + 96);
				let col = String.fromCharCode(j + 95);
				console.log(row + col);
				if (typeof(bigramObj[row + col]) === 'number') {
					outputHTML += '<td>' + bigramObj[row + col] + '</td>';
				}
				else {
					outputHTML += '<td>0.00</td>';
				}
			}
		}
		outputHTML += '</tr>';
	}

	document.getElementById('grid').innerHTML = outputHTML;
	return bigramObj;
}