let gameSeq = [];
let userSeq = [];
let highScore = 0;
let btns = ["red", "yellow", "green", "purple"];
let started = false;
let level = 0;
let h2 = document.querySelector(".h2");
let h3 = document.querySelector(".h3");

function start() {
    if (started == false) {
        console.log("game started");
        started = true;
        setTimeout(levelUp, 1000);
    }
}

document.addEventListener("click", function (event) {
    if (event.target.nodeName == "BUTTON")
        start();
});
document.addEventListener("keypress", start);

function levelUp() {
    userSeq = [];
    level++;
    if(level>highScore){
        highScore++;
    }
    h2.innerText = `Level ${level}`;
    h3.innerText = `Your highest Score is ${highScore-1}`;
    // console.log(`level = ${level}`);

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash();
}

function gameFlash() {
    let time = 500;
    for (color of gameSeq) {
        let gameBtn = document.querySelector(`.${color}`);
        setTimeout(function () {
            gameBtn.classList.add("gameflash")
        }, time);
        setTimeout(function () {
            gameBtn.classList.remove("gameflash");
        }, time + 250);
        time += 500;
    }
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else if (userSeq.length > gameSeq.length) {
        if (started == false)
            h2.innerHTML = `Press any key to start or <button class="start">Start</button>`;
    }
    else {
        h2.innerHTML = `Game Over ! Your Score Was <b>${level - 1}</b>.<br>Press any key to <button class="start">Restart</button> `;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white"
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    // userSeq.push(this.classList[1]);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    // console.log(userSeq);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}