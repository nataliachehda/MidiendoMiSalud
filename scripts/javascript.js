function calcularPesoObjetivo(peso, altura, imcObjetivo) {
    let pesoIdeal = imcObjetivo * altura * altura;
    let pesoDiferencia = pesoIdeal - peso;

    if (pesoDiferencia > 0) {
        alert (`Necesitas ganar ${pesoDiferencia.toFixed(2)} kg para alcanzar un IMC ideal de 22.5.`);
    } else if (pesoDiferencia < 0) {
        alert(`Necesitas perder ${(-pesoDiferencia).toFixed(2)} kg para alcanzar un IMC ideal de 22.5.`);
    }
}

let peso;
let altura;
while (isNaN(peso) || isNaN(altura)) {
peso = parseFloat(prompt("¿Cuánto pesas en kilogramos? (utiliza un punto si querés agregar gramos)"));
altura = parseFloat(prompt("¿Cuál es tu altura en metros? (utiliza un punto si querés agregar centímetros)"));
if (isNaN(peso) || isNaN(altura)) {
    alert("Por favor, introduce números.");
}
}

let imc = peso / (altura * altura);
    if (imc < 18.5) {
    alert(`Tu IMC es ${imc.toFixed(2)}, tu peso está por debajo de lo normal.`);
    calcularPesoObjetivo(peso, altura, 18.5);
} else if (imc >= 18.5 && imc <= 24.9) {
    alert(`Tu IMC es ${imc.toFixed(2)}, tu peso es normal.`);
} else if (imc > 24.9 && imc <= 29.9) {
    alert(`Tu IMC es ${imc.toFixed(2)}, tenés un IMC alto (sobrepeso).`);
    calcularPesoObjetivo(peso, altura, 24.9);
} else {
    alert(`Tu IMC es ${imc.toFixed(2)}, tenés un IMC muy alto (obesidad).`);
    calcularPesoObjetivo(peso, altura, 24.9);
}

//utilicé el toFixed para poner solo dos decimales
