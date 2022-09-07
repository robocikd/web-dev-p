const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const heading1 = document.querySelector('h1');

function getDiceNumber() {
	return Math.floor(Math.random() * 6 + 1);
}

const num1 = getDiceNumber();
const num2 = getDiceNumber();

function setHeadingText(num1, num2) {
	if (num1 > num2) {
		heading1.innerText = '🚩Player 1 Wins!';
	} else if (num1 < num2) {
		heading1.innerText = 'Player 2 Wins!🚩';
	} else {
		heading1.innerText = 'Draws!';
	}
}

function setSrc() {
	const src1 = `./images/dice${num1}.png`;
	const src2 = `./images/dice${num2}.png`;
	img1.setAttribute('src', src1);
	img2.setAttribute('src', src2);
}

function refresh() {
	setSrc();
	setHeadingText(num1, num2);
}

refresh();
