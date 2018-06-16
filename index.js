const util = require('util');

const Tree = {
  import(tree, map) {
    map.forEach(function({cmd, path}){
      tree[cmd]({path});
    })
  }
}

class TreeNode {
  constructor(name) {
    this.name = name;
    this.data = new Map();
  }

  has(name) {
    return this.data.has(name);
  }

  set(name, object) {
    return this.data.set(name, object);
  }
  get(name) {
    return this.data.get(name);
  }

  make({path}) {

    let target = this;
    path.forEach(function(name){

      if(target.has(name) ){
        // name already there
        target = target.get(name);
      }else{
        const newNode = new TreeNode(name);
        target.set(name, newNode);
        target = newNode;
      }

    });

  }
}

class TreeRoot extends TreeNode {
  constructor(name) {
    super('root');
  }
}


const root = new TreeRoot();

let map = `

  make Root/Users
  make Root/Docs
  make Root/Messages

  # Add Users
  make Root/Users/System
  make Root/Users/Admin

  make Root/Users/Admin/Messages
  make Root/Users/System/Messages

`.split( '\n' ) // turn into lines
 .map( l=>l.trim().replace(/ +/g, ' ') ) // clean up lines
 .filter( l=>!(l.match(/^ {0,}#/)) ) // eliminate comments
 .filter( l=>l ) // eliminate empties
 .map(function(l){ let [cmd, path] = l.split(" "); return {cmd, path}; } ) // split cmd/path-string
 .map(function(o){ o.path = o.path.split("/"); return o;} ) // split path into fragments

Tree.import(root, map);
console.log( util.inspect(root, { showHidden: true, depth: null }) );
