## 의존관계 역전 원칙 (Dependency Inversion Principle, DIP)

- [전통적인 클래스 구현 방식: 의존성 역전의 필요성 느끼기](#전통적인-클래스-구현-방식-의존성-역전의-필요성-느끼기)
- [Dependency Inversion 적용하여 코드를 개선하기](#dependency-inversion-적용하여-코드를-개선하기)
- [의존성 주입 (Dependency Injection, DI)](#의존성-주입-dependency-injection-di)
- [참고자료](#참고자료)

<br>
  
객체지향 설계 원칙인 [SOLID](https://en.wikipedia.org/wiki/SOLID) 의 마지막 원칙인 **의존관계 역전 원칙**에 대해서 알아보자.

의존관계 역전 원칙의 정의는 다음과 같다.

> High-level 모듈이 Low-level 모듈의 구현 내용에 의존하면 안되고, <br>High-level 모듈과 Low-level 모듈 모두가 추상화된 내용에 의존해야 한다.

Dependency Inversion의 개념을 간단한 예시로 이해해보자.
고양이와 강아지가 있는 동물원을 클래스로 구현하려고 한다. 전통적인 방식으로 구현하며 의존성 역전의 필요성을 느끼고, 의존성 역전의 패턴을 적용해 코드를 개선해보자.

<br>

### 전통적인 클래스 구현 방식: 의존성 역전의 필요성 느끼기
```ts
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

class Zoo {
  public cat: Cat;
  public dog: Dog;
  
  constructor() {
    this.cat = new Cat();
    this.dog = new Dog();
  }
}
```
위 코드에서 `Zoo`는 `Cat`, `Dog`에 의존성(dependency)이 존재한다.<br>
`Zoo` 는 High-level 모듈이고, `Cat`, `Dog`는 Low-level 모듈이 된다.

위의 코드는 아주 직관적이다. High-level 모듈이 Low-level 모듈을 가지고 있기 때문이다.

<br>

동물원에 동물을 추가해보자.
```ts
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
```
동물의 종류가 늘어날 수록 `Zoo`의 의존성이 증가한다.
이렇게 High-level 모듈의 의존성이 증가하게 되면 코드의 수정과 관리가 어려워진다.

**이를 해결하기 위해 의존성 역전(Dependency Inversion)을 사용하는 것이다.**

<br>

### Dependency Inversion 적용하여 코드를 개선하기
```ts
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
```

`Cat`과 `Dog`는 이제 `Animal` 클래스에 의존성을 가진다.<br>
`Zoo` 는 `Animal` 에 의존성을 가진다.

```ts
const zoo = new Zoo();
zoo.addAnimal(new Cat());
zoo.addAnimal(new Dog());
zoo.speakAll();
```

다시 말해, High-level 모듈은 Low-level 모듈에 의존성을 가지지 않고, abstract 클래스에 의존성을 갖게 되는 것이다.

이렇게 Dependency Inversion이 일어나게 되면 `Sheep` 이나 `Chicken` 이 추가되어도 High-level 모듈인 `Zoo` 는 수정할 필요가 없어진다.

- Zoo ➡️ Cat, Dog
- Zoo ➡️ Animal ⬅️ Cat, Dog

추상 클래스로 인해 의존성 화살표의 방향이 바뀐다고 해서 **Dependency Inversion**이라고 한다.

<br>

### 의존성 주입 (Dependency Injection, DI)
단어가 비슷해보이는 DIP와 DI는 혼동하기 쉽다.
**DI는 DIP를 구현하는 기법중 하나일 뿐 서로 같은 개념이 아니다.**

위의 DIP 구현 소스에서는 DI가 사용되었다. 외부에서 의존성을 가지는 클래스를 만들어 주입해준 것이 DI를 사용한 것이다.
```ts
const zoo = new Zoo();
zoo.addAnimal(new Cat()); // 의존성을 외부에서 생성하여 주입함
```


<br>

### 참고자료
- [[YouTube] 코드없는 프로그래밍 - 디자인패턴, 의존관계 역전, Dependency inversion , SOLID, 솔리드](https://youtu.be/DYmtue0k1cc)
- [IoC, DI, DIP 개념 잡기](https://vagabond95.me/posts/about-ioc-dip-di/)
