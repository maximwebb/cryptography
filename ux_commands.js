let autoFillText = true;
let cryptType = 'encrypt';
let outputType = 'textbox';
let engMsg;
let foobar;
//Attaches event handlers to various inputs
function setup() {

	//Adds dummy event listener for certain inputs to listen for wheel event and update value accordingly.
	document.querySelectorAll('.wheel-input').forEach(function(ipt) {
		ipt.addEventListener('wheel', function(e) {

		});
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

		foobar = playfair(engMsg, 'encrypt', removePunc(engMsg.slice(200, 207)));
		document.getElementById('input').value = engMsg;
	}
}

//Enters input text, and executes a specified command on it.
function execMethod(command, params = []) {
	let inputText = document.getElementById('input').value;

	if (command === 'ngram') {
		if (outputType === 'graph') barChart(nGramAnalysis(inputText, parseInt(document.getElementById('ngram-input').value), 26), '', 'Frequency %');
		else document.getElementById('output').value = printFreqArr(nGramAnalysis(inputText, parseInt(document.getElementById('ngram-input').value)));
	}
	else if (command === 'rempunc') {
		document.getElementById('output').value = removePunc(inputText);
	}
	else if (command === 'splitstr') {
		document.getElementById('output').value = splitString(inputText, parseInt(document.getElementById('splitstr-input').value));
	}
	else if (command === 'cshift') {
		document.getElementById('output').value = caesarShift(inputText, cryptType, parseInt(document.getElementById('cshift-input').value));
	}
	else if (command === 'ssgaps') {
		document.getElementById('output').value = substringGaps(inputText, parseInt(document.getElementById('ssgaps-input').value));
	}
	else if (command === 'monosub') {
		document.getElementById('output').value = monoSub(inputText, cryptType, document.getElementById('monosub-input').value);
	}
	else if (command === 'playfair') {
		document.getElementById('output').value = playfair(inputText, 'encrypt', document.getElementById('playfair-input').value);
	}
	else if (command === 'playgrid') {
		playfairGrid(inputText, true);
	}
}

//Changes the type (en/decrypt) as well as the image when the en/decrypt toggle image is clicked
function flipCryptType() {
	if (cryptType === 'encrypt') {
		document.getElementById('cryptTypeIcon').innerHTML = 'lock_open';
		cryptType = 'decrypt';
	}
	else if (cryptType === 'decrypt') {
		document.getElementById('cryptTypeIcon').innerHTML = 'lock';
		cryptType = 'encrypt';
	}
}

//Changes the output type (text/graph) as well as the image when the outputType image is clicked
function flipOutputType() {
	if (outputType === 'textbox') {
		document.getElementById('outputTypeIcon').innerHTML = 'insert_chart_outlined';
		outputType = 'graph';
	}
	else if (outputType === 'graph') {
		document.getElementById('outputTypeIcon').innerHTML = 'list';
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
	document.getElementById(view).style.display = "flex";
}

//Changes between tabs (ie control panel slides)
function toggleTab(tab) {
	document.querySelectorAll('.active-tab').forEach((tb) => tb.classList.remove('active-tab'));
	document.getElementById(tab + '-tab').classList.add('active-tab');
	document.querySelectorAll('.active-panel').forEach((pn) => pn.classList.remove('active-panel'));
	document.getElementById(tab + '-panel').classList.add('active-panel');
	toggleView('flex-container-main');
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

//Take sorted array of pairs and assigns different shades of a given colour.
function heatMap(arr, colour) {
	let outputArr = [];
	let maxVal = arr[0][1];
	let minVal = arr[arr.length - 1][1];

	for (let i = 0; i < arr.length; i++) {
		outputArr.push([arr[i][0], 'rgba(255, 0, 0, ' + ((arr[i][1] - minVal)/ maxVal) + ')']);
	}
	return outputArr;
}

function playfairGrid(str, relative = false) {
	let freqArr = freqAnalysis(str, relative);
	let bigramArr = playfairBigrams(str, relative);
	let bigramHeatArr = heatMap(bigramArr);
	let bigramObj = {};
	let bigramHeatObj = {};

	for (let i = 0; i < bigramArr.length; i++) {
		bigramObj[bigramArr[i][0]] = bigramArr[i][1];
		bigramHeatObj[bigramHeatArr[i][0]] = bigramHeatArr[i][1];
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
				if (relative) {
					outputHTML += '<td><b>Frequency %</b></td>';
				}
				else {
					outputHTML += '<td><b>Frequency</b></td>';
				}
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
				if (typeof(bigramObj[row + col]) === 'number') {
					outputHTML += '<td style="background-color: ' + bigramHeatObj[row + col] + '">' + bigramObj[row + col] + '</td>';
				}
				else {
					outputHTML += '<td>0</td>';
				}
			}
		}
		outputHTML += '</tr>';
	}

	document.getElementById('grid').innerHTML = outputHTML;
	return bigramArr;
}