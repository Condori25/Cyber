let voltar = 0;
let chave1 = null;
let chave2 = null;
let primeiroResultado = null;
let segundoResultado = null;
let movimento = 0;
let certos = 0;
let tempo = false;
let timer = 0;
let temporeal;

let Mostrarmovimentos = document.getElementById('Move');
let Mostrarcertos = document.getElementById('Acertos');
let Mostrartempo = document.getElementById('t-restante');
let progressBar = document.getElementById('progress-bar');
let motivationalText = document.getElementById('motivational-text');

let numeros = [
    1, 1,
    2, 2,
    3, 3,
    4, 4,
    5, 5,
    6, 6,
    7, 7,
    8, 8
];

numeros = numeros.sort(() => Math.random() - 0.5);

function contarTempo() {
    temporeal = setInterval(() => {
        timer++;
        Mostrartempo.innerHTML = `Tempo : ${timer} Segundos`;
    }, 1000);
}

function finalizarJogo(playerName) {
    clearInterval(temporeal);

    if (playerName) {
        localStorage.setItem('tempo', timer);
    }

    fadeOutContent();
}

function desvirarBotao(botao) {
    botao.classList.add('flip');

    setTimeout(() => {
        botao.classList.remove('flip');
    }, 500);
}

function revelarCarta(carta) {
    carta.classList.add('reveal');

    setTimeout(() => {
        carta.classList.remove('reveal');
    }, 500);
}

function atualizarBarraDeProgresso() {
    const porcentagem = (certos / 8) * 100;
    progressBar.style.width = `${porcentagem}%`;
}

function tirar(id) {

    if (!tempo) {
        contarTempo();
        tempo = true;
    }

    voltar++;

    if (voltar === 1) {

        chave1 = document.getElementById(id);
        primeiroResultado = numeros[id];

        revelarCarta(chave1);

        chave1.innerHTML = `<img src="${primeiroResultado}.png" alt="">`;

        chave1.disabled = true;

    } else if (voltar === 2) {

        chave2 = document.getElementById(id);
        segundoResultado = numeros[id];

        revelarCarta(chave2);

        chave2.innerHTML = `<img src="${segundoResultado}.png" alt="">`;

        chave2.disabled = true;

        movimento++;

        Mostrarmovimentos.innerHTML = `Movimentos: ${movimento}`;

        if (primeiroResultado === segundoResultado) {

            voltar = 0;
            certos++;

            Mostrarcertos.innerHTML = `Certos: ${certos}`;

            atualizarBarraDeProgresso();

            if (certos === 8) {

                const playerName = localStorage.getItem('currentPlayer');

                finalizarJogo(playerName);
            }

        } else {

            desvirarBotao(chave1);
            desvirarBotao(chave2);

            setTimeout(() => {

                chave1.innerHTML = '';
                chave2.innerHTML = '';

                chave1.disabled = false;
                chave2.disabled = false;

                voltar = 0;

            }, 800);
        }
    }
}

const startButton = document.getElementById('start-button');

if (startButton) {

    startButton.addEventListener('click', () => {

        const playerName = localStorage.getItem('currentPlayer');

        if (!playerName) {

            alert('Por favor, faça login antes de iniciar o jogo.');

            return;
        }
    });
}

function fadeOutContent() {

    const mainContent = document.querySelector('main');

    mainContent.classList.add('fade-out');

    setTimeout(() => {

        document.body.style.backgroundColor = 'black';

        motivationalText.classList.add('fade-in');
        motivationalText.classList.add('show');

        motivationalText.style.display = 'block';

        setTimeout(() => {

            motivationalText.classList.remove('fade-in');
            motivationalText.classList.add('fade-out');

            setTimeout(() => {

                motivationalText.style.display = 'none';

                document.getElementById('final-time').textContent = timer;
                document.getElementById('final-movements').textContent = movimento;

                const finalLayout = document.getElementById('final-layout');

                finalLayout.classList.add('fade-in');
                finalLayout.style.display = 'flex';

                setTimeout(() => {

                    finalLayout.classList.remove('fade-in');

                }, 500);

            }, 500);

        }, 5000);

    }, 500);
}