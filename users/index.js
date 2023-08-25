const fsPromise = require('fs').promises;
const path = require('path');

class Users {
    constructor() {
        this.filePath = path.join(__dirname, '..', 'data', 'users.json');
    }

    async getAllUsers() {
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
    async getUserById(id) {
        try {
            if (!id) {
                return { success: false, message: 'Please Provide An Id' };
            }
            const result = await this.getAllUsers();
            const jsonData = JSON.parse(result.data);
            const filteredData = jsonData.filter((ele) => {
                return ele.id === +id;
            });
            return { success: true, data: filteredData[0] };
        } catch (error) {
            return { success: false };
        }
    }
}

module.exports = new Users();
