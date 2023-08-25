const fsPromise = require('fs').promises;
const path = require('path');
const product = require('../product');

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
            const productsId = filteredData[0].products;
            const productData = await product.getAll();
            const parsedProductData = JSON.parse(productData.data);

            const newData = parsedProductData.filter((product) => {
                return productsId.includes(product.id);
            });
            const responseData = {
                id: id,
                user: filteredData[0].user,
                product: newData,
            };
            return { success: true, data: responseData };
        } catch (error) {
            return { success: false };
        }
    }
}

module.exports = new Orders();
