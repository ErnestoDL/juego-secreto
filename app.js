let numeroSecreto = 0;
let intentos = 0;
let numeroMaximo = 10;
let numeroMinimo = 0;
let intentosMaximos = 0;
let listaNumerosSorteados = [];

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function minimo() {
    numeroMinimo = parseInt(document.getElementById('inputLimiteMinimo').value);
    console.log(numeroMinimo);
    document.getElementById('inputLimiteMinimo').style.display="none";
    document.getElementById('numeroMinimo').style.display="none";
    document.getElementById('numeroMaximo').style.display="block";
    document.getElementById('inputLimiteMaximo').style.display="block";

    asignarTextoElemento('p', 'Ingrese el rango máximo');
}

function maximo() {
    numeroMaximo = parseInt(document.getElementById('inputLimiteMaximo').value);
    console.log(numeroMaximo);
    asignarTextoElemento('p', 'Ingrese el número de intentos');
    document.getElementById('numeroDeIntentos').style.display="block";
    document.getElementById('inputLimiteMaximo').style.display="none";
    document.getElementById('numeroMaximo').style.display="none";
    document.getElementById('numeroIntentos').style.display="block";
    numeroSecreto = generarNumeroSecreto();
}

function limiteIntentos() {
    intentosMaximos = parseInt(document.getElementById('numeroDeIntentos').value)
    document.getElementById('numeroDeIntentos').style.display="none";
    document.getElementById('valorUsuario').style.display="block";
    document.getElementById('numeroIntentos').style.display="none";
    document.getElementById('numeroIntentos').style.display="none";
    document.getElementById('reiniciar').style.display="block";
    document.getElementById('reiniciar').removeAttribute('disabled');
    console.log(intentosMaximos);


    asignarTextoElemento('p', `Indica un número del ${numeroMinimo} al ${numeroMaximo}`);
    limpiarCaja();

}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentosMaximos === 1) ? 'intento' : 'intentos'}.`);
        document.getElementById('nuevo').removeAttribute('disabled');
        document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    } else {
        // El usuario no acertó
        if (numeroDeUsuario > numeroSecreto && intentosMaximos > intentos) {
            limpiarCaja();
            asignarTextoElemento('p', 'El número secreto es menor.');
        } else if (numeroDeUsuario < numeroSecreto && intentosMaximos > intentos) {
            limpiarCaja();
            asignarTextoElemento('p', 'El número secreto es mayor.');
        }
        intentos++;
    }
    if (intentos > intentosMaximos) {
        asignarTextoElemento('p', `Llegaste al límite de ${intentosMaximos} ${intentosMaximos === 1 ? 'intento' : 'intentos'}.`);
        document.getElementById('nuevo').removeAttribute('disabled');
        document.querySelector('#reiniciar').setAttribute('disabled', 'true');
        }
    return;
}

function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
    document.querySelector('#numeroDeIntentos').value = '';
    document.querySelector('#inputLimiteMaximo').value = '';
    document.querySelector('#inputLimiteMinimo').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random() * numeroMaximo - numeroMinimo) + numeroMinimo + 1;
    document.getElementById('nuevo').removeAttribute('disabled');
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    // Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
        listaNumerosSorteados = []
    } else {
        // Si el numero generado está incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function reiniciarJuego() {
    // Limpiar la Caja
    limpiarCaja();
    // Limpiar intentos
    // Reinicar Número Secreto
    // Indicar mensaje de intervalo de números
    condicionesIniciales();
    // Desabilitar el botón de nuevo juego
    document.querySelector('#nuevo').setAttribute('disabled', 'true');
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p', 'Ingrese el rango mínimo');
    document.getElementById('numeroDeIntentos').style.display="none";
    document.getElementById('numeroIntentos').style.display="none";
    document.getElementById('valorUsuario').style.display="none";
    document.getElementById('reiniciar').style.display="none";
    document.getElementById('inputLimiteMaximo').style.display="none";
    document.getElementById('numeroMaximo').style.display="none";
    document.getElementById('numeroMinimo').style.display="block";
    document.getElementById('inputLimiteMinimo').style.display="block";
    intentos = 1;
}

condicionesIniciales();