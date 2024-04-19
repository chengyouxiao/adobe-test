// Check if Adobe Illustrator is running
if (app.name != "Adobe Illustrator") {
  alert("Please run this script in Adobe Illustrator.");
  exit();
}

// Get the current document and current layer
var doc = app.activeDocument;
var layer = doc.activeLayer;

// Find shapes by their names and change their color
var shapeNames = ["shape1", "shape2", "shape3"];
var shapeColor = new RGBColor();
shapeColor.red = 255;
shapeColor.green = 0;
shapeColor.blue = 0;

for (var i = 0; i < shapeNames.length; i++) {
  var shape = layer.pathItems.getByName(shapeNames[i]);
  shape.fillColor = shapeColor;
}

// Find the grouped object and change its color
var groupName = "group1";
var group = layer.groupItems.getByName(groupName);

if (group) {
  for (var i = 0; i < group.pageItems.length; i++) {
    var item = group.pageItems[i];
    item.fillColor = shapeColor;
  }
} else {
  alert("Group '" + groupName + "' not found.");
}

// Save the document as an SVG file
var saveOptions = new ExportOptionsSVG();
saveOptions.embedRasterImages = true;
saveOptions.embedAllFonts = true;
saveOptions.fontType = SVGFontType.OUTLINEFONT;
saveOptions.preserveEditability = false;

var saveFile = new File("~/Desktop/output.svg");
doc.exportFile(saveFile, ExportType.SVG, saveOptions);

// Display a success message
alert("The document has been saved as an SVG file.");
