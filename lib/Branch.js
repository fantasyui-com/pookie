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

  tag(tags=[]) {
    // apply tag
    tags.forEach(tag => {
      this.tags.add(tag);
    });
  }

  tagged(tags) {
    let match = false;
    tags.forEach(tag => {
      if(this.tags.has(tag)) match = true;
    });
    return match
  }

  pipe(object) {
    this.emit('object', object);


    console.log( this.name, this.tags, object.tags, this.tagged(object.tags) )

    if( this.tagged(object.tags) ) {
      // We have a match...
      // Capture content
      this.content.set( object.uuid, object );
      this.emit( 'data', this.content );

    } else {

      // Pass the data down as it dod not match and thus does not belong in here...
      for (let [key, child] of this.children) {
        child.pipe(object);
      }

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
    console.log( 'Tagged "%s" with %s', selectedNode.name, tags );

  }

}

module.exports = Branch;
