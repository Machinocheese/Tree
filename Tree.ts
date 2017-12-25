/*public draw = (): void => {
    //draw trunk
    //this.trunk.draw();
    //draw leaves

    //draw branches

    //draw roots
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "brown";
    ctx.lineWidth = 2;
    ctx.rect(100,100,100,100);
    ctx.stroke();
    ctx.restore();
}*/

interface iShape{
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

    constructor(species: string, alive: boolean = true){
        this.species = species;
        this.alive = alive;        
        this.trunk = new Trunk(100,100,100,100);
    }
}

class Leaf implements iShape{
    public x: number;
    public y: number;
    public color: string;
    public lineWidth: number;
    public state: string[] = ["Alive","Shriveled","Dead"];
    public size: number;
}

class Branch implements iShape{
    x: number;
    y: number;
    color: string;
    lineWidth: number;
}

class Root implements iShape{
    x: number;
    y: number;
    color: string;
    lineWidth: number;
}

class Trunk implements iShape{
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
}
