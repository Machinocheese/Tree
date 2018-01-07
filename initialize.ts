import model = require("Tree")
import drawer = require("View")

/**
 * The starter code for my program. I'm doing this to create a sort of "control panel" for the future.
 */
var tree = new model.Tree("Maple");
var view = new drawer.View(tree);
