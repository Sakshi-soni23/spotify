console.log('welcome to spotify');
const songAudio = new Audio('/src/sounds/humdard.mp3');
const heartAudio = new Audio('/src/sounds/heartbeat.mp3');
const tuhiAudio = new Audio('/src/sounds/tu hi ashique.mp3');
// tuhiAudio.play();

//select buttons

const prevBtn = document.querySelector('#previous');
const masterplay = document.querySelector('#masterplay');
const pause = document.querySelector('#pause');
const nextBtn = document.querySelector('#next');
const songName = document.querySelector('#showSong');
//array of songs

const songs = [
    { ele: songAudio, audioname: 'Humdard' },
    { ele: heartAudio, audioname: 'Heartbeat' },
    { ele: tuhiAudio, audioname: 'Tu hi ashique' },
];

let current = 0;
let currentsong = songs[current].ele;
songName.innerHTML = songs[current].audioname;

masterplay.addEventListener('click', () => {
    pause.classList.remove('hidden');
    masterplay.classList.add('hidden');
    currentsong.play();
    songName.innerHTML = songs[current].audioname;
})

pause.addEventListener('click', () => {
    pause.classList.add('hidden');
    masterplay.classList.remove('hidden')
    currentsong.pause();
    songName.innerHTML = songs[current].audioname;
})

nextBtn.addEventListener('click', () => {
    currentsong.pause();
    current = (current + 1) % songs.length;
    currentsong = songs[current].ele;
    currentsong.play();
    pause.classList.remove('hidden');
    masterplay.classList.add('hidden');
    songName.innerHTML = songs[current].audioname;
})

prevBtn.addEventListener('click', () => {
    currentsong.pause();
    current = (current - 1 + songs.length) % songs.length;
    currentsong = songs[current].ele;
    currentsong.play();
    pause.classList.remove('hidden');
    masterplay.classList.add('hidden');
    songName.innerHTML = songs[current].audioname;
})






