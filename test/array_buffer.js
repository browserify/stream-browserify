var path = require('path');
var test = require('tape');

var Writable = require('../writable.js');
var inherits = require('inherits');

inherits(TestWritable, Writable);

function TestWritable(opt) {
    if (!(this instanceof TestWritable))
        return new TestWritable(opt);
    Writable.call(this, opt);
    this._written = [];
}

TestWritable.prototype._write = function(chunk, encoding, cb) {
    this._written.push(chunk);
    cb();
};

var typedArray = new Uint8Array(1);
typedArray[0] = 88;

test('.writable writing ArrayBuffer', function(t) {
    var writable = new TestWritable();
    
    writable.write(typedArray.buffer);
    writable.end();
    
    t.equal(writable._written.length, 1);
    t.equal(writable._written[0].toString(), 'X')
    t.end()
});

test('.writable writing Uint8array', function(t) {
    var writable = new TestWritable();
    
    writable.write(typedArray);
    writable.end();
    
    t.equal(writable._written.length, 1);
    t.equal(writable._written[0].toString(), 'X')
    t.end()
});

