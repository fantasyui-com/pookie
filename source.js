const Tree = require('./lib/Tree.js')
const Root = require('./lib/Root.js')
const Branch = require('./lib/Branch.js')

module.exports = function({options, reconciler}){

  const response = {root};
  const root = new Root();


  const fake = {};

  fake.uuid = uuidv4();
  fake.version = (new Date).getTime();
  fake.class = (new Date).getTime();

  // when changes are deted the tree will
  reconciler( fake );
  setInterval(function(){
    reconciler( fake );
  },3000);

  return response;
}
