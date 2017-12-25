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

 var circle1: cCircle = new cCircle(200, 300, 50);
 var circle2: cCircle = new cCircle(400, 550, 150, "blue", 5);

 function gameLoop(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);

    if (circle1.x++ >= 1280 + circle1.radius) {
        circle1.x = -circle1.radius;
    }

    if (circle2.y++ >= 720 + circle2.radius) {
        circle2.y = -circle2.radius;
    }
    circle1.draw();
    circle2.draw();
    requestAnimationFrame(gameLoop);
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
    
    
    
    gameLoop(): void {
        requestAnimationFrame(gameLoop);
        
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