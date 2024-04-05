// Check if Adobe Illustrator is running
if (app.name != "Adobe Illustrator") {
  alert("Please run this script in Adobe Illustrator.");
  exit();
}

//check https://www.asciitable.com/
// const s = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
var char_range ={
  "Numbers": "0-9",
  "ALPHABET":"A-Z",
  "lowercase":"a-z"
}
var folder = "/Users/sunshower/Documents/javascript-test/adobe-test/output/";

// Get the current document and current layer
var doc = app.activeDocument;
var saveOptions = new ExportOptionsPNG24();

// var saveOptions = new ExportOptionsSVG();
// saveOptions.embedRasterImages = true;
// saveOptions.embedAllFonts = true;
// saveOptions.fontType = SVGFontType.OUTLINEFONT;
// saveOptions.preserveEditability = false;

const layerNames = ["A1", "A2", "A3", "A4"];
for(var k = 0; k < layerNames.length; k++){
  var layer = doc.layers.getByName(layerNames[k]);
  layer.visible = true;

  var group = layer.groupItems[0];
  for(var j in char_range){
    for (var i = char_range[j].charCodeAt(0); i <= char_range[j].charCodeAt(2); i++) {
        var character = String.fromCharCode(i);
        
        for(var l=0;l<group.textFrames.length;l++){
          var text = group.textFrames[l];
          text.contents = character;
        }
        var ch = character==='/'? "backslash": character;
        
        var saveFile = new File(folder + layerNames[k]+ "-" + j + "-" + ch + ".png")  
        doc.exportFile(saveFile, ExportType.PNG24, saveOptions);
        // doc.exportFile(saveFile, ExportType.SVG, saveOptions);
    }
  }    
  
  for(var l=0;l<group.textFrames.length;l++){
    var text = group.textFrames[l];
    text.contents = "A";
  }
  layer.visible = false;
}
