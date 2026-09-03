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
let progressBar = document.getElementById('progress-bar'); // Seleciona a barra de progresso
let motivationalText = document.getElementById('motivational-text'); // Seleciona o texto de motivação

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
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
        localStorage.setItem(`tempo`, timer);
    }
    fadeOutContent(); // Chama a função de fade-out
}

function desvirarBotao(botao) {
    botao.classList.add('flip'); // Adiciona a classe para animação
    setTimeout(() => {
        botao.classList.remove('flip'); // Remove a classe após a animação
    }, 500); // Duração da animação
}

function revelarCarta(carta) {
    carta.classList.add('reveal'); // Adiciona a classe para efeito de fade
    setTimeout(() => {
        carta.classList.remove('reveal'); // Remove a classe após o fade
    }, 500); // Tempo de duração do fade (500ms)
}

function atualizarBarraDeProgresso() {
    const porcentagem = (certos / 8) * 100; // Calcula a porcentagem de acertos
    progressBar.style.width = `${porcentagem}%`; // Atualiza a largura da barra de progresso
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
        revelarCarta(chave1); // Revela a carta com fade
        chave1.innerHTML = `<img src="/images/${primeiroResultado}.jpeg" alt ="">`;
        chave1.disabled = true;
    } else if (voltar === 2) {
        chave2 = document.getElementById(id);
        segundoResultado = numeros[id];
        revelarCarta(chave2); // Revela a carta com fade
        chave2.innerHTML = `<img src="/images/${segundoResultado}.jpeg" alt ="">`;
        chave2.disabled = true;
        movimento++;
        Mostrarmovimentos.innerHTML = `Movimentos: ${movimento}`;

        if (primeiroResultado === segundoResultado) {
            voltar = 0;
            certos++;
            Mostrarcertos.innerHTML = `Certos:  ${certos}`;
            atualizarBarraDeProgresso(); // Atualiza a barra de progresso

            if (certos === 8) {
                const playerName = localStorage.getItem('currentPlayer');
                finalizarJogo(playerName);
            }
        } else {
            // Chamar a função de desvirar os botões com animação
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

// Lógica para iniciar o jogo ao clicar em um botão ou outra ação
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
    const playerName = localStorage.getItem('currentPlayer');

    if (!playerName) {
        alert('Por favor, faça login antes de iniciar o jogo.');
        return;
    }

    // Aqui você pode iniciar o jogo, por exemplo, mostrando o tabuleiro e permitindo interações
});

function fadeOutContent() {
    const mainContent = document.querySelector('main');
    mainContent.classList.add('fade-out'); // Adiciona a classe de fade-out
    setTimeout(() => {
        document.body.style.backgroundColor = 'black'; // Altera a cor de fundo para preto

        motivationalText.classList.add('fade-in');
        motivationalText.classList.add('show'); // Mostra o texto
        motivationalText.style.display = 'block'; // Exibe o texto motivacional

        setTimeout(() => {
            motivationalText.classList.remove('fade-in');
            motivationalText.classList.add('fade-out'); // Adiciona a animação de fade-out

            setTimeout(() => {
                motivationalText.style.display = 'none'; // Esconde o texto motivacional

                // Atualiza os dados de tempo e movimentos
                document.getElementById('final-time').textContent = timer; // Atualiza o tempo
                document.getElementById('final-movements').textContent = movimento; // Atualiza movimentos
                
                // Mostra o layout final com fade
                const finalLayout = document.getElementById('final-layout');
                finalLayout.classList.add('fade-in'); // Adiciona a classe de fade-in
                finalLayout.style.display = 'flex'; // Mostra o layout final

                // Remover a classe de fade após um tempo
                setTimeout(() => {
                    finalLayout.classList.remove('fade-in'); // Remove a classe de fade-in para permitir nova animação
                }, 500); // Tempo que o layout fica visível
            }, 500); // Tempo de fade-out do texto motivacional
        }, 5000); // Mostra o texto motivacional por 5 segundos
    }, 500); // Tempo de espera antes de mudar a cor de fundo
}
