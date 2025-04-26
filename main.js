fetch('./componentes.json')
.then(res => res.json())
.then(productos => {
    mostrarProductos(productos);
    mostrarCarrito();
})
.catch(err => console.error('Error al cargar productos:', err));

function mostrarProductos(productos) {
    const container = document.getElementById("productos-container");

    productos.forEach((producto) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");

        productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Marca: ${producto.marca}</p>
            <p>Precio: $${producto.precio}</p>
            <button class="agregar-carrito-btn" data-nombre="${producto.nombre}" data-tamaño="${producto.marca}" data-precio="${producto.precio}">Agregar al Carrito</button>`;

        container.appendChild(productoDiv);
    });
}


function agregarAlCarrito(nombre, tamaño, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = { nombre, tamaño, precio };

    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}


function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoLista = document.getElementById("carrito-lista");

    carritoLista.innerHTML = "";  

    carrito.forEach((producto) => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - ${producto.tamaño} - $${producto.precio}`;
        carritoLista.appendChild(li);
    });
}


document.getElementById("productos-container").addEventListener("click", (event) => {
    if (event.target.classList.contains("agregar-carrito-btn")) {
        const { nombre, tamaño, precio } = event.target.dataset;
        agregarAlCarrito(nombre, tamaño, precio);
    }
});

document.getElementById("vaciar-carrito-btn").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    mostrarCarrito();
});

// function calcularTotal() {
//     const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
//     const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
//     document.getElementById('total').textContent = 'Total: $' + total;
// }


let currentTheme = localStorage.getItem("theme");

if (currentTheme === "oscuro") {
    document.body.style.backgroundColor = "#333";
 } else {
    document.body.style.backgroundColor = "#f0f0f0";
}


const toggleThemeBtn = document.getElementById("toggle-theme-btn");
toggleThemeBtn.addEventListener("click", () => {
    let currentTheme = localStorage.getItem("theme");

    if (currentTheme === "oscuro") {
       
        localStorage.setItem("theme", "claro");
        document.body.style.backgroundColor = "#f0f0f0";
        } else {
        
        localStorage.setItem("theme", "oscuro");
        document.body.style.backgroundColor = "#333";
    }
});

    mostrarProductos();
    mostrarCarrito();
    //calcularTotal();
