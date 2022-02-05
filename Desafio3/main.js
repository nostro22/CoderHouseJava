
// Eduardo Andres Sosa Segovia
//Comisión 20045 

let totalNeto = 0;
let total = 0;
let subTotal = 0;
let precio = 0;
let valorCuota = 0;
let otroProducto = false;
let tipoCorrecto = false;
let respuesta = 0;
let ingreso = 0;
let carritoString = "";
const listaProductos = [];


const descuentoPorcentaje = 20;
const precioShampoo = 500;
const precioAcondicionador = 700;
const precioAmbos = precioShampoo + precioAcondicionador;
const totalParaDescuento = 5000;
const totalEnvioGratis = 2000;
const costoEnvio = 700;




class Producto {
    constructor(producto, precio, cantidad) {
        this.producto = producto;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    addCantida(cantidad) {
        this.cantidad += cantidad;
    }
    calculateSubTotal() {
        return (this.precio * this.cantidad)
    }

    getProducto() {
        return this.producto;
    }
    getPrecio() {
        return this.precio;
    }
}


function menu() {


    while (ingreso != 4) {

        do {
            ingreso = parseInt(prompt("Bienvenido a la tienda de NFT de The New Team \n ingrese su elecion: \n1)Agregar Productos \n2)Eliminar Pedido \n3)Mostrar Carrito \n4)salir", "ejem 1"));
        } while (isNaN(ingreso) || ingreso <= 0 || ingreso > 4)

        switch (ingreso) {
            case 1:
                agregarAlCarrito(listaProductos);
                break;
            case 2:
                elimanarPedido();
                inicializarProductos();

                break;
            case 3:
                mostrarCarrito();
                break;
            case 4:

                alert("Gracias Por Visitarnos");
                break;


            default:
                break;
        }
    }
}

function agregarAlCarrito() {

    let opcionesProductos = "";
    otroProducto = 1;
    for (let index = 0; index < listaProductos.length; index++) {

        opcionesProductos += "\n*)" + listaProductos[index].getProducto();
    }


    do {
        let producto = prompt("Porfavor ingrese el tipo de producto que desea comprar:" + opcionesProductos);
        let cantidad = 0;
        let indexObtenido = -1;

        indexObtenido = getIndex(producto);
        if (indexObtenido != -1) {
            tipoCorrecto = true;
            precio = listaProductos[indexObtenido].getPrecio;
        }


        if (tipoCorrecto) {

            do {
                cantidad = parseInt(prompt("¿Cuantos querés comprar?", 0));
                if (isNaN(cantidad) || cantidad <= 0) {
                    alert("Recuerde que solo se permite el ingreso de numeros positivos")
                }
            } while (isNaN(cantidad) || cantidad <= 0)


            if (cantidad != 0) {

                listaProductos[indexObtenido].addCantida(cantidad);
                subTotal = calcularSubTotal();
                carritoString = "";
                listarListaConCantidades();
                carritoString += "\n" + subTotal;

            }
            otroProducto = confirm("¿Desea continuar agregando productos?");
        }

    } while (otroProducto);

}


function mostrarCarrito() {
    
    
        subTotal = calcularSubTotal();
        carritoString = "";
        listarListaConCantidades();
        if(subTotal>0)
        {
            carritoString += "\n  Total= " + subTotal;
        }
        else
        {
            carritoString += "\n No tiene ningun artigulo en el carrito  ";
        }
        alert(carritoString);
    
   
}

function calcularSubTotal() {

    let subTotal = 0;
    for (let index = 0; index < listaProductos.length; index++) {

        if (listaProductos[index].cantidad > 0) {
            subTotal += listaProductos[index].cantidad * listaProductos[index].precio;
        }

    }

    if (subTotal == 0) {
        subTotal = -1;
    }
    return subTotal;

}



function aplicarDescuento(subTotal) {
    if (subTotal >= totalParaDescuento) {
        totalNeto = subTotal * (1 - descuentoPorcentaje / 100);
        alert("Tu compra aplica para un descuento del " + descuentoPorcentaje + "% \nSubtotal: $" + subTotal + "\nDescuento: $" + subTotal * descuentoPorcentaje / 100 + "\nPrecio Final: $ " + totalNeto);
    }
    else {
        totalNeto = subTotal;
    }
    return totalNeto;
}

function calcularEnvio(totalNeto) {
    let confirmacion = confirm("¿Querés envío a domicilio?");

    if (confirmacion && totalNeto >= totalEnvioGratis) {
        alert("Tenes envío gratis. El total a abonar es: " + totalNeto);
        total = totalNeto;
    }
    else if (confirmacion && totalNeto < totalEnvioGratis) {
        total = totalNeto + costoEnvio;
        alert("El costo de envío es de " + costoEnvio + ". El total a abonar es: " + totalNeto);
    }
}

function listarUnProductoLista(index, listaLength) {

    if (index >= 0 && index < listaLength) {
        carritoString += "\n*)" + listaProductos[index].producto + "    || Cantidad:" + listaProductos[index].cantidad + "   || $ :" + (listaProductos[index].cantidad * listaProductos[index].precio);
    }
}

function listarListaConCantidades() {
    for (let index = 0; index < listaProductos.length; index++) {

        if (listaProductos[index].cantidad > 0) {
            listarUnProductoLista(index, listaProductos.length)
        }
    }

}

function elimanarPedido() {
    while (listaProductos.length) {
        listaProductos.pop();
    }
}

function inicializarProductos()
{
    let ruin = new Producto("ruin", precioShampoo, 0);
    let princess = new Producto("princess", precioAcondicionador, 0);
    listaProductos.push(ruin);
    listaProductos.push(princess);
}

function getIndex(productName) {
    let indexConseguido = 0;
    let coinciden = 0;
    for (let index = 0; index < listaProductos.length; index++) {

        if (listaProductos[index].producto == productName) {
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

/// Llamado a funciones y metodos///

inicializarProductos();
menu();







