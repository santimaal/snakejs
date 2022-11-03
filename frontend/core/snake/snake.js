// Variables declarates
let fruits = ['apple.png', 'platano.png', 'fresa.png'];
let grid = document.querySelector(".grid")
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let logout = document.querySelector(".logout");
let scoreDisplay = document.querySelector(".scoreDisplay");
let topscore = document.querySelector(".score");
let first = document.querySelector('.start')
let displayuser = document.querySelector('.displayuser')
let playername = '';
let writescore = '';
let scorersordered = '';
let scorers = []
let scorersEasy = []
let scorersMedium = []
let scorersHard = []
let scorersOrEasy = document.querySelector(".scoreEasy");
let scorersOrMedium = document.querySelector(".scoreMedium");
let scorersOrHard = document.querySelector(".scoreHard");
let width = 20;
let currentIndex = 0
let fruitIndex = 0
let currentSnake = [2, 1, 0]
let direction = 1
let score = 0
let speed = 0.980
let intervalTime = 0
let interval = 0
let baddir = 'ArrowLeft'
let test = 0

// First function loaded
document.addEventListener("DOMContentLoaded", function () {
    settings()
    localStorage.setItem("settings", JSON.stringify({ block: false, speed: 200 }));
    if (!localStorage.getItem("token")) { location.href = "../login/form.html" }
    if (localStorage.getItem("background")) {
        grid.classList.add("customgrid")
        grid.style.backgroundImage = "url(" + localStorage.getItem("background") + ")"
    } else {
        grid.classList.add("normalgrid")
    }
    first.innerHTML = "Press something to start";
    createBoard()
    createNav()
    topScorer()
})

function settings() {

    // BLOCKS
    document.getElementById("blocks").innerHTML = "Blocks: NO"
    document.getElementById("blocks").addEventListener("click", function () {
        let lsblock = JSON.parse(localStorage.getItem("settings")).block
        let ls = JSON.parse(localStorage.getItem("settings"))
        if (lsblock == true) {
            ls.block = false;
            localStorage.setItem("settings", JSON.stringify(ls))
            document.getElementById("blocks").innerHTML = "Blocks: NO"
        } else {
            ls.block = true;
            localStorage.setItem("settings", JSON.stringify(ls))
            document.getElementById("blocks").innerHTML = "Blocks: YES"
        }
    })

    // DIFFICULTY
    document.getElementById("speed").innerHTML = "EASY"
    document.getElementById("speed").addEventListener("click", function () {
        try {
            let ls = JSON.parse(localStorage.getItem("settings"))
            if (ls.speed == 200) {
                document.getElementById("speed").innerHTML = "MEDIUM"
                ls.speed = 150;
                localStorage.setItem("settings", JSON.stringify(ls))
            } else if (ls.speed == 150) {
                document.getElementById("speed").innerHTML = "HARD"
                ls.speed = 100;
                localStorage.setItem("settings", JSON.stringify(ls))
            } else if (ls.speed == 100) {
                document.getElementById("speed").innerHTML = "EASY"
                ls.speed = 200;
                localStorage.setItem("settings", JSON.stringify(ls))
            } else {
                document.getElementById("speed").innerHTML = "CRIMINAL"
                ls.speed = 20;
                localStorage.setItem("settings", JSON.stringify(ls))
            }
        } catch (e) {
            document.getElementById("speed").innerHTML = "CRIMINAL"
            localStorage.setItem("settings", JSON.stringify({ speed: 20 }))
        }

    })

    // SCORE
    async function random() {
        const random = await fetch("https://randomuser.me/api/");
        return random.json()
    }

    if (!localStorage.getItem('easy')) {
        localStorage.setItem("easy", "W3sic2NvcmUiOjI4LCJuYW1lIjoiTGF1cmVuIn0seyJzY29yZSI6MjAsIm5hbWUiOiJSYXVsIn0seyJzY29yZSI6MTYsIm5hbWUiOiJabGF0YSJ9LHsic2NvcmUiOjAsIm5hbWUiOiJzYW50aWgifV0=")
    }

    if (!localStorage.getItem('medium')) {
        localStorage.setItem("medium", "W3sic2NvcmUiOjIxLCJuYW1lIjoiSGVyYmVydCJ9LHsic2NvcmUiOjEzLCJuYW1lIjoiRGFyc2gifSx7InNjb3JlIjoxMywibmFtZSI6IkNhbmRlbOFyaWEifSx7InNjb3JlIjowLCJuYW1lIjoic2FudGloIn1d")

    }
    if (!localStorage.getItem('hard')) {
        localStorage.setItem("hard", "W3sic2NvcmUiOjI5LCJuYW1lIjoiTWlrYWVsIn0seyJzY29yZSI6MTgsIm5hbWUiOiJFbGl6YWJldGgifSx7InNjb3JlIjoxNiwibmFtZSI6Ik1hbHVzaGEifSx7InNjb3JlIjo5LCJuYW1lIjoiQWxtZXJpbmRhIn1d")
    }
}

function topScorer() {

    // localStorage.getItem("easy") ? scorersEasy = JSON.parse(atob(localStorage.getItem("easy"))) && reloadScore(scorersOrEasy, JSON.parse(atob(localStorage.getItem("easy"))).slice(0, 4)): false;
    // localStorage.getItem("medium") ? reloadScore(scorersOrMedium, JSON.parse(atob(localStorage.getItem("medium"))).slice(0, 4)) : false;
    // localStorage.getItem("hard") ? reloadScore(scorersOrHard, JSON.parse(atob(localStorage.getItem("hard"))).slice(0, 4)) : false;


    if (localStorage.getItem("easy")) {
        let scoreE = JSON.parse(atob(localStorage.getItem("easy")));
        scorersEasy = scoreE;
        reloadScore(scorersOrEasy, scorersEasy.slice(0, 4))
    }
    if (localStorage.getItem("medium")) {
        let scoreE = JSON.parse(atob(localStorage.getItem("medium")));
        scorersMedium = scoreE;
        reloadScore(scorersOrMedium, scorersMedium.slice(0, 4))
    }
    if (localStorage.getItem("hard")) {
        let scoreE = JSON.parse(atob(localStorage.getItem("hard")));
        scorersHard = scoreE;
        reloadScore(scorersOrHard, scorersHard.slice(0, 4))
    }
}

function createNav() {
    let div = document.querySelector(".user")
    div.innerHTML = atob(localStorage.getItem("token")).toUpperCase()
    let img = document.querySelector(".imgusr")
    img.src = "https://avatars.dicebear.com/api/personas/" + atob(localStorage.getItem("token")) + ".svg"
}

logout.addEventListener('click', function () {
    location.href = '../login/form.html';
})

// Read the arrows 
let arrows = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
document.addEventListener('keydown', (event) => {
    if (test == 0) {
        test++;
        first.style.display = 'none';
        startGame()
    }
    if (arrows.includes(event.key)) {
        //bottom 10 left -1 up -10 right 1
        if (event.key != baddir) {
            if (event.key == 'ArrowUp') {
                direction = -width
                baddir = 'ArrowDown'
            } else if (event.key == 'ArrowDown') {
                direction = +width
                baddir = 'ArrowUp'
            } else if (event.key == 'ArrowLeft') {
                direction = -1
                baddir = 'ArrowRight'
            } else if (event.key == 'ArrowRight') {
                direction = 1
                baddir = 'ArrowLeft'
            }
        }
    }
});

// Create de board
function createBoard() {
    popup.style.display = "none";
    for (let i = 0; i < 300; i++) {
        let div = document.createElement("div")
        grid.appendChild(div)
    }
}

// Start the game
function startGame() {
    let squares = document.querySelectorAll(".grid div")
    randomFruit(squares)
    //random fruit 
    direction = 1
    scoreDisplay.innerHTML = "Current score: " + 0
    intervalTime = JSON.parse(localStorage.getItem("settings")).speed
    currentSnake = [2, 1, 0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add("snake"))
    squares[2].classList.add('head_right')
    interval = setInterval(moveOutcome, intervalTime)
}

// Check if the snake hit the border of the board
function moveOutcome() {
    let squares = document.querySelectorAll(".grid div")
    if (checkForHits(squares)) {
        endgame();
        return clearInterval(interval)
    } else {
        moveSnake(squares)
    }
}

// Move the snake
function moveSnake(squares) {
    let tail = currentSnake.pop()
    squares[currentSnake[0]].classList.remove('head');
    squares[currentSnake[0]].classList.remove('head_down');
    squares[currentSnake[0]].classList.remove('head_up');
    squares[currentSnake[0]].classList.remove('head_left');
    squares[currentSnake[0]].classList.remove('head_right');
    squares[tail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0] + direction)
    // movement ends here  
    eatFruit(squares, tail)
    squares[currentSnake[1]].classList.add("snake")
    if (baddir == 'ArrowUp') {
        squares[currentSnake[0]].classList.add("head_down")
        squares[currentSnake[0]].classList.add('head');
    } else if (baddir == 'ArrowDown') {
        squares[currentSnake[0]].classList.add("head_up")
        squares[currentSnake[0]].classList.add('head');
    }
    else if (baddir == 'ArrowLeft') {
        squares[currentSnake[0]].classList.add("head_right")
        squares[currentSnake[0]].classList.add('head');
    }
    else if (baddir == 'ArrowRight') {
        squares[currentSnake[0]].classList.add("head_left")
        squares[currentSnake[0]].classList.add('head');
    }
}

// Check if the snake hit himself or hit the border of the board
function checkForHits(squares) {
    try {
        squares[currentSnake[0] + direction].classList.contains("snake")
    }
    catch (err) {
        return true
    }
    if (
        (currentSnake[0] + width >= (width * width) && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake") ||
        squares[currentSnake[0] + direction].classList.contains("block")

    ) {
        return true
    } else {
        return false
    }
}

// When the snake eats a fruit
function eatFruit(squares, tail) {
    if (squares[currentSnake[0]].classList.contains("fruit")) {
        squares[fruitIndex].style.backgroundImage = "";
        squares[currentSnake[0]].classList.remove("fruit")
        squares[tail].classList.add("snake")
        currentSnake.push(tail)
        randomFruit(squares)
        score++
        scoreDisplay.textContent = "Current score: " + score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcome, intervalTime)
    }
}

// Generate other fruit random
function randomFruit(squares) {
    do {
        fruitIndex = Math.floor(Math.random() * squares.length)
        blockIndex = Math.floor(Math.random() * squares.length)
    } while (squares[fruitIndex].classList.contains("snake") || squares[fruitIndex].classList.contains("head") || squares[blockIndex].classList.contains("snake") || squares[blockIndex].classList.contains("head") || squares[fruitIndex].classList.contains("block"))
    squares[fruitIndex].style.backgroundImage = "url(fruits/" + fruits[Math.floor(Math.random() * fruits.length)] + ")";
    squares[fruitIndex].classList.add("fruit")

    JSON.parse(localStorage.getItem("settings")).block == true ? squares[blockIndex].classList.add("block") : false;
    // if (JSON.parse(localStorage.getItem("settings")).block == "yes") {
    // }
}

// Finish the game
function endgame() {
    popup.style.display = "flex"
    if (JSON.parse(localStorage.getItem('settings')).speed == 200) {
        scoreType(scorersEasy, scorersOrEasy, 'easy')
    } else if (JSON.parse(localStorage.getItem('settings')).speed == 150) {
        scoreType(scorersMedium, scorersOrMedium, 'medium')
    } else {
        scoreType(scorersHard, scorersOrHard, 'hard')
    }
    // scorers.push({ "score": score, "name": atob(localStorage.getItem("token")) })
    // playername = '';
    // writescore = '';
    // scorersordered = scorers.sort(orderValues("score", "desc"));
    // localStorage.setItem("top_scorer", btoa(JSON.stringify(scorersordered)))
    // for (let row in scorersordered.slice(0, 4)) {
    //     writescore += scorersordered[row].name + " : " + scorersordered[row].score + '<br>';
    //     topscore.innerHTML = writescore;
    // }
    playAgain.addEventListener("click", replay);
    score = 0;
    baddir = 0;
    writescore = ''
}


function scoreType(scoretype, reload, LStype) {
    scoretype.push({ "score": score, "name": atob(localStorage.getItem("token")) });
    scorersordered = scoretype.sort(orderValues("score", "desc"));
    localStorage.setItem(LStype, btoa(JSON.stringify(scorersordered)))
    reloadScore(reload, scorersordered)
}


function reloadScore(reload, orderedvalue) {
    writescore = '';
    for (let row in orderedvalue.slice(0, 4)) {
        writescore += orderedvalue[row].name + " : " + orderedvalue[row].score + '<br>';
        reload.innerHTML = writescore;
    }
}

// To order the top score
function orderValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}

// Replay the game
function replay() {
    grid.innerHTML = ""
    createBoard()
    startGame()
    baddir = 'ArrowLeft';
    popup.style.display = "none";
}