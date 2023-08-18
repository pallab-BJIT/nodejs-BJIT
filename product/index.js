const fs = require("fs");
class Product {
  getAll() {
    const data = fs.readFileSync("./data/manga.json", "utf-8");
    return JSON.parse(data);
  }

  getOneById(id) {
    const data = this.getAll();
    const filteredData = data.find((ele) => {
      return ele.id === id;
    });
    return filteredData;
  }

  add(product) {
    const data = this.getAll();
    const newProduct = { id: data[data.length - 1].id + 1, ...product };
    data.push(newProduct);
    fs.writeFileSync("./data/manga.json", JSON.stringify(data));
  }

  updateById(id, product) {
    const data = this.getAll();
    const index = data.findIndex((ele) => ele.id === id);

    if (index !== -1) {
      data[index] = { ...data[index], ...product };
      fs.writeFileSync("./data/manga.json", JSON.stringify(data));
      return ["Product Updated Successfully", data[index]];
    } else {
      return "The product does not exist";
    }
  }

  deleteById(id) {
    const data = this.getAll();
    const index = data.findIndex((ele) => ele.id === id);
    if (index !== -1) {
      data.splice(index, 1);
      fs.writeFileSync("./data/manga.json", JSON.stringify(data));
      return data;
    } else {
      return "The product does not exist";
    }
  }
}

module.exports = new Product();
