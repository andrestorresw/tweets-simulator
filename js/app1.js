//Taer elementos html
const tweetSpace = document.getElementById('tweet');
const formulario = document.getElementById('formulario');
const listaTweets = document.getElementById('lista-tweets');

//Arreglo del timeline
let tweets = [];

//localStorage.clear();

//Event Listeners
document.addEventListener('DOMContentLoaded', () =>{
    limpiarFormulario();
    tweets = JSON.parse(localStorage.getItem('tweet')) || [];
    mostrarTweets();
});

formulario.addEventListener('submit',agregarTweet);//Agrega el texto al arreglo


//Funciones
function agregarTweet(e){
    e.preventDefault();
    
    //Entra si el textArea tiene texto
    if(tweetSpace.value){
        //Pone el valor en el arreglo junto un ID unico
        const tweet = {
            tweet:tweetSpace.value,
            id: Date.now(),
        }
        
        //Almacena el arreglo en el array
        tweets = [...tweets, tweet];

        sincronizarStorage();

        //Limpia el HTML para no repetir el array        
        limpiarHTML();

        //Limpiar textArea del tweet una vez enviado
        limpiarFormulario();

        //Imprime tweets en HTML
        mostrarTweets();
    }else{
        const mensajeError = document.createElement('p');
        mensajeError.textContent = 'Mensaje vacio';
        mensajeError.classList.add('error');
        listaTweets.appendChild(mensajeError);
        setTimeout(() => {
            listaTweets.removeChild(mensajeError);
        }, 3000);
    }
}

function mostrarTweets(){
    tweets.forEach( tweet =>{
        //Crea cada tweet incluido en el arreglo
        const line = document.createElement('li');
        line.textContent = tweet.tweet;
        
        //Crea un boton para cada tweet
        const btnBorrar = document.createElement('a');
        btnBorrar.textContent = 'X';
        btnBorrar.classList.add('borrar-tweet');
        
        btnBorrar.onclick = () => {
            borrarTweet(tweet.id);
        };

        //Imprime tweet con su boton
        line.appendChild(btnBorrar);
        listaTweets.appendChild(line);
    });
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function limpiarFormulario(){
    if(tweetSpace.value){
        tweetSpace.value = null;   
    }
}

function borrarTweet(e){
    tweets = tweets.filter(tweet => tweet.id !== e);
    limpiarHTML();
    mostrarTweets();  
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('tweet', JSON.stringify(tweets));
    console.log(localStorage);
    //localStorage.clear();
}