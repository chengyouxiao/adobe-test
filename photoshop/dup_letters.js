
//check https://www.asciitable.com/
// const s = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
var char_range ={
    "Numbers": getString("0","9"),
    "Uppercase": getString("A","Z"),
    "Lowercase": getString("a","z"),
    "Symbol": "%?!@&#^)\\(\"'=.*~-+$",
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

var folder = "~/Documents/javascript-test/output/"

var doc = app.activeDocument; // Make sure the document is opend and selected
var textLayer = doc.activeLayer; //Make sure the layer that has the letter is selected

// Calculate the center of the canvas
var centerX = doc.width / 2;
var centerY = doc.height / 2;

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
        for (var i = 0; i < char_range[j].length; i++) {
            var character = char_range[j][i];
            textItem.contents = character;

            var bounds = textLayer.bounds;
            var newX = centerX - ((bounds[2].value - bounds[0].value) / 2);
            var newY = centerY + ((bounds[1].value - bounds[3].value) / 2);
            textLayer.translate(newX - bounds[0], newY - bounds[1]);
            textItem.justification = Justification.CENTER;

            var ch = symbolMap.hasOwnProperty(character)? symbolMap[character]: character;
            doc.exportDocument(new File(folder + j + "-" + ch + ".png"), ExportType.SAVEFORWEB, pngOptions);
        }
    }    
}
finally{
    textItem.contents = saved;
}
