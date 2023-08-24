const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');
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
        return fsPromise
            .readFile(this.filePath, {
                encoding: 'utf8',
            })
            .then((data) => {
                const jsonData = JSON.parse(data);
                const filteredData = jsonData.filter((ele) => {
                    return ele.id === +id;
                });

                return { success: true, data: filteredData[0] };
            })
            .catch((err) => {
                return { success: false };
            });
    }

    add(product) {
        const data = this.getAll();
        const newProduct = { id: data[data.length - 1].id + 1, ...product };
        data.push(newProduct);
        fs.writeFileSync('./data/manga.json', JSON.stringify(data));
        return 'Data Added successfully';
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

    deleteById(id) {
        const data = this.getAll();
        const index = data.findIndex((ele) => ele.id === id);
        if (index !== -1) {
            const filteredData = data.filter((ele) => {
                return ele.id !== id;
            });
            fs.writeFileSync('./data/manga.json', JSON.stringify(filteredData));
            return 'Data deleted successfully';
        } else {
            return 'The data does not exist';
        }
    }
}

module.exports = new Product();
