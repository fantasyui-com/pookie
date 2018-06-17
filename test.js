const {Tree, Root, Branch} = require('./index.js');

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
