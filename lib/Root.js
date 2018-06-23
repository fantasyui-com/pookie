
const Branch = require('./Branch.js');

class Root extends Branch {
  constructor(name) {
    super('root');
    this.tag(['*'])
  }
}

module.exports = Root;
