// Declaração de variáveis
let numeroDeCartas = 0;


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

// main do script
perguntarQuantidadeCartas();
alert(numeroDeCartas);