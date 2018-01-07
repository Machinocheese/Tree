import shapes = require("Shapes");
import gen = require("generator");
var generator: gen.Generator;
interface iShape{
    x: number;
    y: number;
    color: string;
}

export class Tree{
    public alive: boolean;
    public species: string;
    public health: number;
    public stages: string[] = ["Germination","Seedling","Sapling","Mature","Ancient","Decaying"];

    private stage: number;
    private leaves: Array<Leaf> = new Array<Leaf>();
    private branches: Array<Branch> = new Array<Branch>();
    private roots: Array<Root> = new Array<Root>();
    private trunk: Trunk;

    constructor(species: string, alive: boolean = true){
        this.species = species;
        this.alive = alive;
        this.roots.push(new Root(document.body.clientWidth / 2, document.body.clientHeight * 3 / 4 + 25, 50, 50, 2));
    }
    draw(){
        for(var i = 0; i < this.roots.length; i++){
            this.roots[i].draw();
        }
    }
}

class Leaf implements iShape{
    public x: number;
    public y: number;
    public color: string;
    public state: string[] = ["Alive","Shriveled","Dead"];
    public size: number;
}

class Branch implements iShape{
    x: number;
    y: number;
    color: string;
}

/**
 * Notes: Each root's width will be a fraction of its parent root - the main roots parent root is the trunk.
 * Each root will contain segments of rectangles. Each rectangle can have a slant of up to 45 degrees either way.
 * Each root has a "lifespan" - aka the number of times it can generate roots that grow more roots.
 * 
 * lifespan = 50 w/ length of 50.
 * When spawning roots, it is essential to make sure they don't overlap (the lines).
 * 
 * Step 1: choose how many subroots are going to come from the "Main" Roots (the preloaded ones)
 * Step 2: Randomly choose an endpoint for each subroot - check if not intersecting any "Nodes" or "Edges"
 * Step 3: If so, rechoose point - (this only works 3 times - if they all fail, then stop choosing)
 */
var lines: Array<shapes.Line> = new Array<shapes.Line>();
var randomTries = 3;
class Root implements iShape{
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
    lifespan: number;
    color: string;
    roots: Array<Root> = new Array<Root>();
    confirmed: boolean;
    circle: any;
    constructor(x: number, y: number, offsetX: number, offsetY: number, lifespan: number, color: string = 'rgb(205,133,63)'){
        this.x = x;
        this.y = y;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.lifespan = lifespan;
        this.color = color;
        this.circle = new shapes.Circle(this.x,this.y,this.color);
        lines.push(new shapes.Line(this.x,this.y,this.x + this.offsetX, this.y + this.offsetY));
        this.confirmed = true;
    }
    draw(){
        for(var i = 0; i < this.roots.length; i++){
            this.roots[i].draw();
        }
        this.circle.draw();
        //i check this.roots.length == 0 b/c draw() is repetitively called. I only want to generateRoot() once!
        if(1 === this.circle.move(this.x + this.offsetX, this.y + this.offsetY) && this.confirmed){
            this.generateRoot();
            this.confirmed = false;
        }
    }
    generateRoot(){
        //# roots generated = this.lifespan
        //it needs to generate roots according to # lifespan
        for(var i = 0; i < this.lifespan; i++){
            
            var newX = Math.floor(Math.random() * 100) - 50;
            var newY = Math.floor(Math.random() * 45) + 10;
            //let's do something a little more elegant for newX. Partition spaces for random generation.
            console.log(!this.filter(newX, newY));
            if(!this.filter(newX, newY)) return;
            this.roots.push(new Root(this.x + this.offsetX, this.y + this.offsetY, newX, newY, this.lifespan - 1));
        }
    }
    /**
     * 
     * @param x 
     * @param y 
     * @returns true if valid input, false if invalid input
     */
    filter(x: number, y: number): boolean{
        //TODO: determine if x/y goes over what can be shown on monitor. then filter it out!
        var temp = new shapes.Line(this.x, this.y, this.x + x, this.y + y);
        console.log(lines);
        for(var i = 0; i < lines.length; i++){
            //console.log(i);
            if(lines[i].intersect(temp) == true){
                return false;
            }
        }
        return true;
    }
}

class Trunk implements iShape{
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public color: string;
    constructor(x: number, y: number, width: number, height: number, color: string = "brown", lineWidth: number = 2){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}
