const getAllUsers = require('../../controller/users-controller/getAllUsers');
const { failure } = require('../../util/common');

const handleUsersRoutes = (req, res, body) => {
    const requestURL = req.url.split('?')[0];

    switch (requestURL) {
        case '/users/all':
            if (req.method === 'GET') {
                getAllUsers(req, res);
            }
            break;
        default:
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(failure('Wrong Route '));
            break;
    }
};

module.exports = handleUsersRoutes;
