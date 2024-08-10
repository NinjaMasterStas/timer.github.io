const targetTime = new Date();

targetTime.setHours(22, 0, 0, 0);

const mainTime = document.querySelector(".app__main-time");
const milliTime = document.querySelector(".app__milli-time");

function time(){
    const date = new Date();
    const hours = date.getHours() > 10 ? date.getHours() : "0" + date.getHours();
    const minutes = date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes();
    const seconds = date.getSeconds() > 10 ? date.getSeconds() : "0" + date.getSeconds();
    const milliseconds = date.getMilliseconds();

    mainTime.innerText = `${hours}:${minutes}:${seconds}`;
    milliTime.innerText = milliseconds;
}
let flag = false;
const button = document.querySelector(".app__button");
const reactionText = document.querySelector(".app__reaction");
function startApp(){
    button.addEventListener("click", () => {
        const currentTime = new Date();
        if (flag) return;
        if (currentTime > targetTime) {
            const differenceInMilliseconds = currentTime - targetTime;
            const seconds = Math.floor(differenceInMilliseconds / 1000);
            const milliseconds = differenceInMilliseconds % 1000;

            reactionText.innerText = `Реакция: ${seconds} сек. ${milliseconds} милисек.`
            flag = true;
        }
        else{
            buttonDeactivate();
        }
    })
}

const errorText = document.querySelector(".app__error-time");
function buttonDeactivate() {
    button.disabled = true;
    errorText.style.visibility = "visible";
    const time = 500;
    const message = "Рано! Штраф: ";
    errorText.innerText = message + time;
    let timer = time;

    const interval = setInterval(() => {
        if (timer <= 0) {
            button.disabled = false;
            clearInterval(interval);
            errorText.style.visibility = "hidden";
        }
        else{
            errorText.innerText = message + timer;
            timer -= 1;
        }
    }, 0)
}

setInterval(time, 1);
startApp();

