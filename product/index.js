const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');
const { success } = require('../util/common');
class Product {
    constructor() {
        this.filePath = path.join(__dirname, '..', 'data', 'manga.json');
    }
    async getAll() {
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

    async getOneById(id) {
        try {
            if (!id) {
                return { success: false, message: 'Please Provide An Id' };
            }
            const result = await this.getAll();
            const jsonData = JSON.parse(result.data);
            const filteredData = jsonData.filter((ele) => {
                return ele.id === +id;
            });
            return { success: true, data: filteredData[0] };
        } catch (error) {
            return { success: false };
        }
    }

    async add(product) {
        try {
            const { name, price, stock, author } = product;
            const error = {};

            if (!name || name === '') {
                error.name = 'Name is required.';
            }

            if (!price || isNaN(price) || price < 0 || price > 100) {
                error.price =
                    'Price must be a valid number greater than 0 and less than 100';
            }

            if (!stock || isNaN(stock) || stock < 0 || stock > 300) {
                error.stock =
                    'Stock must be a valid number greater than 0 and less than 100';
            }

            if (!author || author === '') {
                error.author = 'Author name is required.';
            }

            if (Object.keys(error).length > 0) {
                return { success: false, error: error };
            }
            const result = await this.getAll();
            const jsonData = JSON.parse(result.data);
            const newProduct = {
                id: jsonData[jsonData.length - 1].id + 1,
                ...product,
            };
            jsonData.push(newProduct);
            await fsPromise.writeFile(this.filePath, JSON.stringify(jsonData));
            return { success: true, data: product };
        } catch (error) {
            return { success: false };
        }
    }

    updateById(id, product) {
        const data = this.getAll();
        const index = data.findIndex((ele) => ele.id === id);

        if (index !== -1) {
            data[index] = { ...data[index], ...product };
            fs.writeFileSync('./data/manga.json', JSON.stringify(data));
            return 'Data Updated Successfully';
        } else {
            return 'The data does not exist';
        }
    }

    async deleteById(id) {
        try {
            if (!id) {
                return { success: false, message: 'Please Provide An Id' };
            }
            const result = await this.getAll();
            const jsonData = JSON.parse(result.data);
            const index = jsonData.findIndex((ele) => ele.id === +id);
            if (index != -1) {
                const filteredData = jsonData.filter((ele) => {
                    return ele.id != id;
                });
                await fsPromise.writeFile(
                    this.filePath,
                    JSON.stringify(filteredData)
                );
                return { success: true, data: filteredData };
            } else {
                return { success: true };
            }
        } catch (error) {
            return { success: false };
        }
    }
}

module.exports = new Product();
