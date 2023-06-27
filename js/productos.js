let productos = [] ;

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProdutos(productos);
    })


const catalogoProductos = document.querySelector("#catalogoProductos");
const botonMarca = document.querySelectorAll(".marca");
const tituloPrincipal = document.querySelector("#tituloPrincipal");
let agregarProducto = document.querySelectorAll(".productoInfoAgregar");

function cargarProdutos(productosElegidos) {
    catalogoProductos.innerHTML ="";
   
    
    productosElegidos.forEach(producto =>{

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.img}" class="productoImg card-img-top" alt="${producto.nombre}">
            <div class="productoInfo card-body">
                <h5 class="productoInfoNombre card-title">${producto.marca}</h5>
                <p class="productoInfoPrecio card-text">$${producto.precio}</p>
                <button class="productoInfoAgregar btn btn-primary" id="${producto.id}">Agregar al Carrito</button>
            </div>
        `;
        catalogoProductos.append(div); 

    })   ;
    actualizarAgregarProductos();
    
}
cargarProdutos(productos);

botonMarca.forEach(boton =>{
    boton.addEventListener("click", (e) => {
        
        botonMarca.forEach(boton => boton.classList.remove("activo"));
        e.currentTarget.classList.add("activo");

        if(e.currentTarget.id != "todasMarcas"){
            const productoTitulo = productos.find(producto => producto.marca === e.currentTarget.id);
            tituloPrincipal.innerText = productoTitulo.marca;
            const productosClikeados = productos.filter(producto => producto.marca === e.currentTarget.id);
            cargarProdutos(productosClikeados);
            } else {
                tituloPrincipal.innerText = "Todas las Marcas";
                cargarProdutos(productos);
            }
    })
});

function actualizarAgregarProductos() {
    agregarProducto = document.querySelectorAll(".productoInfoAgregar");

    agregarProducto.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito);
    });

}

let productosCarrito;

let productosCarritoLs = localStorage.getItem("productosCarrito");

if (productosCarritoLs) {  
    productosCarrito = JSON.parse(productosCarritoLs);
} else {
    productosCarrito = [];
};

function agregarAlCarrito(e) {
    
    Toastify({
        text: "Agregaste al Carrito!",
        duration: 1500,
        close: true,
        gravity: "top", // `top` or `bottom`
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
    
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    
    if (productosCarrito.some(producto => producto.id === idBoton)) {
        const index = productosCarrito.findIndex(producto => producto.id === idBoton);
        productosCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosCarrito.push(productoAgregado);
    }


    localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
    console.log(productosCarrito);
}



















