// div id to url map
var mapCards = {};
//url to div id map
var mapImages ={};
var countCardsTurned = 0;
// url of cardsTurned
var cardsTurned =[];
var cardsMatched = {'card1': false, 'card2': false, 'card3': false, 'card4': false, 'card5': false, 'card6': false};

function arrangeCards(){
	var cardDatabase = ['1clubs.png','1hearts.png', '2clubs.png', '2hearts.png','3clubs.png','3hearts.png'];
	var counter = 1;
	while(cardDatabase.length > 0) {
		var position = Math.floor(Math.random() * (cardDatabase.length - 0)) + 0;
		var key = 'card'+ counter.toString();
		mapCards[key] = cardDatabase[position];
		counter++;
		mapImages[cardDatabase[position]] = key;
		// removes one element at position "position"
		cardDatabase.splice(position,1);
	}
}

function displayCard(card){
	if (document.getElementById(card).itemprop === 'disabled') {
		return;
	}
	var imageUrl = mapCards[card];
    document.getElementById(card).style.backgroundImage = "url("+imageUrl+")";
    countCardsTurned++;
    cardsTurned.push(imageUrl);
    if (countCardsTurned === 2) {
    	for (var otherCard in mapCards) {
    		// if url of image of the card not included in the cards turned, disable them
			if (!cardsTurned.includes(mapCards[otherCard])) {
				document.getElementById(otherCard).itemprop ='disabled';
			}
		}
		if (cardsTurned[0].charAt(0) == cardsTurned[1].charAt(0)) {
			cardsMatched[mapImages[cardsTurned[0]]]=true;
			cardsMatched[mapImages[cardsTurned[1]]]=true;
			countCardsTurned = 0;
			setTimeout(function(){makeCardsDisappearEnable();}, 1500);
			cardsTurned=[];
		} else {
			setTimeout(function(){enableAndFlipBack();}, 1500);
		}
	}
}

function enableAndFlipBack() {
	for (card in mapCards) {
		if (!cardsMatched[card]) {
			document.getElementById(card).style.backgroundImage = "url(back.png)";
			document.getElementById(card).itemprop ='enabled';
		}
	}
	cardsTurned =[];
	countCardsTurned = 0;
}

function makeCardsDisappearEnable(){
	for (var card in cardsMatched) {
		if (cardsMatched[card]){
			document.getElementById(card).style.backgroundImage="url()";
			document.getElementById(card).itemprop ='disabled';
		} else {
			document.getElementById(card).itemprop ='enabled';
		}
		cardsTurned =[];
		countCardsTurned = 0;
	}
}

function resetGame() {
	mapCards = {};
	mapImages = {};
	countCardsTurned=0;
	cardsTurned=[];
	cardsMatched = {'card1': false, 'card2': false, 'card3': false, 'card4': false, 'card5': false, 'card6': false};
	arrangeCards();
	for (var card in mapCards) {
		document.getElementById(card).style.backgroundImage = "url(back.png)";
		document.getElementById(card).itemprop ='enabled';

	}
}
