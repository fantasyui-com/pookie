const faker = require('faker');
const mockTodo = require('./mock.todo.js');
const uuidv4 = require('uuid/v4');
const {Tree, Root, Branch} = require('./index.js');


window.pookie = function(){

}


const fake = mockTodo();



window.pookie.reconcile = function(options, reconciler){

  // when changes are deted the tree will
  reconciler( fake );
  setInterval(function(){
    reconciler( fake );
  },3000);

}
