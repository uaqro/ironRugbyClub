
// ** VARIABLES **
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let interval;
let frames = 0;
let rivals = [];
let field = new gameField();
let player = new Player();
let score = 0;
let level = 1;
let fans = new Image();
fans.src = 'img/try1.gif'
let cacheArray = []
let cacheString = ''
let specialString = ''
let cache = [[0,0,0,1],[0,0,0,1]];
let rivalX;
let hit = new Image();
hit.img = 'img/golpe.png';
hit.display = false;
let counter = 0 //Frames para el hit display
let tackles = 0;
let tackleImage = new Image();
tackleImage.src = 'img/tackle.png'


// ** GAME FUNCTIONS **

function startGame(){ //HAY QUE COMPLETAR LA FUNCIÓN CON LISTENERS ETC
    createRivals()
}
function clearCanvas(){ // YA FUNCIONA
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}
function gameOver(){
    clearInterval(interval)
}
function checkColitions(){
    if (player.x < 25){   //Field boundaries
        gameOver()
    }
    if (player.x + player.width*0.75 > canvas.width-25){
        gameOver()
    }
    rivals.forEach((rival)=>{ //flagged
        if(player.flagged(rival)){
            if (player.speed > 0){player.speed -=0.25}
            hit.display = true
            counter = 10
            console.log('touch')
            tackles++
        }
        if (player.tackled(rival)){ //tackled
            gameOver()
            console.log('tackled')
        }
    })
}
function drawHit(){
    if (counter > 0){
        if(hit.display){
            ctx.drawImage(hit, player.x, player.y, 50, 50)
            console.log('golpe!')
            counter--
        }
        
    } else if (counter == 0){
        hit.display = false
        return
    }
}
function drawScore(){ // YA FUNCIONA
    /*ctx.strokeStyle = 'red'
    ctx.beginPath();
    ctx.moveTo(25,100);
    ctx.lineTo(25,350);
    ctx.stroke();*/
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = 'black'
    ctx.fillRect(22,65,450,15);
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial'
    ctx.fillText(`Score:`, 22, 75)
    ctx.fillText(`Tackled:`, 275, 75)
    //ctx.fillText(`Level: ${level}`, 570, 30)
    ctx.beginPath();
    ctx.arc(100, 68, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
    ctx.arc(150, 68, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
    ctx.arc(200, 68, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
    ctx.arc(250, 68, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
    if(score>100){
        ctx.beginPath();
        ctx.arc(100, 68, 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
    }
    if(score > 200){
        ctx.beginPath();
        ctx.arc(150, 68, 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
    }
    if(score > 300){
        ctx.beginPath();
        ctx.arc(200, 68, 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
    }
    if(score > 400){
        ctx.beginPath();
        ctx.arc(250, 68, 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
    }
    if(tackles >=1){
        ctx.drawImage(tackleImage, 350, 48, 40, 40)
    }
    if(tackles >=2){
        ctx.drawImage(tackleImage, 390, 48, 40, 40)
    }
    if(tackles >=3){
        ctx.drawImage(tackleImage, 430, 48, 40, 40)
    }
}
function winCheck(){
    if (player.y <= 138){
        score += 5
    }
    // FUNCIONES DE JUEGO EN GENERAL
    /* FUNCIÓN DE GANAR
    if (score>10.000){
        clearInterval(interval)
        level++
        startGame()
    }
    if (score>2000){
        ctx.fillStyle = 'green'
        ctx.fillText = ('You won!', canvas.width/2, canvas.height/2)
        fillRect(0, 0, canvas.width, canvas.height)
        clearInterval(interval)
    }
    */
}

/*
function dontStack(){
    
    rivals.forEach((i,e){
        if(this.isTouching){
            this.speed = 0;
        }
    })
    
}
*/

// FUNCIONES DE RIVALES
function createRivals(){ //FUNCIONA
    let rivalXStart = [25, 350, 75, 200, 150, 250, 25, 75]
    let rivalYStart = [canvas.height-200, canvas.height-400, canvas.height-500]
    for(i=0; i<Math.floor((2/2)*3);i++){
        rivals.push(new Rival(rivalXStart[i], rivalYStart[i]))
        rivals.push(new Rival(rivalXStart[i] + (Math.random()*100)+50, rivalYStart[i]))
        //rivals.push(new Rival(rivalXStart[i] + (Math.random()*150)+150, rivalYStart[i]))
    }
}
function attackRivals(){ // FUNCIONA
    rivals.forEach((e)=> {
         if (frames%2===0){
            e.changePosition()
            //e.checkBack()
             //Checa si el jugador le ha ganado la espalda
         }
         if (frames%8===0){
            e.move()
        } 
         e.checkVerticalAttack()
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
        player.animate++
        rivals.forEach(e => e.animate++)
        field.fans.animate++
    }
}
// FUNCIONES DE JUEGO DEL JUGADOR
function keyCombine(movesArray, specialArray){
    cache.push(movesArray)
    // upleft
    if (cache[cache.length-1].indexOf('1') == 0 && cache[cache.length-2].indexOf('1')== 3){
        player.upLeft()
        console.log('upleft')
    } else if (cache[cache.length-1].indexOf('1')==3 && cache[cache.length-2].indexOf('1')==0){
        player.upLeft()
        console.log('upleft')
    }else if (cache[cache.length-1].indexOf('1')==0 && cache[cache.length-2].indexOf('1')==0){
        player.left()
        console.log('left')
    } else if (cache[cache.length-1].indexOf('1')==3 && cache[cache.length-2].indexOf('1')==3){
        player.up()
        console.log('up')
    } else if (cache[cache.length-1].indexOf('1')==2 && cache[cache.length-2].indexOf('1')==0){
        player.downLeft()
        console.log('downleft')
    } else if (cache[cache.length-1].indexOf('1')==0 && cache[cache.length-2].indexOf('1')==2){
        player.downLeft()
        console.log('downleft')
    } else if (cache[cache.length-1].indexOf('1')==1 && cache[cache.length-2].indexOf('1')==3){
        player.upRight()
        console.log('upright')
    } else if (cache[cache.length-1].indexOf('1')==3 && cache[cache.length-2].indexOf('1')==1){
        player.upRight()
        console.log('upright')
    } else if (cache[cache.length-1].indexOf('1')==2 && cache[cache.length-2].indexOf('1')==1){
        player.downRight()
        console.log('downright')
    } else if (cache[cache.length-1].indexOf('1')==1 && cache[cache.length-2].indexOf('1')==2){
        player.downRight()
        console.log('downright')
    } else if (cache[cache.length-1].indexOf('1')==1 && cache[cache.length-2].indexOf('1')==1){
        player.right()
        console.log('right')
    } else if (cache[cache.length-1].indexOf('1')==2 && cache[cache.length-2].indexOf('1')==2){
        player.down()
        console.log('down')
    } 
    if (specialArray.indexOf('1')==0){
        if (player.turboStatus){
            player.turboStatus = false
        } else {
            player.turboStatus = true
        }
        player.turbo()
    } else if (specialArray.indexOf('1')==1){
        player.run()
        console.log('speedup')
        console.log(player.speed)
    }
}
function aux(arr1, arr2) {
    specialString = arr2.join('')
    cacheString = arr1.join('')
    console.log('hello')
    keyCombine(cacheString, specialString)
}
function newSpeed(){
    if (player.vy >= 0 && player.vx ==0){
        player.vy = player.speed // DOWN
      } else if (player.vy < 0 && player.vx == 0){
        player.vy = -player.speed// UP
      } else if (player.vy > 0 && player.vx < 0){
        // DOWNLEFT
        player.vy = player.speed
        player.vx = -player.speed
      } else if (player.vy < 0 && player.vx < 0){
        player.vy =  -player.speed// UPLEFT
        player.vx =  -player.speed
      } else if (player.vy > 0 && player.vx > 0){
        // DOWNRIGHT
        player.vy = player.speed
        player.vx = player.speed
      } else if (player.vy < 0 && player.vx > 0){
        //UPRIGHT
        player.vy = -player.speed
        player.vx = player.speed
      } else if (player.vy == 0 && player.vx > 0){
        player.vx = player.speed // RIGHT
      } else if (player.vy == 0 && player.vx < 0){
        player.vx = -player.speed // LEFT
      }
}
//LISTENER
document.onkeydown = function listener(e){
    cacheArray = [0,0,0,0]
    specialArray = [0,0]
    if (e.keyCode === 37) {
        cacheArray[0] = 1
        aux(cacheArray, specialArray)   
    } else if (e.keyCode === 38) {
        cacheArray[3] = 1
        aux(cacheArray, specialArray)
    } else if (e.keyCode === 39) {
        cacheArray[1] = 1
        aux(cacheArray, specialArray)
    } else if (e.keyCode === 40) {
        cacheArray[2] = 1
        aux(cacheArray, specialArray)
    }else if (e.keyCode === 16) {
        specialArray[0] = 1
        aux(cacheArray, specialArray)
    }else if (e.keyCode === 32) {
        specialArray[1] = 1
        aux(cacheArray, specialArray)
    }
}
// ** FRAMES & UPDATES **
function update(){
    frames++
    clearCanvas()
    field.draw()
    drawRivals()//
    animatePlayer()
    player.x += player.vx
    player.y += player.vy
    player.changePosition()
    player.draw()
    if(player.turboStatus){
        player.stamina--
    }
    drawHit()
    checkColitions()
    attackRivals()
    drawScore()
    winCheck()
    newSpeed()
}
interval = setInterval(update, 1000/24)
createRivals()