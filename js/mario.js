document.addEventListener('DOMContentLoaded', function () {
    const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
    const clouds = document.querySelector('.clouds');
    const backaudio = document.querySelector('.back-audio');
    const score = document.querySelector(".score--value");
    const finalScore = document.querySelector(".final-score > span");
    const menu = document.querySelector(".menu-screen");
    const buttonPlay = document.querySelector(".btn-play");
    const audio = new Audio("../assets/jump-small.mp3");
    const audio1 = new Audio("../assets/mariodie.mp3");

    let isJumping = false;
    let gameLoop;
    let isAudioPlaying = true;
    let isGameRunning = false; // Adicionada uma flag para verificar se o jogo está em execução.

    const incrementScore = () => {
        score.innerText = +score.innerText + 10
    }

    pipe.addEventListener('animationiteration', incrementScore); // Adiciona um ouvinte para a iteração da animação do cano

    const jump = () => {
        if (!isJumping && isGameRunning) { // Verifica se não está pulando e se o jogo está em execução.
            audio.play();
            mario.classList.add('jump');
            isJumping = true;

            const marioBottom = +window.getComputedStyle(mario).bottom.replace('px', '');
            const pipeTop = 200; // Ajuste este valor para a posição vertical do topo do cano
            const pipeBottom = pipeTop + 180; // Ajuste este valor para a posição vertical do fundo do cano

            // Verifica se o Mario está entre o topo e o fundo do cano
            if (marioBottom > pipeTop && marioBottom < pipeBottom) {
                incrementScore();
            }


            setTimeout(() => {
                mario.classList.remove('jump');
                isJumping = false;
            }, 500);
        }
    };

    const resetGame = () => {
        menu.style.display = "none";
        pipe.style.animation = '';
        pipe.style.left = '';
        mario.style.animation = '';
        mario.style.bottom = '0';
        mario.src = '../img-mario/mario.gif';
        mario.style.width = '180px';
        mario.style.marginLeft = '0';
        score.innerText = '00';
        clouds.style.animationPlayState = 'running';
        backaudio.play();
    
        isGameRunning = true; // Define que o jogo está em execução.

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

                mario.src = '../img-mario/game-over.png';
                mario.style.width = '100px';
                mario.style.marginLeft = '40px';

                setTimeout(() =>{
                    menu.style.display = "flex";
                finalScore.innerText = score.innerText;
                clouds.style.animationPlayState = 'paused';

                isGameRunning = false; // Define que o jogo não está mais em execução.

                clearInterval(gameLoop);
                },2000)
                
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

            mario.src = '../img-mario/game-over.png';
            mario.style.width = '100px';
            mario.style.marginLeft = '40px';
            setTimeout(() =>{
                menu.style.display = "flex";
                finalScore.innerText = score.innerText;
                clouds.style.animationPlayState = 'paused';
    
                isGameRunning = false; // Define que o jogo não está mais em execução.
    
                clearInterval(gameLoop);
            },2000)
           
        }
    };

    document.addEventListener('keydown', jump);
    document.addEventListener('touchstart', jump);

    buttonPlay.addEventListener("click", resetGame);

    setInterval(checkCollision, 10);

    resetGame();
}); 