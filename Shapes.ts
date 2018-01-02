var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cnvs');
var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
var speed: number = 1/10;

export class Circle{
    originalX: number;
    originalY: number;
    x: number;
    y: number;
    radius: number;
    color: string;
    line: Line;
    constructor(x: number, y: number, color: string, radius: number = 5){
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        this.color = color;
        this.radius = radius;
    }
    draw(){
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    move(x: number, y: number): number{
        /* Checks to see if the circle still needs to be moved/redrawn */
        if(this.x >= this.originalX && this.x >= x && this.y >= y || this.x < this.originalX && this.x <= x && this.y >= y){
            this.drawLine(); 
            return 1;
        }
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
        var offsetX = this.findOffset() * (this.x - this.originalX);
        var offsetY = this.findOffset() * (this.y - this.originalY);
        this.line = new Line(this.originalX + offsetX, this.originalY + offsetY, this.x - offsetX, this.y - offsetY);
        this.line.draw();
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

export class Line{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    constructor(x1: number, y1: number, x2: number, y2: number){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    draw(){
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }
    /**
     * 
     * @param line 
     * @description calculates if two line segments intersect each other
     * @returns true if given line object intersects current line object
     */
    intersect(line: Line): boolean{
        //return true if both line segments are exactly the same
        if(this.x1 == line.x1 && this.y1 == line.y1 && this.x2 == line.x2 && this.y2 == line.y2)
            return true;
        //when line segments are connected, intersect returns false
        if(this.x1 == line.x1 && this.y1 == line.y1 || this.x1 == line.x2 && this.y1 == line.y2 || this.x2 == line.x1 && this.y2 == line.y1)
            return false;


        var N, P1, P2, dot1, dot2;
        N = [this.x2 - this.x1, this.y2 - this.y1];
        P1 = [line.x1 - this.x1, line.y1 - this.y1];
        P2 = [line.x2 - this.x1, line.y2 - this.y1];
        //below, I'm using the trig identity of sin theta = |u x v| / |u|*|v|.
        //i'm checking if the point is above or below the given line.
        //helpful reference: https://stackoverflow.com/questions/14176776/find-out-if-2-lines-intersect
        dot1 = N[0] * P1[1] - N[1] * P1[0]; //should also be divided by magnitude, but as i'm only looking for sign, irrelevant.
        dot2 = N[0] * P2[1] - N[1] * P2[0];   
        if(dot1 > 0 && dot2 > 0 || dot1 < 0 && dot2 < 0){
            /*console.log(N + " x " + P1 + " = " + dot1 + " || " + N + " x " + P2 + " = " + dot2);                
            console.log("THIS: " + this.x1 + " " + this.y1 + " " + this.x2 + " " + this.y2);
            console.log("TARGET POINTS: " + line.x1 + " " + line.y1 + " " + line.x2 + " " + line.y2);*/
            return false;
        }
            
        N = [line.x2 - line.x1, line.y2 - line.y1];
        P1 = [this.x1 - line.x1, this.y1 - line.y1];
        P2 = [this.x2 - line.x1, this.y2 - line.y1];
        dot1 = N[0] * P1[1] - N[1] * P1[0];
        dot2 = N[0] * P2[1] - N[1] * P2[0];
        if(dot1 > 0 && dot2 > 0 || dot1 < 0 && dot2 < 0){
            /*console.log(N + " x " + P1 + " = " + dot1 + " || " + N + " x " + P2 + " = " + dot2 + "\n");
            console.log("THIS: " + this.x1 + " " + this.y1 + " " + this.x2 + " " + this.y2);
            console.log("TARGET POINTS: " + line.x1 + " " + line.y1 + " " + line.x2 + " " + line.y2); */               
            return false;
        }

        return true;
    }
}