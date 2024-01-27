document.addEventListener('DOMContentLoaded', function () {
    const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
    let isJumping = false;

    const jump = () => {
        if (!isJumping) {
            mario.classList.add('jump');
            isJumping = true;

            setTimeout(() => {
                mario.classList.remove('jump');
                isJumping = false;
            }, 500);
        }
    };

    const loop = setInterval(() => {

        const pipePosition = pipe.offsetLeft
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')
        
        if (pipePosition <= 145 && pipePosition>0 && marioPosition < 110) {

            pipe.style.animation = 'none'
            pipe.style.left = `${pipePosition}px`

            mario.style.animation = 'none'
            mario.style.bottom = `${marioPosition +20}px`

            mario.src = 'img-mario/game-over.png'
            mario.style.width = '100px'
            mario.style.marginLeft = '40px'

            clearInterval(loop)
        }

    }, 10)

    document.addEventListener('keydown', jump);

    document.addEventListener('touchstart', jump)
});
