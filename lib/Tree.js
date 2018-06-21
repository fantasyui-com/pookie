// This is a Utility Object like Math or Array

const Root = require('./Root.js');
const Branch = require('./Branch.js');

const Tree = {

  decodeMap(map) {
    const response = map.split( '\n' ) // turn into lines
     .map( l=>l.trim().replace(/ +/g, ' ') ) // clean up lines
     .filter( l=>!(l.match(/^ {0,}#/)) ) // eliminate comments
     .filter( l=>l ) // eliminate empties
     .map(function(l){ let [cmd, path, tags] = l.split(" "); return {cmd, path, tags}; } ) // split cmd/path-string
     .map(function(o){ o.path = o.path.split("/"); o.tags = o.tags?o.tags.split(","):[]; return o;} ) // split path into fragments
    return response;
  },

  importMap(tree, map) {
    map.forEach(function({cmd, path, tags}){
      tree[cmd]({path, tags});
    })
  },

  importData(root, producer) {
    producer(function(record){
      //console.log(record);
      root.pipe(record)
    });
  }


}

module.exports = Tree;
