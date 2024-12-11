// busca elemento en el DOM (Modelo de objetos del documento)
const mobileMenuBTN = document.querySelector(".hamburger-btn");
const mobileNav = document.querySelector(".mobile-nav");

// Evento clic en el botón de hamburguesa
mobileMenuBTN.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
});

window.addEventListener('load', function() {
    // se invoca el metodo cargar pelis para que cargue todo el script de peliculas
    cargarPelis();

    // espero un tiempo para cargar las peliculas
    // se usa para cargar la informacion en el modal y vincular el id para cargar la informacion
    setTimeout(() => {
        // a cada pelicula se le crea una clase llamada moviecard, 
        // y por cada tarjeta de pelicula se le asocia un id
        let movieCards = document.querySelectorAll('.moviecard');
        
        // se recorre todos los moviecard para cargar la informacion asociando un evento click
        // lo que permite que cargue solo la informacion de la pelicula cuyo id coincida
        movieCards.forEach(card => {
        card.addEventListener('click', (e) => {
          const peliculaId = card.id;
             
          cargarInfo(obtenerPelicula(peliculaId))
        })
    })
}, 400)
});

// permite realizar una busqueda de peliculas por el nombre
function filtrarPeliculasPorNombre(nombre) {
    // se crea un nuevo arreglo con la pelicula filtrada
    let peliculasFiltradas = [];
    // recorre cada una de las categorias para filtrar solo el nombre de la pelicula
    for (const categoria of peliculas) {
        const resultados = categoria.datos.filter(p => 
            p.nombre.toLowerCase().includes(nombre.toLowerCase())
        );
        peliculasFiltradas = peliculasFiltradas.concat(resultados);
    }
    
    return peliculasFiltradas;
}

//busca las peliculas
function buscarPeliculas() {
    const inputBusqueda = document.getElementById('input-busqueda');
    const nombreBusqueda = inputBusqueda.value;

    //obtiene el nuevo arreglo de peliculas con lo que se capture del input de busqueda
    // solo se activa cuando se da click sobre el boton buscar
    const peliculasFiltradas = filtrarPeliculasPorNombre(nombreBusqueda);

    // Limpia las películas actuales en pantalla
    const contenedor = document.getElementById('trending-movies');
    contenedor.innerHTML = '';

    // Renderiza solo las películas filtradas
    peliculasFiltradas.forEach(movie => {
        let div = document.createElement('div');
        div.setAttribute('class', 'moviecard');
        div.setAttribute('id', movie.id);

        let img = document.createElement('img');
        img.src = movie.img;

        let h2 = document.createElement('h2');
        h2.textContent = movie.nombre;

        div.appendChild(img);
        div.appendChild(h2);

        div.addEventListener('click', function() {
            cargarInfo(movie);
            modalActivated();
        });

        contenedor.appendChild(div);
    });
}


function obtenerPelicula(idPelicula){
    for (const categoria of peliculas) {
        const pelicula = categoria.datos.find(p => p.id === Number(idPelicula));
        
        if (pelicula) {
            return pelicula;
        }
    }
}

// Metodo principal que permite cargar todas las peliculas
function cargarPelis(){
    const principal  = document.getElementById('trending-movies');   
    principal.innerHTML = '';
    
    peliculas.forEach(categoria => {
        let divPrincipal = document.createElement('div');
        divPrincipal.setAttribute('class','peliculasPrincipal')

        let titulo = document.createElement('h3');
        titulo.textContent = categoria.categoria;

        divPrincipal.appendChild(titulo)
        
        let divTarjeta = document.createElement('div');
        categoria.datos.forEach(movie => {
            
            let div = document.createElement('div');

            div.setAttribute('class','moviecard')
            div.setAttribute('id',movie.id)

            let img = document.createElement('img');
            img.src = movie.img;

            let h2  = document.createElement('h2');
            h2.textContent = movie.nombre;

            div.appendChild(img);
            div.appendChild(h2);

            div.addEventListener('click', function(){
                modalActivated()
            });

            divTarjeta.appendChild(div)

            divPrincipal.appendChild(divTarjeta)

        })
        principal.appendChild(divPrincipal)

    });
}

// permite cargar la informacion de la pelicula y asociarlo a cada elemento del index
// se le pasa una pelicula y cargaria la descripcion
function cargarInfo(movie){
    
    let imagen = document.getElementById('imagen-movie');
    let titulo = document.getElementById("nombre-movie");

    let genero = document.getElementById("genero-movie");
    let sinopsis = document.getElementById("sinopsis-movie");
    let calificacion = document.getElementById("calificacion-movie");


    imagen.src = movie.img;
    titulo.textContent = movie.nombre;

    sinopsis.innerHTML = "<b>Sinopsis:</b> " + movie.description.slice(0,400) + " [...]";
    calificacion.innerHTML = Number(movie.Rating).toFixed(1);
    genero.innerHTML = "<b>Géneros:</b> "+movie.category;
}

// permite mostrar la ventana modal y le agrega la clase activado para que se muestre en pantalla
function modalActivated()
{
    document.getElementById('overlay').style = 'display:block';
    setTimeout(function(){
        document.getElementById('modal').classList.add('activado');
    }, 20);
}

// al elemento overlay, se le crea un display none para que lo oculte y elimina la clase activado
function modalDeactivated()
{
    document.getElementById('overlay').style = 'display:none';
    document.getElementById('modal').classList.remove('activado');
}