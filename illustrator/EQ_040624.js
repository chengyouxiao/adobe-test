// Check if Adobe Illustrator is running
if (app.name != "Adobe Illustrator") {
    alert("Please run this script in Adobe Illustrator.");
    exit();
  }
  
  //check https://www.asciitable.com/
  // const s = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
  var char_range ={
    "uppercase":"A-Z",
    "lowercase":"a-z",
    "number": "0-9",
  }
  var folder = "/Users/sunshower/Documents/javascript-test/adobe-test/output/";
  
  // Get the current document and current layer
  var doc = app.activeDocument;

  var saveOptions = new ExportOptionsPNG24();
  saveOptions.antiAliasing = true;
  saveOptions.transparency = true;
  saveOptions.horizontalScale = 417;
  saveOptions.verticalScale = 417;
  saveOptions.resolution = 300; 
  
  function getLayerByName(name) {
    var doc = app.activeDocument;
    try {
        return doc.layers.getByName(name);
    } catch (e) {
        // Layer not found, return null
        return null;
    }
  }
  
  for(var k = 1; k < 2; k++){
    var layer = getLayerByName("A"+k);
    if(!layer) continue;
  
    layer.visible = true;
    var group = layer;//.groupItems[0];
    for(var j in char_range){
      for (var i = char_range[j].charCodeAt(0); i <= char_range[j].charCodeAt(2); i++) {
          var character = String.fromCharCode(i);
          
          for(var l=0;l<group.textFrames.length;l++){
            var text = group.textFrames[l];
            text.contents = character;
          }
          var ch = character==='/'? "backslash": character;

          var saveFile = new File(folder + j + "-" + ch + ".png")  
          doc.exportFile(saveFile, ExportType.PNG24, saveOptions);
      }
    }    
  
    for(var l=0;l<group.textFrames.length;l++){
      var text = group.textFrames[l];
      text.contents = "A";
    }
    layer.visible = false;
  }
  
  alert("Done!");
  
  
  
  