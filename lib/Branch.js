const EventEmitter = require('events');

class Branch  extends EventEmitter {

  constructor(name, parent) {
    super();

    this.name = name;
    this.data = null;

    this.parent = parent;

    this.children = new Map();
    this.content = new Map();

    this.tags = new Set();
  }

  tag(input=[]) {
    const tags = Array.isArray(input)?input:input.split(/,| /);
    // apply tag
    tags.forEach(tag => {
      //if(tag === '*') return;
      //console.log(`Tagging ${this.name} with ${tag}`);
      this.tags.add(tag);
    });
    //console.log(this.tags)
  }

  sharesTags(input) {
    if( this.tags.has('*') ){
      return true;
    }

    const tags = Array.isArray(input)?input:input.split(/,| /);
    let match = false;
    tags.forEach(tag => {
      if(this.tags.has(tag)) match = true;
    });
    return match
  }

  pipe(object) {

    if( this.sharesTags(object.tags )){
      //console.info(`Branch ${this.name} (${ Array.from(this.tags).join('+') }/${this.tags.size}) accepted object with tags ${object.tags}`);
      // the object shares some tags with this branch,
      // this means information can be passed down
      this.emit('object', object);
      // TODO: this can be optimized by checking if object exists, and checking version numbers
      this.content.set( object.uuid, object );
      this.emit('content', object);
      // Because we share tags, pass the object on, not all of these pipes will be interested, but some may.
      for (let [key, child] of this.children) {
        child.pipe(object);
      }
    } else {
      //console.info(`Branch ${this.name} (${ Array.from(this.tags).join('+') }/${this.tags.size}) dropped object with tags ${object.tags}`);
      //console.log(this)
      //console.log(this.tags)
      // this branch does not share tags with the incoming object,
      // the object will not trigger anything
    }

  }

  has(name) {
    return this.children.has(name);
  }

  set(name, object) {
    this.children.set(name, object);
    return object;
  }

  get(name) {
    return this.children.get(name);
  }

  locate( input ) {
    const path = Array.isArray(input)?input:input.split('/');
    let selectedNode = this;
    //console.log('Locate: %s', path)
    path.forEach(function(name){
      //console.log("Does selected node (%s) have a name of %s? :", selectedNode.name, name, selectedNode.has(name) )
        if( selectedNode.has(name) ){
          // name already there, so just grab that node
          selectedNode = selectedNode.get(name);
        }else{
          // create new node
          selectedNode = null;
        }
    });
    return selectedNode;
  }

  make({path, tags}) {
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
    selectedNode.tag(tags);
    // console.log( 'Tagged "%s" with %s', selectedNode.name, tags );
  }

}

module.exports = Branch;
