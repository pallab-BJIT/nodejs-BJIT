const objectA = {
  methodA: () => {
    console.log("calling a function inside the objectA object");
  },
  methodB: function () {
    console.log("calling an another function inside the objectA object");
  },
};

module.exports = objectA;
