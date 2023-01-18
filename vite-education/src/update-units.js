let fs = require('fs');
const path = require("path")

function parseDirectory(directory) {
        
    return fs.readdirSync(directory).reduce((out, item) => {
      const itemPath = path.join(directory, "/", item);
  
      if (fs.statSync(itemPath).isDirectory()) {
        out["text"] = itemPath;
        out["items"] = parseDirectory(itemPath);
      } else {
        out["text"] = item;
        out["link"] = itemPath;
      }
  
      return out;
    }, {});
  }

let dirPath = '../docs/units';
let filesArr = parseDirectory(dirPath)
let filesStr = JSON.stringify(filesArr);

console.log(filesStr)

fs.writeFileSync("../docs/.vitepress/public/units.js", "export default { \n" + filesStr + "\n} \n");