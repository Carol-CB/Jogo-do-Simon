let ordem = []; //usar let e não var por boas práticas
let ordemJogador = [];
let flash;
let rodada;
let certo;
let boolRodada;
let intervaloID;
let restrito = false;
let barulho = true;
let ligado = false;
let vitoria;

const contadorRodada = document.querySelector("#rodada");
const esquerdaCima = document.querySelector("#esquerdacima");
const direitaCima = document.querySelector("#direitacima");
const esquerdaBaixo = document.querySelector("#esquerdabaixo");
const direitaBaixo = document.querySelector("#direitabaixo");
const botaoEstrito = document.querySelector("#restrito");
const botaoLigado = document.querySelector("#ligado");
const botaoStart = document.querySelector("#start");

botaoEstrito.addEventListener("click", (event) => {
    if (botaoEstrito.checked == true) {
        restrito = true;
    } else {
        restrito = false;
    }
});

botaoLigado.addEventListener("click", (event) => {
    if (botaoLigado.checked == true) {
        ligado = true;
        contadorRodada.innerHTML = "-";
    } else {
        ligado = false;
        contadorRodada.innerHTML = "";
        limpar();
        clearInterval(intervaloID);
    }
});

botaoStart.addEventListener("click", (event) => {
    if (ligado || vitoria) {
        play();
    }
});

function play() {
    vitoria = false;
    ordem = [];
    ordemJogador = [];
    flash = 0;
    intervaloID = 0;
    rodada = 1;
    contadorRodada.innerHTML = 1;
    certo = true;
    for (var i = 0; i < 20; i++) {
        ordem.push(Math.floor(Math.random() * 4) + 1); //randomizar as vinte rodadas de 1 a 4, no caso as cores
    }
    boolRodada = true;

    intervaloID = setInterval(turno, 800); //o intervalo entre as luzes
}

function turno() {
    ligado = false; //pro jogador nao poder clicar nas cores enquanto as luzes piscam

    if (flash == rodada) {
        clearInterval(intervaloID);
        boolRodada = false;
        limpar();
        ligado = true;
    }

    if (boolRodada) {
        limpar();
        setTimeout(() => {
            if (ordem[flash] == 1) umRosa(); //se no array da ordem dos vinte numero entre um e quatro, 1 estiver na posição de flash, que é um contador iniciado em 0, a função um será executada. As funções um à quatro são as de piscar cores.
            if (ordem[flash] == 2) doisRoxo();
            if (ordem[flash] == 3) tresAmarelo();
            if (ordem[flash] == 4) quatroAzul();
            flash++;
        }, 200);
    }
}

function umRosa() {
    if (barulho) {
        let audio = document.getElementById("clip1");
        audio.play();
    }
    barulho = true;
    esquerdacima.style.backgroundColor = "pink";
}

function doisRoxo() {
    if (barulho) {
        let audio = document.getElementById("clip2");
        audio.play();
    }
    barulho = true;
    direitacima.style.backgroundColor = "purple";
}

function tresAmarelo() {
    if (barulho) {
        let audio = document.getElementById("clip3");
        audio.play();
    }
    barulho = true;
    esquerdabaixo.style.backgroundColor = "yellow";
}

function quatroAzul() {
    if (barulho) {
        let audio = document.getElementById("clip4");
        audio.play();
    }
    barulho = true;
    direitabaixo.style.backgroundColor = "blue";
}

function limpar() {
    esquerdacima.style.backgroundColor = "palevioletred";
    direitacima.style.backgroundColor = "rgb(180, 99, 255)";
    esquerdabaixo.style.backgroundColor = "rgb(255, 255, 87)";
    direitabaixo.style.backgroundColor = "lightseagreen";
}

function flashCor() {
    esquerdacima.style.backgroundColor = "pink";
    direitacima.style.backgroundColor = "purple";
    esquerdabaixo.style.backgroundColor = "yellow";
    direitabaixo.style.backgroundColor = "blue";
}

esquerdacima.addEventListener("click", (event) => {
    if (ligado) {
        ordemJogador.push(1);
        check();
        umRosa();
        if (!vitoria) {
            setTimeout(() => {
                limpar();
            }, 300);
        }
    }
});

direitacima.addEventListener("click", (event) => {
    if (ligado) {
        ordemJogador.push(2);
        check();
        doisRoxo();
        if (!vitoria) {
            setTimeout(() => {
                limpar();
            }, 300);
        }
    }
});

esquerdabaixo.addEventListener("click", (event) => {
    if (ligado) {
        ordemJogador.push(3);
        check();
        tresAmarelo();
        if (!vitoria) {
            setTimeout(() => {
                limpar();
            }, 300);
        }
    }
});

direitabaixo.addEventListener("click", (event) => {
    if (ligado) {
        ordemJogador.push(4);
        check();
        quatroAzul();
        if (!vitoria) {
            setTimeout(() => {
                limpar();
            }, 300);
        }
    }
});

function check() {
    //função que checa as respostas do jogador com o jogo e manda um output
    if (ordemJogador[ordemJogador.length - 1] !== ordem[ordemJogador.length - 1])
        certo = false;

    if (ordemJogador.length == 20 && certo) {
        vitoriaGame();
    }

    if (certo == false) {
        flashCor();
        contadorRodada.innerHTML = "Não!";
        setTimeout(() => {
            contadorRodada.innerHTML = rodada;
            limpar();

            if (restrito) {
                play();
            } else {
                boolRodada = true;
                flash = 0;
                ordemJogador = [];
                certo = true;
                intervaloID = setInterval(turno, 800);
            }
        }, 800);

        barulho = false;
    }

    if (rodada == ordemJogador.length && certo && !vitoria) {
        rodada++;
        ordemJogador = [];
        boolRodada = true;
        flash = 0;
        contadorRodada.innerHTML = rodada;
        intervaloID = setInterval(turno, 800);
    }
}

function vitoriaGame() {
    //função que declara vitoria
    flashCor();
    contadorRodada.innerHTML = "Fim!";
    ligado = false;
    vitoria = true;
}