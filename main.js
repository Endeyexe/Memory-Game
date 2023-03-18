const colors = ["red", "blue", "green", "yellow","orange","purple","pink"]
let boxList = []
let numList = []
const content = document.getElementById("content")
const form = document.getElementById("form")
const userAnswer = document.getElementById('answer')
const boxes = document.querySelectorAll('.boxes')
const modes = document.getElementById('modes')
const buttons = modes.getElementsByTagName("button")
let answer = ""
let showNums = false

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function hideBoxes(){
    boxes.forEach((box) => {
        box.style.backgroundColor = "#250F25"
        box.innerHTML = ""
    });
}

function showBoxes(boxList, numList, showNums){
    for (let i=0; i<boxList.length; i++){
        boxes[i].style.backgroundColor = boxList[i];
        if(showNums){boxes[i].innerHTML = numList[i]}
    }
}

function disableButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
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
        boxList.push(color)
        numList.push((Math.floor(Math.random()*10)).toString())
    }
    showBoxes(boxList, numList, showNums)
    await sleep(viewTime)
    hideBoxes()
    userAnswer.disabled = false
    userAnswer.focus()
    if (showNums) {
        for (let i = 0; i < boxList.length; i++) {
            answer += `${boxList[i]} ${numList[i]} `
        }
        answer = answer.trim() //to remove extra space at end
    }
    else{answer = boxList.join(" ")}
}

function reset(){
    boxList = []
    numList = []
    answer = ""
    userAnswer.disabled = true
    content.style.backgroundColor = "#291429"
    userAnswer.value = ""
    hideBoxes()
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (userAnswer.value.toLowerCase() == answer) {
        content.style.backgroundColor = "lime"
    }
    else{
        content.style.backgroundColor = "maroon"
    }
    showBoxes(boxList, numList, showNums)
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