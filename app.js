const Product = require("./product");

const main = () => {
  //   const total = Product.getAll();
  //   //   console.log(total);
  //   Product.add({
  //     name: "Naruto, Vol. 1",
  //     price: 9.99,
  //     stock: 42,
  //     author: "Pallab Majumdar",
  //   });
  //   const dataById = Product.getOneById(10);
  //   console.log(dataById);

  const updatedData = Product.updateById(10, {
    author: "Test User 10",
  });
  console.log(updatedData);

  //   const deleteById = Product.deleteById(7);
  //   console.log(deleteById);
};
main();
