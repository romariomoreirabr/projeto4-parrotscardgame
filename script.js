// Declaração de variáveis
let numeroDeCartas = 0;
const imagensVerso = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot" ];
let arrayDePosicoes = [];
let arrayDePosicoesDuplicadoRandom = [];
let numeroDePares = 0;


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
    <div class="carta">
            <div class="front-face face">
                <img src="img/parrot.svg" alt="parrot">
            </div>
            <div class="back-face face">
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

// main do script
perguntarQuantidadeCartas();
numeroDePares = numeroDeCartas / 2; 
inserirCartasAleatorias();

