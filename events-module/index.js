const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('saved', () => {
    console.log('A saved event occurred.');
});

emitter.emit('saved');
