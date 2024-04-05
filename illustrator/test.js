// Check if Adobe Illustrator is running
if (app.name != "Adobe Illustrator") {
    alert("Please run this script in Adobe Illustrator.");
    exit();
  }
  
// Get the current document and current layer
var doc = app.activeDocument;
var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()]; // Get the active artboard
var artboardCenter = [
    artboard.artboardRect[0] + (artboard.artboardRect[2] - artboard.artboardRect[0]) / 2,
    artboard.artboardRect[1] - (artboard.artboardRect[1] - artboard.artboardRect[3]) / 2
]; // Calculate the center of the artboard

targetLayer = doc.layers.getByName("target");

colorLayer = doc.layers.getByName('color group');
function get_color(clr){
    var idx = Math.floor(Math.random() * colorLayer.pathItems.length);
    var c = colorLayer.pathItems[idx].fillColor;

    while(c === clr) {
        idx = Math.floor(Math.random() * colorLayer.pathItems.length);
        c = colorLayer.pathItems[idx].fillColor;
    }

    return c;
};

shapeLayer = doc.layers.getByName('shape group');
function copyShape(clr){
    var idx = Math.floor(Math.random() * shapeLayer.pathItems.length);
    var shapeToCopy = shapeLayer.pathItems[idx];
    
    shapeLayer.visible = true;
    
    var duplicatedShape = shapeToCopy.duplicate();
    var shapeWidth = duplicatedShape.width;
    var shapeHeight = duplicatedShape.height;
    duplicatedShape.position = [artboardCenter[0] - shapeWidth / 2, artboardCenter[1] + shapeHeight / 2];
    duplicatedShape.fillColor = clr;

    duplicatedShape.move(targetLayer, ElementPlacement.PLACEATBEGINNING);
    duplicatedShape.visible = true;

    shapeLayer.visible = false;
};

charLayer = doc.layers.getByName('Alphabet group');
function copyChar(clr){
    var idx = Math.floor(Math.random() * charLayer.textFrames.length);
    var shapeToCopy = charLayer.textFrames[idx];
    
    charLayer.visible = true;
    
    var duplicatedShape = shapeToCopy.duplicate();
    var shapeWidth = duplicatedShape.width;
    var shapeHeight = duplicatedShape.height;
    duplicatedShape.position = [artboardCenter[0] - shapeWidth / 2, artboardCenter[1] + shapeHeight / 2];
    duplicatedShape.textRange.characterAttributes.fillColor = clr;

    duplicatedShape.move(targetLayer, ElementPlacement.PLACEATBEGINNING);
    duplicatedShape.visible = true;

    charLayer.visible = false;
};

var clr = get_color(null);
var clr1= get_color(clr);
copyShape(clr);
copyChar(clr1);
targetLayer.visible=true;

var saveOptions = new ExportOptionsSVG();
saveOptions.embedRasterImages = true;
saveOptions.embedAllFonts = true;
saveOptions.fontType = SVGFontType.OUTLINEFONT;
saveOptions.preserveEditability = false;

ch="A";
var saveFile = new File("/Users/sunshower/Documents/javascript-test/adobe-test/output/"+ch+".svg");
doc.exportFile(saveFile, ExportType.SVG, saveOptions);

//app.executeMenuCommand('undo');




