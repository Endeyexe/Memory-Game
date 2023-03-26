const colors = ["red", "blue", "green", "yellow","orange","purple","pink"]
const shapes = ['square', 'triangle', 'star', 'circle']
let boxList = []
let numList = []
let shapeList = []
const content = document.getElementById("content")
const form = document.getElementById("form")
const userAnswer = document.getElementById('answer')
const boxes = document.querySelectorAll('.boxes')
const modes = document.getElementById('modes')
const buttons = modes.getElementsByTagName("button")
let answer = ""
let showNums = false
let showShapes = false

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function hideBoxes(){
    boxes.forEach((box) => {
        box.style.backgroundColor = "#250F25"
        box.innerHTML = ""
        box.style.backgroundImage = "none";
    });
}

function showBoxes(){
    for (let i=0; i<boxList.length; i++){
        boxes[i].style.backgroundColor = boxList[i];
        if(showNums){boxes[i].innerHTML = numList[i]}
        if(showShapes) {boxes[i].style.backgroundImage = `url(./shapes/${shapeList[i]}.png)`}
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
function randomizeValues(){
    for (let i=0; i<4; i++){
        let color = colors[Math.floor(Math.random()*colors.length)]
        boxList.push(color)
        if(showNums) numList.push((Math.floor(Math.random()*10)).toString())
        if(showShapes) {
            let shape = shapes[Math.floor(Math.random()*shapes.length)]
            shapeList.push(shape)
        }
    }
}

async function startGame(viewTime){
    disableButtons()
    randomizeValues()
    showBoxes()
    await sleep(viewTime)
    hideBoxes()
    userAnswer.disabled = false
    userAnswer.focus()
    if (showShapes) {
        for (let i = 0; i < boxList.length; i++) {
            answer += `${boxList[i]} ${shapeList[i]} `
            if (showNums){answer += numList[i] += ' '}
        }
        answer = answer.trim() //to remove extra space at end
    }
    else{answer = boxList.join(" ")}
}

function reset(){
    boxList = []
    numList = []
    shapeList = []
    showNums = false
    showShapes = false
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
    showShapes = true;
    startGame(4000)
}

function gamemode3(){
    reset()
    showNums = true
    showShapes = true
    startGame(6000)
}