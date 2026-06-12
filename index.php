<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kurefy - Esplora i Generi</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="sidebar">
        <h2>Kurefy</h2>
        <nav>
            <a href="#" class="active">🎵 Esplora Generi</a>
        </nav>
        
        <div class="user-status">
            <span class="status-dot"></span>
            <p>Kurefy Attivo</p>
            <small style="color: var(--text-muted);">Multi-Categoria</small>
        </div>
    </div>

    <div class="main-content">
        <header class="categories-menu">
            <button class="genre-btn active" data-genre="j-pop">🌸 J-Pop</button>
            <button class="genre-btn" data-genre="rap">🎤 Rap</button>
            <button class="genre-btn" data-genre="jazz">🎷 Jazz</button>
            <button class="genre-btn" data-genre="classica">🎻 Classica</button>
            <button class="genre-btn" data-genre="rock">🎸 Rock</button>
            <button class="genre-btn" data-genre="pop">✨ Pop</button>
        </header>

        <main id="results-container">
            <div class="welcome-msg">
                <p>Caricamento della categoria...</p>
            </div>
        </main>
    </div>

    <div class="player">
        <div class="track-info">
            <img src="https://via.placeholder.com/50/e3d5ca/4a3728?text=K" alt="Cover" id="player-cover">
            <div>
                <h4 id="player-title">Nessun brano</h4>
                <p id="player-artist">Seleziona una traccia</p>
            </div>
        </div>
        <div class="player-controls">
            <button class="control-btn" id="prev-btn">⏮</button>
            <button class="control-btn play-btn" id="main-play-btn">▶</button>
            <button class="control-btn" id="next-btn">⏭</button>
        </div>
        <div class="volume-control">
            <span>🔊</span>
            <input type="range" id="volume-slider" min="0" max="100" value="50">
        </div>
    </div>

    <audio id="audio-player"></audio>

    <script src="script.js"></script>
</body>
</html>
