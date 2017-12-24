function greeter(person) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);

interface Tree{
    state: boolean; //determines if alive or dead
    species: string;
    health: number;
    leaves: Leaf[];
    branches: Branch[];
    trunk: Trunk;
    roots: Root[];
}

interface Leaf{
    state: string[]; //determines if dying, living, lacking pigment, etc.
    color: string;
    size: number;
}

interface Branch{
    state: string[];
    color: string;
    length: number;
    branches: Branch[];
}

interface Trunk{
    color: string;
    length: number;
    width: number;
}

interface Root{
    lifegain: number;
    length: number;
    roots: Root[];
}