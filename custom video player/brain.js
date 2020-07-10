let vid = document.querySelector("video");
let Currenttime = document.querySelector(".remaning-time");
let TotalTime = document.querySelector(".total-time");
let overlay = document.querySelector(".play-pause");
window.addEventListener('load', () => {
    const Buttons = document.querySelector(".play-pause");
    AddPlayAndPauseFunction(Buttons);
})

let AddPlayAndPauseFunction = (Btn) => {
    Btn.addEventListener('click', (e) => {
        // alert("Bingo")
        console.log(e.target)
        if (e.target.classList.contains('play')) {
            // alert("Video is start");
            vid.play();
            document.querySelector(".playAndpause").innerHTML = `<i class="fas fa-pause-circle pause"></i>`;
        }
        else if (e.target.classList.contains("pause")) {
            // alert("Video is stoped");
            vid.pause();
            document.querySelector(".playAndpause").innerHTML = `<i class="fas fa-play-circle play"></i>`;
        }
    })


}



overlay.addEventListener("mouseover", () => {
    document.querySelector(".menu").style.transform = 'translateY(0px)';
})
document.querySelector(".menu").addEventListener("mouseleave", () => {
    setTimeout(() => {
        document.querySelector(".menu").style.transform = 'translateY(300px)';
    }, 3000);
})



document.querySelector("#seekControl").addEventListener("input", (e) => {
    vid.currentTime = vid.duration * (e.target.value / 100);
    // console.log(vid.currentTime)
    if (vid.currentTime === vid.duration) {
        e.target.value = 0;
    }
    slideranimation(e.target.value);
})


vid.addEventListener('timeupdate', () => {
    let slider = document.querySelector("#seekControl");
    let vidNewTime = vid.currentTime * (100 / vid.duration);
    slider.value = vidNewTime;
    slideranimation(slider.value);
    let curMin = Math.floor(vid.currentTime / 60);
    let curSec = Math.floor(vid.currentTime - curMin * 60);
    let TotalMin = Math.floor(vid.duration / 60);
    // console.log(`CurrentTime: ${vid.duration}: CurrentSec: ${TotalMin}`)
    let TotalSec = Math.floor(vid.duration - TotalMin * 60);

    if (curSec < 10) {
        curSec = `0${curSec}`
    }
    if (TotalSec < 10) {
        TotalSec = `0${TotalSec}`
    }
    // console.log(TotalMin,TotalSec)
    Currenttime.innerHTML = `${curMin}:${curSec}`;
    TotalTime.innerHTML = `${TotalMin}:${TotalSec}`;
})



let slideranimation = (data) => {
    let fill = document.querySelector(".fill");
    fill.style.width = `${data}%`
}



document.querySelector('.volumeup').addEventListener("mouseover", () => {
    document.querySelector(".volume-cover").style.opacity = '1';
    document.querySelector(".volume-cover").style.pointerEvents = 'all';
})


document.querySelector('.volume-cover').addEventListener("mouseleave", mouseleaveHandle, false);
function mouseleaveHandle() {
    setTimeout(() => {
        document.querySelector(".volume-cover").style.opacity = '0';
        document.querySelector(".volume-cover").style.pointerEvents = 'none';
    }, 2000);
}


document.querySelector("#volume").addEventListener("input", (e) => {
    // console.log(e.target.value)
    vid.volume = e.target.value / 100;
    // console.log(vid.muted)
    if (vid.muted) {
        document.querySelector(".volumeup").innerHTML = `<i class="fas fa-volume-mute"></i>`
    }
    else if (e.target.value > 50) {
        document.querySelector(".volumeup").innerHTML = `<i class="fas fa-volume-up"></i>`
    }
    else if (e.target.value < 50 && e.target.value > 0) {
        document.querySelector(".volumeup").innerHTML = `<i class="fas fa-volume-down"></i>`
    }
    else {
        console.log("Bingo", e.target.value)
        document.querySelector(".volumeup").innerHTML = `<i class="fas fa-volume-off"></i>`
    }
    document.querySelector(".volume-percent").innerHTML = e.target.value + '%';
})

document.querySelector('.volumeup').addEventListener("click", (e) => {
    console.log(vid.muted)
    if (!vid.muted) {
        vid.muted = true;
        document.querySelector(".volumeup").innerHTML = `<i class="fas fa-volume-mute"></i>`;
    }
    else {
        let volume_data = document.querySelector("#volume");
        vid.muted = false;

        if (volume_data.value > 50) {
            document.querySelector(".volumeup").innerHTML = `<i class="fas fa-volume-up"></i>`;
        }
        else if (volume_data.value < 50 && volume_data.value > 0) {
            document.querySelector(".volumeup").innerHTML = `<i class="fas fa-volume-down"></i>`;
        }
        else {
            document.querySelector(".volumeup").innerHTML = `<i class="fas fa-volume-off"></i>`;
        }
    }
})

document.querySelector(".fullScreen").addEventListener("click", (e) => {
    if (e.target.classList.contains('fullScreen')) {
        vid.style.width = "100%";
        vid.style.height = "100%";
        vid.style.borderRadius = "0px";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.firstElementChild.style.borderBottomLeftRadius = '0px';
        overlay.firstElementChild.style.borderBottomRightRadius = '0px';
        document.querySelector(".fullScreen").innerHTML = `<i class="fas fa-compress fullScreenexit"></i>`;
    }
    else {
        vid.style.width = "";
        vid.style.height = "";
        vid.style.borderRadius = "20px";
        overlay.style.width = "";
        overlay.style.height = "";
        overlay.firstElementChild.style.borderBottomLeftRadius = '20px';
        overlay.firstElementChild.style.borderBottomRightRadius = '20px';
        document.querySelector(".fullScreen").innerHTML = `<i class="fas fa-expand fullScreen"></i>`;
    }

})

overlay.addEventListener('click',() => {
    document.querySelector(".menu").style.transform = 'translateY(0px)';
})