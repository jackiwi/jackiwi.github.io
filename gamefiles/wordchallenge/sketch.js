var bg;
var ky;
var scoreboard;
var letterIMGS = [];
var buttonIMGS = [];
var hintIMGS = [];
var titleScreenIMGS = [];
var instructionPageIMGS = [];
var clockIMGS = [];
var scorescreenBG, bigScoreboard;
var lol, rt, rtBouncer, gamecorner;
var prototype;
var font;

var whichScreen;
var titleScreenButtons = [];
var gameplayButtons = [];
var instructionButtons = [];

var dictionary = [];
var sixLetterWords = [];
var wordBanksOBJ;
var topSix = ['0','0','0','0','0','0'];
var botSix = [];
var finalWord;
var submittedWord;
var submittedWords = [];
var bonusBoolean;
var newWordCounter;
var score, add3, add4, add5, add6;
var timer, minutes, seconds, idk;

function preload(){
	bg = loadImage('images/0-background.png');
	ky = loadImage('images/1-key.png');
	prototype = loadImage('images/prototype.png');
	scoreboard = loadImage('images/2-scoreboard.png');
	for (let i = 0; i < 26; i++){
		letterIMGS[i] = loadImage('images/letters/'+i+'.png');
	}
	for (let i = 0; i < 6; i++){
		buttonIMGS[i] = loadImage('images/buttons/'+i+'.png');
	}
	for (let i = 0; i < 8; i++){
		hintIMGS[i] = loadImage('images/hintBoxes/'+i+'.png');
	}
	for (let i = 0; i < 5; i++){
		titleScreenIMGS[i] = loadImage('images/titlescreen/'+i+'.png');
	}
	for (let i = 0; i < 12; i++){
		instructionPageIMGS[i] = loadImage('images/instructionScreen/'+i+'.png');
	}
	for (let i = 0; i < 5; i++){
		clockIMGS[i] = loadImage('images/clocks/'+i+'.png');
	}
	scorescreenBG = loadImage('images/3-scorescreenBG.png');
	bigScoreboard = loadImage('images/4-bigscoreboard.png');
	lol = loadImage('images/gratuitous-self-insert.png');
	rt = loadImage('images/RT.png');
	gamecorner = loadImage('images/gameovercorner.png');
	font = loadFont('resources/Jackiwi-Regular.ttf');
}

function setup() {
	createCanvas(720, 580);
	submittedWord = '0';
	score = 0;
	loadDictionaries();
	getNewWord();
	textFont(font);

	for (let i = 0; i < 3; i++){
		titleScreenButtons[i] = new Button(350,
																			250 + (i * 100) - (floor((i)/2) * 10),
																			titleScreenIMGS[i + 2]);
	}
	titleScreenButtons[1].x = 370;
	titleScreenButtons[2].x = 359;
	for (let i = 0; i < 6; i++){
		gameplayButtons[i] = new Button(350, 230, buttonIMGS[i]);
	}
	gameplayButtons[0].x = 619;	gameplayButtons[0].y = 263;
	gameplayButtons[1].x = 102;	gameplayButtons[1].y = 338;
	gameplayButtons[2].x = 610;	gameplayButtons[2].y = 338;
	gameplayButtons[3].x = 109;	gameplayButtons[3].y = 263;
	gameplayButtons[4].x = 109;	gameplayButtons[4].y = 263;
	gameplayButtons[5].x = 25;	gameplayButtons[5].y = 560;

	for (let i = 2; i < instructionPageIMGS.length; i++){
		instructionButtons[i-2] = new Button(350, 250, instructionPageIMGS[i]);
	}
	instructionButtons[0].x = 380;	instructionButtons[0].y = 180;
	instructionButtons[1].x =	360;	instructionButtons[1].y = 305;
	instructionButtons[2].x = 619;	instructionButtons[2].y = 263;
	instructionButtons[3].x = 102;	instructionButtons[3].y = 338;
	instructionButtons[4].x = 610;	instructionButtons[4].y = 338;
	instructionButtons[5].x = 109;	instructionButtons[5].y = 263;
	instructionButtons[6].x = 109;	instructionButtons[6].y = 263;
	instructionButtons[7].x = 25;		instructionButtons[7].y = 560;
	instructionButtons[8].x = 200;	instructionButtons[8].y = 515;
	instructionButtons[9].x = 62;		instructionButtons[9].y = 160;

	rtBouncer = new Bouncer(random(width),random(height),rt);

	minutes = "02";
	seconds = "00";
	whichScreen = 0;
}

function draw() {
	imageMode(CORNER);
	if (whichScreen == 0){
		titleScreen();
	}else if (whichScreen == 1){
		gameplay();
	}else if (whichScreen == 2){
		instructionPage();
	}else if (whichScreen == 3){
		infoPage();
	}else if (whichScreen == 4){
		gameOver();
	}else if (whichScreen == 5){
		scoreScreen();
	}
}

function titleScreen(){
	image(titleScreenIMGS[0],0,0);
	image(titleScreenIMGS[1],188,40);
	stroke(210,162,022);
	fill(255)
		.strokeWeight(4)
		.textSize(32)
		.textAlign(CENTER);
	text("BROUGHT BACK FROM THE DEAD",random(369,371),random(179,181));

	for (let i = 0; i < titleScreenButtons.length; i++){
		titleScreenButtons[i].mousedOver(mouseX,mouseY);
		titleScreenButtons[i].show();
	}
}

function gameplay(){
	image(bg,0,0);
	if (bonusBoolean){
		gameplayButtons[4].mousedOver(mouseX,mouseY);
		gameplayButtons[4].show();
	}
	else {
		let transp = map(newWordCounter, 0, 6, 40,255);
		tint(255,255,255,transp);
		if (newWordCounter > 5)
			gameplayButtons[3].mousedOver(mouseX,mouseY);
		gameplayButtons[3].show();
		noTint();
	}
	image(scoreboard,20,485);
	stroke(0);
	fill(255)
		.strokeWeight(8)
		.textSize(64)
		.textAlign(CENTER);
	text(score.toString(),190,555);
	drawHintBoxes();
	noStroke();
	fill(255);
	for (let i = 0; i < 6; i++){
		if (topSix[i] != '0'){
			image(ky,165+i*67,232);
			let chCode = getLetter(topSix[i]);
			image(letterIMGS[chCode],179+(i*67),244);
		}
		else {
			rect(165+i*67,240,53,53);
		}
		if (botSix[i] != '0'){
			image(ky,161 + (i * 67),306);
			let chCode = getLetter(botSix[i]);
			image(letterIMGS[chCode],175 + (i*67),318);
		}
	}
	for (let i = 0; i < 3; i++){
		gameplayButtons[i].mousedOver(mouseX,mouseY);
		gameplayButtons[i].show();
	}
	gameplayButtons[5].mousedOver(mouseX,mouseY);
	gameplayButtons[5].show();

	if ((minutes >= 2) || (minutes >= 1 && seconds > 30)){
		image(clockIMGS[0],32,100);
	}else if ((minutes.toString() == "01"
						&& seconds.toString() == "00") || (minutes >= 1 && seconds >= 0)){
		image(clockIMGS[1],32,100);
	}else if (minutes >= 0 && seconds > 30){
		image(clockIMGS[2],32,100);
	}else if (minutes >= 0 && seconds > 0){
		image(clockIMGS[3],32,100);
	}else{
		image(clockIMGS[4],32,100);
	}
	stroke(0);
	fill(255)
		.strokeWeight(8)
		.textSize(36)
		.textAlign(CENTER);
	text(minutes.toString() + ":" + seconds.toString(),74,203);
	if (minutes == 0 && seconds.toString() == "00"){
		gameplayButtons[2].x = 600;	gameplayButtons[2].y = 530;
		whichScreen = 4;
	}
}

function instructionPage(){
	var text1 = "HOVER", text2 = "\nto see controls!";
	//image(instructionPageIMGS[0],0,0);
	image(bg,0,0);
	image(instructionPageIMGS[1],50,25);
	for (let i = instructionButtons.length - 1; i >= 0; i--){
		instructionButtons[i].mousedOver(mouseX,mouseY);
		instructionButtons[i].show();
		if (instructionButtons[i].moused == true){
			switch(i){
				case 0:
						text1 = "WORD BANK";
						text2 = `Displays possible solutions. Shows up to 20 three letter`+
										` and four letter words, and up to 10 five letter and six`+
										` letter words.`;
						break;
				case 1:
						text1 = "KEYBOARD";
						text2 = "Use your keyboard to type words, or "+
										"use your mouse to click individual letters!";
						break;
				case 2:
						text1 = "DELETE : backspace";
						text2 = "\nRemoves the rightmost currently used letter.";
						break;
				case 3:
						text1 = "SHUFFLE : spacebar";
						text2 = "\nShuffles the currently unused letters.";
						break;
				case 4:
						text1 = "SUBMIT : enter";
						text2 = "\nSubmit the current word.";
						break;
				case 5:
						text1 = "NEXT : control";
						text2 = "\nStarts a new round with a new word.";
						break;
				case 6:
						text1 = "BONUS : control";
						text2 = "\nStarts a new round with a new word.";
						break;
				case 7:
						text1 = "EXIT : click!";
						text2 = "Return to the main menu. "+
										"This button actually works on this screen!";
						break;
				case 8:
						text1 = "SCOREBOARD";
						text2 = "Displays the score. I didn't really come up with a "+
										"sophisticated score calculating algorithm but ok";
						break;
				default:
						text1 = "TIMER";
						text2 = "it's a little buggy; i got lazy. give it like a second to "+
										"start counting down. earn more time by submitting words.";
			}
		}
	}
	fill(255,180);
	noStroke();
	rect(395,400,300,160,25);
	stroke(210,162,022);
	fill(255)
		.strokeWeight(4)
		.textSize(36)
		.textAlign(CENTER);
	text(text1,545,440);
	stroke(100);
	fill(255)
		.strokeWeight(3)
		.textSize(22);
	text(text2,400,450,300,160);
}

function infoPage(){
	image(instructionPageIMGS[0],0,0);
	rtBouncer.move();
	rtBouncer.show();
	gameplayButtons[5].mousedOver(mouseX,mouseY);
	gameplayButtons[5].show();

	stroke(210,162,022);
	let value1 = map(mouseX,0,width,0,255), value2 = map(mouseY,0,height,255,0);
	fill((value1+value2)/2,(value1+value2)/2,(value1+value2)/2)
		.strokeWeight(8)
		.textSize(142)
		.textAlign(CENTER);
	text("playfish games were my childhood",0,30, width, height);
}

function gameOver(){
	//image(titleScreenIMGS[0],0,0);
	image(gamecorner, 507,393);
	stroke(0);
	fill(255)
		.strokeWeight(24)
		.textSize(150)
		.textAlign(CENTER);
	text("GAME OVER!", 360,320);
	gameplayButtons[2].mousedOver(mouseX,mouseY);
	gameplayButtons[2].show();
}

function scoreScreen(){
	image(scorescreenBG,0,0);
	image(bigScoreboard,80,300);
	image(lol,450,40);
	stroke(0);
	fill(255)
		.strokeWeight(12)
		.textSize(96)
		.textAlign(CENTER);
	text(score.toString(), 360,420);
	strokeWeight(12);
	textSize(96);
	text("GOOD JOB.",240,560);
	stroke(210,162,022);
	fill(255)
		.strokeWeight(8)
		.textSize(36)
		.textAlign(CENTER);
	text("i didn't feel like incorporating the little word challenge girl"+
				" but here is a gratuitous depiction of myself giving u a "+
				"hearty thumbs up",70,40,360,400);
	gameplayButtons[2].mousedOver(mouseX,mouseY);
	gameplayButtons[2].show();
}

function drawHintBoxes(){
	fill(255)
		.strokeWeight(0)
		.textSize(19)
		.textAlign(LEFT);
	var word;
	var x = 145;
	for (let i = 0; i < wordBanksOBJ[finalWord][0].three.length; i++){
		if (checkWord(wordBanksOBJ[finalWord][0].three[i],submittedWords) != -1){
			image(hintIMGS[4],x + (floor(i / 10) * 65),10 + (i % 10 * 20));
			word = wordBanksOBJ[finalWord][0].three[i].toLocaleUpperCase();
			let temps = word.split('');
			word = temps.join("  ");
			text(word,x + 5 + (floor(i/10)*65),26+(i%10*20));
		}else{
			image(hintIMGS[0],x + (floor(i / 10) * 65),10 + (i % 10 * 20));
		}
	}
	if (wordBanksOBJ[finalWord][0].three.length <= 10){
		x = 210;
	}else {
		x = 275;
	}
	for (let i = 0; i < wordBanksOBJ[finalWord][0].four.length; i++){
		if (checkWord(wordBanksOBJ[finalWord][0].four[i],submittedWords) != -1){
			image(hintIMGS[5],x + (floor(i / 10) * 84),10 + (i % 10 * 20));
			word = wordBanksOBJ[finalWord][0].four[i].toLocaleUpperCase();
			let temps = word.split('');
			word = temps.join("  ");
			text(word,x + 5 + (floor(i/10)*84),26+(i%10*20));
		}else{
			image(hintIMGS[1],x + (floor(i / 10) * 84),10 + (i % 10 * 20));
		}
	}
	if (wordBanksOBJ[finalWord][0].four.length != 0){
		if (wordBanksOBJ[finalWord][0].four.length <= 10){
			x += 84;
		}else{
			x += 168;
		}
	}
	for (let i = 0; i < wordBanksOBJ[finalWord][0].five.length; i++){
		if (checkWord(wordBanksOBJ[finalWord][0].five[i],submittedWords) != -1){
			image(hintIMGS[6],x,10 + (i % 10 * 20));
			word = wordBanksOBJ[finalWord][0].five[i].toLocaleUpperCase();
			let temps = word.split('');
			word = temps.join("  ");
			text(word,x + 5,26+(i%10*20));
		}else{
			image(hintIMGS[2],x,10 + (i % 10 * 20));
		}
	}
	if (wordBanksOBJ[finalWord][0].five.length != 0){
		x += 102;
	}
	for (let i = 0; i < wordBanksOBJ[finalWord][0].six.length; i++){
		if (checkWord(wordBanksOBJ[finalWord][0].six[i],submittedWords) != -1){
			image(hintIMGS[7],x,10 + (i % 10 * 20));
			word = wordBanksOBJ[finalWord][0].six[i].toLocaleUpperCase();
			let temps = word.split('');
			word = temps.join("  ");
			text(word,x + 5,26+(i%10*20));
		}else{
			image(hintIMGS[3],x,10 + (i % 10 * 20));
		}
	}
}

function mouseClicked(){
	if (whichScreen == 0){
		if (titleScreenButtons[0].moused == true){
			getNewWord();
			score = 0;
			clearInterval(idk);
			seconds = "00";	minutes = "02";
			startTimer(120);
			whichScreen = 1;
		}else if (titleScreenButtons[1].moused == true){
			whichScreen = 2;
		}else if (titleScreenButtons[2].moused == true){
			whichScreen = 3;
		}
	}else if (whichScreen == 1){
		if (gameplayButtons[0].moused == true){
			pressedBACKSPACE();
		}else if (gameplayButtons[1].moused == true){
			pressedSPACEBAR();
		}else if (gameplayButtons[2].moused == true){
			pressedENTER();
		}else if ((gameplayButtons[3].moused == true
							|| gameplayButtons[4].moused == true)
							&& newWordCounter > 5){
			pressedCONTROL();
		}/*else if (mouseX >= 160 && mouseX <= 560
							&& mouseY >= 235 && mouseY <= 370){
			console.log("don't touch that");
		}*/else if (gameplayButtons[5].moused == true){
			gameplayButtons[2].x = 600;	gameplayButtons[2].y = 530;
			whichScreen = 4;
		}else if (mouseY >= 232 && mouseY <= 296){//topSix
			for (let j = 0; j < 6; j++){
				let xCoord = 165 + j*67;
				if (topSix[j] != '0'
						&& mouseX >= xCoord && mouseX <= xCoord + 61){
					for (let i = 0; i < 6; i++){
						if (botSix[i] == '0'){
							botSix[i] = topSix[j];
							topSix[j] = '0';
						}
					}
					if (j < 5 && topSix[j+1] != '0'){
						for (let k = j; k < 5; k++){
							topSix[k] = topSix[k+1];
							topSix[k+1] = '0';
						}
					}
				}
			}
		}else if (mouseY >= 306 && mouseY <= 370){//botSix
			for (let i = 0; i < 6; i++){
				let xCoord = 161 + i*67;
				if (botSix[i] != '0'
						&& mouseX >= xCoord && mouseX <= xCoord + 61){
							for (let j = 0; j < 6; j++){
								if (topSix[j] == '0'){
									topSix[j] = botSix[i];
									botSix[i] = '0';
									return;
								}
							}
				}
			}
		}
	}else if (whichScreen == 2){
		if (instructionButtons[7].moused == true){
			whichScreen = 0;
		}else if (instructionButtons[1].moused == true){
			console.log("what did i fuckin say. do u think ur funny?????");
		}
	}else if (whichScreen == 3){
		if (gameplayButtons[5].moused == true){
			whichScreen = 0;
		}
	}else if (whichScreen == 4){
		if (gameplayButtons[2].moused == true){
			whichScreen = 5;
		}
	}else if (whichScreen == 5){
		if (gameplayButtons[2].moused == true){
			gameplayButtons[2].x = 610;	gameplayButtons[2].y = 338;
			whichScreen = 0;
		}
	}
}

function keyTyped(){
	if (whichScreen == 1){
		for (let i = 0; i < 6; i++){
			if (key === botSix[i]){
				for (let j = 0; j < 6; j++){
					if (topSix[j] == '0'){
						topSix[j] = botSix[i];
						botSix[i] = '0';
						return;
					}
				}
			}
		}
	}
}

function pressedBACKSPACE(){
	for (let j = 5; j >= 0; j--){
		if (topSix[j] != '0'){
			for (let i = 0; i < 6; i++){
				if (botSix[i] == '0'){
					botSix[i] = topSix[j];
					topSix[j] = '0';
					return;
				}
			}
		}
	}
}

function pressedENTER(){
	if (topSix[0] == '0')
		return;
	for (let j = 0; j < 6; j++){
		if (topSix[j] == '0'){
			if (checkWord(submittedWord, dictionary) != -1){
				if ((submittedWords.length == 0) ||
						(submittedWords.length != 0
								&& checkWord(submittedWord, submittedWords) == -1)){
					console.log("good job");
					submittedWords.push(submittedWord);
					updateNewWordCounter();
					updateScore();
				}
			}else {
				console.log("nice try uwu");
			}
			submittedWord = '0';
			return;
		}else{
			for (let i = 0; i < 6; i++){
				if (botSix[i] == '0'){
					if (submittedWord == '0'){
						submittedWord = topSix[j];
					}
					else{
						submittedWord += topSix[j];
					}
					botSix[i] = topSix[j];
					topSix[j] = '0';
					break;
				}
			}
		}
	}
	if (checkWord(submittedWord, dictionary) != -1){
		if ((submittedWords.length == 0) ||
				(submittedWords.length != 0
						&& checkWord(submittedWord, submittedWords) == -1)){
			console.log("good job");
			submittedWords.push(submittedWord);
			updateNewWordCounter();
			updateScore();
		}
	}else {
		console.log("nice try nya");
	}
	submittedWord = '0';
}

function pressedSPACEBAR(){
	for (let i = 5; i >= 0; i--){
		let j = floor(random(0,6));
		let temp = botSix[i];
		botSix[i] = botSix[j];
		botSix[j] = temp;
	}
}

function pressedCONTROL(){
	if (newWordCounter > 5){
		getNewWord();
	}
}

function keyPressed(){
	if (whichScreen == 1){
		if (keyCode === BACKSPACE){
			pressedBACKSPACE();
		}else if (keyCode === ENTER || keyCode === RETURN){
			pressedENTER();
		}else if (keyCode === 32){
			pressedSPACEBAR();
		}else if (keyCode === CONTROL){
			pressedCONTROL();
		}
	}
}

function getLetter(ch){
	return (ch.charCodeAt(0) - 97);
}

function loadDictionaries(){
	var request = new XMLHttpRequest();
	request.open('GET','resources/enable_dictionary.txt',false);
	request.send();
	var textfileContent = request.responseText;
	dictionary = textfileContent.split('\n');

	request = new XMLHttpRequest();
	request.open('GET','resources/sixletterdictionary.txt',false);
	request.send();
	textfileContent = request.responseText;
	sixLetterWords = textfileContent.split('\n');

	request = new XMLHttpRequest();
	request.open('GET','resources/wordBanks.txt',false);
	request.send();
	wordBanksOBJ = JSON.parse(request.responseText);
}

function checkWord(word, dict){
	var index = dict.findIndex(function(element){
		return element === word;
	});
	return index;
}

function getNewWord(){
	 finalWord = sixLetterWords[Math.floor(Math.random()*sixLetterWords.length)];
	 topSix = ['0','0','0','0','0','0'];
	 botSix = finalWord.split('');
	 for (let i = 5; i >= 0; i--){
		 let j = floor(random(0,6));
		 let temp = botSix[i];
		 botSix[i] = botSix[j];
		 botSix[j] = temp;
	 }
	 submittedWords = [];
	 bonusBoolean = false;
	 newWordCounter = 0;
	 add3 = 75;
	 add4 = 120;
	 add5 = 220;
	 add6 = 350;
}

function updateNewWordCounter(){
	if (submittedWord.length == 3){
		newWordCounter += 1;
	}else if (submittedWord.length == 6){
		newWordCounter = 6;
	}else {
		newWordCounter += 2;
	}
}

function updateScore(){
	if (submittedWord.length == 3){
		score += add3;
		add3 = floor(add3*1.1);
	}else if (submittedWord.length == 4){
		score += add4;
		add4 = floor(add4*1.1);
		//seconds += 2;
		timer += 2;
	}else if (submittedWord.length == 5){
		score += add5;
		add5 = floor(add5*1.2);
		//seconds += 3;
		timer += 3;
	}else if (submittedWord.length == 6){
		score += add6;
		add6 = floor(add6*1.3);
		bonusBoolean = true;
		//seconds += 3;
		timer += 3;
	}
	/*if (seconds >= 60){
		minutes++;
		seconds = seconds - 60;
	}*/
}

class Button{
	constructor(x = 0,y = 0, img){
		this.x = x;
		this.y = y;
		this.saveX = x;
		this.saveY = y;
		this.img = img;
		this.w = img.width;
		this.h = img.height;
		this.moused = false;
	}

	mousedOver(mX,mY){
		if (mX >= this.x - (this.w/2) && mX <= this.x + (this.w/2)
				&& mY >= this.y - (this.h/2) && mY <= this.y + (this.h/2)){
			this.h = this.img.height * 1.2;
			this.w = this.img.width * 1.2;
			this.moused = true;
		}else{
			this.h = this.img.height;
			this.w = this.img.width;
			this.moused = false;
		}
	}

	show(){
		imageMode(CENTER);
		image(this.img,this.x,this.y, this.w, this.h);
		imageMode(CORNER);
	}
}

class Bouncer{
	constructor(x = 0, y = 0, img){
		this.x = x;
		this.y = y;
		this.img = img;
		this.dx = 2;
		this.dy = 2;
	}

	move(){
		this.x += this.dx;
		this.y += this.dy;
		if (this.x >= width || this.x <= 0){
			this.dx *= -1;
		}
		if (this.y >= height || this.y <= 0){
			this.dy *= -1;
		}
	}

	show(){
		imageMode(CENTER);
		image(this.img,this.x,this.y);
		imageMode(CORNER);
	}
}

function startTimer(duration) {
		timer = duration;
    idk = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (--timer < 0) {
					//whichScreen = 4;
					clearInterval(idk);
        }
    }, 1000);
}
