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
      console.log(data[index]);
    } else {
      console.log("The product does not exist");
    }
  }
}

module.exports = new Product();
