let fs = require('fs'), path = require('path'), util = require('util');

let dirToJSON = function(dir, done) {
  let results = [];

  function recWalk(d, res) {
    let list = fs.readdirSync(d);
    list.forEach((name) => {
      let tempResults = [];
      let pathD = d + "/" + name;
      let file = path.resolve(d, name);
      let stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        recWalk(file, tempResults);
        let obj = {};
        obj.text = name;
        obj["items"] = tempResults;
        res.push(obj);
      } else {
        let obj = {};
        obj["text"] = name;
        obj["link"] = pathD;
        res.push(obj);
      }
    });
  }

  try {
    recWalk(dir, results);
    done(null, results);
  } catch(err) {
    done(err);
  }
};

dirToJSON("../temas", function(err, results) {
  if (err) console.log(err);
  else {
    let json =  JSON.stringify(results);
    fs.appendFileSync('temas-publicados.js', "module.exports = ");
    fs.appendFileSync('temas-publicados.js', json);
        console.log('complete');
  }
});