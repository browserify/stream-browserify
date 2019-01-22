var internalStreamPath = require.resolve('readable-stream/lib/internal/streams/stream');
require.resolve[internalStreamPath] = require('readable-stream/lib/internal/streams/stream-browser');

require('./buf');
require('./pipeline');
