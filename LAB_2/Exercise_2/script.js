const audio = document.getElementById("audioPlayer");
const video = document.getElementById("videoPlayer");

const audioTime = document.getElementById("audioTime");
const videoTime = document.getElementById("videoTime");

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return min + ":" + (sec < 10 ? "0" + sec : sec);
}

audio.addEventListener("timeupdate", () => {
    audioTime.textContent = formatTime(audio.currentTime);
});

video.addEventListener("timeupdate", () => {
    videoTime.textContent = formatTime(video.currentTime);
});
