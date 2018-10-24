let autoFillText = true;
let cryptType = 'encrypt';
let outputType = 'textbox';

//Attaches event handlers to various inputs
function setup() {

	//On scroll of mouse wheel while 'split-input' is focused call scrollDropdown with target 'split'
	document.getElementById("splitstr-input").addEventListener('wheel', function(e) {
		scrollDropdown("splitstr", e);
	});
	//On change to the 'splitstr-input' call updateDropdown with target 'split'
	document.getElementById('splitstr-input').addEventListener('change', function() {
		updateDropdown('splitstr');
	});

	document.getElementById("cshift-input").addEventListener('wheel', function(e) {
		scrollDropdown("cshift", e);
	});
	document.getElementById('cshift-input').addEventListener('change', function() {
		updateDropdown('cshift');
	});

	document.getElementById("ngram-input").addEventListener('wheel', function(e) {
		scrollDropdown("ngram", e);
	});
	document.getElementById('ngram-input').addEventListener('change', function() {
		updateDropdown('ngram');
	});

	if (autoFillText) {
		document.getElementById('input').value = 'Applications of matrices are found in most scientific fields. In every ' +
			'branch of physics, including classical mechanics, optics, electromagnetism, quantum mechanics, and quantum ' +
			'electrodynamics, they are used to study physical phenomena, such as the motion of rigid bodies. In computer' +
			' graphics, they are used to manipulate 3D models and project them onto a 2-dimensional screen. In probability' +
			' theory and statistics, stochastic matrices are used to describe sets of probabilities; for instance, they are' +
			' used within the PageRank algorithm that ranks the pages in a Google search.[5] Matrix calculus generalizes ' +
			'classical analytical notions such as derivatives and exponentials to higher dimensions. Matrices are used in ' +
			'economics to describe systems of economic relationships.';
		//document.getElementById('input').value = "gjxeitgnqhnj uz uttiowml aik zwnnu oh uhsk ywqxnkozqv fzkfll. ie kpmky sxuvvh fl jprszim, qgccaxqgg trualitgf uxcyghqvs, fvnqvs, vrykmrfsuogekomu, jurtncf mvibigity, uvw qlghbnm vrykmrfjsvtmzim, baep glm nsvj nw ltljs xayjowie pykhwfeeg, mcvh ry npx mfzcwg ow xcobd suxqxs. zt wwfplzyz zrrvbqvs, knyg trv ammw tf suvbplrubx 3d duxmes rtx xkoakwb mhvs ivmo r 2-jcuxnjoivtl jilmxn. zt jzhbrhctbtp zbmhrp ghl ltrzcamity, mbhcygmbbc dgnzbcvy uzx ujkx bh dvywzbbv yybl ow vlwuasofqmivy; zwk ieynigcv, zbmr aik oaxd nonpbn kny xtgvxuvd acmizbtys nptt ighsl tyk jizej oh i zofmfm lerxwp.[5] fakxcf vaciotns xkhmkacotml ccgmabcrr uvtlpzcktl eunqhnj yoka aj jyzbvrzcdxs rtx mqpftyvmirrm bh hzmbmk dzsyvliftm. uttiowml aik oaxd zt ykhnfsckl tf jyavrzhy arskkga hf viivhmzi lmeakoivlhzvm.";
	}
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
}

//Change onclick attribute of button, such that it passes the correct parameter value to the corresponding function
function updateDropdown(target) {
	document.getElementById(target + '-btn').setAttribute('onclick', 'execMethod(\'' + target + '\', [' + document.getElementById(target + '-input').value + '])');
}

//(On scroll event) checks if the mouse is scrolled up (deltaY = -100) or down (deltaY = 100) and changes execMethod params accordingly.
function scrollDropdown(target, e) {
	let length = parseInt(document.getElementById(target + "-input").value);
	if (e.deltaY < 0 && length <= document.getElementById(target + "-btn").max ) {
		document.getElementById(target + "-btn").setAttribute("onclick", 'execMethod(\'' + target + '\', [' + (length+1) + '])');
	}
	else if (e.deltaY > 0 && length >= document.getElementById(target + "-btn").min ) {
		document.getElementById(target + "-btn").setAttribute('onclick', 'execMethod(\'' + target + '\', [' + (length-1) + '])');
	}
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