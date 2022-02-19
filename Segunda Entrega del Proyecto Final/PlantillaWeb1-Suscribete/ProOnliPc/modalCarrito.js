const carritoAbrir = document.getElementById('logo-cart');
const carritoCerrar = document.getElementById('carritoCerrar');

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

import abrirCarrito from "./app.js"


carritoAbrir.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active')
    abrirCarrito();
})
carritoCerrar.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active')
})
modalCarrito.addEventListener('click',(e)=>{
    e.stopPropagation()
})
contenedorModal.addEventListener('click', ()=>{
    carritoCerrar.click()
})


import { searchPosts } from "./app.js";
import { cargarMemoriaLocal } from "./app.js";

document.addEventListener("DOMContentLoaded", (e) => {
    searchPosts(".search", ".producto");
  cargarMemoriaLocal();

})



