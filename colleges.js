var univArray = new Array(
		{name: "Stanford University", nickname: "Stanford", ownership: "private", SATh: 1570, SATl: 1380, tuition: 44757},
		{name: "University of California, Berkeley", nickname: "UC Berkeley", ownership: "public", SATh: 1500, SATl: 1250, tuition: 13844},
		{name: "University of California, Santa Cruz", nickname: "UC Santa Cruz", ownership: "public", SATh: 1280, SATl: 1000, tuition: 13398},
		{name: "San Francisco State University", nickname: "SFSU", ownership: "public", SATh: 1110, SATl: 880, tuition: 6468},
		{name: "San Jose State University", nickname: "SJSU", ownership: "public", SATh: 1160, SATl: 880, tuition: 9496},
		{name: "Sonoma State University", nickname: "Sonoma State", ownership: "public", SATh: 1090, SATl: 880, tuition: 7276},
		{name: "California State University, East Bay", nickname: "CalState East Bay", ownership: "public", SATh: 1010, SATl: 800, tuition: 6550, room: 6435},
		{name: "University of San Francisco", nickname: "USF", ownership: "private", SATh: 1270, SATl: 1070, tuition: 41450},
		{name: "Santa Clara University", nickname: "SCU", ownership: "private", SATh: 1380, SATl: 1190, tuition: 43812},
		{name: "Mills College", nickname: "Mills College", ownership: "private", SATh: 1250, SATl: 1040, tuition: 42918}
		);

var tableHeaders = ['Name', 'SAT High', 'SAT Low', 'Tuition'];
var updatedArray = [];
function generateTable(myArray) {
	var containerTable = document.getElementById("datasearchtables");
	var newTable = document.createElement("table");
	var tableHeader = document.createElement("thead");
	for (var k = 0; k < tableHeaders.length; k++) {
		var newTableHeader = document.createElement("td");
		var newTableHeaderData = document.createTextNode(tableHeaders[k]);
		newTableHeader.appendChild(newTableHeaderData);
		tableHeader.appendChild(newTableHeader);
	}
	var tableBody = document.createElement("tbody");
	for (var i = 0; i < myArray.length; i++) {
		var newRow = document.createElement("tr");
		for (var key in myArray[i]) {
			if (key === 'nickname' || key === 'SATh' || key === 'SATl' || key === 'tuition') {
				var newCell = document.createElement("td");
				var newCellText = document.createTextNode(myArray[i][key]);
				newCell.appendChild(newCellText);
				newRow.appendChild(newCell);
			}
		}
		tableBody.appendChild(newRow);
	}
	newTable.appendChild(tableHeader);
	newTable.appendChild(tableBody);
	containerTable.appendChild(newTable);
}

window.onload = generateTable(univArray);

function getPrivateOrPublic() {
	var privateOrPublic;
	if (document.getElementById("publicschool").checked){
		privateOrPublic = 'public';
	} else if(document.getElementById("privateschool").checked){
		privateOrPublic = 'private';
	} else if (document.getElementById("dontcare").checked){
		privateOrPublic ='dontcare';
	} else {
		privateOrPublic ='empty';
	}
	return privateOrPublic;
}

function getMaxTuition(){
	var maxTuition;
	if (document.getElementById("maxtui").value==="") {
		maxTuition = 'empty';
	} else {
		maxTuition = parseFloat(document.getElementById("maxtui").value);
	}
	return maxTuition;
}

function getMaxhSAT(){
	var maxhSAT;
	if (document.getElementById("maxhSAT").value==="") {
		maxhSAT = 'empty';
	} else {
		maxhSAT = parseFloat(document.getElementById("maxhSAT").value);
	}
	return maxhSAT;

}

function getMinLoSAT(){
	var minLoSAT;
	if (document.getElementById("minlSAT").value==="") {
		minLoSAT = 'empty';
	} else {
		minLoSAT = parseFloat(document.getElementById("minlSAT").value);
	}
	return minLoSAT;
}

function updateTable() {
	updatedArray = [];
	var privateOrPublic = getPrivateOrPublic();
	var maxTuition = getMaxTuition();
	var maxhSAT = getMaxhSAT();
	var minLoSAT = getMinLoSAT();
	if (isNaN(maxTuition)&& maxTuition !='empty' || isNaN(minLoSAT)&&minLoSAT!='empty' || isNaN(maxhSAT) && maxhSAT!='empty') {
		window.alert("Please enter valid numbers in tuition and SAT fields or leave them blank");
		return;
	}
	if ((privateOrPublic ==='dontcare'|| privateOrPublic ==='empty') && maxTuition === 'empty' 
		&& maxhSAT === 'empty' && minLoSAT === 'empty') {
		document.getElementsByTagName("table")[0].remove();
		generateTable(univArray);
		return;
	} else {
		for (var k = 0; k < univArray.length; k++) {
			if ((univArray[k]['ownership'] === privateOrPublic || privateOrPublic === 'dontcare' || privateOrPublic ==='empty') && 
				(maxTuition ==='empty' || maxTuition >= univArray[k]['tuition']) && 
				(minLoSAT === 'empty' || minLoSAT <= univArray[k]['SATl']) && 
				(maxhSAT ==='empty' || maxhSAT >= univArray[k]['SATh'])) {
				updatedArray.push(univArray[k]);

			} else {
				continue;
			}
		}
	}
	document.getElementsByTagName("table")[0].remove();
	generateTable(updatedArray);
}
	



