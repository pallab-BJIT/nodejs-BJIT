const fsPromise = require('fs').promises;
const path = require('path');

class Orders {
    constructor() {
        this.filePath = path.join(__dirname, '..', '..', 'data', 'orders.json');
    }

    async getAllOrders() {
        return fsPromise
            .readFile(this.filePath, {
                encoding: 'utf8',
            })
            .then((data) => {
                return { success: true, data: data };
            })
            .catch((err) => {
                return { success: false };
            });
    }
}

module.exports = new Orders();
