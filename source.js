const {Tree, Root, Branch} = require('./core.js');

module.exports = function({options, reconciler}){

  const response = {};

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
