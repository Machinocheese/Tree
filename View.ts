import { Tree } from "./Tree"

var canvas: HTMLCanvasElement;
var background: HTMLCanvasElement;
var soil: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var bctx: CanvasRenderingContext2D;
var sctx: CanvasRenderingContext2D;
var tree: Tree;

function drawCircle(x: number, y: number, color: string, radius: number = 5){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(x,y,radius,0,2*Math.PI);
    ctx.stroke();
}

/**
 * As edges "grow" as time passes, new nodes appear when the edge reaches a certain length. Find that length. 
 */
function gameLoop(){
    //drawCircle(document.body.clientWidth / 2, document.body.clientHeight * 3 / 4 + 40, 'rgb(205,133,63)', 15);
    drawCircle(document.body.clientWidth / 2, document.body.clientHeight * 3 / 4 + 25, 'rgb(205,133,63)');
    drawCircle(document.body.clientWidth / 2 + 10, document.body.clientHeight * 3 / 4 + 32, 'rgb(205,133,63)');
    drawCircle(document.body.clientWidth / 2 - 10, document.body.clientHeight * 3 / 4 + 32, 'rgb(205,133,63)');
    drawCircle(document.body.clientWidth / 2, document.body.clientHeight * 3 / 4 + 40, 'rgb(205,133,63)');
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
    
        console.log("LOOP");
        gameLoop();
    }
}