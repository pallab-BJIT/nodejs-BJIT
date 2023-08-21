const Product = require('./product');

const main = () => {
    //   const total = Product.getAll();
    //   //   console.log(total);
    //! ADD Data
    // const dataAdded = Product.add({
    //     name: 'Naruto, Vol. 1',
    //     price: 9.99,
    //     stock: 42,
    //     author: 'Pallab Majumdar',
    // });
    // console.log(dataAdded);
    //! Update Data
    // const updatedData = Product.updateById(11, {
    //     publishedAt: '22 Aug 2023',
    // });
    // console.log(updatedData);
    //! Delete Data
    const deleteById = Product.deleteById(11);
    console.log(deleteById);
};
main();
