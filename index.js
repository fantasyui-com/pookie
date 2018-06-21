const Tree = require('./lib/Tree.js');
const Root = require('./lib/Root.js');
const Branch = require('./lib/Branch.js');

module.exports = function(vfs){

  const root = new Root();
  Tree.importMap(root, Tree.decodeMap(vfs));

  return {

    mount1: function(path, reconciler){

      const response = {root};
      const fake = {};

      fake.uuid = (new Date).getTime();
      fake.version = (new Date).getTime();
      fake.class = (new Date).getTime();

      // when changes are deted the tree will
      reconciler( fake );
      setInterval(function(){
        reconciler( fake );
      },3000);

      return response;
    }, // API

    mount: function(path, reconciler){

    }, // API

    pipe: function(object){
      root.pipe(object);
    }, // API

  } // return object
} // main
