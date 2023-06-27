let productosCarrito = localStorage.getItem("productosCarrito");
productosCarrito = JSON.parse(productosCarrito);

const carritoVacio = document.querySelector("#carritoVacio");
const contenedorCarritoProductos = document.querySelector("#contenedorCarritoProductos");
const carritoAcciones = document.querySelector("#carritoAcciones");
let botonEliminar = document.querySelectorAll(".carritoProductoEliminar");
const botonVaciar = document.querySelector(".botonVaciarCarrito");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector(".carritoAccionesComprar");

function cargarProductosCarrito () { 

if (productosCarrito && productosCarrito.length > 0) {
    
    carritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    carritoAcciones.classList.remove("disabled");
    
    contenedorCarritoProductos.innerHTML = "";

    productosCarrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("carritoProducto");
        div.innerHTML = `
            <img class="carritoProductoImg" src="${producto.img}" alt="${producto.nombre}">
            <div class="carritoProductoNombre">
                <small>Nombre</small>
                <p>${producto.marca}</p>
            </div>
            <div class="carritoProductoCantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carritoProductoPrecio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carritoProductoSubtotal">
                <small>SubTotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carritoProductoEliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>
        `;
        contenedorCarritoProductos.append(div);


    });


} else {
    carritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
}
    actualizarBotonesEliminar();
    actualizarTotal ()
}

cargarProductosCarrito ();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carritoProductoEliminar");

    botonesEliminar.forEach(boton =>{
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {

    Toastify({
        text: "Eliminaste un Producto",
        duration: 2000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #2a2c31, #3e4147)",//#00b09b, #96c93d
          borderRadius: "2rem",
          fontSize: "0.8rem",
          border: "solid 0.1rem white",
        },
        offset: {
            x: "1rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "4rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.id === idBoton);

    productosCarrito.splice(index, 1);
    cargarProductosCarrito ();

    localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
}

botonVaciar.addEventListener ("click", vaciarCarrito)

function vaciarCarrito() {


    Swal.fire({
        title:'¿Seguro que quieres vaciar el carrito?',
        icon:'question',
        html:'Se eliminaran todos los productos',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'SI',
        cancelButtonText:'NO'
    }).then((result) => {
            if (result.isConfirmed) {
                productosCarrito.length = 0
                localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
                cargarProductosCarrito ();
            }
          })
         
}

function actualizarTotal () {
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
};

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito () {
    
    productosCarrito.length = 0;
    localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));

    carritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
}