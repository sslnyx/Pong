import {
  SVG_NS
} from '../settings';

export default class Paddle {

  constructor(boardHeight, width, height, x, y, up, down, player) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 20;
    this.score = 0;

    // document.addEventListener('keydown', event => {
    //   switch (event.key) {
    //     case up:
    //       this.up();
    //       break;
    //     case down:
    //       this.down();
    //       break;
    //   }
    // });

    this.player = player;
    this.keyState = {};
    document.addEventListener('keydown', event => {
      this.keyState[event.key || event.which] = true;
    }, true);
    document.addEventListener('keyup', event => {
      this.keyState[event.key || event.which] = false;
    }, true);
  } //constructor
  //-------------------------



  up() {
    this.y = Math.max(0, this.y - this.speed);
    // console.log(this.y);
  }

  down() {
    this.y = Math.min(this.boardHeight - this.height, this.y + this.speed);
    // console.log(this.y);
  }

  strike(){
    this.x = 50;
  }

  strikeReset(){
    this.x = 10;
  }

  strike2(){
    this.x = 454;
  }

  strikeReset2(){
    this.x = 494;
  }

  // tillRight() {
  //   this.tr = `rotate(-60,30, ${this.y})`;
  // }
  // tillReset() {
  //   this.tr = 'rotate(0)';
  // }

  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return [leftX, rightX, topY, bottomY];
  }

  /**
   * Render SVG imgs
   */

  render(svg) {


    //...
    let rect = document.createElementNS(SVG_NS, 'rect');

    rect.setAttributeNS(null, 'fill', 'red');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'x', this.x);
    rect.setAttributeNS(null, 'y', this.y);
    // rect.setAttributeNS(null, 'transform', this.tr);

    // Player movement
    if (this.keyState['a'] && this.player === 'player1') {
      this.up();
    }
    if (this.keyState['z'] && this.player === 'player1') {
      this.down();
    }
    if (this.keyState['q'] && this.player === 'player1') {
      this.strike();
    } 
    if ((this.keyState['q'] == false) && this.player === 'player1' ) {
      this.strikeReset();
    } 

    if (this.keyState['p'] && this.player === 'player2') {
      this.strike2();
    } 
    if ((this.keyState['p'] == false) && this.player === 'player2' ) {
      this.strikeReset2();
    } 

    if (this.keyState['ArrowUp'] && this.player === 'player2') {
      this.up();
    }
    if (this.keyState['ArrowDown'] && this.player === 'player2') {
      this.down();
    }

    svg.appendChild(rect);

  }
}