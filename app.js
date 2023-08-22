const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: 'Hello, world!', status: 'ok' }));
        res.end();
    }
    if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(
            JSON.stringify({ message: 'This is the about page', status: 'ok' })
        );
        res.end();
    }
});

server.listen(8000, () => {
    console.log('Server listening on 8000');
});
