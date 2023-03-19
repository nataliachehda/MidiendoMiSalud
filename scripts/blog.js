/*Usé toggle de la biblioteca jQuery para contraer-expandir el texto. Intente con botones y no me salió*/
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