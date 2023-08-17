class Rectangle {
  area(height, width) {
    return height * width;
  }
  perimeter(height, width) {
    return (height + width) * 2;
  }
}

module.exports = new Rectangle();
