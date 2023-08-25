const getAllOrders = require('../../controller/order-controller/getAllOrders');

const handleOrdersRoutes = (req, res, body) => {
    const requestURL = req.url.split('?')[0];

    switch (requestURL) {
        case '/orders/all':
            if (req.method === 'GET') {
                getAllOrders(req, res);
            }
            break;
        default:
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(failure('Wrong Route '));
            break;
    }
};

module.exports = handleOrdersRoutes;
