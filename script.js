const typingText = document.querySelector('.typing-text p');
const inputField = document.querySelector('.input-field');
const resultTime = document.querySelector('.time span');
const resultMistake = document.querySelector('.mistake span');
const resultCPM = document.querySelector('.cpm span');
const tryAgainButton = document.querySelector('button');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

function loadParagraph() {
    const paragraphs = [
        "Coding is an art form requiring creativity and logic.",
        "Programmers solve problems using code and innovation.",
        "The future belongs to those who create it.",
        // Add more sentences as needed
    ];

    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    for (const char of paragraphs[randomIndex]) {
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
}

function updateTime() {
    timeLeft--;
    resultTime.textContent = timeLeft + ' s';

    if (timeLeft === 0) {
        clearInterval(timer);
        inputField.disabled = true;
        tryAgainButton.style.display = 'block';
        calculateCPM();
    }
}

function calculateCPM() {
    const totalChars = typingText.textContent.length;
    const cpm = Math.floor((totalChars / maxTime) * 60);
    resultCPM.textContent = cpm;
}

function handleTyping() {
    if (!isTyping) {
        isTyping = true;
        timer = setInterval(updateTime, 1000);
    }

    const char = typingText.querySelectorAll('span')[charIndex];
    const typedChar = inputField.value.charAt(charIndex);

    if (char && char.textContent === typedChar) {
        char.classList.add('correct');
    } else {
        mistakes++;
        resultMistake.textContent = mistakes;
        char.classList.add('incorrect');
    }

    charIndex++;

    if (charIndex === typingText.textContent.length) {
        clearInterval(timer);
        inputField.disabled = true;
        tryAgainButton.style.display = 'block';
        calculateCPM();
    }
}

function resetGame() {
    inputField.value = '';
    inputField.disabled = false;
    tryAgainButton.style.display = 'none';
    timeLeft = maxTime;
    charIndex = 0;
    mistakes = 0;
    resultTime.textContent = timeLeft + ' s';
    resultMistake.textContent = mistakes;
    resultCPM.textContent = '0';
    isTyping = false;
    loadParagraph();
}

inputField.addEventListener('input', handleTyping);
tryAgainButton.addEventListener('click', resetGame);

loadParagraph();
