const songs = ["Twenty One Pilots - Chlorine",
               "Twenty One Pilots - Heathens",
               "Twenty One Pilots - Stressed Out",
               "Mac Miller - Everybody"]

var player = {
    currentIndex: Math.floor(Math.random()*songs.length),
    audio: document.getElementById("audio"),
    displayCover: function (track){
        const cover = document.getElementById("PlayerCover");
        var info = track.split("-");
        cover.setAttribute("src","Cover/"+info[1].trim()+".jpg");
    },
    displayTrack: function (track) {
        const artistTitle = document.querySelector(".player__artist");
        const songTitle = document.querySelector(".player__song");
        var info = track.split("-");
        artistTitle.textContent = info[0];
        songTitle.textContent = info[1];
    },
    load: function(){
        var track = songs[this.currentIndex];
        this.audio.src = "Music/"+track+".mp3";
        this.displayCover(track);
        this.displayTrack(track);
    },
    play: function(){
        const playButton = document.querySelector(".player__pause>i.fas");
        playButton.classList.add('fa-pause');
        playButton.classList.remove('fa-play');
        this.audio.play();
    },
    pause: function (){
        const playButton = document.querySelector(".player__pause>i.fas");
        playButton.classList.add('fa-play');
        playButton.classList.remove('fa-pause')
        this.audio.pause();
    },
    prev: function(){
        this.currentIndex--;
        
        if(this.currentIndex < 0) {
            this.currentIndex = songs.length - 1;
        }

        player.load();
        player.play();
    },
    next: function(){
        this.currentIndex++;

        if(this.currentIndex > songs.length - 1){
            this.currentIndex = 0 ;
        }

        player.load();
        player.play();
    },
    updateProgress: function(e){
        const progress = document.querySelector(".status__bar")
        const { duration, currentTime } = e.target;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    },
    setProgress: function(e){
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audio.duration;
    
        this.audio.currentTime = (clickX / width) * duration;
    },
    updateVolume: function(){
        this.audio.volume = volumeControl.value;
    }
}
const playBtn = document.querySelector(".player__pause");
const prevBtn = document.querySelector(".player__back");
const nextBtn = document.querySelector(".player__forward");
const progressContainer = document.querySelector(".player__status")
const volumeControl = document.getElementById("volume");
player.load();


playBtn.addEventListener('click', () => {
    const isPlaying = document.querySelector('.player__pause>i.fas').classList.contains('fa-play');
    if (isPlaying) {
        player.play();
    } else {
        player.pause();
    }
});

prevBtn.addEventListener('click', () => {player.prev()});
nextBtn.addEventListener('click', () => {player.next()});
player.audio.addEventListener('timeupdate',() => {player.updateProgress(event)});
progressContainer.addEventListener('click', () => {player.setProgress(event)});
volumeControl.addEventListener('change', () => {player.updateVolume()});
player.audio.addEventListener('ended', ()=> {player.next()});

