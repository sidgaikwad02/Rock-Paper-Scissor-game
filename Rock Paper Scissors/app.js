let userScore = 0;
let compScore = 0;
let winningStreak = 0;
let bestScore = localStorage.getItem("bestScore") || 0;

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const msg = document.querySelector("#msg");
const streakPara = document.querySelector("#streak");
const bestScorePara = document.querySelector("#best-score");
const choices = document.querySelectorAll(".choice");
const themeToggleBtn = document.querySelector("#theme-toggle");

const winSound = document.querySelector("#win-sound");
const loseSound = document.querySelector("#lose-sound");
const drawSound = document.querySelector("#draw-sound");
const clickSound = document.querySelector("#click-sound");

bestScorePara.innerText = `Best Score: ${bestScore}`;

const getComputerChoice = () => {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

const drawGame = () => {
    msg.innerText = "Game was Draw. Play again!";
    msg.style.backgroundColor = "#081b31";
    drawSound.play();
}

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin) {
        userScore++;
        updateBestScore();
        winningStreak++;
        streakPara.innerText = `Winning Streak: ${winningStreak}`;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.classList.remove("lose");
        msg.classList.add("win");
        winSound.play();
    } else {
        compScore++;
        winningStreak = 0;
        streakPara.innerText = `Winning Streak: ${winningStreak}`;
        compScorePara.innerText = compScore;
        msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
        msg.classList.remove("win");
        msg.classList.add("lose");
        loseSound.play();
    }
}

const updateBestScore = () => {
    if (userScore > bestScore) {
        bestScore = userScore;
        localStorage.setItem("bestScore", bestScore);
        bestScorePara.innerText = `Best Score: ${bestScore}`;
    }
}

const playGame = (userChoice) => {
    const compChoice = getComputerChoice();

    if (userChoice === compChoice) {
        drawGame();
    } else if (
        (userChoice === "rock" && compChoice === "scissors") ||
        (userChoice === "paper" && compChoice === "rock") ||
        (userChoice === "scissors" && compChoice === "paper")
    ) {
        showWinner(true, userChoice, compChoice);
    } else {
        showWinner(false, userChoice, compChoice);
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        clickSound.play();
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    document.body.classList.toggle("dark-theme");
});
