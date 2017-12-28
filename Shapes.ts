var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cnvs');
var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
var speed: number = 1/100; //1 / 10 is WAY too fast...yet I'm going to use it as testing speed.

export class Circle{
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
    move(x: number, y: number): number{
        console.log("CURRENT: " + this.x + " " + this.y + "\nLOCKED: " + x + " " + y);
        if(this.x >= this.originalX && this.x >= x && this.y >= y){
            this.drawLine(); 
            return 1;
        } else if(this.x < this.originalX && this.x <= x && this.y >= y){
            this.drawLine(); 
            return 1;
        }//calculate offset as < 0 , not .x lol
        var offsetX = (x - this.originalX) * speed;
        var offsetY = (y - this.originalY) * speed;
        this.x = this.x + offsetX;
        this.y = this.y + offsetY;
        this.drawLine();
        return 0;
    }
    /**
     * @description draws a line from the "original" circle position to the border of the new circle position.
     */
    drawLine(){
        ctx.beginPath();
        var offsetX = this.findOffset() * (this.x - this.originalX);
        var offsetY = this.findOffset() * (this.y - this.originalY);
        ctx.moveTo(this.originalX + offsetX,this.originalY + offsetY);
        ctx.lineTo(this.x - offsetX,this.y - offsetY);
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