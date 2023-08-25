const http = require('http');
const dataRoutes = require('./routes/data-routes');
const handleDataRoutes = require('./routes/data-routes');
require('dotenv').config();
const PORT = 8000;
const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', (buffer) => {
        body += buffer;
    });
    req.on('end', async () => {
        handleDataRoutes(req, res, body);
    });
});

server.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
