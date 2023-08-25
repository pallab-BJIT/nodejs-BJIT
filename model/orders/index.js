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
    async getOrdersByUserId(id) {
        try {
            if (!id) {
                return { success: false, message: 'Please Provide An Id' };
            }
            const result = await this.getAllOrders();
            const jsonData = JSON.parse(result.data);
            const filteredData = jsonData.filter((ele) => {
                return ele.user.id === +id;
            });
            return { success: true, data: filteredData[0] };
            // console.log(jsonData);
        } catch (error) {
            return { success: false };
        }
    }
}

module.exports = new Orders();
