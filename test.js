const uuidv4 = require('uuid/v4');

const {Tree, Root, Branch} = require('./index.js');


const data = function(pipe){

  const record = function(){

    const object = {};

    object.id = uuidv4();
    object.rev = (new Date).getTime();

    return object;

  }

  const a = setInterval(function(){pipe(record())},3*1000)
  const b = setInterval(function(){pipe(record())},5*1000)
  const c = setInterval(function(){pipe(record())},8*1000)

  setTimeout(function(){[a,b,c].map(i=>clearInterval(i))},60*1000)

}

const root = new Root();


let map = Tree.decodeMap(`

  # Main Objects
  make Root/Users
  make Root/Docs
  make Root/Messages

  # Add Users
  make Root/Users/System
  make Root/Users/Admin

  # Messages to display
  make Root/Users/Admin/Messages
  make Root/Users/System/Messages

`);
Tree.importMap(root, map);


// console.log( util.inspect(root, { showHidden: true, depth: null }) );
// console.log( root.locate('Root/Users') )
console.log( root.locate('Root') )


let binding = Tree.decodeMap(`

  # Main Objects
  pipe server-broadcast Root

  # Messages to display
  apply message Root/Users/Admin/Messages
  apply message Root/Users/System/Messages

`);


Tree.importData(root, data);
