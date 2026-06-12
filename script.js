const resultsContainer = document.getElementById('results-container');
const audioPlayer = document.getElementById('audio-player');
const mainPlayBtn = document.getElementById('main-play-btn');
const volumeSlider = document.getElementById('volume-slider');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const genreButtons = document.querySelectorAll('.genre-btn');

let playlistTracks = []; 
let currentTrackIndex = -1; 

// Al caricamento, parte con la prima categoria (J-Pop)
window.onload = () => {
    loadGenreTracks('j-pop');
    setupCategoryMenu();
};

// Gestione dei pulsanti del menu
function setupCategoryMenu() {
    genreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Rimuove la classe attiva da tutti i pulsanti
            genreButtons.forEach(btn => btn.classList.remove('active'));
            // La aggiunge al pulsante cliccato
            button.classList.add('active');
            
            // Carica le canzoni del genere selezionato
            const selectedGenre = button.getAttribute('data-genre');
            loadGenreTracks(selectedGenre);
        });
    });
}

async function loadGenreTracks(genre) {
    resultsContainer.innerHTML = "<div class='welcome-msg'><p>Sintonizzazione in corso...</p></div>";
    audioPlayer.pause(); // Ferma la musica precedente al cambio genere
    
    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${genre}&media=music&limit=24`);
        if (!response.ok) throw new Error("Errore API");
        
        const data = await response.json();
        playlistTracks = data.results || [];
        displayTracks(playlistTracks);
    } catch (error) {
        console.error("Errore:", error);
        resultsContainer.innerHTML = "<div class='welcome-msg'><p>Errore nel caricamento di questa categoria.</p></div>";
    }
}

function displayTracks(tracks) {
    resultsContainer.innerHTML = ""; 

    if (tracks.length === 0) {
        resultsContainer.innerHTML = "<div class='welcome-msg'><p>Nessun brano trovato per questa categoria.</p></div>";
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'results-grid';

    tracks.forEach((track, index) => {
        const card = document.createElement('div');
        card.className = 'track-card';
        
        const title = track.trackName || "Titolo non disponibile";
        const artist = track.artistName || "Artista sconosciuto";
        const coverUrl = track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '300x300bb') : 'https://via.placeholder.com/300'; 

        card.innerHTML = `
            <div class="track-badge">#${index + 1}</div>
            <img src="${coverUrl}" alt="${title}">
            <h4>${title}</h4>
            <p>${artist}</p>
        `;

        card.addEventListener('click', () => {
            selectAndPlayTrack(index);
        });

        grid.appendChild(card);
    });

    resultsContainer.appendChild(grid);
}

function selectAndPlayTrack(index) {
    if (index < 0 || index >= playlistTracks.length) return;
    
    currentTrackIndex = index;
    const track = playlistTracks[currentTrackIndex];
    
    const title = track.trackName;
    const artist = track.artistName;
    const coverUrl = track.artworkUrl100.replace('100x100bb', '300x300bb');
    const previewUrl = track.previewUrl; 

    document.getElementById('player-title').innerText = title;
    document.getElementById('player-artist').innerText = artist;
    document.getElementById('player-cover').src = coverUrl;
    
    if (previewUrl) {
        audioPlayer.src = previewUrl;
        audioPlayer.play();
        mainPlayBtn.innerText = "⏸";
    }
}

// Controlli del player
mainPlayBtn.addEventListener('click', () => {
    if (!audioPlayer.src) {
        if (playlistTracks.length > 0) selectAndPlayTrack(0);
        return;
    }
    if (audioPlayer.paused) {
        audioPlayer.play();
        mainPlayBtn.innerText = "⏸";
    } else {
        audioPlayer.pause();
        mainPlayBtn.innerText = "▶";
    }
});

nextBtn.addEventListener('click', () => {
    if (playlistTracks.length === 0) return;
    let nextIndex = currentTrackIndex + 1;
    if (nextIndex >= playlistTracks.length) nextIndex = 0;
    selectAndPlayTrack(nextIndex);
});

prevBtn.addEventListener('click', () => {
    if (playlistTracks.length === 0) return;
    let prevIndex = currentTrackIndex - 1;
    if (prevIndex < 0) prevIndex = playlistTracks.length - 1;
    selectAndPlayTrack(prevIndex);
});

volumeSlider.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value / 100;
});

audioPlayer.addEventListener('ended', () => {
    nextBtn.click();
});