let numeroDeCartas = 0;
const imagensVerso = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot" ];
let arrayDePosicoes = [];
let arrayDePosicoesDuplicadoRandom = [];
let numeroDePares = 0;
let cartaSelecionada1 = null;
let cartaSelecionada2 = null;
let nomeCarta1 = null;
let nomeCarta2 = null;
let contadorDeAcertos = 0;
let contadorDeJogadas = 0;
let tempo = -1;
let intervalo = null;
const textoTempo = document.querySelector("aside strong");

function iniciarJogo(){
    numeroDeCartas = 0;
    arrayDePosicoes = [];
    arrayDePosicoesDuplicadoRandom = [];
    numeroDePares = 0;
    cartaSelecionada1 = null;
    cartaSelecionada2 = null;
    nomeCarta1 = null;
    nomeCarta2 = null;
    contadorDeAcertos = 0;
    contadorDeJogadas = 0;
    tempo = -1;
    intervalo = null;

    perguntarQuantidadeCartas();
    numeroDePares = numeroDeCartas / 2; 
    inserirCartasAleatorias();
    intervalo = setInterval(iniciarContagemDeTempo, 1000);
}


// Funções
function perguntarQuantidadeCartas() {
    numeroDeCartas = parseInt(prompt("Quantas cartas você deseja? (números pares de 4 a 14): "));
    if(!verificarSeNumeroPar(numeroDeCartas)){
        perguntarQuantidadeCartas();
    }
    if ((numeroDeCartas < 4) || (numeroDeCartas > 14)){
        perguntarQuantidadeCartas();
    }
}

function verificarSeNumeroPar (numero){
    if (numero % 2 === 0){
        return true;
    } else {
        return false;
    }
}

function inserirCartas (idImg) {
    main = document.querySelector("main");
    main.innerHTML += `
    <div class="carta" data-identifier="card" onclick="selecionarCarta(this,'${imagensVerso[idImg]}')">
            <div class="face" data-identifier="back-face">
                <img src="img/parrot.svg" alt="parrot">
            </div>
            <div class="back-face face" data-identifier="front-face">
                <img src="img/${imagensVerso[idImg]}.gif" alt="${imagensVerso[idImg]}">
            </div>
        </div>
    `;
}

function inserirCartasAleatorias () {
    main = document.querySelector("main");
    main.innerHTML = "";
    sortearCartas();
    for(let i = 0; i < arrayDePosicoesDuplicadoRandom.length; i++) {
        inserirCartas(arrayDePosicoesDuplicadoRandom[i]);
    }
    iniciarContagemDeTempo();
}

function sortearCartas() {
    for (let i = 0; i < numeroDePares; i++){
        arrayDePosicoes[i] = i;
        arrayDePosicoesDuplicadoRandom[i] = i;
        arrayDePosicoesDuplicadoRandom[numeroDePares+i] = i;
    }
    arrayDePosicoesDuplicadoRandom.sort(comparador);
}

function comparador() { 
	return Math.random() - 0.5; 
}

function selecionarCarta(divCarta, nomeCarta) {
    virarCarta (divCarta);
    contadorDeJogadas++;

    if (cartaSelecionada1 == null){
        cartaSelecionada1 = divCarta;
        nomeCarta1 = nomeCarta;
    } else {
        cartaSelecionada2 = divCarta;
        if (cartaSelecionada2 === cartaSelecionada1){
            console.log("Você não pode escolher a mesma carta! Clique em outra.");
        } else{
            cartaSelecionada2 = divCarta;
            nomeCarta2 = nomeCarta;
        }   
    }
    if(nomeCarta1 !== null && nomeCarta2 !== null){
        conferirPar(cartaSelecionada1, nomeCarta1, cartaSelecionada2, nomeCarta2);
    }
}

function conferirPar(divCard1, nomeCard1, divCard2, nomeCard2) {
    if(nomeCard1 === nomeCard2){
        console.log("Parabéns você encontrou um par!");
        contadorDeAcertos++;
        divCard1.removeAttribute("onclick");
        divCard2.removeAttribute("onclick");
        resetarCartasSelecionadas();
        if (contadorDeAcertos == (numeroDeCartas/2)){
            console.log("Jogo Finalizado!");
            clearInterval(intervalo);
            console.log("Tempo: " + tempo);
            setTimeout(mostrarMensagemFimDeJogo, 1000);
            setTimeout(perguntarIniciarNovoJogo, 1000);
        }
    } else{
        console.log("Cartas diferentes! Tente novamente!");
        setTimeout(desvirarCarta,1000,divCard1);
        setTimeout(desvirarCarta,1000,divCard2);
        resetarCartasSelecionadas();
    }
}
function mostrarMensagemFimDeJogo (){
    alert("Você ganhou em " + contadorDeJogadas + " jogadas e em " + tempo + " segundos !");
}
function resetarCartasSelecionadas() {
    cartaSelecionada1 = nomeCarta1 = null;
    cartaSelecionada2 = nomeCarta2 = null;
}

function virarCarta (carta) {
    let frente = carta.children[0];
    let verso = carta.children[1];
    frente.classList.add("rotacaoF");
    verso.classList.add("rotacaoV");
}
function desvirarCarta (carta) {
    let frente = carta.children[0];
    let verso = carta.children[1];
    frente.classList.remove("rotacaoF");
    verso.classList.remove("rotacaoV");
}
function perguntarIniciarNovoJogo(){
    // alert("Você ganhou em " + contadorDeJogadas + " jogadas e em " + tempo + " segundos !");
    let resposta = prompt("Quer jogar novamente? (s ou n)").toUpperCase();
    console.log(resposta);
    if (resposta === 'S'|| resposta === "SIM"){
        iniciarJogo();
    } else if(resposta === 'N'|| resposta === "NÃO"){  
        console.log("Fim de jogo! Atualize a página para jogar novamente.");
    } else {
        perguntarIniciarNovoJogo();
    }
}

function iniciarContagemDeTempo(){
    tempo++;
    textoTempo.innerHTML = tempo;
}


// main do script
iniciarJogo();

