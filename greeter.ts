var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;

//import tree = require("Tree");

interface iShape {
    draw(): void;
    x: number;
    y: number;
    color: string;
    lineWidth: number;
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

export class onLoad{

    constructor(){
        canvas = <HTMLCanvasElement>document.getElementById('cnvs');
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
     
        ctx = canvas.getContext("2d");
        this.gameLoop();
        console.log("HI");
    }
    
    circle1: cCircle = new cCircle(200, 300, 50);
    circle2: cCircle = new cCircle(400, 550, 150, "blue", 5);
    
    gameLoop() {
       requestAnimationFrame(this.gameLoop);
       ctx.fillStyle = "black";
       ctx.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);

       if (this.circle1.x++ >= 1280 + this.circle1.radius) {
        this.circle1.x = -this.circle1.radius;
        }
  
     if (this.circle2.y++ >= 720 + this.circle2.radius) {
        this.circle2.y = -this.circle2.radius;
     }
       this.circle1.draw();
       this.circle2.draw();
    }
    
    drawRect(){
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.rect(100, 100, 100, 100);
        ctx.stroke();
        ctx.restore();
    }
}

/*
export class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor (element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerHTML = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearInterval(this.timerToken);
    }
}
*/