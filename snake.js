// Variables declarates
let fruits = ['apple.png', 'platano.png', 'fresa.png'];
let grid = document.querySelector(".grid")
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay");
let topscore = document.querySelector(".score");
let first = document.querySelector('.start')
let playername = '';
let writescore = '';
let scorersordered = '';
let scorers = []
let width = 20;
let currentIndex = 0
let fruitIndex = 0
let currentSnake = [2, 1, 0]
let direction = 1
let score = 0
let speed = 0.980
let intervalTime = 0
let interval = 0
let baddir = 0
let test = 0


// First function loaded
document.addEventListener("DOMContentLoaded", function () {
    first.innerHTML = "Press something to start";
    createBoard()
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
    intervalTime = 200
    currentSnake = [2, 1, 0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add("snake"))
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
    squares[tail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0] + direction)
    // movement ends here  
    eatFruit(squares, tail)
    squares[currentSnake[0]].classList.add("snake")
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
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        return true
    } else {
        return false
    }
}

// When the snake eats a fruit
function eatFruit(squares, tail) {
    if (squares[currentSnake[0]].classList.contains("fruit")) {
        squares[fruitIndex].style.backgroundImage = "none";
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
    } while (squares[fruitIndex].classList.contains("snake"))
    squares[fruitIndex].style.backgroundImage = "url(fruits/" + fruits[Math.floor(Math.random() * fruits.length)] + ")";
    squares[fruitIndex].classList.add("fruit")
}

// Finish the game
function endgame() {
    playername = prompt('Type your name');
    if (!playername) { playername = 'Anonymous' }
    popup.style.display = "flex"
    scorers.push({ "score": score, "name": playername })
    playername = ''
    scorersordered = scorers.sort(orderValues("score", "desc"));
    for (row in scorersordered.slice(0, 4)) {
        writescore += scorersordered[row].name + " : " + scorersordered[row].score + '<br>';
        topscore.innerHTML = writescore;
    }
    playAgain.addEventListener("click", replay);
    score = 0;
    baddir = 0;
    writescore = ''
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
    popup.style.display = "none";
}