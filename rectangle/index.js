class Rectangle {
  area(height, width) {
    const area = height * width;
    return area;
  }
  perimeter(height, width) {
    const perimeter = (height + width) * 2;
    return perimeter;
  }
}

module.exports = new Rectangle();
