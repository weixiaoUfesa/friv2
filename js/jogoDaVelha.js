// DADOS
    // Pega grade do jogo
const grade = document.querySelector('[data-grade]');

    // Pega todos os campos da grade
const todosCampos = document.querySelectorAll('[data-campo]');
    
    // Combinações de vitória 
const combinacoesVitoria = [
        // Vitorias horizontal
        [0,1,2],[3,4,5],[6,7,8],
        // Vitorias vertical
        [0,3,6],[1,4,7],[2,5,8],
        // Vitorias diagonal
        [0,4,8],[2,4,6]
    ]
    
    // Vez do jogador (false = O | true = X)
let vezJogadorX;

    // Pontos jogadores 
let pontoX = 0;
let pontoO = 0;



// MODIFICAÇÕES DE CSS E TEXTOS
    // Reseta grade
const resetaGrade = (campo) => {
        // Removendo classe para ativar o hover
    campo.classList.remove('x');
    campo.classList.remove('o');
        // Reabilitando os campos
        campo.removeEventListener("click", jogada);
        campo.removeAttribute('disabled');
        campo.classList.remove('desabilitado');
        // Desabilitando início de nova rodada
    document.getElementById('rodada').disabled = true;
    }

    // Muda mensagem de vez do jogador
const mensagemVez = () => {
        // Resetando texto
    let mensagem = document.querySelector('[data-mensagem]');
    mensagem.innerHTML = "Jogador ";
        // Removendo classe de cor do jogador
    let mensagemJogador = document.querySelector('[data-mensagemJogador]');
    mensagemJogador.classList.remove('mensagem-X');
    mensagemJogador.classList.remove('mensagem-O');
        // Adicionando classe e texto do jogador
    const adicionarClasse = vezJogadorX ? 'mensagem-X' : 'mensagem-O';
    mensagemJogador.classList.add(adicionarClasse);
    const adicionarTexto = vezJogadorX ? 'X' : 'O';
    mensagemJogador.innerHTML = (adicionarTexto);
}

    // Muda jogador
const mudaJogador = () => {
        // Trocando o jogador
    vezJogadorX = !vezJogadorX;
        // Removendo classe jogador
    grade.classList.remove('x');
    grade.classList.remove('o');
        // Adicionando classe do novo jogador
    const adicionarClasse = vezJogadorX ? 'x' : 'o';
    grade.classList.add(adicionarClasse);
}

    // Altera placar
const alteraPlacar = () => {
        // Atualiza pontos de X
    let pontosX = document.querySelector('[data-x]');
    pontosX.innerHTML = (pontoX);
        // Atualiza pontos de O
    let pontosO = document.querySelector('[data-o]');
    pontosO.innerHTML = (pontoO);
}



// ANALISANDO FIM DE JOGO 
    // Verifica fim de jogo
const verificaFim = (jogadorAtual) =>{
        // Conferindo vitório e empate 
    const fimVitoria = verificaVitoria(jogadorAtual);
    const fimEmpate = verificaEmpate();
    if(fimVitoria){ // Caso haja vitória
        // Exibindo mensagem de vitória
        let mensagem = document.querySelector('[data-mensagem]');
        mensagem.innerHTML = "Vencedor é ";
        // Desabilitando todos os campos
        const campos = document.querySelectorAll('[data-campo]');
        campos.forEach(campo => {
            campo.setAttribute('disabled', 'true');
            campo.classList.add('desabilitado');
        });
        // Alterando placar
        vezJogadorX ? pontoX++ : pontoO++;
        alteraPlacar();
        // Habilitando botão nova rodada
        document.getElementById('rodada').disabled = false;
    }else if(fimEmpate){ // Caso haja empate
        // Exibindo mensagem de empate
        let mensagem = document.querySelector('[data-mensagem]');
        mensagem.innerHTML = "Empate";
        let mensagemJogador = document.querySelector('[data-mensagemJogador]');
        mensagemJogador.innerHTML = ("");
        // Habilitando botão nova rodada
        document.getElementById('rodada').disabled = false;
        mudaJogador();
    }else{ // Caso não tenha terminado rodada
        // Trocando de Jogador
        mudaJogador();
        mensagemVez();
    }
}

    // Verifica vitória
const verificaVitoria = (jogadorAtual) => {
        // Verificando todas combinações de vitória
    return vitoria = combinacoesVitoria.some(combinacao => {
        // Verificando cada campo da combinação
        return combinacao.every((index) => {
        // Verificando se o campo é preenchido pelo jogador atual
            return todosCampos[index].classList.contains(jogadorAtual);
        })
    })
}

    // Verifica Empate
const verificaEmpate = () => {
        // Verificando cada campo da grade
    return empate = [...todosCampos].every(celula => {
        // Verificando se o campo é preenchido
        return celula.classList.contains("x") || celula.classList.contains("o");
    });
}



// COMEÇANDO JOGO
    // Realizar jogadas
const jogada = (e) => {
    const campo = e.target;
        // Marca X ou O
    const jogadorAtual = vezJogadorX ? 'x' : 'o';
    campo.classList.add(jogadorAtual);
        // Confere fim de Jogo
    verificaFim(jogadorAtual);
}
    // Começa Nova Rodada
const novaRodada = () => {
    for (const campo of todosCampos){
        // Resetando grade
        resetaGrade(campo);
        alteraPlacar();
        mensagemVez();
        // Começando jogo
        campo.addEventListener("click", jogada,{  once:true });
    }
}
    // Começa Novo Jogo
const novoJogo = () => {
    for (const campo of todosCampos){
        // Resetando grade, placar e mensagem
        resetaGrade(campo);
        pontoO = pontoX = 0;
        alteraPlacar();
        mensagemVez();
        // Começando rodada pelo X
        grade.classList.remove('x');
        grade.classList.remove('o');
        grade.classList.add('x');
        vezJogadorX = true;
        // Começando jogo
        campo.addEventListener("click", jogada,{  once:true });
    }
}



// COMEÇANDO PRIMEIRA RODADA
novoJogo();