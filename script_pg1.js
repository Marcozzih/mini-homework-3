


//inizializzazione API spotify

  
const client_id = "18ae549568484ad089754cc55eb02f6d";
const client_secret = "5eee3a13a3d6480ebde7ec311e7129a4";
  

  fetch("https://accounts.spotify.com/api/token",
  {
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
    {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
  
    }
  }
  ).then(onTokenResponse).then(onTokenJson);



const form = document.querySelector('form');
console.log(form);
form.addEventListener('submit', Ricerca);


function Ricerca(event){

    event.preventDefault(); 
    console.log('ho cercato!!');

    const conten_valore = document.querySelector('#album');
    const valore = encodeURIComponent(conten_valore.value);
    console.log(valore);

    
    fetch("https://api.spotify.com/v1/search?type=album&q=" + valore,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson);
    
}

function onTokenResponse(response){
  return response.json();
}

function onTokenJson(json)
{
  token = json.access_token;
}


function onResponse(response){
  return response.json();

}



function onJson(json) {

    console.log('JSON ricevuto');
    console.log(json);


    const vetrina = document.querySelector('#vetrina');
    vetrina.innerHTML = '';
    const results = json.albums.items;
    let num = results.length;

    if(num > 5)
      num = 5;
    let i = 0;
    while(i<num)
    {
      const album_data = results[i] 
      console.log(album_data);
      if(album_data.album_type === "album"){

        const title = album_data.name;
        const selected_image = album_data.images[0].url;
        const album = document.createElement('div');
        album.classList.add('album');
        const img = document.createElement('img');
        img.src = selected_image;
        const caption = document.createElement('h2');
        caption.textContent = title;
        album.appendChild(img);
        album.appendChild(caption);
        vetrina.appendChild(album);
        

      }else {
        num++;
        
      }
      i++;
    }
  }
  
  function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }

//zona album random
//usare un altra api. key last.fm  =  370cbc327ef7855832fe61b69b22c49f


const no_repeat = [];

function radAlbum(event){
  const evento = event.currentTarget;
  evento.removeEventListener('click', radAlbum);

  const inp = document.querySelector('#input');
  inp.classList.remove('input_view');
  inp.classList.add('input_hidden');
  fetch("http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=370cbc327ef7855832fe61b69b22c49f&format=json").then(onResponseP).then(onJsonP);

}

function onResponseP(response){
  return response.json();
}

function onJsonP(json){
  
  console.log('ecco il json di last.fm');
  console.log(json);

  for(let i = 0; i<5; i++){
    let num = Math.floor(Math.random() * 50);
    
    if(no_repeat.length !== 1){
      for(let rr of no_repeat){
        console.log(rr);
        if(rr === num)
          num = rr + 1;
      }
  }
    //scelgo i top artisti random ogni volta
    const artista = json.artists.artist[num].name;
    no_repeat[i] = num;
    rest_url = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=' + artista + '&api_key=370cbc327ef7855832fe61b69b22c49f&format=json';

    fetch(rest_url).then(onResponseA).then(onJsonA);
  }
}


function onResponseA(response){
  return response.json();
}

function onJsonA(json){
  console.log('ecco il json per gli album last.fm');
  console.log(json);
  const img_album = json.topalbums.album[0].image[2]["#text"];
  const name_album = json.topalbums.album[0].name;
  const nome_artista = json.topalbums.album[0].artist.name;

  const contenitore = document.querySelector('#radAlbums');
  const cont_top = document.createElement('div');
  contenitore.appendChild(cont_top);

  //img album
  const c_img_album = document.createElement('img');
  c_img_album.src = img_album;
  cont_top.appendChild(c_img_album);

  //nome album
  const c_name_album = document.createElement('h2');
  c_name_album.textContent = name_album;
  cont_top.appendChild(c_name_album);

  //nome artista
  const c_nome_artista = document.createElement('h2');
  c_nome_artista.textContent = nome_artista;
  cont_top.appendChild(c_nome_artista);
}


//creao l'evento come trigger 'Random'
const eventoTop = document.querySelector('#random');
eventoTop.addEventListener('click', radAlbum)


  