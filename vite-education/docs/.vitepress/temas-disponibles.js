let fs = require('fs'), path = require('path'), util = require('util');

let dirToJSON = function(dir, done) {
  let results = [];

  function recWalk(d, res) {
    let list = fs.readdirSync(d);
    list.forEach((name) => {
      let tempResults = [];
      let file = path.resolve(d, name);
      let stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        recWalk(file, tempResults);
        let obj = {};
        obj[name] = tempResults;
        res.push(obj);
      } else {
        res.push(name);
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
    fs.writeFile('temas-publicados.json', json, 'utf8', function(err) {
        if (err) throw err;
        console.log('complete');
        });
  }
});