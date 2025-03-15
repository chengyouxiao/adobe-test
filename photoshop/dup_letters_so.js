
//check https://www.asciitable.com/
// const s = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
var char_range ={
    "Test": "A0w",
    "Numbers": getString("0","9"),
    "Uppercase": getString("A","Z"),
    "Lowercase": getString("a","z"),
    "Symbol": "%?!@&#^)\\(\=.*~-+$",
}

function getString(beg, end){
    var result = "";
    for (var i = beg.charCodeAt(0); i <= end.charCodeAt(0); i++) {
        result += String.fromCharCode(i);
    }
    return result;
}

var symbolMap = {
    "%": "percent",
    "!": "exclamation",
    "?": "question",
    "@": "at",
    "#": "hash",
    "&": "ampersand",
    "^": "caret",
    ")": "close_parenthesis",
    "/": "backslash",
    "\\": "backslash",
    "(": "open_parenthesis",
    "\"": "double_quote",
    "'": "single_quote",
    "=": "equal",
    ".": "dot",
    "*": "asterisk",
    "~": "tilde",
    "-": "hyphen",
    "+": "plus",
    "$": "dollar"
};

function changeSmartObjectText(ch) {
    var doc = app.activeDocument;
    var smartObjectLayer = doc.activeLayer;

    // Check if the selected layer is a smart object
    if (smartObjectLayer.kind == LayerKind.SMARTOBJECT) {
        // Open the smart object
        app.executeAction(stringIDToTypeID('placedLayerEditContents'), undefined, DialogModes.NO);

        // Reference the opened smart object document
        var tempDoc = app.activeDocument;

        // Assuming there is only one text layer in the smart object
        for (var i = 0; i < tempDoc.layers.length; i++) {
            if (tempDoc.layers[i].kind == LayerKind.TEXT) {
                var textLayer = tempDoc.layers[i];
                textLayer.textItem.contents = ch;

                var centerX = tempDoc.width / 2;
                var centerY = tempDoc.height / 2;

                var bounds = textLayer.bounds;
                var newX = centerX - ((bounds[2].value - bounds[0].value) / 2);
                var newY = centerY + ((bounds[1].value - bounds[3].value) / 2);
                textLayer.translate(newX - bounds[0], newY - bounds[1]);
                textLayer.textItem.justification = Justification.CENTER;

                break;
            }
        }

        // Save and close the smart object document
        tempDoc.close(SaveOptions.SAVECHANGES);
    } else {
        alert("Selected layer is not a smart object.");
    }
}


// var folder = "/Users/sunshower/Documents/#OldDocumentBefore050824/javascript-test/adobe-test/output/";
var folder = "/Users/sunshower/Documents/#NewDocument After050824/101024 Output from Xiao/"
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

try{
    for(var j in char_range){
        for (var i = 0; i < char_range[j].length; i++) {
            var character = char_range[j][i];
            
            changeSmartObjectText(character);
    
            var ch = symbolMap.hasOwnProperty(character)? symbolMap[character]: character;
            var doc = app.activeDocument; 
            doc.exportDocument(new File(folder + j + "-" + ch + ".png"), ExportType.SAVEFORWEB, pngOptions);
        }
    }    
}
finally{
    changeSmartObjectText("S");
}
