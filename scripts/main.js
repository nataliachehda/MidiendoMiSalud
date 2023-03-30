//Primer formulario
const formulario = document.querySelector('form');
const resultado = document.querySelector('#resultado');

formulario.addEventListener('submit', (e) => {
  e.preventDefault(); 
  const nombre = formulario.querySelector('#nombre').value;
  const edad = formulario.querySelector('#edad').value;
  const sexo = formulario.querySelector('#sexo').value;
  const peso = parseFloat(formulario.querySelector('#peso').value);
  const altura = parseFloat(formulario.querySelector('#altura').value);
  const imc = peso / (altura * altura);
  resultado.innerHTML = `<p>Hola ${nombre}, tu IMC es de ${imc.toFixed(2)}.<br>`;
  const imcInfo = [
  { nivel: "bajo peso", recomendacion: "aumentar tu consumo de calorías y proteínas saludables." },
  { nivel: "peso saludable", recomendacion: "llevar una dieta equilibrada y hacer ejercicio regularmente." },
  { nivel: "sobrepeso", recomendacion: "reducir la ingesta de calorías y aumentar la actividad física." },
  { nivel: "obesidad", recomendacion: "buscar ayuda médica y cambiar tu estilo de vida para perder peso." }
];
imcInfo.forEach((nivel, posicion) => {
  if (imc >= 18.5 && imc < 25 && posicion === 1) {
    resultado.innerHTML += `Tienes ${nivel.nivel}. Para mantener tu salud, deberías ${nivel.recomendacion}</p>`;
    calcularLimitesPeso(imc, altura);
  } else if (imc >= 25 && imc < 30 && posicion === 2) {
    resultado.innerHTML += `Tienes ${nivel.nivel}. Para mejorar tu salud, deberías ${nivel.recomendacion}</p>`;
    calcularPesoObjetivo(peso, altura, 22.5, resultado);
    calcularLimitesPeso(imc, altura);
  } else if (imc >= 30 && posicion === 3) {
    resultado.innerHTML += `Tienes ${nivel.nivel}. Para mejorar tu salud, deberías ${nivel.recomendacion}</p>`;
    calcularPesoObjetivo(peso, altura, 22.5, resultado);
    calcularLimitesPeso(imc, altura);
  } else if (imc < 18.5 && posicion === 0) {
    resultado.innerHTML += `Tienes ${nivel.nivel}. Para mejorar tu salud, deberías ${nivel.recomendacion}</p>`;
    calcularPesoObjetivo(peso, altura, 22.5, resultado);
    calcularLimitesPeso(imc, altura);
  }
  });
  localStorage.setItem('resultado', resultado.innerText);
  localStorage.setItem('imc', JSON.stringify(imc.toFixed(2)));
});

function calcularPesoObjetivo(peso, altura, imcObjetivo, resultado) {
  const pesoIdeal = imcObjetivo * altura * altura;
  const pesoDiferencia = pesoIdeal - peso;
  if (pesoDiferencia > 0) {
    resultado.innerHTML += `<p>Necesitas ganar ${pesoDiferencia.toFixed(2)} kg para alcanzar un IMC ideal de 22.5.</p>`;
  } else if (pesoDiferencia < 0) {
    resultado.innerHTML += `<p>Necesitas perder ${(-pesoDiferencia).toFixed(2)} kg para alcanzar un IMC ideal de 22.5.</p>`;
  }
}

function calcularLimitesPeso(imc, altura) {
  let pesoMinimo = 18.5 * altura * altura;
  let pesoMaximo = 24.9 * altura * altura;
  resultado.innerHTML += `<p> Para tu altura de ${altura} metros, tu peso se consideraría saludable si está entre ${pesoMinimo.toFixed(2)} y ${pesoMaximo.toFixed(2)} kg, porque estaría en un IMC entre 18.5 y 24.9.<p>`;
}

//Segundo formulario
const formulario2 = document.querySelector('#form2');
const resultado2 = document.querySelector('#resultado2');
formulario2.addEventListener('submit', (e) => {
  e.preventDefault(); 
  const sexo2 = parseInt(formulario2.querySelector('#sexo2').value);
  const circunferenciaCintura = parseFloat(formulario2.querySelector('#circunferencia-cintura').value);
  const circunferenciaCadera = parseFloat(formulario2.querySelector('#circunferencia-cadera').value);
  const circunferenciaCuello = parseFloat(formulario2.querySelector('#circunferencia-cuello').value);
  const altura2 = parseFloat(formulario2.querySelector('#altura2').value);
  const factor = sexo2 === 0 ? 0 : 1; //Aquí use un operador ternario!
  const img = (1.2 * (circunferenciaCintura / circunferenciaCadera)) + (0.23 * altura2) + (0.10 * circunferenciaCuello) - (10.8 * factor) - 5.4;
  resultado2.innerHTML = `<p>Tu índice de masa grasa es de ${img.toFixed(2)}.</p>`;
  localStorage.setItem('resultado2', resultado2.innerText);
});

/*Aquí trabaje con el canvas para crear un archivo de imagen. 
Como dependo de las entradas del prompt del usuario, no puedo anticipar cuantos caracteres poner en cada línea
del archivo jpg, por lo que a veces en el archivo descargable se cortan las palabras en lugares erroneos.*/
function imprimir() {
  let nombre = document.getElementById("nombre").value;
  let edad = document.getElementById("edad").value;
  let sexo = document.getElementById("sexo").value;
  let peso = document.getElementById("peso").value;
  let altura = document.getElementById("altura").value;
  const imcGuardado = JSON.parse(localStorage.getItem('imc'));
  const resultadoGuardado2 = localStorage.getItem('resultado2');
  const resultadoGuardado = localStorage.getItem('resultado');
  let primeros80Caracteres = resultadoGuardado.substring(0, 70);
  let siguientes80Caracteres = resultadoGuardado.substring(70, 140);
  let siguientes80Caracteres2 = resultadoGuardado.substring(140, 210);
  let siguientes80Caracteres3 = resultadoGuardado.substring(210, 280);
  let siguientes80Caracteres4 = resultadoGuardado.substring(280, 350);
  let siguientes80Caracteres5 = resultadoGuardado.substring(350, 2000);

  let canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 600;
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "#007bff";
  ctx.fillRect(0, 0, canvas.width, 100);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Ficha de salud", canvas.width/2, 50);
  ctx.font = "bold 20px Arial";
  ctx.textAlign = "left";
  ctx.fillText("Nombre: " + nombre, 50, 150);
  ctx.fillText("Edad: " + edad, 50, 180);
  ctx.fillText("Sexo: " + sexo, 50, 210);
  ctx.fillText("Peso: " + peso + " kg", 50, 240);
  ctx.fillText("Altura: " + altura + " m", 50, 270);
  ctx.fillText("Índice de masa corporal: " + imcGuardado, 50, 300);
  ctx.fillText("Índice de masa grasa: " + resultadoGuardado2, 50, 330);
  ctx.fillText("Evaluación: " , 50, 360);
  ctx.fillText(primeros80Caracteres, 50, 390);
  ctx.fillText(siguientes80Caracteres, 50, 410);
  ctx.fillText(siguientes80Caracteres2, 50, 430);
  ctx.fillText(siguientes80Caracteres3, 50, 450);
  ctx.fillText(siguientes80Caracteres4, 50, 470);
  ctx.fillText(siguientes80Caracteres5, 50, 490);

  let image = canvas.toDataURL("image/jpeg", 1.0);

  let link = document.createElement("a");
  link.download = "tuFichaDeSalud.jpg";
  link.href = image;
  link.click();
}

let botonImprimir = document.querySelector("#btnImprimir");
botonImprimir.addEventListener("click", imprimir);