// DADOS
    // Pega grade
const grade = document.querySelector('[data-grade]');

    // Pega campos
const todosCampos = document.querySelectorAll('[data-campo]');

    // Vez do Jogador (false = O | true = X)
let jogadorO;


// MODIFICAÇÕES PADRÕES
    // Reseta Grade
const resetaGrade = (campo) => {
    campo.classList.remove('x');
    campo.classList.remove('o');
    campo.removeEventListener("click", jogada);
    }
    // Muda Jogador
const mudaJogador = () => {
    jogadorO = !jogadorO;

    // Mudando Jogador CSS
    grade.classList.remove('x');
    grade.classList.remove('o');
    const adicionarClasse = jogadorO ? 'o' : 'x';
    grade.classList.add(adicionarClasse)
}
    // Altera Placar



// FUNÇÕES ESPECÍFICAS
    // Realizar Jogadas
const jogada = (e) => {
    const campo = e.target;

    // Marca X ou O
    const adicionarClasse = jogadorO ? 'o' : 'x';
    campo.classList.add(adicionarClasse);

    // Verifica Vitória

    // Verifica Empate


    // Muda Jogador
    mudaJogador();
}


    // Começa Nova Rodada
const novaRodada = () => {
    for (const campo of todosCampos){
        // Resetando Grade
        resetaGrade(campo);

        // Começando Jogo
        campo.addEventListener("click", jogada,{  once:true });
    }
}


    // Começa Novo Jogo
const novoJogo = () => {
    for (const campo of todosCampos){
        // Resetando Grade
        resetaGrade(campo);

        // Começando Jogo
        campo.addEventListener("click", jogada,{  once:true });
    }

    // Começando Rodada pelo X
    jogadorO = false;
    grade.classList.remove('x');
    grade.classList.remove('o');
    grade.classList.add('x');
}

// Começando primeira Rodada
novoJogo();