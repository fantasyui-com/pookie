(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.pookie = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const Tree = require('./Tree.js');
// const Root = require('./Root.js');
// const Branch = require('./Branch.js');

var Branch = function () {
  function Branch(name, parent) {
    _classCallCheck(this, Branch);

    this.name = name;
    this.parent = parent;
    this.data = new Map();
  }

  _createClass(Branch, [{
    key: 'pipe',
    value: function pipe(object) {
      console.log('%s got data', this.name);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = _slicedToArray(_ref, 2);

          var key = _ref2[0];
          var value = _ref2[1];

          value.pipe(object);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'has',
    value: function has(name) {
      return this.data.has(name);
    }
  }, {
    key: 'set',
    value: function set(name, object) {
      this.data.set(name, object);
      return object;
    }
  }, {
    key: 'get',
    value: function get(name) {
      return this.data.get(name);
    }
  }, {
    key: 'locate',
    value: function locate(input) {
      var path = Array.isArray(input) ? input : input.split('/');
      var selectedNode = this;

      path.forEach(function (name) {
        if (selectedNode) {
          if (selectedNode.has(name)) {
            // name already there, so just grab that node
            selectedNode = selectedNode.get(name);
          } else {
            // create new node
            selectedNode = null;
          }
        }
      });

      return selectedNode;
    }
  }, {
    key: 'make',
    value: function make(_ref3) {
      var path = _ref3.path;

      var selectedNode = this;
      path.forEach(function (name) {
        if (selectedNode.has(name)) {
          // name already there, so just grab that node
          selectedNode = selectedNode.get(name);
        } else {
          // create new node
          selectedNode = selectedNode.set(name, new Branch(name, selectedNode));
        }
      });
    }
  }]);

  return Branch;
}();

module.exports = Branch;

},{}],2:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Branch = require('./Branch.js');

var Root = function (_Branch) {
  _inherits(Root, _Branch);

  function Root(name) {
    _classCallCheck(this, Root);

    return _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).call(this, 'root'));
  }

  return Root;
}(Branch);

module.exports = Root;

},{"./Branch.js":1}],3:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// This is a Utility Object like Math or Array

var Root = require('./Root.js');
var Branch = require('./Branch.js');

var Tree = {
  decodeMap: function decodeMap(map) {
    var response = map.split('\n') // turn into lines
    .map(function (l) {
      return l.trim().replace(/ +/g, ' ');
    }) // clean up lines
    .filter(function (l) {
      return !l.match(/^ {0,}#/);
    }) // eliminate comments
    .filter(function (l) {
      return l;
    }) // eliminate empties
    .map(function (l) {
      var _l$split = l.split(" "),
          _l$split2 = _slicedToArray(_l$split, 2),
          cmd = _l$split2[0],
          path = _l$split2[1];

      return { cmd: cmd, path: path };
    }) // split cmd/path-string
    .map(function (o) {
      o.path = o.path.split("/");return o;
    }); // split path into fragments
    return response;
  },
  importMap: function importMap(tree, map) {
    map.forEach(function (_ref) {
      var cmd = _ref.cmd,
          path = _ref.path;

      tree[cmd]({ path: path });
    });
  },
  importData: function importData(root, producer) {
    producer(function (record) {
      console.log(record);
      root.pipe(record);
    });
  }
};

module.exports = Tree;

},{"./Branch.js":1,"./Root.js":2}],4:[function(require,module,exports){
'use strict';

var Tree = require('./lib/Tree.js');
var Root = require('./lib/Root.js');
var Branch = require('./lib/Branch.js');

module.exports = function (_ref) {
  var options = _ref.options,
      reconciler = _ref.reconciler;


  var response = { root: root };
  var root = new Root();

  var fake = {};

  fake.uuid = uuidv4();
  fake.version = new Date().getTime();
  fake.class = new Date().getTime();

  // when changes are deted the tree will
  reconciler(fake);
  setInterval(function () {
    reconciler(fake);
  }, 3000);

  return response;
};

},{"./lib/Branch.js":1,"./lib/Root.js":2,"./lib/Tree.js":3}]},{},[4])(4)
});
