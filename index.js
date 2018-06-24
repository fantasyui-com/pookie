const enbuffer = require('../enbuffer')();

const {Tree, Root, Branch} = require('./core.js');


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
      const branch = root.locate(path);
      // branch.on('data', function(dataList){
      //   // console.log('Path "%s" got data and is sending it into the reconciler.', path)
      //   reconciler(dataList);
      // });

      branch.on('object', function(object){
        if ( enbuffer.set(path, object) ) reconciler(enbuffer.all( path ));
      });

    }, // API

    pipe: function(object){
      root.pipe(object);
    }, // API

  } // return object
} // main
