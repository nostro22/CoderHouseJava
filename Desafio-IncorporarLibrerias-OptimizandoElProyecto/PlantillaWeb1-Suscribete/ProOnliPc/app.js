
let carritoDeCompras = [];


const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecType = document.getElementById('selecType')


selecType.addEventListener('change', () => {
    selecType.value == 'all' ?
        mostrarProductos(stockProductos)
        :
        mostrarProductos(stockProductos.filter(elemento => elemento.Type == selecType.value))
})


mostrarProductos(stockProductos)

/**
 * @brief Esta funcion recibe un array con los productos obtenidos del archivo stock y los muestra en el html creando sus botones individuales para poder realizar la compra
 * @param {Lista de productos en stock} array 
 */

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
           
            Toastify({
                text: producto.nombre + "  +$" + producto.precio,
                duration: 800,
                gravity: `upper`,
                avatar: `${producto.img}`,
                style: {
                    background: `linear-gradient(to rigth, #00b9b,#00b8b)`
                },
            }).showToast();
        })
    });
}

/**
 * @brief funcion que agrega el producto al carrito de compras recibe el id de un producto y verifica si existe algun producto con el mismo id en el carrito de compras 
 * dependiendo de esto actualiza la cantidad de ese producto en el carrito de compras o agrega el elemento nuevo al carrito de compras
 * @param {id un producto } id 
 * 
 */

function agregarAlCarrito(id) {

    let agregarProducto = stockProductos.find(item => item.id == id)
    let indexConseguido = -1;
    indexConseguido = verificarCoincidencia(id);
  
    if (indexConseguido != -1) {
        carritoDeCompras[indexConseguido].cantidad += 1;
    }
    else {
        carritoDeCompras.push(agregarProducto)
    }
    actualizarCarrito(carritoDeCompras)
}



/**
 * @brief Recorre la lista de productos y actualiza la cantidad de productos que hay en el carrito, el precio total de la compra, tambien actualiza la memoria local guardandola en carrito los productos actuales
 * @param {lista con todos los productos en el carrito de compras} carritoDeCompras 
 */
function actualizarCarrito(carritoDeCompras) {
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0)
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras))
}



/**
 * @brief  Crea el modulo al abrir el carrito, actualizando el contenido del mismo en base a los objetos en local storage
 * 
 */
export default function abrirCarrito() {

    contenedorCarrito.innerHTML = "";

    if (localStorage.getItem("carrito")) {
        carritoDeCompras.forEach(element => {
            let { nombre, Type, precio, cantidad, id } = element;
            if (element.cantidad > 0) {
                let div = document.createElement('div');
                div.classList.add('productoEnCarrito');
                div.innerHTML = `<img class="mini" src=${element.img} alt="" title="miniLogo" </img>
                            <p>${nombre}</p>
                            <p>${Type}</p>
                            <p>Precio: $${precio}</p>
                            <p>Cantidad: ${cantidad}</p>
                            <button id=eliminar${id} class="boton-eliminar"><img src="img/trashcan.png" class="can"/></img></button>
                            `;
                contenedorCarrito.appendChild(div);

                let botonEliminar = document.getElementById(`eliminar${id}`);

                botonEliminar.addEventListener('click', () => {
                    botonEliminar.parentElement.remove();
                    carritoDeCompras = carritoDeCompras.filter(el => el.id != id);
                    cantidad = 1;
                    actualizarCarrito(carritoDeCompras);
                });
            }

        });
    }
}

/**
 * @brief function que confirma si los id coinciden 
 * @param {El numero de identificacion del producto} id 
 * @returns  -1 sino coinciden los id, el index del id conseguido   
 */

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

/**
 * @brief Funcion de busqueda y filtrado de los productos a mostrar en la tienda
 * @param {La pabra ingresada por el usuario} input 
 * @param {El contenido de referencia para hacer la busqueda} selector 
 */
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


/**
 * @brief funcion que actualiza la lista carrito de compras en base a la memoria local carrito
 */
export function cargarMemoriaLocal() {

    carritoDeCompras = JSON.parse(localStorage.getItem("carrito")) || [];
    actualizarCarrito(carritoDeCompras);

}
