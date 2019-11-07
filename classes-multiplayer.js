class gameField {
  constructor(){
      this.x = 0;
      this.y = 0;
      this.width = canvas.width;
      this.height = canvas.height;
      this.img = new Image();
      this.img.src = 'img/GameField.png'
      this.goal = new Image();
      this.goal.src = 'img/goal.png'
      this.fans = new Image();
      this.fans.src = 'img/fansSprite.jpeg'
      this.fans.animate = 0;
  }
  draw(){
      // DIBUJA EL CAMPO:
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
      //PORTERÍAS:
      ctx.drawImage(this.goal, (this.width/2)-25, 45, 50, 100)
      ctx.drawImage(this.goal, (this.width/2)-25, canvas.height-115, 50, 100)
      this.fans.animate > 2 ? this.fans.animate = 0 : this.fans.animate
      ctx.drawImage(
        this.fans, this.fans.animate * 638, 0, 638, 300,
        15, 0, canvas.width / 2, 70)
      ctx.drawImage(
          this.fans,this.fans.animate*638, 0, 638 ,300,
          canvas.width/2,0,canvas.width/2 -15,70)
          
  }
}

class Player {
    constructor() {
        this.x = 200;
        this.y = canvas.height-75;
        this.width = 50; 
        this.height = 60;
        this.animate = 4;
        this.img = new Image();
        this.img.src = 'img/playerSprite.png';
        this.face = 0;
        this.vx = 0; // Constante de velocidad en x
        this.vy = 0; // Constante de velocidad en y
        this.stamina = 10000; //1s de stamina para el turbo
        this.speed = 0;
        this.turboStatus = false;
        this.attackRadius = 5;
        this.cx = this.x + (this.width/2)
        this.cy = this.y + (this.height/2)
        this.countdown = true;
        this.animateArray = [0,1,2,3,2,1]
        this.score = 0
  }

    draw(){ //1000*60
        
        
      this.animate
      if(this.countdown){
        if (this.animate>0){
        this.animate--
        } else if (this.animate==0){
          this.countdown = false
        }
      } else if(!this.countdown){
        if (this.animate < 3){
          this.animate++
        } else if (this.animate > 3){
          this.countdown = true
        }
      }
      switch(this.face){
        case 0:
          ctx.drawImage(
            this.img,(this.animate*250) + 200,0,50,
            this.height,this.x,this.y,this.width,this.height)
          break;

        case 1:   //(upright)
          ctx.drawImage(
            this.img,
            // INICIO DE CROP EN X (fuente, sx)
            (this.animate * 250) + 150,
            // INICIO DE CROP EN Y (fuente, sy)
            0,
            // FINAL DE CROP EN X (sw)
            50,
            // FINAL DE CROP EN Y (sw)
            this.height,
            // POSICIÓN DE INICIO DE X EN JUEGO (destino, dx)
            this.x,
            // POSICIÓN DE INICIO DE Y EN JUEGO (destino, dy)
            this.y,
            // POSICIÓN DE FINAL DE X EN JUEGO (dw)
            this.width,
            // POSICIÓN DE FINAL DE Y EN JUEGO (dh)
            this.height)
          break;
        case 2:  //(right)

            ctx.drawImage(
              this.img,(this.animate * 250)+105,0,50,
              this.height,this.x, this.y, this.width, this.height)
            break;

        case 3:  //(downright)

            ctx.drawImage(
              this.img,(this.animate * 250)+50,0,50,
              this.height,this.x,this.y,this.width,this.height)
              break;

        case 4:  //(down)

            ctx.drawImage(
              this.img,(this.animate * 250),0,50,
              this.height,this.x, this.y,this.width,this.height)
            break;

        case 5:  //(downleft)

          ctx.drawImage(
            this.img, (this.animate * 250)+150, 60, 50,
            this.height, this.x, this.y, this.width,this.height)
          break;
        
        case 6:  //(left)
          ctx.drawImage(
            this.img,(this.animate * 250)+100,60,45,
            this.height,this.x,this.y,this.width,this.height)
          break;

        case 7:  //(upleft)
          ctx.drawImage(
            this.img,(this.animate * 250)+50,60,50,
            this.height, this.x, this.y, this.width,this.height)
          break;
    }
  }
  changePosition(){
    if (this.vy >= 0 && this.vx ==0){
      this.face = 4
    } else if (this.vy < 0 && this.vx == 0){
      this.face = 0
    } else if (this.vy > 0 && this.vx < 0){
      this.face = 5
    } else if (this.vy < 0 && this.vx < 0){
      this.face = 7
    } else if (this.vy > 0 && this.vx > 0){
      this.face = 3
    } else if (this.vy < 0 && this.vx > 0){
      this.face = 1
    } else if (this.vy == 0 && this.vx > 0){
      this.face = 2
    } else if (this.vy == 0 && this.vx < 0){
      this.face = 6
    }
  }
  //REVISAR LA VELOCIDAD EN DIAGONAL 

  upLeft(){
    if (this.speed>0.6){this.speed -=.5}
    this.vx = -(this.speed/Math.sqrt((this.speed**2)+(this.speed**2)))
    this.vy = -(this.speed/Math.sqrt((this.speed**2)+(this.speed**2)))
    console.log('upLeft FUNCITON')
  }
  downLeft(){
    if (this.speed>0.6){this.speed -=.5}
    this.vx = -(this.speed/Math.sqrt((this.speed**2)+(this.speed**2)))
    this.vy = (this.speed/Math.sqrt((this.speed**2)+(this.speed**2)))
  }
  upRight(){
    if (this.speed>0.6){this.speed -=.5}
    this.vx += (this.speed/Math.sqrt((this.speed**2)+(this.speed**2)))
    this.vy = -(this.speed/Math.sqrt((this.speed**2)+(this.speed**2)))
  }
  downRight(){
    if (this.speed>0.6){this.speed -=.5}
    this.vy = (this.speed/Math.sqrt((this.speed**2)+(this.speed**2)))
    this.vx = (this.speed/Math.sqrt((this.speed**2)+(this.speed**2)))
  }
  //
  left(){
    if (this.speed>0.6){this.speed -=.5}
    this.vy = 0;
    this.vx = -this.speed
  }
  right(){
    if (this.speed>0.6){this.speed -=.5}
    this.vy = 0
    this.vx = this.speed
  }
  down(){
    if (this.speed>0.6){this.speed -=.5}
    this.vx = 0;
    this.vy = this.speed;
  }
  up(){
    if (this.speed>0.6){this.speed -=.5}
    this.vx = 0
    this.vy = -this.speed
  }

  run(){
    if (this.speed>2){ //Límite de velocidad
      this.speed = 2
    } else if (this.speed>1.5 && this.speed <=2){ 
      this.speed += 0.75
    } else if (this.speed>1 && this.speed <=1.5){
      this.speed += 0.55
    } else if (this.speed>=0.6 && this.speed <= 1){ 
      this.speed += 0.35
    } else if (this.speed>0.3 && this.speed <= 0.6){ 
      this.speed += 0.25
    } else if (this.speed>=0 && this.speed <= 0.3){
      this.speed += 0.65
    } else if (this.speed<0){
      this.speed +=0.65
    }
  }

  // HAY QUE CHECAR LA DURACIÓN DEL SPRINT
  turbo(){
    if (this.turboStatus){
      if (this.stamina>0){
        console.log(this.stamina)
        this.speed +=2
        this.stamina -= 1
      } else{
        return
      }
    } else {
      this.speed -=2
    }
  }

  flagged(e){
    return (
      this.x+(this.width*0.25) < e.x+e.width&&
      this.x+(this.width*0.75) > e.x &&
      this.y+(this.height*0.25) < e.y + e.height &&
      this.y+(this.height*0.75) > e.y
    )
  }
  tackled(e){
    return (this.getDistance(e)<e.actionRadius+this.attackRadius)
  }
  getDistance(e){
    let dx = e.cx - this.cx
    let dy = e.cy - this.cy
    return Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2))
  }
}
class Player2 extends Player{
  constructor(y,width,height, animate, face, vx, vy, stamina, speed, turboStatus, attackRadius, cx, cy, countdown, animateArray, score){
    super(y,width,height, animate, face, vx, vy, stamina, speed, turboStatus, attackRadius, cx, cy, countdown, animateArray,score)
    this.x = 750;
    this.img = new Image();
    this.img.src = 'img/player2Sprite.png';
  }
}

class Rival {
    constructor(x, y){
      this.x = x;
      this.y = y;
      this.width = 50;
      this.height = 60;
      this.animate = 0;
      this.img = new Image();
      this.img.src = 'img/rivalSprite.png';
      this.face = 4;
      this.vx = 0;
      this.vy = 0;
      this.stamina = 1000;
      this.countback = true;
      this.speed = (1+(Math.random()*1))
      this.startAttack = false;
      this.actionRadius = 5;
      this.cx = this.x + (this.width/2)
      this.cy = this.y + (this.height/2)
      this.playernum;
    }
    //FUNCIONA
    draw(){ //1000*60
      this.animate>3 ? this.animate = 0 : this.animate;
      switch(this.face){
        case 0:
          ctx.drawImage(
            this.img,(this.animate*250) + 200,0,50,
            this.height,this.x,this.y,this.width,this.height)
          break;

        case 1:   //(upright)
          ctx.drawImage(
            this.img,(this.animate * 250) + 150,0,50,
            this.height,this.x, this.y, this.width, this.height)
          break;
        case 2:  //(right)

            ctx.drawImage(
              this.img,(this.animate * 250)+105,0,50,
              this.height,this.x, this.y, this.width, this.height)
            break;

        case 3:  //(downright)

            ctx.drawImage(
              this.img,(this.animate * 250)+50,0,50,
              this.height,this.x,this.y,this.width,this.height)
              break;

        case 4:  //(down)

            ctx.drawImage(
              this.img,(this.animate * 250),0,50,
              this.height,this.x, this.y,this.width,this.height)
            break;

        case 5:  //(downleft)

          ctx.drawImage(
            this.img, (this.animate * 250)+150, 60, 50,
            this.height, this.x, this.y, this.width,this.height)
          break;
        
        case 6:  //(left)
          ctx.drawImage(
            this.img,(this.animate * 250)+100,60,45,
            this.height,this.x,this.y,this.width,this.height)
          break;

        case 7:  //(upleft)
          ctx.drawImage(
            this.img,(this.animate * 250)+50,60,50,
            this.height, this.x, this.y, this.width,this.height)
          break;
      }
    }

    changePosition() {
      if (this.startAttack){ 
        if (this.x > this.playernum.x && this.x < this.playernum.x+this.playernum.width && this.y < this.playernum.y){
          this.face = 4 // down
        } else if (this.x > this.playernum.x && this.x < this.playernum.x+this.playernum.width && this.y > this.playernum.y){
          this.face = 0 // up
        } else if (this.y > this.playernum.y && this.x> this.playernum.x+this.playernum.width){
          this.face = 5 // downleft OK
        } else if (this.y > this.playernum.y+this.playernum.height && this.x> this.playernum.x+this.playernum.width){
          this.face = 7 //upleft OK
        } else if (this.x < this.playernum.x && this.y < this.playernum.y){
          this.face = 3 //downright OK
        } else if (this.y > this.playernum.y+this.playernum.height && this.x < this.playernum.x){
          this.face = 1 //upright OK
        } else if (this.y > this.playernum.y && this.y < this.playernum.y+this.playernum.height && this.x < this.playernum.x){
          this.face = 2 //right
        } else if (this.y > this.playernum.y && this.y < this.playernum.y+this.playernum.height && this.x > this.playernum.x){
          this.face = 6 // left
        }
      }
    }
    
    checkBack(){ // OK ralentiza en 'y' durante 4 frames para la ilusión de ganar la espalda
      if (this.startAttack){
        if (this.countback){ 
          if (this.playernum.y < this.y){ 
            if (this.speed > 0.5) {this.speed -= 0.5}
            this.countback = false
          }
        }
      }
    }

    getDistance(potato){
        console.log('hi')
        let dx = this.cx - potato.cx
        let dy = this.cy - potato.cy
        return Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2))
    }
    
    checkAttack(){
      console.log('checking distances')
      if(this.getDistance(player1)>this.getDistance(player2) && distance < 100){
        this.startAttack = true
        this.playernum = player1
      } else if (this.getDistance(player1)<this.getDistance(player2) && distance < 100){
        this.startAttack = true
        this.playernum = player2
      }
    }
    move(){
      if (this.startAttack){
        if (this.playernum.x > this.x && this.playernum.y > this.y){
          this.downRight()
        } else if (this.playernum.x < this.x && this.playernum.y>this.y){
          this.downLeft()
        } else if (this.playernum.x < this.x && this.playernum.y < this.y){
          this.upLeft()
        } else if (this.playernum.x > this.x && this.playernum.y < this.y){
          this.upRight()
        } else if (this.playernum.x == this.x && this.playernum.y > this.y){
          this.down()
        } else if (this.playernum.x == this.x && this.playernum.y < this.y){
          this.up()
        } else if (this.playernum.x > this.x && this.playernum.y == this.y){
          this.right()
        } else if (this.playernum.x < this.x && this.playernum.y == this.y){
          this.left()
        }
      }
    }
    upLeft(){
      if (this.speed>0.6){this.speed -=.5}
      this.vx = -(this.speed/Math.sqrt((this.speed**2)+(this.speed**2)))
      this.vy = -(this.speed/Math.sqrt((this.speed**2)+(this.speed**2)))
    }
    downLeft(){
      if (this.speed>0.6){this.speed -=.5}
      this.vx = -(this.speed/Math.sqrt((this.speed**2)+(this.speed**2)))
      this.vy = (this.speed/Math.sqrt((this.speed**2)+(this.speed**2)))
    }
    upRight(){
      if (this.speed>0.6){this.speed -=.5}
      this.vx = (this.speed/Math.sqrt((this.speed**2)+(this.speed**2)))
      this.vy = -(this.speed/Math.sqrt((this.speed**2)+(this.speed**2)))
    }
    downRight(){
      if (this.speed>0.6){this.speed -=.5}
      this.vy = (this.speed/Math.sqrt((this.speed**2)+(this.speed**2)))
      this.vx = (this.speed/Math.sqrt((this.speed**2)+(this.speed**2)))
    }
    left(){
      if (this.speed>0.6){this.speed -=.5}
      this.vy = 0;
      this.vx = -this.speed
    }
    right(){
      if (this.speed>0.6){this.speed -=.5}
      this.vy = 0
      this.vx = this.speed
    }
    down(){
      if (this.speed>0.6){this.speed -=.5}
      this.vx = 0;
      this.vy = this.speed;
    }
    up(){
      if (this.speed>0.6){this.speed -=.5}
      this.vx = 0
      this.vy = -this.speed
    }
    
}
