class Cat {
  speak() {
    console.log('야옹');
  }
}

class Dog {
  speak() {
    console.log('멍멍');
  }
}

class Sheep {
  speak() {
    console.log('음메');
  }
}

class Chicken {
  speak() {
    console.log('꼬끼오');
  }
}

class Zoo {
  public cat: Cat;
  public dog: Dog;
  public sheep: Sheep;
  public chicken: Chicken;

  constructor() {
    this.cat = new Cat();
    this.dog = new Dog();
    this.sheep = new Sheep();
    this.chicken = new Chicken();
  }
}