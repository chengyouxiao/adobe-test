// Check if Adobe Illustrator is running
if (app.name != "Adobe Illustrator") {
    alert("Please run this script in Adobe Illustrator.");
    exit();
  }
  
  //check https://www.asciitable.com/
  // const s = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
  var char_range ={
    "uppercase": getCharList('A',26),
    "lowercase": getCharList('a',26),
    "number": getCharList('0',10),
  }
  var folder = "/Users/sunshower/Documents/javascript-test/adobe-test/output/";
  
  // Get the current document and current layer
  var doc = app.activeDocument;
  var saveOptions = new ExportOptionsPNG24();
  saveOptions.antiAliasing = true;
  saveOptions.transparency = true;
  saveOptions.resolution = 300; // Set resolution to 300 PPI
  saveOptions.horizontalScale = 200;
  saveOptions.verticalScale = 200;

  var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()]; // Get the active artboard
  var artboardCenter = [
      artboard.artboardRect[0] + (artboard.artboardRect[2] - artboard.artboardRect[0]) / 2,
      artboard.artboardRect[1] - (artboard.artboardRect[1] - artboard.artboardRect[3]) / 2
  ]; // Calculate the center of the artboard

  // var saveOptions = new ExportOptionsSVG();
  // saveOptions.embedRasterImages = true;
  // saveOptions.embedAllFonts = true;
  // saveOptions.fontType = SVGFontType.OUTLINEFONT;
  // saveOptions.preserveEditability = false;

  function getCharList(start, len){
    var lst = [];
    var s = start.charCodeAt(0);
    for (var i = 0; i < len; i++) {
      lst.push(String.fromCharCode(i + s));
    }
    return lst;
  }
  
  function getLayerByName(name) {
    var doc = app.activeDocument;
    try {
        return doc.layers.getByName(name);
    } catch (e) {
        // Layer not found, return null
        return null;
    }
  }
  
  for(var k = 1; k < 10; k++){
    var layer = getLayerByName("A"+k);
    if(!layer) continue;
  
    layer.visible = true;
    var group = layer.groupItems[0];
    for(var j in char_range){
      for (var i = 0; i < char_range[j].length; i++) {
          var character = char_range[j][i];
          
          for(var l=0;l<group.textFrames.length;l++){
            var text = group.textFrames[l];
            text.contents = character;

            var w = text.width;
            var h = text.height;
            
            text.position = [artboardCenter[0] - w * 0.45, artboardCenter[1] + h * 0.55];
          }
          var ch = character==='/'? "backslash": character;

          var saveFile = new File(folder + layer.name+ "-" + j + "-" + ch + ".png")  
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
  
  alert("Done!");
  
  
  
  