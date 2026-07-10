const songs = [
    {
        title: "Majboor",
        artist: "Rehan & Zoha Waseem",
        src: "audio/hello1.mp3",
        cover: "download.jpg"
    },
    {
        title: "Udi UDi ",
        artist: "Neesh & Sarkar",
        src: "audio/hello1.mp3",
        cover: "abc.jpg"
    },
    {
        title: "Tere liye",
        src: "audio/hello2.mp3",
        artist: "Atif Aslam & Shreya Ghoshal",
        cover: "images.jpg"
    }
];

// Elements
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");

const volumeSlider = document.getElementById("volume-slider");
const volumeBtn = document.getElementById("volume-btn");

const playlistList = document.getElementById("playlist-list");

let currentSong = 0;

// Load Song
function loadSong(index) {
    const song = songs[index];

    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.src;

    updatePlaylist();
}

// Play Song
function playSong() {
    audio.play();
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
}

// Pause Song
function pauseSong() {
    audio.pause();
    playIcon.classList.remove("hidden");
    pauseIcon.classList.add("hidden");
}

// Toggle Play
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

// Next Song
function nextSong() {
    currentSong++;
    if (currentSong >= songs.length) currentSong = 0;

    loadSong(currentSong);
    playSong();
}

// Previous Song
function prevSong() {
    currentSong--;
    if (currentSong < 0) currentSong = songs.length - 1;

    loadSong(currentSong);
    playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Update Progress
audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    progress.value = (audio.currentTime / audio.duration) * 100;

    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
});

// Seek
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Format Time
function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// Auto Next
audio.addEventListener("ended", nextSong);

// Volume
audio.volume = volumeSlider.value;

volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

// Mute
volumeBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
});

// Playlist
function createPlaylist() {
    playlistList.innerHTML = "";

    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.className = "playlist-item";
        li.textContent = `${song.title} - ${song.artist}`;

        li.addEventListener("click", () => {
            currentSong = index;
            loadSong(currentSong);
            playSong();
        });

        playlistList.appendChild(li);
    });
}

function updatePlaylist() {
    const items = document.querySelectorAll(".playlist-item");

    items.forEach((item, index) => {
        item.classList.toggle("active", index === currentSong);
    });
}

// Initialize
createPlaylist();
loadSong(currentSong);