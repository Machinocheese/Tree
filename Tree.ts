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
        generator = new gen.Generator(0, document.body.clientWidth, document.body.clientHeight * 3 / 4, document.body.clientHeight);
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
    radius: number;
    constructor(x: number, y: number, offsetX: number, offsetY: number, lifespan: number, color: string = 'rgb(205,133,63)', radius: number = 5){
        this.x = x;
        this.y = y;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.lifespan = lifespan;
        this.color = color;
        this.circle = new shapes.Circle(this.x,this.y,this.color);
        this.confirmed = true;
        this.radius = radius;
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
            var point: Array<number> = new Array<number>();
            point = generator.generateRandomCircle(this.x,this.y,this.radius);
            var newX = point[0] - this.x;
            var newY = point[1] - this.y;
            console.log("NEW X: " + newX + " NEW Y: " + newY);
            this.roots.push(new Root(this.x + this.offsetX, this.y + this.offsetY, newX, newY, this.lifespan - 1));
        }
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
