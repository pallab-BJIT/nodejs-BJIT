const http = require('http');
const handleDataRoutes = require('./routes/data-routes');
const handleOrdersRoutes = require('./routes/orders-routes');
const handleUsersRoutes = require('./routes/user-routes');

const PORT = 8000;
const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', (buffer) => {
        body += buffer;
    });
    req.on('end', async () => {
        if (req.url.includes('products')) {
            handleDataRoutes(req, res, body);
        } else if (req.url.includes('orders')) {
            handleOrdersRoutes(req, res, body);
        } else if (req.url.includes('users')) {
            handleUsersRoutes(req, res, body);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
