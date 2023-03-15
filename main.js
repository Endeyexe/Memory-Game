const colors = ["red", "blue", "green", "yellow","orange","purple","pink"]
let squareList = []
let numList = []
const content = document.getElementById("content")
const form = document.getElementById("form")
const userAnswer = document.getElementById('answer')
const squares = document.querySelectorAll('.square')
const modes = document.getElementById('modes')
const buttons = modes.getElementsByTagName("button")
let answer = ""
let showNums = false

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function hideSquares(){
    squares.forEach((square) => {
        square.style.backgroundColor = "#250F25"
        square.innerHTML = ""
    });
}

function showSquares(squareList, numList, showNums){
    for (let i=0; i<squareList.length; i++){
        squares[i].style.backgroundColor = squareList[i];
        if(showNums){squares[i].innerHTML = numList[i]}
    }
}

function disableButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        console.log("works?")
    }
}

function enableButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
}

async function startGame(viewTime){
    disableButtons()
    for (let i=0; i<4; i++){
        let color = colors[Math.floor(Math.random()*colors.length)]
        squareList.push(color)
        numList.push((Math.floor(Math.random()*10)).toString())
    }
    console.log(numList)
    showSquares(squareList, numList, showNums)
    await sleep(viewTime)
    hideSquares()
    userAnswer.disabled = false
    userAnswer.focus()
    if (showNums) {
        for (let i = 0; i < squareList.length; i++) {
            answer += `${squareList[i]} ${numList[i]} `
        }
        console.log(answer)
        answer = answer.trim() //to remove extra space at end
        console.log(answer)
    }
    else{answer = squareList.join(" ")}
}

function reset(){
    squareList = []
    numList = []
    answer = ""
    userAnswer.disabled = true
    content.style.backgroundColor = "#291429"
    userAnswer.value = ""
    hideSquares()
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (userAnswer.value.toLowerCase() == answer) {
        content.style.backgroundColor = "lime"
    }
    else{
        console.log("WRONG")
        content.style.backgroundColor = "maroon"
        userAnswer.value = answer
    }
    showSquares(squareList, numList, showNums)
    userAnswer.disabled = true
    enableButtons()
})
function gamemode1(){
    reset()
    showNums = false
    startGame(2000)
}

function gamemode2(){
    reset()
    showNums = true
    startGame(4000)
}