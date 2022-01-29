
// Eduardo Andres Sosa Segovia
//Comisión 20045 


let totalNeto = 0;
let total = 0;
let subTotal = 0;
let precio = 0;
let valorCuota = 0;
let otroProducto = false;
let tipoCorrecto = false;



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
    addSubtotal(cantidad) {
        this.subTotal += cantidad;
    }
    setCostoEnvio(costoEnvio) {
        this.costoEnvio = costoEnvio;
    }
}


function agregarAlCarrito() {

    do {
        let producto = prompt("Porfavor ingrese el tipo de producto que desea comprar: \n*)Shampoo\n*)acondicionador\n*)ambos", "Ej: ambos");
        let cantidad = 0;

        switch (producto) {
            case "shampoo":
                precio = precioShampoo;
                tipoCorrecto = true;
                break;
            case "acondicionador":
                precio = precioAcondicionador;
                tipoCorrecto = true;
                break;
            case "ambos":
                precio = precioAmbos;
                tipoCorrecto = true;
                break;
            default:
                alert("Alguno de los datos ingresados es incorrecto");
                precio = 0;
                cantidad = 0;
                tipoCorrecto = false;
                break;
        }

        if (tipoCorrecto) {

            do {
                cantidad = parseInt(prompt("¿Cuantos querés comprar?", 0));
                if (isNaN(cantidad) || cantidad <= 0) {
                    alert("Recuerde que solo se permite el ingreso de numeros positivos")
                }
            } while (isNaN(cantidad) || cantidad <= 0)
        }

        if (cantidad != 0) {

            if (precio == shampoo.precio) {
                shampoo.addCantida(cantidad);
            }
            else if (precio == acondicionador.precio) {
                acondicionador.addCantida(cantidad);
            }
            else if (precio == (shampoo.precio + acondicionador.precio)) {
                shampoo.addCantida(cantidad);
                acondicionador.addCantida(cantidad);
            }
            subTotal = shampoo.cantidad * shampoo.precio + acondicionador.cantidad * acondicionador.precio;
            alert("En el carrito: \nShampoo: " + shampoo.cantidad + "\nAcondicionador: " + acondicionador.cantidad + "\nSubTotal: $" + subTotal);
        }
        otroProducto = confirm("¿Desea continuar agregando productos?\n\nRecueda que si tu compra supera los $"+totalParaDescuento+ " puedes obtener un descuento del "+ descuentoPorcentaje +"% y a partir de $"+totalEnvioGratis+ " obtienes envio gratis\nCompra actual: $"+subTotal);

    } while (otroProducto);

}

function calcularSubTotal() {
    return shampoo.cantidad * shampoo.precio + acondicionador.cantidad * acondicionador.precio;
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


/// Llamado a funciones y metodos///

let shampoo = new Producto("shampoo", precioShampoo, 0);
let acondicionador = new Producto("acondicionador", precioAcondicionador, 0);
agregarAlCarrito();
subTotal = calcularSubTotal();
if (subTotal != 0) 
{
    totalNeto = aplicarDescuento(subTotal);
    total = calcularEnvio(subTotal);
    alert("Gracias por su compra hasta luego!!")
}
else if(subTotal==0)
{
    alert("Hasta Luego!!")
}






