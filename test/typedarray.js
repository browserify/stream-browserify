var test = require('tape');
var Transform = require('../transform.js');
var concat = require('concat-stream');

test('array buffer', function (t) {
    t.plan(1);
    
    var stream = new Transform;
    stream._transform = function (buf, enc, next) {
        this.push(buf.toString('hex'));
        next();
    };
    
    var xs = new Uint8Array(3);
    xs[0] = 97, xs[1] = 98, xs[2] = 99;
    
    stream.pipe(concat(function (body) {
        t.equal(body.toString('utf8'), '616263');
    }));
    
    stream.write(xs);
    stream.end();
});
