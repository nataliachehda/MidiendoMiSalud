$(document).ready(function() {
  const form = document.querySelector('#formContacto');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const mensaje = document.querySelector('#mensaje').value;

    // Enviar los datos a Getform
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://getform.io/f/<tu-endpoint>');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Si la solicitud se envió correctamente, mostrar un mensaje de éxito
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El mensaje ha sido enviado',
          showConfirmButton: false,
          timer: 1500
        });

        form.reset();
      }
    };
    xhr.send(JSON.stringify({
      nombre,
      email,
      mensaje
    }));
  });
});
