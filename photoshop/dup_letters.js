
//check https://www.asciitable.com/
// const s = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
var char_range ={
    "Numbers": "0-9",
    "ALPHABET":"A-Z",
    "lowercase":"a-z"
}
var folder = "~/Documents/javascript-test/output/"

var doc = app.activeDocument; // Make sure the document is opend and selected
var textLayer = doc.activeLayer; //Make sure the layer that has the letter is selected

var pngOptions = new ExportOptionsSaveForWeb();
pngOptions.format = SaveDocumentType.PNG;
pngOptions.PNG8 = false;
pngOptions.quality = 100;
pngOptions.includeProfile = true;
pngOptions.interlaced = false;
pngOptions.transparency = true;
pngOptions.optimized = true;
pngOptions.artBoardClipping = false;
pngOptions.horizontalScale = 100;
pngOptions.verticalScale = 100;

var textItem = textLayer.textItem;
var saved = textItem.contents;
try{
    for(var j in char_range){
        for (var i = char_range[j].charCodeAt(0); i <= char_range[j].charCodeAt(2); i++) {
            var character = String.fromCharCode(i);
            textItem.contents = character;
            var ch = character==='/'? "backslash": character;
            doc.exportDocument(new File(folder + j + "-" + ch + ".png"), ExportType.SAVEFORWEB, pngOptions);
        }
    }    
}
finally{
    textItem.contents = saved;
}
