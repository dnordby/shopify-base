module.exports = function(source) {
  const path = require('path');
  var fs = require('fs');
  var exec = require('child_process').exec;
  var imports = [];
  var returnScss = '';

  function getImports(file) {
    var line = file.split(/\n/g);
    for (var i = line.length - 1; i >= 0; i--) {
      if (line[i].startsWith("@import")) {
        imports.push(line[i]);
      }
    }
    return cleanArray(imports);
  }

  function cleanArray(imports) {
    for (var i = 0; i < imports.length; i++) {
      if (imports[i] == '') {
        imports.splice(i, 1);
        i--;
      } else {
        imports[i] = imports[i].replace('@import ', '').replace(/\"/gi, '').replace(/\;/gi, '');
      }
    }
    return imports;
  }

  // LINT IMPORTS FILE
  if (source.includes('@import ')) {
    var initImportArray = getImports(source);
  }


  for (var i = 0; i < initImportArray.length; i++) {
    var importFileContent = fs.readFileSync(path.resolve('src/scss/bootstrap/' + initImportArray[i]), 'utf8');
    returnScss += importFileContent;
  }
  return(returnScss);
}