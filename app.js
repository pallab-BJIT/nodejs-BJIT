// const { str, num, myFunc } = require("./fileA");
// // const ClassA = require("./classA");
// // const classObj = new ClassA("Pallab Majumdar", 20);
// // classObj.myFunction();
// // const numImport = require("./fileA");
// setInterval(() => {
//   console.log(str);
//   console.log(num);
// }, 5000);
// myFunc();

// const objectA = require("./objectA");

// objectA.methodA();
// objectA.methodB();

// const Math = require("./math");
// const add = Math.add(3, 4);
// console.log(add);

const mathObject = require("./math/sumObject");

const sum = mathObject.add(3, 4);

console.log(`The sum is ${sum}`);
