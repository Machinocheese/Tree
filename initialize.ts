import model = require("Tree")
import drawer = require("View")


var tree = new model.Tree("Maple");
var view = new drawer.View(tree);

import generator = require("Generator");
var gen = new generator.Generator(0,0,10,10);
gen.generateRandomRectangle(0,0,10,10);
