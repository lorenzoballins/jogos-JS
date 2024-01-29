const grid = document.querySelector('.grid');
const menu = document.querySelector('.menu-screen');
const buttonPlay = document.querySelector('.btn-play');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
let firstCard = '';
let secondCard = '';

let meuAudio = document.querySelector('.meuAudio');
meuAudio.volume = 0.2;



const characters = [
    'beth', 'jerry', 'jessica', 'meeseeks', 'morty',
    'pessoa-passaro', 'pickle-rick', 'scroopy', 'summer', 'rick'
];

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        setTimeout(() => {
            alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}s`);
            menu.style.display = 'flex';
            gameActive = false;
        }, 1000);
    }
};

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-characters');
    const secondCharacter = secondCard.getAttribute('data-characters');

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 400);
    }
};

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
};

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../img-memory/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-characters', character);

    return card;
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
};

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = shuffleArray(duplicateCharacters);

    duplicateCharacters.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });

    meuAudio.play()
};

window.onload = () => {
    const playerName = localStorage.getItem('player');
    spanPlayer.innerHTML = playerName;
    startTimer();
    loadGame();
};

const resetTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
    timer.innerHTML = '0';
};

const resetGame = () => {
    menu.style.display = 'none';
    grid.innerHTML = '';

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.remove('disabled-card'));

    const revealedCards = document.querySelectorAll('.reveal-card');
    revealedCards.forEach(card => card.classList.remove('reveal-card'));

    firstCard = '';
    secondCard = '';

    buttonPlay.disabled = true;

    resetTimer();
    loadGame();

    meuAudio.pause();
    meuAudio.currentTime = 0;

    setTimeout(() => {
        meuAudio.play();
    }, 100);

   // Agora, após 2 segundos, habilita o botão novamente
   setTimeout(() => {
    // Habilita o botão após 2 segundos
    buttonPlay.disabled = false;
}, 2000);

};

// Remova qualquer EventListener anterior
buttonPlay.removeEventListener('click', resetGame);

// Adicione o novo EventListener
buttonPlay.addEventListener('click', resetGame);