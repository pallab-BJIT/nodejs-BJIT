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
  //   const updatedData = Product.updateById(18, {
  //     publishedAt: "18 Aug 2023",
  //   });
  //   updatedData.length === 2
  //     ? (console.log(updatedData[0]), console.log(updatedData[1]))
  //     : console.log(updatedData);
  const deleteById = Product.deleteById(7);
  console.log(deleteById);
  //   const msg = Product.deleteAll();
  //   console.log(msg);
};
main();
