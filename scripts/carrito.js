/* me animé a usar modales */
const productos = [
  {
  id: 1,
  nombre: "Sesión de asesoramiento",
  precio: "$4200",
  img: "https://cdn-icons-png.flaticon.com/128/3475/3475821.png",
  descripcion: "Una sesión de asesoramiento con nuestros expertos en salud.",
  cantidad: 1,
  },
  {
  id: 2,
  nombre: "Sesión de asesoramiento x2",
  precio: "$5880",
  img: "https://cdn-icons-png.flaticon.com/128/3475/3475821.png",
  descripcion: "Dos sesiones de asesoramiento con 30% de descuento.",
  cantidad: 1,
  },
  {
  id: 3,
  nombre: "Suscripción mensual exclusiva",
  precio: "$540",
  img:"https://cdn-icons-png.flaticon.com/128/3655/3655581.png",
  descripcion: "Acceso exclusivo a contenido de salud, ejercicios y alimentación.",
  cantidad: 1,
  },
]

const shopContenido = document.getElementById("shopContenido");
const verCarrito = document.getElementById("verCarrito");
const modalContenedor = document.getElementById("contenedorModal");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
  let content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
  <div class="card" style="width: 17rem;">
  <img src="${product.img}" class="card-img-top" alt="...">
  <div class="card-body">
    <h3 class="card-title">${product.nombre}</h3>
    <p class="card-text">${product.descripcion}</p>
    <p class="card-text">${product.precio}</p>
  </div>
</div>
  `;

  shopContenido.append(content);

  let comprar = document.createElement("button");
  comprar.innerText = "comprar";
  comprar.className = "comprar";

  content.append(comprar);

  comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === product.id) {
          prod.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
      });
      console.log(carrito);
      console.log(carrito.length);
      carritoContador();
      guardarLocal();
    }
  });
});

const guardarLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const colocarCarrito = () => {
  modalContenedor.innerHTML = "";
  modalContenedor.style.display = "grid";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
    <h1 class="modal-header-title">Tus Compras</h1>
  `;
  modalContenedor.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "X";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContenedor.style.display = "none";
  });

  modalHeader.append(modalbutton);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>${product.precio} $</p>
        <span class="restar"><img src="../images/subtract.png" class="addLogo"></img></span>
        <p>${product.cantidad}</p>
        <span class="sumar"><img src="../images/add.png" class="addLogo"></img></span>
        <p>Subtotal: ${product.cantidad * Number(product.precio.replace("$", ""))} $</p>
        <span class="delete-product"> <img src="../images/trash.png" class="addLogo"></img> </span>`;

    modalContenedor.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");
    restar.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;}
      guardarLocal();
      colocarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      product.cantidad++;
      guardarLocal();
      colocarCarrito();
    });

    let eliminar = carritoContent.querySelector(".delete-product");
    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
    });
});

  const total = carrito.reduce((acc, el) => acc + parseFloat(el.precio.replace('$','')) * el.cantidad, 0);
  const totalCompra = document.createElement("div");
  totalCompra.className = "total-content";
  totalCompra.innerHTML = `Total a pagar: ${total} $`;
  modalContenedor.append(totalCompra);
  
};

verCarrito.addEventListener("click", colocarCarrito);

const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);
  console.log(foundId);
  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });
  carritoContador();
  guardarLocal();
  colocarCarrito();
};

const carritoContador = () => {
  cantidadCarrito.style.display = "block";
  const carritoLength = carrito.length;
  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoContador();
