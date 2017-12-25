import { Tree } from "./Tree"

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var tree: Tree;

function gameLoop(){

}

export class View{
    constructor(treeTemp: Tree){
        canvas = <HTMLCanvasElement>document.getElementById('cnvs');
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        
        ctx = canvas.getContext("2d");
        tree = treeTemp;
    }
    fill(): void{
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);
    
        console.log("LOOP");
    }
}