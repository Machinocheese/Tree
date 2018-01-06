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
    generateRandomRectangle(x: number, y: number, x1: number, y1: number): Point{
        var possible: Array<Point> = new Array<Point>();
        for(var i = x; i <= x1; i++){
            for(var j = y; j <= y1; j++){
                if(this.valid[String(i) + " " + String(j)])
                    possible.push(new Point(i, j));
            }
        }
        var random = Math.floor(Math.random() * (possible.length - 1));
        console.log(random);
        return possible[random];
    }
    createdLine(x: number, y: number, x1: number, y1: number){
        var slope = reduce(y1 - y, x1 - x);
        var baseX = x, baseY = y;
        while(baseX != x1 && baseY != y1){
            this.valid[String(baseX) + " " + String(baseY)] = false;
            baseX += slope[1];
            baseY += slope[0];
        }
    }
    //this method will mess up if you don't pass the points in clockwise or counterclockwise
    createdRectangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number){
        var slope1 = reduce(y3 - y1, x3 - x1);
        var slope2 = reduce(y4 - y2, x4 - x2);

        var baseX1 = x1, baseY1 = y1, baseX2 = x2, baseY2 = y2;
        while(baseX1 != x3 && baseY1 != y3 && baseX2 != x4 && baseY2 != y4){
            createdLine(baseX1, baseY1, baseX2, baseY2);
            baseX1 += slope1[1];
            baseY1 += slope1[0];
            baseX2 += slope2[1];
            baseY2 += slope2[0];
        }
    }
    reduce(numerator: number, denominator: number){
        var gcd = function gcd(a,b){
            return b ? gcd(b, a%b) : a;
        };
        gcd = gcd(numerator,denominator);
        return [numerator/gcd, denominator/gcd];
    }
}

//make a hashSet. Make it contain all the points. When a point is used, it becomes invalid and taken out of the set.
//to choose a random point, you first get an area where you want the point to be in (50px radius). Then you check if 
//the point that you want is valid.
