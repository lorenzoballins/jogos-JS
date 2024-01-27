document.addEventListener('DOMContentLoaded', function () {
    const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
    const clouds = document.querySelector('.clouds');
    const backaudio = document.querySelector('.back-audio');
    const score = document.querySelector(".score--value");
    const finalScore = document.querySelector(".final-score > span");
    const menu = document.querySelector(".menu-screen");
    const buttonPlay = document.querySelector(".btn-play");

    const audio = new Audio("assets/jump-small.mp3");
    const audio1 = new Audio("assets/mariodie.mp3");

    let isJumping = false;
    let gameLoop;
    let isAudioPlaying = true;

    const toggleAudio = () => {
        if (isAudioPlaying) {
            backaudio.pause();
        } else {
            backaudio.play();
        }
        isAudioPlaying = !isAudioPlaying;
    };

    backaudio.addEventListener('ended', () => {
        // Reinicia a reprodução quando a música termina
        backaudio.play();
    });

    document.addEventListener('keydown', (event) => {
        // Se a tecla 'M' for pressionada, toggle o áudio
        if (event.key === 'M' || event.key === 'm') {
            toggleAudio();
        }
    });

    const jump = () => {
        if (!isJumping) {
            audio.play();
            mario.classList.add('jump');
            isJumping = true;

            setTimeout(() => {
                mario.classList.remove('jump');
                isJumping = false;
            }, 500);
        }
    };

    const resetGame = () => {
        menu.style.display = "none";
        pipe.style.animation = 'pipe-animation 1.5s infinite linear';
        pipe.style.left = '';
        mario.style.animation = '';
        mario.style.bottom = '0';
        mario.src = 'img-mario/mario.gif';
        mario.style.width = '180px';
        mario.style.marginLeft = '0';
        score.innerText = '00';
        clouds.style.animationPlayState = 'running';
        backaudio.play();

        gameLoop = setInterval(() => {
            const pipePosition = pipe.offsetLeft;
            const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

            if (pipePosition <= 145 && pipePosition > 0 && marioPosition < 110) {
                backaudio.pause();
                audio.pause();
                audio1.play();

                pipe.style.animation = 'none';
                pipe.style.left = `${pipePosition}px`;

                mario.style.animation = 'none';
                mario.style.bottom = `${marioPosition}px`;

                mario.src = 'img-mario/game-over.png';
                mario.style.width = '100px';
                mario.style.marginLeft = '40px';

                menu.style.display = "flex";
                finalScore.innerText = score.innerText;
                clouds.style.animationPlayState = 'paused';

                clearInterval(gameLoop);
            }
        }, 10);
    }; 
        
    const checkCollision = () => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 145 && pipePosition > 0 && marioPosition < 110) {
            backaudio.pause();
            audio.pause();
            audio1.play();

            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition + 5}px`;

            mario.src = 'img-mario/game-over.png';
            mario.style.width = '100px';
            mario.style.marginLeft = '40px';

            menu.style.display = "flex";
            finalScore.innerText = score.innerText;
            clouds.style.animationPlayState = 'paused';

            clearInterval(gameLoop);
        }
    };

    document.addEventListener('keydown', jump);
    document.addEventListener('touchstart', jump);

    buttonPlay.addEventListener("click", resetGame);

    setInterval(checkCollision, 10);

    resetGame();
});