interface iShape {
    draw(): void;
    x: number;
    y: number;
    color: string;
    lineWidth: number;
 }

 class cPoint {
    public x: number = 0;
    public y: number = 0;
    constructor(x: number = 0, y: number = 0) {
       this.x = x;
       this.y = y;
    }
 }

 class cAsteroid implements iShape {
    public x: number = 0;
    public y: number = 0;
    public velocityX: number = 0;
    public velocityY: number = 0;
    public lineWidth: number = 5;
    public color: string = "white";
    public size: number = 20;
    public rotation: number = 0;
    public rotationSpeed: number = 0;
    public pointList: Array<cPoint> = new Array<cPoint>();
   
    public draw = (): void => {
     this.x += this.velocityX;
     this.y += this.velocityY;
   
     if (this.x < -this.size * 2) {
      this.x = 1280 + this.size * 2;
     }
     else if (this.x > 1280 + this.size * 2) {
      this.x = -2 * this.size;
     }
   
     if (this.y < -this.size * 2) {
      this.y = 720 + this.size * 2;
     }
     else if (this.y > 720 + this.size * 2) {
      this.y = -2 * this.size;
     }
   
     this.rotation += this.rotationSpeed;
     ctx.save();
     ctx.translate(this.x, this.y);
     ctx.rotate(this.rotation);
     ctx.beginPath();
     ctx.strokeStyle = this.color;
     ctx.lineWidth = this.lineWidth;
   
     ctx.moveTo(this.pointList[this.pointList.length - 1].x, this.pointList[this.pointList.length - 1].y);
   
     for (var i: number = 0; i < this.pointList.length; i++) {
      ctx.lineTo(this.pointList[i].x, this.pointList[i].y);
     }
   
     ctx.closePath();
     ctx.stroke();
     ctx.restore();
    }
   
    constructor(x: number = undefined, y: number = undefined, size: number = undefined, 
           color: string = "white", line_width: number = 2) {
     if (x == undefined) {
      this.x = Math.round(Math.random() * 1280);
     }
     else {
      this.x = x;
     }
   
     if (y == undefined) {
      this.y = Math.round(Math.random() * 720);
     }
     else {
      this.y = y;
     }
   
     if (size == undefined) {
      this.size = Math.ceil(Math.random() * 10) + 4;
     }
     else {
      this.size = size;
     }
   
     this.velocityX = Math.round(Math.random() * 4 - 2);
     this.velocityY = Math.round(Math.random() * 4 - 2);
   
     this.rotationSpeed = Math.random() * 0.06 - 0.03;
   
     var xrand: number = 0;
     var yrand: number = 0;
   
     xrand = Math.round(Math.random() * this.size - this.size / 2);
     yrand = Math.round(Math.random() * this.size - this.size / 2);
   
     this.pointList.push(new cPoint(xrand, yrand + 3 * this.size));
   
     xrand = Math.round(Math.random() * this.size - this.size / 2);
     yrand = Math.round(Math.random() * this.size - this.size / 2);
   
     this.pointList.push(new cPoint(xrand - 1 * this.size, yrand + 2 * this.size));
   
     xrand = Math.round(Math.random() * this.size - this.size / 2);
     yrand = Math.round(Math.random() * this.size - this.size / 2);
   
     this.pointList.push(new cPoint(xrand - 2 * this.size, yrand + 2 * this.size));
   
     xrand = Math.round(Math.random() * this.size - this.size / 2);
     yrand = Math.round(Math.random() * this.size - this.size / 2);
   
     this.pointList.push(new cPoint(xrand - 3 * this.size, yrand + this.size));
   
     xrand = Math.round(Math.random() * this.size - this.size / 2);
     yrand = Math.round(Math.random() * this.size - this.size / 2);
   
     this.pointList.push(new cPoint(xrand - 4 * this.size, yrand));
   
     xrand = Math.round(Math.random() * this.size - this.size / 2);
     yrand = Math.round(Math.random() * this.size - this.size / 2);
   
     this.pointList.push(new cPoint(xrand - 1 * this.size, yrand - 3 * this.size));
   
     xrand = Math.round(Math.random() * this.size - this.size / 2);
     yrand = Math.round(Math.random() * this.size - this.size / 2);
   
     this.pointList.push(new cPoint(xrand + 2 * this.size, yrand - 4 * this.size));
   
     xrand = Math.round(Math.random() * this.size - this.size / 2);
     yrand = Math.round(Math.random() * this.size - this.size / 2);
   
     this.pointList.push(new cPoint(xrand + 2 * this.size, yrand - 3 * this.size));
   
     xrand = Math.round(Math.random() * this.size - this.size / 2);
     yrand = Math.round(Math.random() * this.size - this.size / 2);
   
     this.pointList.push(new cPoint(xrand + 4 * this.size, yrand - 2 * this.size));
   
     xrand = Math.round(Math.random() * this.size - this.size / 2);
     yrand = Math.round(Math.random() * this.size - this.size / 2);
   
     this.pointList.push(new cPoint(xrand + 4 * this.size, yrand + this.size));
   
     xrand = Math.round(Math.random() * this.size - this.size / 2);
     yrand = Math.round(Math.random() * this.size - this.size / 2);
   
     this.pointList.push(new cPoint(xrand + 3 * this.size, yrand + 2 * this.size));
   
     xrand = Math.round(Math.random() * this.size - this.size / 2);
     yrand = Math.round(Math.random() * this.size - this.size / 2);
     this.color = color;
     this.lineWidth = line_width;
    }
   
   }

 class cCircle implements iShape {
    public x: number = 0;
    public y: number = 0;
    public radius: number = 10;
    public lineWidth: number = 2;
    public color: string = "red";
    constructor(x: number, y: number, radius: number, color: string = "red", line_width: number = 2)
    {
       this.x = x;
       this.y = y;
       this.radius = radius;
       this.color = color;
       this.lineWidth = line_width;
    }
    public draw = (): void => {
       ctx.save();
       ctx.beginPath();
       ctx.strokeStyle = this.color;
       ctx.lineWidth = this.lineWidth;
       ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
       ctx.stroke();
       ctx.restore();
    }
 }

 class cRectangle implements iShape {
    public x: number = 0;
    public y: number = 0;
    public lineWidth: number = 5;
    public width: number = 0;
    public height: number = 0;
    public color: string = "blue";
 
    constructor(x: number, y: number, width: number, height: number, color: string = "blue", line_width: number = 2) {
       this.x = x;
       this.y = y;
       this.width = width;
       this.height = height;
       this.color = color;
       this.lineWidth = line_width;
    }
 
    public draw = (): void => {
       ctx.save();
       ctx.beginPath();
       ctx.strokeStyle = this.color;
       ctx.lineWidth = this.lineWidth;
       ctx.rect(this.x, this.y, this.width, this.height);
       ctx.stroke();
       ctx.restore();
    }
 
 }

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;

var circle1: cCircle = new cCircle(200, 300, 50);
var circle2: cCircle = new cCircle(400, 550, 150, "blue", 5);

function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1280, 720);

    var shape: iShape;
    for (var i: number = 0; i < shape_array.length; i++) {
       shape = shape_array[i];
       shape.draw();
    }
 }
 
var shape_array: Array<iShape> = new Array<iShape>();

window.onload = () => {
   canvas = <HTMLCanvasElement>document.getElementById('cnvs');

   shape_array.push(new cAsteroid());
   shape_array.push(new cAsteroid());
   shape_array.push(new cAsteroid());
   shape_array.push(new cAsteroid());
   shape_array.push(new cAsteroid());

   shape_array.push(new cCircle(20, 50, 30));
   shape_array.push(new cCircle(120, 70, 50));

   shape_array.push(new cRectangle(500, 500, 80, 60));

   ctx = canvas.getContext("2d");
   gameLoop();
}

