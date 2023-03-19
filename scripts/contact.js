/*llevé la info del formulario al LocalStorage al no contar con servidor */

$(document).ready(function() {
    const form = document.querySelector('#formContacto');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const nombre = document.querySelector('#nombre').value;
      const email = document.querySelector('#email').value;
      const mensaje = document.querySelector('#mensaje').value;
  
      const datos = {
        nombre,
        email,
        mensaje
      };
  
      const datosJSON = JSON.stringify(datos);
  
      localStorage.setItem('formularioContacto', datosJSON);
  
      form.reset();
  
      alert('El formulario ha sido guardado en el LocalStorage.');
    });
  });