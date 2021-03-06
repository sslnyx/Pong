import {
  SVG_NS
  // KEYS
} from '../settings';


export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;

    this.ping = new Audio('public/sounds/pong-01.wav');
    this.ping2 = new Audio('public/sounds/pong-03.wav');

    this.reset();


  } // end of constructor

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    // generate random number between -5 and 5 that isn't 0
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
    //a number between -5 and 5, based on this.vy
    //this guarantees that if v is large, vx is small (and vice versa)
    this.vx = this.direction * (6 - Math.abs(this.vy));
    this.color = 'white';
  }

  goal(player){
    player.score++;
    this.reset();
    // console.log(player.score);
  }



  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitTop || hitBottom) {
      this.vy = -this.vy;
    } else if (hitLeft || hitRight) {
      
      this.vx = -this.vx;
    }
  }

  paddleCollision(player1, player2) {
    if (this.vx > 0 && player2.x !== 454) {
      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        (this.x + this.radius >= leftX) &&
        (this.x + this.radius <= rightX) &&
        (this.y >= topY && this.y <=bottomY)
      ) {
        this.vx = -this.vx;
        this.color = 'white';
        this.ping.play();
        // add sound
      }
    } else if (this.vx < 0 && player1.x !== 50){
        let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
        let [leftX, rightX, topY, bottomY] = paddle;
        if(
          (this.x - this.radius <= rightX) &&
          (this.x - this.radius >= leftX) &&
          (this.y >= topY && this.y <= bottomY)
        )
        {
          this.vx = -this.vx;
          this.color = 'white';
        this.ping.play();
          
          // add sound
        }
      //...
    }
  }

  strikeCollision(player1, player2) {
    if (this.vx > 0 && player2.x == 454) {
      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        (this.x + this.radius >= leftX) &&
        (this.x + this.radius <= rightX) &&
        (this.y >= topY && this.y <=bottomY)
      ) {
        this.vx = -this.vx;
        this.vx = this.vx*2;
        this.color = 'red';
        this.ping2.play();
        // add sound
      }
    } else if (this.vx < 0 && player1.x == 50){
        let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
        let [leftX, rightX, topY, bottomY] = paddle;
        if(
          (this.x - this.radius <= rightX) &&
          (this.x - this.radius >= leftX) &&
          (this.y >= topY && this.y <= bottomY)
        )
        {
          this.vx = -this.vx;
          this.vx = this.vx*2;
          this.color = 'red';
        this.ping2.play();
          
          // add sound
        }
      //...
    }
  }

  render(svg, player1, player2) {


    this.x += this.vx;
    this.y += this.vy;

    //...
    this.wallCollision();

    this.paddleCollision(player1, player2);

    this.strikeCollision(player1, player2);


    let circle = document.createElementNS(SVG_NS, 'circle');

    circle.setAttributeNS(null, 'fill', this.color);
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);

    svg.appendChild(circle);

    const rightGoal =  this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;
    if(rightGoal){
      this.goal(player1);
      this.direction = -1;
    }else if(leftGoal){
      this.goal(player2);
      this.direction = 1;
    }

  }
}