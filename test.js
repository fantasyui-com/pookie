const uuidv4 = require('uuid/v4');
const {Tree, Root, Branch} = require('./core.js');

// const data = function(pipe){
//
//   const record = function(){
//
//     const object = {};
//
//     object.uuid = uuidv4();
//     object.version = (new Date).getTime();
//     object.class = (new Date).getTime();
//
//     return object;
//
//   }
//
//   const a = setInterval(function(){pipe(record())},3*1000)
//   const b = setInterval(function(){pipe(record())},5*1000)
//   const c = setInterval(function(){pipe(record())},8*1000)
//
//   setTimeout(function(){[a,b,c].map(i=>clearInterval(i))},60*1000)
//
// }

const root = new Root();

let map = Tree.decodeMap(`

  # Main Objects
  make Applications *

  make Applications/Todo todo
  make Applications/Todo/Today today
  make Applications/Todo/Today/Priority priority,hot,important

  make Applications/Debugger *,debug
  make Applications/Debugger/Success success
  make Applications/Debugger/Danger danger
  make Applications/Debugger/Warning warning
  make Applications/Debugger/Info info

`);

Tree.importMap(root, map);


// console.log( util.inspect(root, { showHidden: true, depth: null }) );
// console.log( root.locate('Root/Users') )
// console.log( root.locate('Root') )

const priorityBranch = root.locate('Applications/Todo/Today/Priority');
priorityBranch.on('content', function(object){
  console.log('Got Object', object)
})

const object1 = {
  uuid: uuidv4(),
  version: (new Date).getTime(),
  tags: "todo,today,priority",
}
const object2 = {
  uuid: uuidv4(),
  version: (new Date).getTime(),
  tags: "today,priority",
}

root.pipe(object1)
root.pipe(object2)
