// ** VARIABLES **
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let interval;
let frames = 0;
let rivals = [];
let field = new gameField();
let player1 = new Player();
let player2 = new Player2();
let score = 0;
let fans = new Image();
fans.src = 'img/try1.gif'
let cacheArray1 = []
let cacheString1 = ''
let specialString1 = ''
let cache = [[0,0,0,1],[0,0,0,1]];
let cacheArray2 = []
let cacheString2 = ''
let specialString2 = ''
let cache2 = [[0,0,0,1],[0,0,0,1]];
let rivalX;
let hit = new Image();
hit.img = 'img/golpe.png';
hit.display = false;
let counter1 = 0 //Frames para el hit display
let counter2 = 0
let tackles1 = 0;
let tackles2 = 0;
let tackleImage = new Image();
tackleImage.src = 'img/tackle.png'


// ** GAME FUNCTIONS **

function startGame(){ //SIRVE
    createRivals()
}
function clearCanvas(){ // SIRVE
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}
function gameOver(){ // SIRVE
    clearInterval(interval)
}
function checkColitions1(){
    if (player1.x < 25){   //Field boundaries
        gameOver()
    }
    if (player1.x + player1.width*0.75 > canvas.width-25){
        gameOver()
    }
    rivals.forEach((rival)=>{ //flagged
        if(player1.flagged(rival)){
            if (player1.speed > 0){player1.speed -=0.25}
            hit.display = true
            counter1 = 10
            tackles1++
        }
        if (player1.tackled(rival)){ //tackled
            gameOver()
        }
    })
}
function checkColitions2(){
    if (player2.x < 25){   //Field boundaries
        gameOver()
    }
    if (player2.x + player2.width*0.75 > canvas.width-25){
        gameOver()
    }
    rivals.forEach((rival)=>{ //flagged
        if(player2.flagged(rival)){
            if (player2.speed > 0){player2.speed -=0.25}
            hit.display = true
            counter2 = 10
            tackles2++
        }
        if (player2.tackled(rival)){ //tackled
            gameOver()
        }
    })
}
// CHECAR ESAS FUNCIONES 
function drawHit1(){
    if (counter1 == 0){
        if(hit.display){
            ctx.drawImage(hit, player1.x, player1.y, 150, 150)
            counter1--
        }
        
    } else if (counter1 == 0){
        hit.display = false
        return
    }
}
function drawHit2(){
    if (counter2 == 0){
        if(hit.display){
            ctx.drawImage(hit, player2.x, player2.y, 150, 150)
            counter2--
        }
        
    } else if (counter2 == 0){
        hit.display = false
        return
    }
}
function drawScore(){ // NTE PARA EL MULTIJUGADOR

    //Score PLAYER1

    ctx.globalAlpha = 0.3;
    ctx.fillStyle = 'black'
    ctx.fillRect(22,65,650,15);
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial'
    ctx.fillText(`Tackled P1:`, 22, 75)
    ctx.fillText(`Tackled P2:`, 275, 75)

    if(score>100){
        ctx.beginPath();
        ctx.arc((canvas.width/2)-75 , canvas.height/2, 25, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
    }
    if(score > 200){
        ctx.beginPath();
        ctx.arc((canvas.width/2) -25 , canvas.height/2, 25, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
    }
    if(score > 300){
        ctx.beginPath();
        ctx.arc((canvas.width/2) +25 , canvas.height/2, 25, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
    }
    if(score > 400){
        ctx.beginPath();
        ctx.arc((canvas.width/2) +75 , canvas.height/2, 25, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
    }
    if(tackles1 >=1){
        ctx.drawImage(tackleImage, 60, 48, 40, 40)
    }
    if(tackles1 >=2){
        ctx.drawImage(tackleImage, 110, 48, 40, 40)
    }
    if(tackles1 >=3){
        ctx.drawImage(tackleImage, 160, 48, 40, 40)
    }
}
function winCheckP1(){
    if (player1.y <= 138){
        attack = false
        player1.score +=5
    }
}
function winCheckP2(){
    if (player2.y <= 138){
        attack = false
        player2.score += 5
    }
}

// FUNCIONES DE RIVALES

function createRivals(){ //FUNCIONA
    let rivalXStart = [25, 350, 75, 200, 150, 250, 25, 75]
    let rivalYStart = [canvas.height-200, canvas.height-400, canvas.height-500]
    for(i=0; i<Math.floor((2/2)*3);i++){
        rivals.push(new Rival(rivalXStart[i], rivalYStart[i]))
        rivals.push(new Rival(rivalXStart[i] + (Math.random()*100)+50, rivalYStart[i]))
        rivals.push(new Rival(rivalXStart[i] + (Math.random()*150)+150, rivalYStart[i]))
    }
}
function attackRivals(){ // FUNCIONA
    rivals.forEach((e)=> {
         if (frames%2===0){
            e.changePosition()
            //e.checkBack()
            e.checkAttack()
             //Checa si el jugador le ha ganado la espalda
         }
         if (frames%8===0){
            e.move()
        } 
         //e.checkVerticalAttack()
         e.checkBack()
         e.x += e.vx
         e.y += e.vy
     })
}
function drawRivals(){ // FUNCIONA
    rivals.forEach((e, i) => e.draw())
}

// RIVAL & JUGADOR

function animatePlayer(){
    if (frames%5==0){
        player1.animate++
        player2.animate++
        rivals.forEach(e => e.animate++)
        field.fans.animate++
    }
}
// FUNCIONES DE JUEGO DEL JUGADOR 1
function keyCombine(movesArray, specialArray){
    cache.push(movesArray)
    // upleft
    if (cache[cache.length-1].indexOf('1') == 0 && cache[cache.length-2].indexOf('1')== 3){
        player1.upLeft()
    } else if (cache[cache.length-1].indexOf('1')==3 && cache[cache.length-2].indexOf('1')==0){
        player1.upLeft()
    }else if (cache[cache.length-1].indexOf('1')==0 && cache[cache.length-2].indexOf('1')==0){
        player1.left()
    } else if (cache[cache.length-1].indexOf('1')==3 && cache[cache.length-2].indexOf('1')==3){
        player1.up()
    } else if (cache[cache.length-1].indexOf('1')==2 && cache[cache.length-2].indexOf('1')==0){
        player1.downLeft()
    } else if (cache[cache.length-1].indexOf('1')==0 && cache[cache.length-2].indexOf('1')==2){
        player1.downLeft()
    } else if (cache[cache.length-1].indexOf('1')==1 && cache[cache.length-2].indexOf('1')==3){
        player1.upRight()
    } else if (cache[cache.length-1].indexOf('1')==3 && cache[cache.length-2].indexOf('1')==1){
        player1.upRight()
    } else if (cache[cache.length-1].indexOf('1')==2 && cache[cache.length-2].indexOf('1')==1){
        player1.downRight()
    } else if (cache[cache.length-1].indexOf('1')==1 && cache[cache.length-2].indexOf('1')==2){
        player1.downRight()
    } else if (cache[cache.length-1].indexOf('1')==1 && cache[cache.length-2].indexOf('1')==1){
        player1.right()
    } else if (cache[cache.length-1].indexOf('1')==2 && cache[cache.length-2].indexOf('1')==2){
        player1.down()
    } 
    if (specialArray.indexOf('1')==0){
        if (player1.turboStatus){
            player1.turboStatus = false
        } else {
            player1.turboStatus = true
        }
        player1.turbo()
    } else if (specialArray.indexOf('1')==1){
        player1.run()
    }
}
// FUNCIONES DE JUEGO DEL JUGADOR 2
function keyCombine2(movesArray, specialArray){
    cache2.push(movesArray)
    // upleft
    if (cache2[cache2.length-1].indexOf('1') == 0 && cache2[cache2.length-2].indexOf('1')== 3){
        player2.upLeft()
    } else if (cache2[cache2.length-1].indexOf('1')==3 && cache2[cache2.length-2].indexOf('1')==0){
        player2.upLeft()
    }else if (cache2[cache2.length-1].indexOf('1')==0 && cache2[cache2.length-2].indexOf('1')==0){
        player2.left()
    } else if (cache2[cache2.length-1].indexOf('1')==3 && cache2[cache2.length-2].indexOf('1')==3){
        player2.up()
    } else if (cache2[cache2.length-1].indexOf('1')==2 && cache2[cache2.length-2].indexOf('1')==0){
        player2.downLeft()
    } else if (cache2[cache2.length-1].indexOf('1')==0 && cache2[cache2.length-2].indexOf('1')==2){
        player2.downLeft()
    } else if (cache2[cache2.length-1].indexOf('1')==1 && cache2[cache2.length-2].indexOf('1')==3){
        player2.upRight()
    } else if (cache2[cache2.length-1].indexOf('1')==3 && cache2[cache2.length-2].indexOf('1')==1){
        player2.upRight()
    } else if (cache2[cache2.length-1].indexOf('1')==2 && cache2[cache2.length-2].indexOf('1')==1){
        player2.downRight()
    } else if (cache2[cache2.length-1].indexOf('1')==1 && cache2[cache2.length-2].indexOf('1')==2){
        player2.downRight()
    } else if (cache2[cache2.length-1].indexOf('1')==1 && cache2[cache2.length-2].indexOf('1')==1){
        player2.right()
    } else if (cache2[cache2.length-1].indexOf('1')==2 && cache2[cache2.length-2].indexOf('1')==2){
        player2.down()
    } 
    if (specialArray.indexOf('1')==0){
        if (player2.turboStatus){
            player2.turboStatus = false
        } else {
            player2.turboStatus = true
        }
        player2.turbo()
    } else if (specialArray.indexOf('1')==1){
        player2.run()
    }
}
// 
function aux(arr1, arr2) {
    specialString = arr2.join('')
    cacheString = arr1.join('')
    keyCombine(cacheString, specialString)
}
function aux2(arr1, arr2) {
    specialString = arr2.join('')
    cacheString = arr1.join('')
    keyCombine2(cacheString, specialString)
}

function newSpeed1(){
    if (player1.vy >= 0 && player1.vx ==0){
        player1.vy = player1.speed // DOWN
      } else if (player1.vy < 0 && player1.vx == 0){
        player1.vy = -player1.speed// UP
      } else if (player1.vy > 0 && player1.vx < 0){
        // DOWNLEFT
        player1.vy = player1.speed
        player1.vx = -player1.speed
      } else if (player1.vy < 0 && player1.vx < 0){
        player1.vy =  -player1.speed// UPLEFT
        player1.vx =  -player1.speed
      } else if (player1.vy > 0 && player1.vx > 0){
        // DOWNRIGHT
        player1.vy = player1.speed
        player1.vx = player1.speed
      } else if (player1.vy < 0 && player1.vx > 0){
        //UPRIGHT
        player1.vy = -player1.speed
        player1.vx = player1.speed
      } else if (player1.vy == 0 && player1.vx > 0){
        player1.vx = player1.speed // RIGHT
      } else if (player1.vy == 0 && player1.vx < 0){
        player1.vx = -player1.speed // LEFT
      }
}
function newSpeed2(){
    if (player2.vy >= 0 && player2.vx ==0){
        player2.vy = player2.speed // DOWN
      } else if (player2.vy < 0 && player2.vx == 0){
        player2.vy = -player2.speed// UP
      } else if (player2.vy > 0 && player2.vx < 0){
        // DOWNLEFT
        player2.vy = player2.speed
        player2.vx = -player2.speed
      } else if (player2.vy < 0 && player2.vx < 0){
        player2.vy =  -player2.speed// UPLEFT
        player2.vx =  -player2.speed
      } else if (player2.vy > 0 && player2.vx > 0){
        // DOWNRIGHT
        player2.vy = player2.speed
        player2.vx = player2.speed
      } else if (player2.vy < 0 && player2.vx > 0){
        //UPRIGHT
        player2.vy = -player2.speed
        player2.vx = player2.speed
      } else if (player2.vy == 0 && player2.vx > 0){
        player2.vx = player2.speed // RIGHT
      } else if (player2.vy == 0 && player2.vx < 0){
        player2.vx = -player2.speed // LEFT
      }
}
//LISTENER
document.onkeydown = function listener(e){
    cacheArray2 = [0,0,0,0]
    specialArray2 = [0,0]
    cacheArray1 = [0,0,0,0]
    specialArray1 = [0,0]
    if (e.keyCode === 37) {
        cacheArray1[0] = 1
        aux(cacheArray1, specialArray1)   
    } else if (e.keyCode === 38) {
        cacheArray1[3] = 1
        aux(cacheArray1, specialArray1)
    } else if (e.keyCode === 39) {
        cacheArray1[1] = 1
        aux(cacheArray1, specialArray1)
    } else if (e.keyCode === 40) {
        cacheArray1[2] = 1
        aux(cacheArray1, specialArray1)
    }else if (e.keyCode === 16) {
        specialArray1[0] = 1
        aux(cacheArray1, specialArray1)
    }else if (e.keyCode === 32) {
        specialArray1[1] = 1
        aux(cacheArray1, specialArray1)
    } else if (e.keyCode === 65) {
        cacheArray2[0] = 1
        aux2(cacheArray2, specialArray2)   
    } else if (e.keyCode === 87) {
        cacheArray2[3] = 1
        aux2(cacheArray2, specialArray2)
    } else if (e.keyCode === 68) {
        cacheArray2[1] = 1
        aux2(cacheArray2, specialArray2)
    } else if (e.keyCode === 83) {
        cacheArray2[2] = 1
        aux2(cacheArray2, specialArray2)
    }else if (e.keyCode === 81) {
        specialArray2[0] = 1
        aux2(cacheArray2, specialArray2)
    }else if (e.keyCode === 82) { // R
        specialArray2[1] = 1
        aux2(cacheArray2, specialArray2)
    }
}
// ** FRAMES & UPDATES **
function update(){
    frames++
    clearCanvas()
    field.draw()
    drawRivals()//
    animatePlayer()
    player1.x += player1.vx
    player1.y += player1.vy
    player2.x += player2.vx
    player2.y += player2.vy
    player1.changePosition()
    player1.draw()
    player2.changePosition()
    player2.draw()
    drawHit1()
    drawHit2()
    checkColitions1()
    checkColitions2()
    attackRivals()
    drawScore()
    winCheckP1()
    winCheckP2()
    newSpeed1()
    newSpeed2()
}
interval = setInterval(update, 1000/24)
createRivals()