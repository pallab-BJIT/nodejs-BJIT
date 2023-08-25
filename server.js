const http = require('http');
const dataRoutes = require('./routes/data-routes');
const handleDataRoutes = require('./routes/data-routes');
const handleOrdersRoutes = require('./routes/orders-routes');
require('dotenv').config();
const PORT = 8000;
const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', (buffer) => {
        body += buffer;
    });
    req.on('end', async () => {
        console.log('1111', req.url);
        if (req.url.includes('products')) {
            handleDataRoutes(req, res, body);
        } else if (req.url.includes('orders')) {
            handleOrdersRoutes(req, res, body);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
