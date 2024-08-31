console.log('welcome to spotify');
const songAudio = new Audio('/spotify/src/sounds/humdard.mp3');
const heartAudio = new Audio('/spotify/src/sounds/heartbeat.mp3');
const tuhiAudio = new Audio('/spotify/src/sounds/tu hi ashique.mp3');
const  aaj = new Audio('/spotify/src/sounds/AAJ KI RAAT.mp3');
const dil = new Audio('/spotify/src/sounds/Dil meri nah sunne.mp3');
const love = new Audio('/spotify/src/sounds/Love me like you do.mp3');
const main = new Audio('/spotify/src/sounds/Main rang sharbaton ka.mp3');
const saude= new Audio('/spotify/src/sounds/Saudebaazi.mp3');
const tum = new Audio('/spotify/src/sounds/TUM SE HI.mp3');

// tuhiAudio.play();

//select buttons

const prevBtn = document.querySelector('#previous');
const masterplay = document.querySelector('#masterplay');
const pause = document.querySelector('#pause');
const nextBtn = document.querySelector('#next');
const songName = document.querySelector('#showSong');
const timing = document.querySelector('#timimg')
//array of songs

const songs = [
    { ele: songAudio, audioname: 'Humdard' , timingrate : '4:19' },
    { ele: heartAudio, audioname: 'Heartbeat'  , timingrate:'3:06'},
    { ele: tuhiAudio, audioname: 'Tu hi ashique' ,timingrate : '5:02' },
    {ele:aaj , audioname: 'AAJ KI RAAT' ,timingrate : '3:48'},
    {ele:dil , audioname: 'Dil meri nah sunne' , timingrate : '3:56'},
    {ele: love , audioname: 'Love me like you do' , timingrate :'4:13'},
    {ele: main , audioname: 'Main rang sharbaton' , timingrate : '4:23'},
    {ele:saude , audioname: 'Saudebaazi' , timingrate :'5:54'},
    {ele: tum , audioname: 'TUM SE HI' , timingrate:'5:23'},
];

let current = 0;
let currentsong = songs[current].ele;
songName.innerHTML = songs[current].audioname;
timing.innerHTML = songs[current].timingrate;

masterplay.addEventListener('click', () => {
    pause.classList.remove('hidden');
    masterplay.classList.add('hidden');
    currentsong.play();
    songName.innerHTML = songs[current].audioname;
    timing.innerHTML = songs[current].timingrate;
})

pause.addEventListener('click', () => {
    pause.classList.add('hidden');
    masterplay.classList.remove('hidden')
    currentsong.pause();
    songName.innerHTML = songs[current].audioname;
    timing.innerHTML = songs[current].timingrate;
})

nextBtn.addEventListener('click', () => {
    currentsong.pause();
    current = (current + 1) % songs.length;
    currentsong = songs[current].ele;
    currentsong.play();
    pause.classList.remove('hidden');
    masterplay.classList.add('hidden');
    songName.innerHTML = songs[current].audioname;
    timing.innerHTML = songs[current].timingrate;
})

prevBtn.addEventListener('click', () => {
    currentsong.pause();
    current = (current - 1 + songs.length) % songs.length;
    currentsong = songs[current].ele;
    currentsong.play();
    pause.classList.remove('hidden');
    masterplay.classList.add('hidden');
    songName.innerHTML = songs[current].audioname;
    timing.innerHTML = songs[current].timingrate;
})






