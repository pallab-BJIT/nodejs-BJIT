const fsPromise = require('fs').promises;
const path = require('path');
const EMAIL_REGEX = require('../constant');

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
    async createNewUser(body) {
        try {
            const { name, email, age } = body;
            const error = {};
            if (!name || name === '') {
                error.name = 'Name is required.';
            }
            if (!email || email === '') {
                error.email = 'Email is required.';
            }
            if (!age) {
                error.age = 'Age is required.';
            } else if (email) {
                if (!EMAIL_REGEX.test(email)) {
                    error.email = 'Invalid email format.';
                }
            }
            if (Object.keys(error).length > 0) {
                return { success: false, error: error };
            }
            const result = await this.getAllUsers();
            const jsonData = JSON.parse(result.data);
            const newUser = {
                id: jsonData[jsonData.length - 1].id + 1,
                ...body,
            };
            jsonData.push(newUser);
            await fsPromise.writeFile(this.filePath, JSON.stringify(jsonData));
            return { success: true, data: newUser };
        } catch (error) {
            return { success: false };
        }
    }

    async deleteUser(id) {
        try {
            if (!id) {
                return { success: false, message: 'Please Provide An Id' };
            }
            const result = await this.getAllUsers();
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

module.exports = new Users();
