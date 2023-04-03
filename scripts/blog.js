//Desplegar-achicar texto del blog

$(document).ready(function () {
  $('.contraerExpandir').click(function () {
      let colapsando = $(this).attr('href');
      $(colapsando).toggle(function () {});
  });
});

$(document).ready(function () {
  $('.contraerExpandir2').click(function () {
      let colapsando2 = $(this).attr('href');
      $(colapsando2).toggle(function () {});
  });
});

//Tarjetas recetas desde API

const recetasDiv = document.getElementById("recetas");

axios.get('https://recetas-en-espanol.p.rapidapi.com/api/recipes', {
  headers: {
    'X-RapidAPI-Key': '5c843e64bamshce38b93d8091bddp10d8b8jsn0ea1b4c8cdfb',
    'X-RapidAPI-Host': 'recetas-en-espanol.p.rapidapi.com'
  }
})
  .then(response => {
    const recetas = response.data;
    const posiciones = [24, 6, 31];
    posiciones.forEach(posicion => {
      const receta = recetas[posicion];
      const card = document.createElement("div");
      card.classList.add("card", "col-md", "p-0");
      const img = document.createElement("img");
      img.classList.add("card-img","card-img-top");
      img.src = receta.img;
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      const title = document.createElement("h5");
      title.classList.add("card-title");
      title.textContent = receta.title;
      const slug = document.createElement("p");
      slug.classList.add("card-text");
      const recipeLink = document.createElement("a");
      recipeLink.href = `https://www.recetasgratis.net/${receta.slug}`;
      recipeLink.textContent = "Ver receta";
      cardBody.appendChild(title);
      cardBody.appendChild(recipeLink);
      card.appendChild(img);
      card.appendChild(cardBody);
      recetasDiv.appendChild(card);
    });
  })
  .catch(error => console.log(error));
