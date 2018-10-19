var inputText = "";
function setup() {
	document.getElementById('input').addEventListener('keydown', function(e) {
		if (e.keyCode === 13) {
			enterInput();
		}
	});
}

var re;

function enterInput() {
	inputText = document.getElementById('input').value;

	re = new RegExp(document.getElementById('input').value, 'g');
	verifyPostCode('Something. Then with something else, you might! Say  that this is a weird sentence??...(no)');
}

//var re = /\d{2}/;


function verifyPostCode(str) {
	var arr = str.replace(re, '');
	console.log(arr[0]);
}

function removeSpace(str) {
	//return
}