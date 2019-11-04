
// ** VARIABLES **
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let interval;
let frames = 0;
let rivals = [];
let field = new gameField();
let player = new Player();
let score = 0;
let level = 0;

// ** GAME FUNCTIONS **

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function gameOver(){
    clearInterval(interval)
}

function checkColitions(){

}

function createRivals(){
    for(i=0; i<(8+(level*1,5));i++){
        rivals.push(new Rival())
    }
}
function drawRivals(){
    rivals.forEach((e, i) => {
        e.changePosition()
        e.draw()
    })
}
function moveRivals(){
    rivals.forEach(e => e.move())
}
function animatePlayer(){
    if (frames%5==0){
        player.animate++
        rivals.forEach(e => e.animate++)
    }
}
function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = '25px Arial'
    ctx.fillText(`Score: ${score}`, 50, 30)
}

// MONTAR LISTENER PARA RECOGER EL HEADER UNA VEZ INICIADO EL JUEGO

document.onkeydown = e => {
    switch (e.keyCode) {
        case 37:
            player.moveLeft()
            return
        case 39:
            player.moveRight()
            return
        case 40:
            player.moveBack()
            return
        case 38:
            player.moveUp()
            return
        case 16:
            player.turbo()
    }  
  }

// ** FRAMES & UPDATES **

function update(){
    frames++
    clearCanvas()
    field.draw()
    drawRivals()
    animatePlayer()
    player.x += player.vx
    player.y += player.vy
    player.changePosition()
    player.draw()
    moveRivals()
    drawScore()
}

function startGame(){ 
    createRivals()
}

interval = setInterval(update, 1000/60)
createRivals()


