import { Tree } from "./Tree"

var canvas: HTMLCanvasElement;
var background: HTMLCanvasElement;
var soil: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var bctx: CanvasRenderingContext2D;
var sctx: CanvasRenderingContext2D;
var tree: Tree;
var speed: number = 1/100; //1 / 10 is WAY too fast...yet I'm going to use it as testing speed.

class Circle{
    originalX: number;
    originalY: number;
    x: number;
    y: number;
    radius: number;
    color: string;
    constructor(x: number, y: number, color: string, radius: number = 5){
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        this.color = color;
        this.radius = radius;
    }
    draw(){
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }
    update(x: number, y: number){
        this.x = this.x + x;
        this.y = this.y + y;
        this.drawLine();
    }
    move(x: number, y: number){
        if(this.x === x && this.y === y){
            this.drawLine(); 
            return;
        } 
        var offsetX = (x - this.originalX) * speed;
        var offsetY = (y - this.originalY) * speed;
        this.x = this.x + offsetX;
        this.y = this.y + offsetY;
        this.drawLine();
    }
    /**
     * @description draws a line from the "original" circle position to the border of the new circle position.
     */
    drawLine(){
        ctx.beginPath();
        ctx.moveTo(this.originalX,this.originalY);
        ctx.lineTo(this.x - this.findOffset() * (this.x - this.originalX),this.y - this.findOffset() * (this.y - this.originalY));
        ctx.stroke();
    }
    /**
     * @description calculates the offset between originalX/originalY from the circumference of the circle.
     */
    findOffset(): number{
        var hyp = Math.sqrt(Math.pow(this.x - this.originalX, 2) + Math.pow(this.y - this.originalY, 2));
        var offset = this.radius / hyp;
        return offset;
    }
}

var circle: Circle = new Circle(document.body.clientWidth / 2, document.body.clientHeight * 3 / 4 + 25, 'rgb(205,133,63)');
var circle2: Circle = new Circle(document.body.clientWidth / 2 + 10, document.body.clientHeight * 3 / 4 + 32, 'rgb(205,133,63)');
/**
 * As edges "grow" as time passes, new nodes appear when the edge reaches a certain length. Find that length. 
 */
function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circle.draw();
    circle2.draw();
    circle.move(circle.originalX + 50, circle.originalY + 75);
    //circle.update(speed, 0);
    //circle2.update(speed, speed);
    requestAnimationFrame(gameLoop);
    //drawCircle(document.body.clientWidth / 2, document.body.clientHeight * 3 / 4 + 40, 'rgb(205,133,63)', 15);
    //drawCircle(document.body.clientWidth / 2, document.body.clientHeight * 3 / 4 + 25, 'rgb(205,133,63)');
    //drawCircle(document.body.clientWidth / 2 + 10, document.body.clientHeight * 3 / 4 + 32, 'rgb(205,133,63)');
    //drawCircle(document.body.clientWidth / 2 - 10, document.body.clientHeight * 3 / 4 + 32, 'rgb(205,133,63)');
    //drawCircle(document.body.clientWidth / 2, document.body.clientHeight * 3 / 4 + 40, 'rgb(205,133,63)');
}

export class View{
    constructor(treeTemp: Tree){
        canvas = <HTMLCanvasElement>document.getElementById('cnvs');
        ctx = canvas.getContext("2d");
        canvas.style.zIndex = '3';
        this.setup(canvas);

        background = <HTMLCanvasElement>document.getElementById('background');
        bctx = background.getContext("2d");
        background.style.background = "url('./sky.jpg')";
        this.setup(background);
        background.height = document.body.clientHeight * 3 / 4;
        
        soil = <HTMLCanvasElement>document.getElementById('soil');
        sctx = soil.getContext("2d");
        this.setup(soil);

        tree = treeTemp;
        gameLoop();
    }
    setup(canvas: HTMLCanvasElement): void{
        canvas.style.position = "absolute";
        canvas.style.left="0px";
        canvas.style.top="0px";
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
    }
    fill(): void{
        sctx.fillStyle = 'rgb(139,69,19)';
        sctx.fillRect(0,document.body.clientHeight * 3 / 4,document.body.clientWidth,document.body.clientHeight * 1 / 4);
    }
}