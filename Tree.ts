import shapes = require("Shapes");

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
        this.roots.push(new Root(document.body.clientWidth / 2, document.body.clientHeight * 3 / 4 + 25, 0, 0, 100));
        this.roots.push(new Root(document.body.clientWidth / 2 + 10, document.body.clientHeight * 3 / 4 + 32, 0, 0, 100));        
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
 * Rectangles get progressively smaller, and each root ends with a "triangle" shape.
 * Each root has a "lifespan" - aka the number of times it can generate roots that grow more roots.
 * generateRoot(){}
 * 
 * 
 */

class Root implements iShape{
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
    lifespan: number;
    color: string;
    roots: Root[];
    circle: any;
    constructor(x: number, y: number, offsetX: number, offsetY: number, lifespan: number, color: string = 'rgb(205,133,63)'){
        this.x = x;
        this.y = y;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.lifespan = lifespan;
        this.color = color;
        this.circle = new shapes.Circle(this.x,this.y,this.color);
    }
    draw(){
        this.circle.draw();
        this.circle.move(this.x + this.offsetX, this.y + this.offsetY);
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
