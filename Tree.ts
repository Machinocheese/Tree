

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;

export interface iShape{
    draw(): void;
    x: number;
    y: number;
    color: string;
    lineWidth: number;
}

export class Tree{
    public alive: boolean;
    public species: string;
    public health: number;
    public stage: string[] = ["Germination","Seedling","Sapling","Mature","Ancient","Decaying"];
    private leaves: Array<Leaf> = new Array<Leaf>();
    private branches: Array<Branch> = new Array<Branch>();
    private roots: Array<Root> = new Array<Root>();
    private trunk: Trunk;

    constructor(species: string, canvasTemp: HTMLCanvasElement, ctxTemp: CanvasRenderingContext2D, alive: boolean = true){
        this.species = species;
        this.alive = alive;
        canvas = canvasTemp;
        ctx = ctxTemp;
        
        this.trunk = new Trunk(100,100,100,100);
    }

    public draw = (): void => {
        //draw trunk
        this.trunk.draw();
        //draw leaves

        //draw branches

        //draw roots
     }
}

export class Leaf implements iShape{
    public x: number;
    public y: number;
    public color: string;
    public lineWidth: number;
    public state: string[] = ["Alive","Shriveled","Dead"];
    public size: number;
    public draw = (): void => {

    }
}

export class Branch implements iShape{
    x: number;
    y: number;
    color: string;
    lineWidth: number;
    public draw = (): void => {
    
    }
}

export class Root implements iShape{
    x: number;
    y: number;
    color: string;
    lineWidth: number;
    public draw = (): void => {
    
    }
}

export class Trunk implements iShape{
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public color: string;
    public lineWidth: number;
    constructor(x: number, y: number, width: number, height: number, color: string = "brown", lineWidth: number = 2){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.lineWidth = lineWidth;
    }
    public draw = (): void => {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.restore();
    }
}
