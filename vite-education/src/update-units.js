let fs = require('fs');
const path = require("path")

function parseDirectory(directory) {
        
    return fs.readdirSync(directory).reduce((out, item) => {
      const itemPath = path.join(directory, "/", item);
  
      if (fs.statSync(itemPath).isDirectory()) {
        out["items"] = parseDirectory(itemPath);
      } else {
        out["text"] = item;
      }
  
      return out;
    }, {});
  }

let dirPath = '../docs/units';
let filesArr = parseDirectory(dirPath)

console.log(filesArr)