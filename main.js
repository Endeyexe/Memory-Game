const colors = ["red", "blue", "green", "yellow", "purple", "orange"]
let answerList = []
const content = document.getElementById("content")
const form = document.getElementById("form")
const userAnswer = document.getElementById('answer')
const squares = document.querySelectorAll('.square');


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function hideSquares(){
    squares.forEach(square => square.style.backgroundColor = "white");
}
function showSquares(answerList){
    for (let i=0; i<answerList.length; i++){
        squares[i].style.backgroundColor = answerList[i];

    }
}
async function startGame(viewTime){
    for (let i=0; i<colors.length; i++){
        answerList.push(colors[Math.floor(Math.random()*colors.length)])
    }
    showSquares(answerList)
    await sleep(viewTime)
    hideSquares()
    userAnswer.disabled = false
    userAnswer.focus()
    answer = answerList.join(" ")
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
    showSquares(answerList)
    userAnswer.disabled = true
})

startGame(2000)

