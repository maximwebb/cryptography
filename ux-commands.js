let cryptType = 'encrypt';

//Attaches event handlers to various inputs
function setup() {

	//On scroll of mouse wheel while 'split-input' is focused call scrollDropdown with target 'split'
	document.getElementById("splitstr-input").addEventListener('wheel', function(e) {
		scrollDropdown("splitstr", e);
	});
	//On change to the 'split-input' call changeDropdown with target 'split'
	document.getElementById('splitstr-input').addEventListener('change', function() {
		changeDropdown('splitstr');
	});

	//On scroll of mouse wheel while 'split-input' is focused call scrollDropdown with target 'split'
	document.getElementById("cshift-input").addEventListener('wheel', function(e) {
		scrollDropdown("cshift", e);
	});
	//On change to the 'split-input' call changeDropdown with target 'split'
	document.getElementById('cshift-input').addEventListener('change', function() {
		changeDropdown('cshift');
	});
}

//Enters input text, and executes a specified command on it.
function execMethod(command, params = []) {
	inputText = document.getElementById('input').value;
	let outputText = '';
	if (command === 'freqan') {
		if (document.getElementById('graph-checkbox').checked) barChart(freqAnalysis(inputText), '', 'Frequency %');
		else document.getElementById('output').value = printFreqArr(freqAnalysis(inputText));
	}
	else if (command === 'rempunc') {
		document.getElementById('output').value = removePunc(inputText);
	}
	else if (command === 'splitstr') {
		document.getElementById('output').value = splitString(inputText, params[0]);
	}
	else if (command === 'cshift') {
		document.getElementById('output').value = caesarShift(inputText, 'encrypt', params[0]);
	}
}

//Change onclick attribute of button, such that it passes the correct parameter value to the corresponding function
function changeDropdown(target) {
	document.getElementById(target + '-btn').setAttribute('onclick', 'execMethod(\'' + target + '\', [' + document.getElementById(target + '-input').value + '])');
}

//Fires on scroll event, and checks if the mouse is scrolled up (deltaY = -100) or down (deltaY = 100) and changes accordingly.
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

///Displays a bar chart
function barChart(data, xAxis, yAxis) {
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