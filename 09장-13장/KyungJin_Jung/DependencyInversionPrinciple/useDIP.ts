abstract class Animal {
  abstract speak(): void;
}

class Cat extends Animal {
  speak() {
    console.log('야옹');
  }
}

class Dog extends Animal {
  speak() {
    console.log('멍멍');
  }
}

class Zoo {
  public animals: Animal[];

  constructor() {
    this.animals = [];
  }

  public addAnimal(animal: Animal) {
    this.animals.push(animal);
  }

  public speakAll() {
    this.animals.forEach(animal => { animal.speak(); })
  }
}

const zoo = new Zoo();
zoo.addAnimal(new Cat());
zoo.addAnimal(new Dog());
zoo.speakAll();