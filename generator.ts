import shapes = require("Shapes");
import { Point } from 'Shapes'
export class Generator{
    valid: {[key: string]: boolean} = {};
    constructor(x: number, y: number, x1: number, y1: number){
        //x, y, x1, y1 determines the area of possibility
        if(x1 <= x || y1 <= y) {
            console.log("Invalid Generator constructor values");
            return;
        }
        for(var i = x; i <= x1; i++){
            for(var j = y; j <= y1; j++){
                this.valid[String(i) + " " + String(j)] = true;
            }
        }
    }
    /**
     * 
     * @param x 
     * @param y 
     * @param x1 
     * @param y1
     * @description chooses a random point among the rectangle boundaries given 
     */
    generateRandomRectangle(left: number, right: number, bottom: number,  top: number): Point{
        var possible: Array<Point> = new Array<Point>();
        for(var i = left; i <= right; i++){
            for(var j = bottom; j <= top; j++){
                if(this.valid[String(i) + " " + String(j)])
                    possible.push(new Point(i, j));
            }
        }
        var random = Math.floor(Math.random() * (possible.length - 1));
        return possible[random];
    }
    /**
     * 
     * @param x 
     * @param y 
     * @param x1 
     * @param y1
     * @description if an integer point between x,y and x1,y1 exists, it is marked as "used" 
     */
    createdLine(x: number, y: number, x1: number, y1: number){
        var slope = this.reduce(y1 - y, x1 - x);
        var baseX = x, baseY = y;
        while(baseX != x1 || baseY != y1){
            this.valid[String(baseX) + " " + String(baseY)] = false;
            baseX += slope[1];
            baseY += slope[0];
        }
        this.valid[String(baseX) + " " + String(baseY)] = false;
    }
    /**
     * 
     * @param left 
     * @param right 
     * @param bottom 
     * @param top 
     * @description this is only meant to handle parallelograms lying parallel w/ the x and y axis. marks a rectangle area invalid
     */
    createdRectangle(left: number, right: number, bottom: number, top: number){
        for(var i = left; i <= right; i++){
            for(var j = bottom; j <= top; j++){
                this.valid[String(i) + " " + String(j)] = false;
            }
        }
    }
    /**
     * 
     * @param x 
     * @param y 
     * @param radius
     * @description marks a rectangular area that roughly represents a circle invalid
     */
        
    createdCircle(x: number, y: number, radius: number){
        createdRectangle(x - radius, x + radius, y - radius, y + radius);
    }
    reduce(numerator: number, denominator: number): Array<number>{
        var reduced: Array<number> = new Array<number>();
        var gcd = function gcd(a,b){
            return b ? gcd(b, a%b) : a;
        };
        var great: number;
        great = gcd(numerator,denominator);
        reduced[0] = numerator/great;
        reduced[1] = denominator/great;
        return reduced;
    }
}

