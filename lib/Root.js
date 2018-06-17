
const Branch = require('./Branch.js');

class Root extends Branch {
  constructor(name) {
    super('root');
  }
}

module.exports = Root;
