
let carritoDeCompras = [];
let carritoStorage = [];

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecType = document.getElementById('selecType')





selecType.addEventListener('change', () => {
    if (selecType.value == 'all') {
        mostrarProductos(stockProductos)
    } else {
        mostrarProductos(stockProductos.filter(elemento => elemento.Type == selecType.value))
    }
})


mostrarProductos(stockProductos)

function mostrarProductos(array) {

    contenedorProductos.innerHTML = "";

    array.forEach(producto => {

        let div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
                        <div class="card">
                        <div class="card-image">
                            <img src=${producto.img}>
                            <span class="card-title">${producto.nombre}</span>   
                        </div>
                        <div class="card-content">
                            <p>${producto.desc}</p>
                            <p>Rarity: ${producto.Type}</p>
                            <p> $${producto.precio}</p>
                        </div>
                        <a id="botonAgregar${producto.id}" class="btn-floating halfway-fab waves-effect waves-light red"> 
                        <img class="material-icons" src="img/plus.png" alt="" title="" /></img></i></a>        
                    </div>`
        contenedorProductos.appendChild(div)

        let btnAgregar = document.getElementById(`botonAgregar${producto.id}`)
        // console.log(btnAgregar)

        btnAgregar.addEventListener('click', () => {
            agregarAlCarrito(producto.id)
        })

    });
}


function agregarAlCarrito(id) {

    let agregarProducto = stockProductos.find(item => item.id == id)
    let indexConseguido = -1;
    indexConseguido = verificarCoincidencia(id);
    console.log(indexConseguido)

    if (indexConseguido != -1) {
        carritoDeCompras[indexConseguido].cantidad += 1;
    }
    else {
        carritoDeCompras.push(agregarProducto)
    }
    actualizarCarrito(carritoDeCompras)
}


function actualizarCarrito(carritoDeCompras) {
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0)
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras))
}

export default function abrirCarrito() {

    contenedorCarrito.innerHTML = "";

    if (localStorage.getItem("carrito")) {
        carritoDeCompras.forEach(element => {
            if(element.cantidad>0)
            {
                let div = document.createElement('div');
                div.classList.add('productoEnCarrito');
                div.innerHTML = `<p>${element.nombre}</p>
                            <p>${element.Type}</p>
                            <p>Precio: $${element.precio}</p>
                            <p>Cantidad: ${element.cantidad}</p>
                            <button id=eliminar${element.id} class="boton-eliminar"><img src="img/trashcan.png" class="can"/></img></button>
                            `;
                contenedorCarrito.appendChild(div);
    
                let botonEliminar = document.getElementById(`eliminar${element.id}`);
    
          botonEliminar.addEventListener('click', () => {
            botonEliminar.parentElement.remove();
            carritoDeCompras = carritoDeCompras.filter(el => el.id != element.id);
            element.cantidad=1;
            actualizarCarrito(carritoDeCompras);
          });
            }
        
        });
    }
}


function verificarCoincidencia(id) {
    let indexConseguido = 0;
    let coinciden = 0;
    for (let index = 0; index < carritoDeCompras.length; index++) {
        if (carritoDeCompras[index].id == id) {
            indexConseguido = index;
            coinciden = 1;
            break;
        }
    }
    if (coinciden == 0) {
        indexConseguido = -1;
    }
    return indexConseguido;
}


export function searchPosts(input, selector) {
    document.addEventListener("keyup", (e) => {
        if (e.target.matches(input)) {
            document.querySelectorAll(selector).forEach(element =>
                element.textContent.toLowerCase().includes(e.target.value)
                    ? element.classList.remove("filter")
                    : element.classList.add("filter")
            )
        }
    })
}

export function cargarMemoriaLocal()
{
    if (localStorage.getItem("carrito")) {

        carritoDeCompras=JSON.parse(localStorage.getItem("carrito"));
        actualizarCarrito(carritoDeCompras);
    }
}
