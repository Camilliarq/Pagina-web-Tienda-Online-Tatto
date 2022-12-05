// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
  // Dispara cuando se presiona "Agregar Carrito"
  listaCursos.addEventListener('click', agregarCurso);

  //  // Cuando se elimina un curso del carrito
   carrito.addEventListener('click', eliminarCurso);

   //muestra los cursos de local storage

   document.addEventListener("DOMContentLoaded", ()=>{
    articulosCarrito = JSON.parse( localStorage.getItem("carrito")) || [];

    carritoHTML();
   })

  //  // Al Vaciar el carrito
   vaciarCarritoBtn.addEventListener('click', () => {
      articulosCarrito = []; //reseteamos el arreglo
      limpiarHtml();
   });
}


// Función que añade el curso al carrito
function agregarCurso(e) {
  e.preventDefault();
  // Delegation para agregar-carrito
  if (e.target.classList.contains('agregar-carrito')) {
    let curso = e.target.parentElement.parentElement;
    // Enviamos el curso seleccionado para tomar sus datos
    leerDatosCurso(curso);
  }
}

function eliminarCurso(e){
  if(e.target.classList.contains("borrar-curso")){
    const cursoId = e.target.getAttribute("data-id");

    //eliminar del arreglo por el data id
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

    carritoHTML();
  }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
  // console.log(curso);
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h3').textContent,
    precio: curso.querySelector('.product__description span').textContent,
    id: curso.querySelector('i').getAttribute('data-id'),
    cantidad: 1
  }

//revisa si un elemento ya existe en el carrito 

const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

  if(existe){
    //actualizamos la cantidad+
    const cursos = articulosCarrito.map( curso => {
      if(curso.id === infoCurso.id){
        curso.cantidad++;
        return curso;
      }else{
        return curso;
      }

    });
    articulosCarrito= [...cursos];
  }else{
    //agregamos curso al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();
}

function carritoHTML() {

  //limpiar el html
  limpiarHtml();

  //recorrer carrito y generar el html

  articulosCarrito.forEach(curso => {
    const { imagen, titulo, precio, cantidad, id,resultado } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><img src= "${imagen}"></td>
        <td> ${titulo}</td>
        <td> ${precio}</td>
        <td> ${cantidad}</td>
    
        <td>
          <a href="#" class="borrar-curso" data-id= "${id}" >x</a>
        </td>
    `;
    
    //agregar el html del carrito en el boddy
    contenedorCarrito.appendChild(row);
  });

  //agregar al carrito el storage

  sincronizarStorage();

  

}
function sincronizarStorage(){
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

function limpiarHtml() {
  //forma lenta
  // contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}









// // Elimina el curso del carrito en el DOM
// function eliminarCurso(e) {
//      e.preventDefault();
//      if(e.target.classList.contains('borrar-curso') ) {
//           // e.target.parentElement.parentElement.remove();
//           const cursoId = e.target.getAttribute('data-id')

//           // Eliminar del arreglo del carrito
//           articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

//           carritoHTML();
//      }
// }


// // Muestra el curso seleccionado en el Carrito
// function carritoHTML() {

//      vaciarCarrito();

//      articulosCarrito.forEach(curso => {
//           const row = document.createElement('tr');
//           row.innerHTML = `
//                <td>  
//                     <img src="${curso.imagen}" width=100>
//                </td>
//                <td>${curso.titulo}</td>
//                <td>${curso.precio}</td>
//                <td>${curso.cantidad} </td>
//                <td>
//                     <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
//                </td>
//           `;
//           contenedorCarrito.appendChild(row);
//      });

// }

// // Elimina los cursos del carrito en el DOM
// function vaciarCarrito() {
//      // forma lenta
//      // contenedorCarrito.innerHTML = '';


//      // forma rapida (recomendada)
//      while(contenedorCarrito.firstChild) {
//           contenedorCarrito.removeChild(contenedorCarrito.firstChild);
//       }
// }




let btnMenu = document.getElementById('btn-menu');
let mainNav = document.getElementById('main-nav');
btnMenu.addEventListener('click', function () {
  mainNav.classList.toggle('mostrar');
});

const slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider__section");
let sliderSectionLast = sliderSection[sliderSection.length - 1];

const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");

slider.insertAdjacentElement('afterbegin', sliderSectionLast);

function Next() {
  let sliderSectionFirst = document.querySelectorAll(".slider__section")[0];
  slider.style.marginLeft = "-200%";
  slider.style.transition = "all 0.5s";
  setTimeout(function () {
    slider.style.transition = "none";
    slider.insertAdjacentElement('beforeend', sliderSectionFirst);
    slider.style.marginLeft = "-100%";
  }, 500);
}

function Prev() {
  let sliderSection = document.querySelectorAll(".slider__section");
  let sliderSectionLast = sliderSection[sliderSection.length - 1];
  slider.style.marginLeft = "0";
  slider.style.transition = "all 0.5s";
  setTimeout(function () {
    slider.style.transition = "none";
    slider.insertAdjacentElement('afterbegin', sliderSectionLast);
    slider.style.marginLeft = "-100%";
  }, 500);
}

btnRight.addEventListener('click', function () {
  Next();
});

btnLeft.addEventListener('click', function () {
  Prev();
});

setInterval(function () {
  Next();
}, 5000);

