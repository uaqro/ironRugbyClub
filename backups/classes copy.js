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
  }
  draw(){
      // DIBUJA EL CAMPO:
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
      //PORTERÍAS:
      ctx.drawImage(this.goal, (this.width/2)-25, 0, 50, 100)
      ctx.drawImage(this.goal, (this.width/2)-25, canvas.height-115, 50, 100)
  }
}

class Player {
    constructor() {
        this.x = 200;
        this.y = canvas.height-75;
        this.width = 50; 
        this.height = 60;
        this.animate = 0;
        this.img = new Image();
        this.img.src = 'img/playerSprite.png';
        this.face = 0;
        this.vx = 0; // Constante de velocidad en x
        this.vy = 0; // Constante de velocidad en y
        this.stamina = 1000; //1s de stamina para el turbo
  }

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
  changePosition(combination){
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
  upLeft(combination){

  }
  downLeft(combination){

  }
  upRight(combination){

  }
  upLeft(combination){
    
  }
  left(){
    if (this.vx<-2){ //Límite de velocidad
      this.vx = -2
    } else if (this.vx<-1.5 && this.vx >=-2){ //Corre más entre -1 y -2
      this.vx -= 0.75
    } else if (this.vx<-1 && this.vx >=-1.5){ //Corre más entre -1 y -2
      this.vx -= 0.55
    } else if (this.vx<=-0.6 && this.vy >=-1){ // Arranca entre -1 y -2
      this.vx -= 0.35
    } else if (this.vx<-0.3 && this.vy >=-0.6){ // Arranca entre -1 y -2
      this.vx -= 0.25
    } else if (this.vx<=0 && this.vy >=-0.3){ // Arranca entre -1 y -2
      this.vx -= 0.15
    } else if (this.vx>0){
      this.vx -=1
    }
  }
  right(){
    
    
    // DELAY EN LA ACCELERACIÓN
    if (this.vx>2){ //Límite de velocidad
      this.vx = 2
    } else if (this.vx>1.5 && this.vx <=2){ 
      this.vx += 0.75
    } else if (this.vx>1 && this.vx <=1.5){
      this.vx += 0.55
    } else if (this.vx>=0.6 && this.vy <= 1){ 
      this.vx += 0.35
    } else if (this.vx>0.3 && this.vy <= 0.6){ 
      this.vx += 0.25
    } else if (this.vx>=0 && this.vy <= 0.3){
      this.vx += 0.65
    } else if (this.vx<0){
      this.vx +=0.65
    }

  }
  down(){
    this.vx = 0;
    if (this.vy>2){
      this.vy = 2
    } else if (this.vy>1 && this.vy <=2){
      this.vy += 0.2
    } else if (this.vy>=0 && this.vy <=1){
      this.vy += 0.1
    } else if (this.vy<0){
      this.vy +=0.5
    }
  }
  up(){
    //DELAY EN LA FRENADA VERTICAL DESCEDENTE
    this.vx = 0;
    if (this.vy<-2){
      this.vy = -2
    } else if (this.vy<-1 && this.vy >=-2){
      this.vy -= 0.2
    } else if (this.vy<=0 && this.vy >=-1){
      this.vy -= 0.1
    } else if (this.vy>0){
      this.vy -=0.5
    }
  }

  // HAY QUE CHECAR LA DURACIÓN DEL SPRINT
  turbo(){
    if (this.stamina>0){
      if (this.vy >= 0 && this.vx ==0){
        this.y += 0.5
      } else if (this.vy < 0 && this.vx == 0){
        this.y -= 0.5
      } else if (this.vy > 0 && this.vx < 0){
        this.x -= 0.5
        this.y += 0.5
      } else if (this.vy < 0 && this.vx < 0){
        this.x -= 0.5
        this.y -= 0.5
      } else if (this.vy > 0 && this.vx > 0){
        this.x += 0.5
        this.y += 0.5
      } else if (this.vy < 0 && this.vx > 0){
        this.x += 0.5
        this.y -= 0.5
      } else if (this.vy == 0 && this.vx > 0){
        this.x += 0.5
      } else if (this.vy == 0 && this.vx < 0){
        this.x -=0.5
      }
      this.stamina -= 1
    } else{
      return
    }
  }
}



class Rival {
    constructor(){
      this.x = Math.floor(Math.random()*canvas.width);
      this.y = Math.floor(Math.random()*canvas.height - 60);
      this.width = 50;
      this.height = 60;
      this.animate = 0;
      this.img = new Image();
      this.img.src = 'img/rivalSprite.png';
      this.face = 0;
      this.vx = 1;
      this.vy = 1;
      this.stamina = 1000;
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
    // FUNCIONA
    changePosition() {
      if (player.y > this.y && player.x == this.x){
        this.face = 4
      } else if (player.y < this.y && player.x == this.x){
        this.face = 0
      } else if (player.y > this.y && player.x < this.x){
        this.face = 5
      } else if (player.y < this.y && player.x < this.x){
        this.face = 7
      } else if (player.y > this.y && player.x > this.x){
        this.face = 3
      } else if (player.y < this.y && player.x > this.x){
        this.face = 1
      } else if (player.y == this.y && player.x > this.x){
        this.face = 2
      } else if (player.y == this.y && player.x < this.x){
        this.face = 6
      }
    }

    move(){
      if (player.x>this.x && player.y>this.y){
        this.moveRight()
        this.moveDown()
      } else if (player.x < this.x && player.y>this.y){
        this.moveLeft()
        this.moveDown()
      } else if (player.x < this.x && player.y < this.y){
        this.moveLeft()
        this.moveUp()
      } else if (player.x > this.x && player.y < this.y){
        this.moveUp()
        this.moveRight()
      } else if (player.x == this.x && player.y > this.y){
        this.moveDown()
      } else if (player.x == this.x && player.y < this.y){
        this.moveUp()
      } else if (player.x > this.x && player.y == this.y){
        this.moveRight()
      } else if (player.x < this.x && player.y == this.y){
        this.moveLeft()
      }
    }
    moveUp(){
      this.y -= this.vy
    }
    moveDown(){
      this.y += this.vy
    }
    moveLeft(){
      this.x -= this.vx
    }
    moveRight(){
      this.x += this.vx
    }
    
    /*
    **
    **
    CÓDIGO DE CAT BRAWLER PARA QUE SIGAN AL GATO
    **
    **
    moveDown(boundarie) {
        if (this.y + this.speed + this.height < boundarie) this.y += this.speed;
      }
      moveUp(boundarie) {
        if (this.y - this.speed > boundarie) this.y -= this.speed;
      }
      moveRight(boundarie) {
        if (this.x + this.speed + this.width < boundarie) this.x += this.speed;
      }
      moveLeft(boundarie) {
        if (this.x - this.speed > boundarie) this.x -= this.speed;
      }
      move(boundTop, boundRight, boundBottom, boundLeft, target) {
        let { x, y, width, height } = target;
        let xTargetCenter = x + width / 2 - this.width / 2;
        let yTargetCenter = y + height / 2 - this.height / 2;
        if (this.x < xTargetCenter) this.moveRight(boundRight);
        if (this.x > xTargetCenter) this.moveLeft(boundLeft);
        if (this.y < yTargetCenter) this.moveDown(boundBottom);
        if (this.y > yTargetCenter) this.moveUp(boundTop);
      }*/ 
}