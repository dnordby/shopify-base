module.exports = function(source, map) {
  if(this.cacheable) this.cacheable();

  const path = require('path');
  const fs = require('fs');
  const exec = require('child_process').exec;
  const directory = this.context;

  var imports = [];
  var returnScss = '';
  var $this = this;

  function getAllFiles(directory) {
    var results = [];

    fs.readdirSync(directory).forEach(function(file) {
        file = directory+'/'+file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFiles(file))
        } else results.push(file);
    });
    
    for (var i = results.length - 1; i >= 0; i--) {
      if (typeof results[i] !== "undefined") {
        $this.addDependency(results[i]);
      }
    }
  };

  function getImports(file) {
    var line = file.split(/\n/g);
    for (var i = line.length - 1; i >= 0; i--) {
      if (line[i].startsWith("@import")) {
        var cleanLine = line[i].replace('@import ', '').replace(/(\"|\')/gi, '').replace(/\;/gi, '');
        var importFileContent = fs.readFileSync(path.resolve(directory + '/' + cleanLine));
        returnScss = importFileContent + '\n' + returnScss;
      }
    }

    if ( returnScss.includes('@import ') ) {
      getImports(returnScss);
    } else {
      return;
    }
  }

  // ADD ALL /src DIRECTORY FILES AS DEPENDENCIES FOR webpack --watch TO WORK
  getAllFiles(directory);

  // IMPORT FILES PRESENT IN SOURCE
  getImports(source);

  // RETURN FOR NEXT LOADER TO PROCESS
  return returnScss;
}