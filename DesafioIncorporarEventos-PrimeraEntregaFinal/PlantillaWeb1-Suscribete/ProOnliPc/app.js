
let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecType = document.getElementById('selecType')

let div = document.createElement('div')



selecType.addEventListener('change', () => {
    console.log(selecType.value);
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
        div.className = 'producto'
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

    if (indexConseguido != -1) {
        carritoDeCompras[indexConseguido].cantidad += 1;
    
    }
    else {
        
        carritoDeCompras.push(agregarProducto)       
    }
    
    actualizarCarrito()   
}


function actualizarCarrito() {

    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0)
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
}

function abrirCarrito()
{
   div.innerHTML="";
    carritoDeCompras.forEach(element => {
        let divAux = document.createElement('div')

        divAux.className = 'productoEnCarrito'
        divAux.innerHTML = `
        <div
                    <p>${element.nombre}</p>
                    <p>${element.Type}</p>
                    <p>Precio: $${element.precio}</p>
                    <p>Cantidad: ${element.cantidad}</p>
                    <button id="btnEliminar${element.index}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                    </div> `                     
        div.innerHTML+=divAux.innerHTML
        
    });
    contenedorCarrito.appendChild(div)
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
