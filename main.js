
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
let fans = new Image();
fans.src = 'img/try1.gif'
let cacheArray = []
let cacheString = ''
let specialString = ''
let cache = [[0,0,0,1],[0,0,0,1]]

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
    ctx.fillText(`Level: ${level}`, 570, 30)
}
function winCheck(){
    if (player.y <= 75){
        score += 5

    }
}
function keyCombine(movesArray, specialArray){
    cache.push(movesArray)
    // upleft
    if (cache[cache.length-1].indexOf('1') == 0 && cache[cache.length-2].indexOf('1')== 3){
        player.upLeft()
        console.log('1')
    } else if (cache[cache.length-1].indexOf('1')==3 && cache[cache.length-2].indexOf('1')==0){
        player.upLeft()
        console.log('2')
    }else if (cache[cache.length-1].indexOf('1')==0 && cache[cache.length-2].indexOf('1')==0){
        player.left()
        console.log('3')
    } else if (cache[cache.length-1].indexOf('1')==3 && cache[cache.length-2].indexOf('1')==3){
        player.up()
        console.log('4')
    } else if (cache[cache.length-1].indexOf('1')==2 && cache[cache.length-2].indexOf('1')==0){
        player.downLeft()
        console.log('5')
    } else if (cache[cache.length-1].indexOf('1')==0 && cache[cache.length-2].indexOf('1')==2){
        player.downLeft()
        console.log('6')
    } else if (cache[cache.length-1].indexOf('1')==1 && cache[cache.length-2].indexOf('1')==3){
        player.upRight()
        console.log('7')
    } else if (cache[cache.length-1].indexOf('1')==3 && cache[cache.length-2].indexOf('1')==1){
        player.upRight()
        console.log('8')
    } else if (cache[cache.length-1].indexOf('1')==2 && cache[cache.length-2].indexOf('1')==1){
        player.downRight()
        console.log('9')
    } else if (cache[cache.length-1].indexOf('1')==1 && cache[cache.length-2].indexOf('1')==2){
        player.downRight()
        console.log('10')
    } else if (cache[cache.length-1].indexOf('1')==1 && cache[cache.length-2].indexOf('1')==1){
        player.right()
        console.log('11')
    } else if (cache[cache.length-1].indexOf('1')==2 && cache[cache.length-2].indexOf('1')==2){
        player.down()
        console.log('12')
    } 
    if (specialArray.charAt(1)==0){
        if (player.turboStatus){
            player.turboStatus = false
        } else{
            player.turboStatus = true
        }
        player.turbo()
    } else if (specialArray.charAt(1)==1){
        player.run()
    }
}
    
    /* FUNCIÓN DE GANAR
    if (score>10.000){
        clearInterval(interval)
        level++
        startGame()
    }
    */
        /*
        clearInterval(interval)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(fans, 250, 300, 300, 200)*/
function startGame(){ 
    createRivals()
}
// MONTAR LISTENER PARA RECOGER EL HEADER UNA VEZ INICIADO EL JUEGO

document.onkeydown = function listener(e){
    cacheArray = [0,0,0,0]
    specialArray = [0,0]
    switch (e.keyCode) {
        case 37:
            cacheArray[0] = 1 
        case 39:
            cacheArray[1] = 1
        case 40:
            cacheArray[2] = 1
        case 38:
            cacheArray[3] = 1
        case 16:
            specialArray[0] = 1
        case 32:
            specialArray[1] = 1
    }
    specialString = specialArray.join('')
    cacheString = cacheArray.join('')
    console.log('hello')
    keyCombine(cacheString, specialString)
  }

// ** FRAMES & UPDATES **

function update(){
    frames++
    clearCanvas()
    field.draw()
    //drawRivals()//
    animatePlayer()
    player.x += player.vx
    player.y += player.vy
    player.changePosition()
    player.draw()
    moveRivals()
    drawScore()
    winCheck()
}

interval = setInterval(update, 1000/24)
createRivals()


