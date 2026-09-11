const input = document.querySelector('.login-input');
const button = document.querySelector('.login-button');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
    if (target.value.length > 2) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', '');
    }
};

const handleSubmit = (event) => {
    event.preventDefault();

    const playerName = input.value.trim();

    if (playerName) {
        // Recupera todos os dados existentes do localStorage ou inicializa como um array vazio
        const playersData = JSON.parse(localStorage.getItem('players')) || [];

        // Verifica se o jogador já existe
        const playerExists = playersData.some((player) => player.nome === playerName);

        if (!playerExists) {
            // Adiciona o novo jogador aos dados existentes
            playersData.push({ nome: playerName });

            // Atualiza o localStorage com os novos dados de jogadores
            localStorage.setItem('players', JSON.stringify(playersData));

            // Redireciona para a página do jogo
            window.location.href =  '/jogo.html';
        } else {
            alert('Este nome de jogador já está em uso. Por favor, escolha outro nome.');
        }
    } else {
        alert('Por favor, insira um nome válido.');
    }
};

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);