const listaTweets = document.getElementById('lista-tweets');
const formulario = document.getElementById('formulario');
const tweet = document.getElementById('tweet');
let timeline = [];
let contador = 0;

document.addEventListener('DOMContentLoaded',cargarApp);
formulario.addEventListener('submit', agregarTweet);

function cargarApp(){
    if(tweet.value){
        tweet.value = null;
    }
    timeline = JSON.parse(localStorage.getItem('tweets')) || [];
    mostrarTweets();
}

function agregarTweet(e){
    e.preventDefault();
    const tweet = document.getElementById('tweet').value;

    

    if(tweet !== ''){
        limpiarHTML();

        let infoTweet = {id: Date.now(), tweet};

        timeline = [...timeline,infoTweet];
        mostrarTweets();
        sincronizarStorage();

    }else{
        const row = document.createElement('p');
        row.textContent = 'tweet vacio';
        row.classList.add('error');
        listaTweets.appendChild(row);
        setTimeout(() => {
            row.remove();
        }, 3000);
    }
    formulario.reset();
}

function mostrarTweets(){
    timeline.forEach( tweet =>{
        const btnEliminar = document.createElement('a');
        btnEliminar.classList.add('borrar-tweet');
        btnEliminar.text = 'X';

        btnEliminar.onclick = () =>{
            borrarTweet(tweet.id);
        }

        const row = document.createElement('li');
        row.textContent = tweet.tweet;
        row.appendChild(btnEliminar);
        listaTweets.appendChild(row);
    })
}

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(timeline));
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function borrarTweet(tweetId){
    limpiarHTML();
    timeline = timeline.filter( tweet => tweet.id !== tweetId);
    console.log(timeline);
    mostrarTweets();
    sincronizarStorage();
}