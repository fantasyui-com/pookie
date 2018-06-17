// const Tree = require('./Tree.js');
// const Root = require('./Root.js');
// const Branch = require('./Branch.js');

class Branch {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
    this.data = new Map();
  }

  pipe(object) {
    console.log('%s got data', this.name)
    for (let [key, value] of this.data) {
      value.pipe(object);
    }
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

  locate(input) {
    const path = Array.isArray(input)?input:input.split('/');
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
        selectedNode = selectedNode.set(name, new Branch(name, selectedNode));
      }
    });
  }

}

module.exports = Branch;
