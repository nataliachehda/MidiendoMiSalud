let nombre = prompt ("Bienvenido a nuestro servicio de información sobre peso saludable. Vamos a empezar conociéndote para poder proveerte información personalizada. ¿Cuál es tu nombre?");

let edad =NaN;
while (isNaN(edad)) {
  edad = prompt (`Hola ${nombre}, ¿cuál es tu edad?`);
    if (isNaN (edad)) 
      alert("Por favor, introduce números.");
}

let sexo;
while ((sexo = prompt("¿Cuál es tu sexo biológico? elige entre femenino o masculino")) && (sexo.toLowerCase() !== "femenino" && sexo.toLowerCase() !== "masculino")) {
  alert("Por favor, introduce femenino o masculino");
}

let peso = NaN;
let altura= NaN;
while (isNaN(peso) || isNaN(altura)) {
  peso = parseFloat(prompt("¿Cuánto pesas en kilogramos? (utiliza un punto si querés agregar gramos)"));
  altura = parseFloat(prompt("¿Cuál es tu altura en metros? (utiliza un punto si querés agregar centímetros)"));
    if (isNaN(peso) || isNaN(altura)) {
  alert("Por favor, introduce números.");
}
}

let imc = peso / (altura * altura);

let salir = false;
do {
  let menu = parseFloat(prompt(`Menu principal - ${nombre}, elige un número:
    1) IMC - Valoración
    2) Límites inferiores y superiores de peso
    3) Porcentaje de grasa corporal
    4) Hábitos saludables de alimentación
    5) Rutinas de ejercicios
    6) Salir`));
  if (!isNaN(menu) && menu >= 1 && menu <= 6) {
    switch(menu) {
      case 1:
        calcularIMC(peso, altura, nombre);
      break;
      case 2:
        calcularLimitesPeso(altura, nombre);
      break;
      case 3:
        calcularPorcentajeGrasa(sexo, imc, edad, nombre);
      break;
      case 4:
        HabitosAlimentacion(nombre);
      break;
      case 5:
        RutinasEjercicio(edad, nombre);
      break;
      case 6:
        salir = true;
      break;
    }
  } else {
    alert("Opción inválida. Por favor, ingrese un número del 1 al 6.");
    }
} while (!salir);

function calcularIMC(imc, nombre) {
  let imcInfo = [
    { nivel: "bajo peso", recomendacion: "aumentar tu consumo de calorías y proteínas saludables." },
    { nivel: "peso saludable", recomendacion: "llevar una dieta equilibrada y hacer ejercicio regularmente." },
    { nivel: "sobrepeso", recomendacion: "reducir la ingesta de calorías y aumentar la actividad física." },
    { nivel: "obesidad", recomendacion: "buscar ayuda médica y cambiar tu estilo de vida para perder peso." }
  ];
  
  imcInfo.forEach((nivel, posicion) => {
    if (imc >= 18.5 && imc < 25 && posicion === 1) {
      alert(`${nombre}, tu IMC es ${imc.toFixed(2)}, lo que indica que tienes ${nivel.nivel}. Para mantener tu salud, deberías ${nivel.recomendacion}`);
    } else if (imc >= 25 && imc < 30 && posicion === 2) {
      alert(`${nombre}, tu IMC es ${imc.toFixed(2)}, lo que indica que tienes ${nivel.nivel}. Para mejorar tu salud, deberías ${nivel.recomendacion}`);
      calcularPesoObjetivo(peso, altura, 22.5);
    } else if (imc >= 30 && posicion === 3) {
      alert(`${nombre}, tu IMC es ${imc.toFixed(2)}, lo que indica que tienes ${nivel.nivel}. Para mejorar tu salud, deberías ${nivel.recomendacion}`);
      calcularPesoObjetivo(peso, altura, 22.5);
    } else if (imc < 18.5 && posicion === 0) {
      alert(`${nombre}, tu IMC es ${imc.toFixed(2)}, lo que indica que tienes ${nivel.nivel}. Para mejorar tu salud, deberías ${nivel.recomendacion}`);
      calcularPesoObjetivo(peso, altura, 22.5);
    }
  });
}

function calcularPesoObjetivo(peso, altura, imcObjetivo) {
let pesoIdeal = imcObjetivo * altura * altura;
let pesoDiferencia = pesoIdeal - peso;
if (pesoDiferencia > 0) {
  alert (`Necesitas ganar ${pesoDiferencia.toFixed(2)} kg para alcanzar un IMC ideal de 22.5.`);
} else if (pesoDiferencia < 0) {
  alert(`Necesitas perder ${(-pesoDiferencia).toFixed(2)} kg para alcanzar un IMC ideal de 22.5.`);
}
}

function calcularLimitesPeso(imc) {
  let pesoMinimo = 18.5 * altura * altura;
  let pesoMaximo = 24.9 * altura * altura;
  alert(`${nombre}, para tu altura de ${altura} metros, tu peso se consideraría saludable si está entre ${pesoMinimo.toFixed(2)} y ${pesoMaximo.toFixed(2)} kg, porque estaría en un IMC entre 18.5 y 24.9.`);
}

function calcularPorcentajeGrasa(sexo, imc, edad, nombre) {
  let porcentajeGrasa = null;
  if (sexo === 'femenino') {
    porcentajeGrasa = 1.2 * imc + 0.23 * edad - 10.8 * 0 - 5.4 ;
  } else {
    porcentajeGrasa = 1.2 * imc + 0.23 * edad - 10.8 * 1 - 5.4 ;
  }
  alert(`${nombre}, tu porcentaje de grasa corporal es aproximadamente ${porcentajeGrasa.toFixed(2)}%. Un rango saludable para los hombres es de un 8-19% de grasa corporal, mientras que para las mujeres es de un 19-31%. Sin embargo, es importante recordar que estos son solo valores promedio y que cada persona es diferente.`);
}

function HabitosAlimentacion() {
  alert(`${nombre}, mantén estos hábitos y tendrás una vida saludable:
  \n1. Come frutas y verduras todos los días.\n2. Bebe suficiente agua.\n3. Reduce la ingesta de alimentos procesados.\n4. Come alimentos ricos en proteínas.\n5. Si quieres bajar de peso, no comas alimentos que contengan harina.\n6. Planifica tus comidas con anticipación.`);
}

function RutinasEjercicio(edad) {
  const rutinas = [
    { edad: "(menor de 18), ", recomendacion: "recomendamos comenzar haciendo 3 series de 10 saltos, seguidas por una serie de planchas manteniendo la posición durante 30 segundos, descansando y repitiendo 2 veces más. Luego, realiza 3 series de 8 flexiones de brazos." },
    { edad: "(entre los 18 y 30 años), ", recomendacion: "recomendamos comenzar haciendo 3 series de 10 repeticiones de sentadillas, seguidas por una serie de planchas manteniendo la posición durante 30 segundos, descansando y repitiendo 2 veces más. Luego, realiza 3 series de 10 saltos de tijera y finalmente, 3 series de 8 flexiones de brazos." },
    { edad: "(entre los 31 y 50 años), ", recomendacion: "recomendamos comenzar haciendo 3 series de 10 repeticiones de abdominales, seguidas por 3 series de 8 flexiones de brazos. Luego, realiza 3 series de 10 sentadillas y finalmente, una serie de planchas manteniendo la posición durante 30 segundos, descansando y repitiendo 2 veces más." },
    { edad: "(más de 50 años),", recomendacion: "recomendamos comenzar caminando durante 10-15 minutos, seguido por una serie de ejercicios de equilibrio (como pararse sobre un solo pie) y 3 series de 8 levantamientos de pesas ligeras. Finaliza con una serie de estiramientos." },
  ];
  let rutina = "";
  let rango = "";
  if (edad < 18) {
    rango = rutinas[0].edad;
    rutina = rutinas[0].recomendacion;
    } else if (edad >= 18 && edad <= 30) {
    rango = rutinas[1].edad;
    rutina = rutinas[1].recomendacion;
    } else if (edad > 30 && edad <= 50) {
    rango = rutinas[2].edad;
    rutina = rutinas[2].recomendacion;
    } else {
    rango = rutinas[3].edad;
    rutina = rutinas[3].recomendacion;
  };
  alert(`${nombre}, para tu edad de ${edad} años ${rango} ${rutina}`);
};
