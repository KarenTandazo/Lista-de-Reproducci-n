if (!localStorage.getItem('isLogged')) {
    window.location.href = '../login.html';
}
class Song {
    constructor(id, nombre, artista, año, duracion, genero, caratula, urlSong) {
        this.id = id;
        this.nombre = nombre;
        this.artista = artista;
        this.año = año;
        this.duracion = duracion;
        this.genero = genero;
        this.caratula = caratula;
        this.urlSong = urlSong;
    }
}
class Playlist {
    constructor(nombre, listaCanciones) {
        this.nombre = nombre;
        this.listaCanciones = listaCanciones;
    }
//Añadir a la Playlist correspondiente//    
    añadirPlaylist(song) {
        if (this.listaCanciones.includes(song) == false){
            this.listaCanciones.push(song);
            this.imprimirCanciones();
        };
    }
//Verificar la Playlista en la cual se dió play//
    playlistCheck(song) {
        if (this.listaCanciones.includes(song) == false){
            this.listaCanciones.push(song);
        }
        let cancion = song
        let play = new CustomEvent("miniPlay", {
            detail: {
                song: cancion, 
                playlistActual: this.name,
                listaCanciones: this.listaCanciones
            },
        });
        document.dispatchEvent(play);
    }
//Imprimir canciones después de agregar a Playlist//
    imprimirCanciones(){
        let canciones = document.getElementById(this.nombre);
        let boton1 = "";
        let boton2 = "";
        let boton3 = "";
        switch (this.nombre){
            case "favoritos":
                boton3 = "fa-solid fa-circle-play botonPlay"
                boton1 = "fa-regular fa-heart eliminar"
                boton2 = "fa-solid fa-circle-plus estrella"
                break;
            case "myPlaylist":
                boton3 = "fa-solid fa-circle-play botonPlay2"
                boton1 = "fa-solid fa-heart luna"
                boton2 = "fa-solid fa-circle-minus quitar"
                break;
        }
        while (canciones.firstChild) {
            canciones.removeChild(canciones.firstChild);
        } 
        this.listaCanciones.forEach(song => { 
            canciones.innerHTML += `
                <li id="song${song.id}" class="canciones">${song.nombre}
                    <div id="playLista" class="botoneslista">
                        <i data-idBoton="${song.id}" class="${boton3}"></i>
                        <i data-idBoton="${song.id}" class="${boton1}"></i>
                        <i data-idBoton="${song.id}" class="${boton2}"></i>
                    </div>
                </li>`;
        });
        this.botonPlay();
        this.botonPlay2();
        this.plus();
        this.fav();
        this.xfav();
        this.xplus();
    }
//Click botón play de Favoritos//
    botonPlay(){
        let playSong = document.getElementsByClassName("botonPlay");
        for (let i=0; i<playSong.length; i++){
            playSong[i].addEventListener("click", () => {                
                let id = playSong[i].getAttribute("data-idBoton");
                let cancion = this.listaCanciones.find(song => song.id == id);
                let evento = new CustomEvent("botonPlay", {
                    detail: {
                        id: id,
                        song: cancion, 
                        playlistActual: "favoritos",
                    },
                });
                document.dispatchEvent(evento);
            });
        }
    }
//Click botón play de myPlaylist//
    botonPlay2(){
        debugger
        let playSong = document.getElementsByClassName("botonPlay2");
        for (let i=0; i<playSong.length; i++){
            playSong[i].addEventListener("click", () => {                
                let id = playSong[i].getAttribute("data-idBoton");
                let cancion = this.listaCanciones.find(song => song.id == id);
                let evento2 = new CustomEvent("botonPlay2", {
                    detail: {
                        id: id,
                        song: cancion, 
                        playlistActual: "myPlaylist",
                    },
                });
                document.dispatchEvent(evento2);
            });
        }
    }
//Click botón añadir a myPlaylist desde Favoritos//
    plus(){
        let listSong = document.getElementsByClassName("estrella");
        for (let i=0; i<listSong.length; i++) {
            listSong[i].addEventListener("click", () =>{
                let id = listSong[i].getAttribute("data-idBoton");
                let even = new CustomEvent("estrella", {
                    detail: {id: id,
                        playlistActual: "myPlaylist",
                    },
                });
                document.dispatchEvent(even);
            }); 
        }
    }
//Click botón añadir a Favoritos desde myPlaylist//
    fav(){
        let favSong = document.getElementsByClassName("luna");
        for (let i = 0; i < favSong.length; i++) {
            
            favSong[i].addEventListener("click", () =>{
                let id = favSong[i].getAttribute("data-idBoton");
                let a = new CustomEvent("luna", {
                    detail: {id: id,
                        playlistActual: "favoritos",
                    },
                });
                document.dispatchEvent(a);
            }); 
        }
    }
//Clic botón quitar de Favoritos//
    xfav(){
        let xfavSong = document.getElementsByClassName("eliminar");
        for (let i = 0; i < xfavSong.length; i++) {
            xfavSong[i].addEventListener("click", () =>{                
                let id = xfavSong[i].getAttribute("data-idBoton");
                let b = new CustomEvent("eliminar", {
                    detail: {id: id,
                        playlistActual: "favoritos",
                    },
                });
                document.dispatchEvent(b);
            }); 
        }
    }
//Clic botón quitar de myPlaylist//
    xplus(){
        let xlistSong = document.getElementsByClassName("quitar");
        for (let i = 0; i < xlistSong.length; i++) {
            xlistSong[i].addEventListener("click", () =>{
                let id = xlistSong[i].getAttribute("data-idBoton");
                let c = new CustomEvent("quitar", {
                    detail: {id: id,
                        playlistActual: "myPlaylist",
                    },
                });
                document.dispatchEvent(c);
            }); 
        }
    }
//Quitar canciones de Favoritos//
    removeSongFav(song) {
        let cancionEliminada = this.listaCanciones.filter(c => c == song);
        this.listaCanciones = this.listaCanciones.filter(c => c !== song);
        cancionEliminada.splice(0,1);
        if (cancionEliminada = []){
            let canciones = document.getElementById(this.nombre);
            while (canciones.firstChild) {
                canciones.removeChild(canciones.firstChild);
            }
            this.listaCanciones.forEach(song => { 
                canciones.innerHTML += `
                    <li id="song${song.id}" class="canciones">${song.nombre}
                        <div id="playLista" class="botoneslista">
                            <i data-idBoton="${song.id}" class="fa-solid fa-circle-play botonPlay"></i>
                            <i data-idBoton="${song.id}" class="fa-regular fa-heart eliminar"></i>
                            <i data-idBoton="${song.id}" class="fa-solid fa-circle-plus estrella"></i>
                        </div>
                    </li>`;
            });
        }else {
            let favResultados = this.listaCanciones.concat(cancionEliminada);
            let canciones = document.getElementById(this.nombre);
            while (canciones.firstChild) {
                canciones.removeChild(canciones.firstChild);
            }
            favResultados.forEach(song => { 
                canciones.innerHTML += `
                    <li id="song${song.id}" class="canciones">${song.nombre}
                        <div id="playLista" class="botoneslista">
                            <i data-idBoton="${song.id}" class="fa-solid fa-circle-play botonPlay"></i>
                            <i data-idBoton="${song.id}" class="fa-regular fa-heart eliminar"></i>
                            <i data-idBoton="${song.id}" class="fa-solid fa-circle-plus estrella"></i>
                        </div>
                    </li>`;
            });
        };
        this.botonPlay();
        this.botonPlay2();
        this.plus();
        this.fav();
        this.xfav();
        this.xplus();
    }
//Quitar canciones de myPlaylist//
    removeSongList(song) {
        let cancionEliminada = this.listaCanciones.filter(c => c == song);
        this.listaCanciones = this.listaCanciones.filter(c => c !== song);
        cancionEliminada.splice(0,1);
        if (cancionEliminada = []){
            let canciones = document.getElementById(this.nombre);
            while (canciones.firstChild) {
                canciones.removeChild(canciones.firstChild);
            }
            this.listaCanciones.forEach(song => { 
                canciones.innerHTML += `
                    <li id="song${song.id}" class="canciones">${song.nombre}
                        <div id="playLista" class="botoneslista">
                            <i data-idBoton="${song.id}" class="fa-solid fa-circle-play botonPlay2"></i>
                            <i data-idBoton="${song.id}" class="fa-solid fa-heart luna"></i>
                            <i data-idBoton="${song.id}" class="fa-solid fa-circle-minus quitar"></i>
                        </div>
                    </li>`;
            });
        }else {
            let favResultados = this.listaCanciones.concat(cancionEliminada);
            let canciones = document.getElementById(this.nombre);
            while (canciones.firstChild) {
                canciones.removeChild(canciones.firstChild);
            }
            favResultados.forEach(song => { 
                canciones.innerHTML += `
                    <li id="song${song.id}" class="canciones">${song.nombre}
                        <div id="playLista" class="botoneslista">
                            <i data-idBoton="${song.id}" class="fa-solid fa-circle-play botonPlay2"></i>
                            <i data-idBoton="${song.id}" class="fa-solid fa-heart lunar"></i>
                            <i data-idBoton="${song.id}" class="fa-solid fa-circle-minus quitar"></i>
                        </div>
                    </li>`;
            });  
        };
        this.botonPlay();
        this.botonPlay2();
        this.plus();
        this.fav();
        this.xfav();
        this.xplus();
    }
}
class Reproductor {
    catalogoCanciones;
    currentSong;
    constructor() {
        this.catalogoCanciones = [
            new Song("1", "Mamichula", "Trueno, Nicki Nicole", "2020", "00:03:39", "Latin urbano", "TRUENO_NICKI_MAMICHULA.jpg", "TRUENO_NICKI_MAMICHULA.mp3"),
            new Song("2", "Smooth criminal", "Michael Jackson", "1988", "00:04:17", "Heard dance", "MICHAEL_JACKSON_SMOOTH_CRIMINAL.jpg", "MICHAEL_JACKSON_SMOOTH_CRIMINAL.mp3"),
            new Song("3", "Paris", "Morat, Duki", "2022", "00:03:13", "Pop, Hip-hop", "MORAT_DUKI_PARIS.jpg", "MORAT_DUKI_PARIS.mp3"),
            new Song("4", "Plan", "Alex Ponce", "2023", "00:03:24", "Pop", "ALEX_PONCE_PLAN.jpg", "ALEX_PONCE_PLAN.mp3"),
            new Song("5", "What makes you beautiful", "One Direction", "2011", "00:03:18", "Pop", "ONE_DIRECTION_WMYB.jpg", "ONE_DIRECTION_WMYB.mp3"),
            new Song("6", "8 am", "Nicki Nicole, Young Miko", "2023", "00:02:32", "Latin urbano", "NICKI_YOUNG_8AM.jpg", "NICKI_YOUNG_8AM.mp3"),
            new Song("7", "Puntos suspensivos", "Piso 21", "2018", "00:03:04", "Latin pop", "PISO21_PUNTOS_SUSPENSIVOS.jpg", "PISO21_PUNTOS_SUSPENSIVOS.mp3"),
            new Song("8", "La de la mala suerte", "Jesse & Joy", "2011", "00:04:16", "Pop-rock", "JESSE_JOY _MALA_SUERTE.jpg", "JESSE_JOY _MALA_SUERTE.mp3"),
            new Song("9", "Bajo el agua", "Manuel Medrano", "2015", "00:03:50", "Pop", "MANUEL_MEDRANO_BAJO_EL_AGUA.jpg", "MANUEL_MEDRANO_BAJO_EL_AGUA.mp3"),
            new Song("10", "Creo en ti", "Reik", "2011", "00:02:50", "Pop", "REIK_CREO_EN_TI.jpg", "REIK_CREO_EN_TI.mp3"),
            new Song("11", "Lipps Inc", "Funkytown", "2010", "00:03:44", "Salsa", "funkytown.jpg", "Funkytown  Lipps Inc (original).mp3"),
            new Song("12", "Nowhere Fast", "Fire Inc", "1984", "00:03:44", "Electronica", "NOWHERE FAST.jpg", "Fire Inc.   Nowhere Fast (1984).mp3"),
            new Song("13", "Se alejo de mi", "Paolo Plaza", "2012", "00:04:46", "Salsa", "se alejop de mi.jpg", "se alejo de mi   paolo plaza (letra).mp3"),
            new Song("14", "Arrepentida", "Beder", "2013", "00:04:26", "Salsa", "arrepentida.jpg", "arrepentida Beder el musicologo letra.mp3"),
            new Song("15", "Corazon de Acero", "Yiyo Sarante", "2011", "00:03:44", "Salsa", "corazon de acero.jpg", "Yiyo Sarante    Corazòn de Acero Audio Oficial.mp3"),
            new Song("16", "Rattle", "Bingo Players", "2001", "00:04:40", "Rock", "bingo players.jpg", "Bingo Players   Rattle (Original Mix).mp3"),
            new Song("17", "Cuando Volveras", "Aventura", "2003", "00:03:44", "Bachata", "aventura cuando volveras.jpg", "Aventura cuando volveras en español.mp3"),
            new Song("18", "Dime que voy hacer sin ti", "Grupo Caneo", "2016", "00:03:44", "Salsa", "dime que voy hacer sin ti.jpg", "Grupo Caneo   Dime Que Voy Hacer Sin Ti (letra).mp3"),
            new Song("19", "Camisa negra", "Juanes", "2004", "00:03:39", "Tropipop", "JUANES_CAMISA_NEGRA.jpg", "JUANES_CAMISA_NEGRA.mp3"),
            new Song("20", "Boys", "Sabrina", "1987", "00:03:44", "Rock", "sabrina boys.jpg", "Sabrina   Boys(Live,1987).mp3"),
            new Song("21", "Self Control", "Laura Branigan", "1985", "00:03:44", "Rock", "SELF_CONTROL_LAURA.jpg", "Laura Branigan   Self Control.mp3"),
            new Song("22", "Grease", "Sabrina", "2011", "00:03:44", "Rock", "GREASE.jpg", "grease you are the one that i want.mp3"),
            new Song("23", "Sabor a chocolate", "Elefante", "2002", "00:03:50", "Spanish Rock", "ELEFANTE_SABOR_A_CHOCOLATE.jpg", "ELEFANTE_SABOR_A_CHOCOLATE.mp3"),
            new Song("24", "Por tu amor estoy muriendo", "Deleites Andinos", "2011", "00:03:24", "Cumbia", "deleites andinos por tu amor estoy muriendo.jpg", "DELEITES ANDINOS   POR TU AMOR ESTOY MURIENDO     Vídeo Oficial.mp3"),
            new Song("25", "No se", "El Clon", "2011", "00:03:18", "Cumbia", "el clon no se.jpg", "el clon no se.mp3"),
            new Song("26", "Vuelve", "Panbur", "2011", "00:02:32", "Cumbia", "panbur vuelve.jpg", "PANBUR VUELVE (Audio).mp3"),
            new Song("27", "La Celosa", "Deleites Andinos", "2011", "00:04:44", "Cumbia", "deleites andinos la celosa.jpg", "DELEITES ANDINOS - LA CELOSA - Vídeo Oficial.mp3"),
            new Song("28", "Fiesta pagana", "Mago de Oz", "2000", "00:04:53", "Spanish Rock", "MAGO_DE_OZ_FIESTA_PAGANA.jpeg", "MAGO_DE_OZ_FIESTA_PAGANA.mp3"),
            new Song("29", "Musica Ligera", "Soda stereo", "1990", "00:03:28", "Pop, Spanich Rock", "SODA_STEREO_MUSICA_LIGERA.jpg", "SODA_STEREO_MUSICA_LIGERA.mp3"),
            new Song("30", "Mil horas", "Andrés Calamaro", "1983", "00:02:48", "Reggae, Pop Rock", "ANDRES_CALAMARO_1000_HORAS.jpg", "ANDRES_CALAMARO_1000_HORAS.mp3"),            
        ];
        this.mostrarCanciones();
        this.currentSong = this.catalogoCanciones[0];
        this.audio = new Audio ();
        this.pausado = false;
        this.currentPlaylist = "listaResultados";
        this.favoritos = new Playlist ("favoritos", []);
        this.myPlaylist = new Playlist ("myPlaylist", []);
        this.id = 0;
//Click botones principales//
        let search = document.getElementById("search");
        search.addEventListener("click", () =>{
            this.buscarCancion(document.getElementById("buscar").value);
        });

        let play = document.getElementById("botonPlay");
        play.addEventListener("click", () =>{
            this.play();
        });

        let pausaButton = document.getElementById("botonPausa");
        pausaButton.addEventListener("click", () => {
            this.pause();
        });

        let stopButton = document.getElementById("botonStop");
        stopButton.addEventListener("click", () => {
            this.stop();
        });

        let botonSiguiente = document.getElementById("botonNext");
        botonSiguiente.addEventListener("click", () => {
            this.cambiarCancion();
        });

        this.audio.addEventListener("ended", () => {
            this.cambiarCancion();
        });

        let botonAnterior = document.getElementById("botonPrevious");
        botonAnterior.addEventListener("click", () => {
            this.cancionAnterior();
        });
        
        let botonMute = document.getElementById("botonMute");
        botonMute.addEventListener("click", () => {
            this.mute();
        });

//Eventos desde plylists//

        document.addEventListener("botonPlay", (evento) => {
            this.id = evento.detail.id;
            this.currentPlaylist = evento.detail.playlistActual;
            this.currentSong = evento.detail.song;
            this.seleccionarPlaylist(this.id, this.currentPlaylist);
        });
        document.addEventListener("miniPlay", (play) => {
            this.currentPlaylist = play.detail.playlistActual;
            this.currentSong = play.detail.song;
            this.currentListaCanciones = play.detail.listaCanciones;
            this.play();
        });
        document.addEventListener("botonPlay2", (evento2) => {
            this.currentSong = evento2.detail.song;
            this.currentPlaylist = evento2.detail.playlistActual;
            this.id = evento2.detail.id;
            this.seleccionarPlaylist(this.id, this.currentPlaylist);
        });
        document.addEventListener("estrella", (even) => {
            this.id = even.detail.id;
            this.currentPlaylist = even.detail.playlistActual;
            this.añadirListas(this.id, this.currentPlaylist);
        });
        document.addEventListener("luna", (a) => {
            this.id = a.detail.id;
            this.currentPlaylist = a.detail.playlistActual;
            this.añadirListas(this.id, this.currentPlaylist);
        });
        document.addEventListener("eliminar", (b) => {
            this.id = b.detail.id;
            this.currentPlaylist = b.detail.playlistActual;
            this.buscarRemove(this.id, this.currentPlaylist);
        });
        document.addEventListener("quitar", (c) => {
            this.id = c.detail.id;
            this.currentPlaylist = c.detail.playlistActual;
            this.buscarRemove(this.id, this.currentPlaylist);
        });
    }
//Mostras lista de búsqueda/catálogo//
    mostrarCanciones(){
        let canciones = document.getElementById("listaResultados");
        this.catalogoCanciones.forEach(song => {
            canciones.innerHTML += `
                <li id="song${song.id}" class="canciones">${song.nombre}
                    <div id="playLista" class="botoneslista">
                        <i data-idBoton="${song.id}" class="playSong fa-solid fa-circle-play"></i>
                        <i data-idBoton="${song.id}" class="favSong fa-solid fa-heart"></i>
                        <i data-idBoton="${song.id}" class="listSong fa-solid fa-circle-plus"></i>
                    </div>
                </li>`;
        });
        let playSong = document.getElementsByClassName("playSong");
        for (let i=0; i<playSong.length; i++){
            playSong[i].addEventListener("click", () => {
                this.currentPlaylist = "listaResultados";
                let id = playSong[i].getAttribute("data-idBoton");
                this.currentSong=this.catalogoCanciones.find(song => song.id == id);
                this.play();
            });
        }
//Click botones en Lista principal//
        let favSong = document.getElementsByClassName("favSong");
        for (let i=0; i<favSong.length; i++){
            favSong[i].addEventListener("click", () => {
                let id = favSong[i].getAttribute("data-idBoton");
                this.añadirListas(id, "favoritos");
            });
        }

        let listSong = document.getElementsByClassName("listSong");
        for (let i=0; i<listSong.length; i++){
            listSong[i].addEventListener("click", () => {
                let id = listSong[i].getAttribute("data-idBoton");
                this.añadirListas(id, "myPlaylist");
            });
        }
    }
//Asignar playlist de la cual remover//
    buscarRemove = function(id, playlist){
        let cancionClick = this.catalogoCanciones.find(song => song.id == id);
        switch (playlist){
            case "favoritos":
                this.favoritos.removeSongFav(cancionClick);
                break;
            case "myPlaylist":
                this.myPlaylist.removeSongList(cancionClick);
                break;
        }
    }
//Asignar playlist de la cual añadir//
    añadirListas = function(id, playlist){
        let cancionClick = this.catalogoCanciones.find(song => song.id == id);
        switch (playlist){
            case "favoritos":
                this.favoritos.añadirPlaylist(cancionClick);
                break;
            case "myPlaylist":
                this.myPlaylist.añadirPlaylist(cancionClick);
                break;
        }
    }
//Asignar playlist la cual reproducir//
    seleccionarPlaylist = function(id, playlist){
        let cancionClick = this.catalogoCanciones.find(song => song.id == id);
        switch (playlist){
            case "favoritos":
                this.favoritos.playlistCheck(cancionClick);
                break;
            case "myPlaylist":
                this.myPlaylist.playlistCheck(cancionClick);
                break;
        }
    }
//Buscar canción según lo ingresado en input//
    buscarCancion = function(queBuscaUser){
        queBuscaUser = queBuscaUser.trim(queBuscaUser);
        let canciones = document.getElementById("listaResultados");
        canciones.innerHTML = '';
        let regex = new RegExp(queBuscaUser, "i");
        let resultadoN = this.catalogoCanciones.filter(song => regex.test(song.nombre));
        let resultadoA = this.catalogoCanciones.filter(song => regex.test(song.artista));
        let resultadoG = this.catalogoCanciones.filter(song => regex.test(song.genero));
        let sumaResultados = [...resultadoN, ...resultadoA, ...resultadoG];
        sumaResultados = [...new Set(sumaResultados)];
        this.mostrarBusqueda(sumaResultados);
    }
//Mostrar resultado//
    mostrarBusqueda(sumaResultados){
        let canciones = document.getElementById("listaResultados");
        sumaResultados.forEach(song => {
            canciones.innerHTML += `
            <li id="song${song.id}" class="canciones">${song.nombre}
                    <div id="playLista" class="botoneslista">
                        <i data-idBoton="${song.id}" class="playSong fa-solid fa-circle-play"></i>
                        <i data-idBoton="${song.id}" class="favSong fa-solid fa-heart"></i>
                        <i data-idBoton="${song.id}" class="listSong fa-solid fa-circle-plus"></i>
                    </div>
                </li>`;
        });
        let playSong = document.getElementsByClassName("playSong");
        for (let i=0; i<playSong.length; i++){
            playSong[i].addEventListener("click", () => {
                this.currentPlaylist = "listaResultados";
                let id = playSong[i].getAttribute("data-idBoton");
                this.currentSong=this.catalogoCanciones.find(song => song.id == id);
                this.play();
            });
        }
        let favSong = document.getElementsByClassName("favSong");
        for (let i=0; i<favSong.length; i++){
            favSong[i].addEventListener("click", () => {
                
                let id = favSong[i].getAttribute("data-idBoton");
                this.añadirListas(id, "favoritos");
            });
        }
        let listSong = document.getElementsByClassName("listSong");
        for (let i=0; i<listSong.length; i++){
            listSong[i].addEventListener("click", () => {
                let id = listSong[i].getAttribute("data-idBoton");
                this.añadirListas(id, "myPlaylist");
            });
        }
    }
//Ejecución de botones principales//
    play(){     
        if(this.currentSong !== undefined && this.pausado == false) {
            this.audio.src = 'assets/Canciones MP3/'+this.currentSong.urlSong;
            this.audio.play();
            this.portadaCentral();
            this.datosCentral();
        }else{
            this.audio.play();
        }
    }
    portadaCentral = function(){
        let caratula = document.getElementById("caratula");
        caratula.src = 'assets/Carátulas/'+this.currentSong.caratula;
    }
    datosCentral = function(){
        let datos = document.getElementById("caracteristicascancion");
        datos.innerHTML = " ";
        datos.innerHTML += `
            <span class="datos">Nombre: ${this.currentSong.nombre}</span>
            <span class="datos">Artista: ${this.currentSong.artista}</span>
            <span class="datos">Año: ${this.currentSong.año}</span>
            <span class="datos">Duración: ${this.currentSong.duracion}</span>
            <span class="datos">Género: ${this.currentSong.genero}</span>`
    }
    pause(){
        this.audio.pause();
        this.pausado = true;
    }
    stop(){
        this.audio.pause();
        this.audio.currentTime = 0;
    }
    cambiarCancion(){
        if (this.currentListaCanciones !== undefined){
            if (this.currentPlaylist !== "listaResultados"){
                if (this.currentSong !== undefined) {
                    let index = this.currentListaCanciones.findIndex(song => song.id === this.currentSong.id);
                    if (index == this.currentListaCanciones.length - 1) {
                        index = 0
                    }else{
                        index++
                    }
                    this.currentSong = this.currentListaCanciones[index];
                    this.audio.src = 'assets/Canciones MP3/' + this.currentSong.urlSong;
                    this.audio.play();
                    this.portadaCentral();
                    this.datosCentral();
                }
            }else{
                if (this.currentSong !== undefined) {
                    let index = this.catalogoCanciones.findIndex(song => song.id === this.currentSong.id);
                    if (index == this.catalogoCanciones.length - 1) {
                        index = 0
                    }else{
                        index++
                    }
                    this.currentSong = this.catalogoCanciones[index];
                    this.audio.src = 'assets/Canciones MP3/' + this.currentSong.urlSong;
                    this.audio.play();
                    this.portadaCentral();
                    this.datosCentral();
                }
            }    
        }else{
            if (this.currentSong !== undefined) {
                let index = this.catalogoCanciones.findIndex(song => song.id === this.currentSong.id);
                if (index == this.catalogoCanciones.length - 1) {
                    index = 0
                }else{
                    index++
                }
                this.currentSong = this.catalogoCanciones[index];
                this.audio.src = 'assets/Canciones MP3/' + this.currentSong.urlSong;
                this.audio.play();
                this.portadaCentral();
                this.datosCentral();
            }
        }
    }
    cancionAnterior(){
        if (this.currentListaCanciones !== undefined){
            if (this.currentPlaylist !== "listaResultados"){
                if (this.currentSong !== undefined) {
                    let index = this.currentListaCanciones.findIndex(song => song.id === this.currentSong.id);
                    if (index == 0) {
                        index = this.currentListaCanciones.length - 1
                    }else{
                        index--
                    }
                    this.currentSong = this.currentListaCanciones[index];
                    this.audio.src = 'assets/Canciones MP3/' + this.currentSong.urlSong;
                    this.audio.play();
                    this.portadaCentral();
                    this.datosCentral();
                }
            }else{
                if (this.currentSong !== undefined) {
                    let index = this.catalogoCanciones.findIndex(song => song.id === this.currentSong.id);
                    if (index == 0) {
                        index = this.catalogoCanciones.length - 1
                    }else{
                        index--
                    }
                    this.currentSong = this.catalogoCanciones[index];
                    this.audio.src = 'assets/Canciones MP3/' + this.currentSong.urlSong;
                    this.audio.play();
                    this.portadaCentral();
                    this.datosCentral();
                }
            }
        }else{
            if (this.currentSong !== undefined) {
                let index = this.catalogoCanciones.findIndex(song => song.id === this.currentSong.id);
                if (index == 0) {
                    index = this.catalogoCanciones.length - 1
                }else{
                    index--
                }
                this.currentSong = this.catalogoCanciones[index];
                this.audio.src = 'assets/Canciones MP3/' + this.currentSong.urlSong;
                this.audio.play();
                this.portadaCentral();
                this.datosCentral();
            }
        }
    }
    mute(){
        if (this.audio.volume === 0) {
            this.audio.volume = 1.0;
        } else {
            this.audio.volume = 0;
        }
    }
}
let reproductor = new Reproductor();