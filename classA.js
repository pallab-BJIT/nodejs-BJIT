class ClassA {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  myFunction() {
    console.log(`my name is ${this.name} and my age is ${this.age}`);
  }
}

module.exports = ClassA;
