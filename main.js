const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchButton');
const searchResult = document.getElementById('searchResult');

function searchItem(title, artist){
    const result = 
    `
<div class="col-md-9">
    <h3 class="lyrics-name">${title}</h3>
    <p class="author lead">Album by <span>${artist}</span></p>
</div>
<div class="col-md-3 text-md-right text-center">
    <button onclick="showLyrics(event,'${artist}', '${title}') " class="btn btn-success">Get Lyrics</button>
</div>
    `;
    return result;
}

function searchAction(){
    if(searchInput.value){
        searchResult.innerHTML = "";    
        fetch(`https://api.lyrics.ovh/suggest/${searchInput.value}`)
        .then(response => response.json())
        .then(data => {
            data.data.map((item, index) => {
                if(index < 10){
                    singleResult = document.createElement('div');
                    const classList = ["single-result", "row", "align-items-center", "my-3", "p-3"];
                    singleResult.classList.add(...classList);    
                    singleResult.innerHTML = searchItem(item.title, item.artist.name);
                    searchResult.appendChild(singleResult);
                    }
            })
        })
        .catch(err => alert(err));
    }
}

function lyricsFind(artist, title, div){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(response => response.json())
        .then(data => {
            if(data.lyrics){
                div.innerText =`${data.lyrics}`;
            }else{
                div.innerHTML = "<h3 class='text-danger'>No Lyrics Found!</h3>";
            }            
        })    
}


function showLyrics(event, artist, title){
    const previous = document.querySelector('.lyrics');
    if(previous){
        previous.parentNode.removeChild(previous);
    }

    const lyricsDiv = document.createElement('div');
    const classList = ['lyrics', 'col-md-12', 'text-center'];
    lyricsDiv.classList.add(...classList);
    lyricsFind(artist, title, lyricsDiv);
    event.target.parentNode.parentNode.appendChild(lyricsDiv);
}


searchBtn.addEventListener('click', searchAction);