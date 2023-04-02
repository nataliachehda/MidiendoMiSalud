//al formulario lo envio a getForm, por eso, tarda un rato en realizarse el envío

$(document).ready(function() {
  const form = document.querySelector('#formContacto');
  const submitButton = document.querySelector('#enviar');
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(form);
    
    fetch(form.action, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        swal.fire({
          position: 'top',
          icon: 'success',
          title: 'El mensaje ha sido enviado',
          showConfirmButton: false,
          timer: 1500
        });
        form.reset();
      } else {
        throw new Error('Error al enviar el formulario');
      }
    })
    .catch(error => {
      console.error(error);
    });
  });
});