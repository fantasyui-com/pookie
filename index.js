const util = require('util');

const Tree = {
  import(tree, map) {
    map.forEach(function({cmd, path}){
      tree[cmd]({path});
    })
  }
}

class TreeNode {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
    this.data = new Map();
  }

  has(name) {
    return this.data.has(name);
  }

  set(name, object) {
    this.data.set(name, object);
    return object;
  }
  get(name) {
    return this.data.get(name);
  }

  locate(path) {
    console.log('')
    let selectedNode = this;

    path.forEach(function(name){
      if(selectedNode){
        if(selectedNode.has(name) ){
          // name already there, so just grab that node
          selectedNode = selectedNode.get(name);
        }else{
          // create new node
          selectedNode = null;
        }
      }
    });

    return selectedNode;
  }

  make({path}) {
    let selectedNode = this;
    path.forEach(function(name){
      if(selectedNode.has(name) ){
        // name already there, so just grab that node
        selectedNode = selectedNode.get(name);
      }else{
        // create new node
        selectedNode = selectedNode.set(name, new TreeNode(name, parent:selectedNode));
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
console.log( root.locate('Root/Users'.split('/')) )
