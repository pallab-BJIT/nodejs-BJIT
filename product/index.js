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

    async updateById(id, product) {
        if (!id) {
            return { success: false, message: 'Please Provide An Id' };
        }
        const result = await this.getAll();
        const jsonData = JSON.parse(result.data);
        const index = jsonData.findIndex((ele) => ele.id === +id);
        if (index != -1) {
            jsonData[index] = { ...jsonData[index], ...product };
            await fsPromise.writeFile(this.filePath, JSON.stringify(jsonData));
            return { success: true, data: jsonData };
        } else {
            return { success: true };
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
    async sortByPrice(queryParams) {
        try {
            const result = await this.getAll();
            const jsonData = JSON.parse(result.data);

            if (queryParams == 'ASC') {
                const sortedData = jsonData
                    .slice()
                    .sort((a, b) => a.price - b.price);
                return { success: true, data: sortedData };
            } else if (queryParams == 'DESC') {
                const sortedData = jsonData
                    .slice()
                    .sort((a, b) => b.price - a.price);
                return { success: true, data: sortedData };
            }
        } catch (error) {
            return { success: false };
        }
    }

    async sortByStock(queryParams) {
        try {
            const result = await this.getAll();
            const jsonData = JSON.parse(result.data);

            if (queryParams == 'ASC') {
                const sortedData = jsonData
                    .slice()
                    .sort((a, b) => a.stock - b.stock);
                return { success: true, data: sortedData };
            } else if (queryParams == 'DESC') {
                const sortedData = jsonData
                    .slice()
                    .sort((a, b) => b.stock - a.stock);
                return { success: true, data: sortedData };
            }
        } catch (error) {
            return { success: false };
        }
    }

    async getDataByNameOrAuthor(queryParams) {
        try {
            const result = await this.getAll();
            const jsonData = JSON.parse(result.data);
            if (!queryParams.name && !queryParams.author) {
                return { success: false };
            } else {
                if (queryParams.name && queryParams.author) {
                    const filterByNameAndAuthor = jsonData.filter((ele) => {
                        return (
                            ele.name === queryParams.name &&
                            ele.author === queryParams.author
                        );
                    });
                    return { success: true, data: filterByNameAndAuthor };
                } else if (queryParams.author) {
                    const filterByAuthor = jsonData.filter((ele) => {
                        return ele.author === queryParams.author;
                    });
                    return { success: true, data: filterByAuthor };
                } else if (queryParams.name) {
                    const filterByName = jsonData.filter((ele) => {
                        return ele.name === queryParams.name;
                    });
                    return { success: true, data: filterByName };
                }
            }
        } catch (error) {
            return { success: false };
        }
    }
}

module.exports = new Product();
