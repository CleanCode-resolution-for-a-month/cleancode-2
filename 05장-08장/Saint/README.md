# 5. 형식 맞추기

> 프로그래머라면 형식을 깔끔하게 맞춰 코드를 짜야 한다.

### 형식을 맞추는 목적

오늘 구현한 코드의 가독성은 앞으로 바뀔 코드의 품질에 지대한 영향을 미침.

맨 처음 잡아놓은 구현 스타일과 가독성 수준은 유지보수 용이성과 확장성에 계속 영향을 미침.



### 적절한 행 길이를 유지하라

일반적으로 큰 파일보다 작은 파일이 이해하기 쉬움

##### 신문 기사처럼 작성하라

이름은 간단하면서도 설명이 가능하게

소스 파일 첫 부분은 고채원 개념과 알고리즘을 설명

아래로 내려갈수록 의도를 세세하게 묘사.

마지막에는 가장 저차원 함수와 세부내열

##### 개념은 빈 행으로 분리하라

각 행은 수식이나 절을 나타내고, 일련의 행 묶음은 완결된 생각 하나를 표현. 생각 사이에는 빈 행을 넣어 분리해야 좋음

빈 행을 빼버리면 코드 가독성이 현저하게 떨어짐

##### 세로 밀집도

줄꿈이 개념을 분리한다면 세로 밀집도는 연관성을 의미. 즉, 서로 밀접한 코드 행은 세로로 가까이 놓아야 함

##### 수직 거리

서로 밀접한 개념은 세로로 가까이 둬야 한다. protected 변수를 피해야 하는 이유 중 하나

같은 파일에 속할 정도로 밀접한 두 개념은 세로 거리로 연관성을 표현 (연관성이란 한 개념을 이해하는 데 다른 개념이 중요한 정도)

**`변수`**는 사용하는 위치에 최대한 가까이 선언. 루프를 제어하는 변수는 흔히 루프 문 내부에 선언

**`인스턴스 변수`**는 클래스 맨 처음에 선언. 잘 설계한 클래스는 대다수 클래스 메서드가 인스턴스 변수를 사용하기 때문 (자바에서는 클래스 맨 처음, C++에서는 클래스 마지막)

**`종속 함수`** 한 함수가 다른 함수를 호출한다면 두 함수는 세로로 가까이 배치. 가능한 호출하는 함수를 호출되는 함수보다 먼저 배치 (소스 코드 모듈이 고차원에서 저차원으로 내려감)

**`개념적 유사성`** 친화도가 높을수록 코드를 가까이 배치 (한 함수가 다른 함수를 호출하는 직접적인 종속성. 변수와 변수를 사용하는 함수. 비슷한 동작을 수행하는 일군의 함수)



### 가로 형식 맞추기

짧은 행이 바람직. 저자는 120자 정도로 행 길이를 제한

##### 가로 공백과 밀집도

공백을 사용해 밀접한 개념과 느슨한 개념을 표현

```java
private measureLine(String line) {
	lineCount++;
  int lineSize = line.length();
  totalChars += lineSize;
  lineWidthHistorgram.addLine(lineSize, lineCount);
  recordWidestLine(lineSize);
}
```

할당 연산자를 강조하기 위해 앞뒤로 공백. 공백을 넣으면 두 가지 주요 요소가 확실히 나뉘어짐

함수 이름과 이어지는 괄호 사이에는 공백을 넣지 않음. 함수와 인수가 밀접하기 때문. 공백을 넣으면 한 개념이 아니라 별개로 보임

괄호 안 인수는 공백으로 분리.

##### 가로 정렬

유용하지 않음. 선언문과 할당문을 별도로 정렬하지 않으면 오히려 결함을 찾기 쉬움

##### 들여쓰기

범위(scope)로 이루어진 계층을 표현하기 위해 코드를 들여씀

##### 가짜 범위

빈 while 문이나 for 문을 피하지 못할 때는 빈 블록을 올바로 들여쓰고 괄호로 감싼다

```java
while (dis.read(buf, 0, readBufferSize) != -1)
;
```



### 팀 규칙

팀은 한 가지 규칙에 합의해야 하고, 모든 팀원은 그 규칙에 따라야 함 



# 6. 객체와 자료 구조

변수를 private로 정의하는 이유는 남들이 변수 의존성을 줄이기 위해서 

그렇다면 get 함수와 set 함수를 public으로 해서 변수를 외부에 노출하는 이유는?

### 자료 추상화

자료를 세세하게 공개하기보다는 추상적인 개념으로 표현하는 편이 좋음. 인터페이스나 조회/설정 함수만으로는 추상화가 이뤄지지 않음

개발자는 객체가 포함하는 자료를 표현할 가장 좋은 방법을 고민해야함. 아무 생각 없이 조회/설정 함수를 추가하는 방법은 나쁘다



### 자료/객체 비대칭

* `객체`는 추상화 뒤로 자료를 숨긴 채 자료를 다루는 함수만 공개한다.

* `자료 구조`는 자료를 그대로 공개하며 별다른 함수를 제공하지 않는다.

`자료 구조를 사용하는 절차적 코드`는 기존 자료 구조를 변경하지 않으면서 새 함수를 추가하기 쉽고, `객체 지향 코드`는 기존 함수를 변경하지 않으면서 새 클래스를 추가하기 쉬움

반면, `절차적 코드`는 새로운 자료 구조를 추가하려면 모든 함수를 고쳐야 하고, `객체 지향 코드`는 새로운 함수를 추가하려면 모든 클래스를 고쳐야 함

때로는 클래스와 객체 지향 기법이 가장 적합하고, 때로는 단순한 자료 구조와 절차적인 코드가 적합한 상황도 있음

> 자료 구조 (Data structure) : 메모리에 저장된 변수 값들의 모음. 



### 디미터 법칙

>  모듈은 자신이 조작하는 객체의 속사정을 몰라야 한다 (`정보 은닉` 강조)

객체는 조회 함수로 내부 구조를 공개하면 안된다는 의미

클래스 C의 메서드 f는 다음과 같은 객체의 메서드만 호출해야 한다고 주장

* 클래스 C
* f가 생성한 객체
* f 인수로 넘어온 객체
* C 인스턴스 변수에 저장된 객체

##### 기차 충돌 (train wreck)

```java
final String putputDir = ctxt.getOptions().getSrcatchDir().getAbsolutePath();
```

위와 같은 코드는 여러 객차가 한 줄로 이어진 기차처럼 보이기 때문에 `기차 충돌`이라고 부름. 조잡하다 여겨지는 방식이므로 피하는 것이 좋다

```java
Options opts = ctxt.getOptions();
File scratchDir = opts.getScratchDir();
final String outputDir = scratchDir.getAbsolutePath();
```

위 코드가 디미터 법칙을 위반하는가의 여부는 ctxt, Options, ScratchDir이 객체인지 자료 구조인지에 따라 다름

객체라면 내부 구조를 숨겨야 하므로 디미터 법칙을 위반하고, 자료 구조라면 내부 구조를 노출하므로 디미터 법칙이 적용되지 않음

위 코드는 조회 함수를 사용해서 혼란을 일으킨다. 코드를 다음과 같이 구현했다면 디미터 법칙을 구현할 필요가 없음

```java
final String outputDir = ctxt.options.scratchDir.absolutePate;
```

자료 구조는 무조건 함수 없이 공개 변수만 포함하고, 객체는 비공개 변수와 공개함수를 포함하는 것이 좋음

##### 잡종 구조

때떄로 절반은 객체, 절반은 자료 구조인 잡종 구조가 나오는데, 이런 잡종 구조는 새로운 함수는 물론이고 새로운 자료 구조도 추가하기 어려움

잡종 구조는 되도록 피하는 편이 좋다.

##### 구조체 감추기

ctxt, options, scratchDir이 객체라면 앞선 코드 예제처럼 체이닝을 하면 안됨. 객체는 내부 구조를 감춰야 한다.

##### 자료 전달 객체

자료 구조체의 전형적인 형태는 **공개 변수만 있고 함수가 없는 클래스**. `자료 전달 객체(Data Transfer Object, DTO)`

데이터베이스에 저장된 가공되지 않은 정보를 애플리케이션 코드에서 사용할 객체로 변환하는 일련의 단계에서 가장 처음으로 사용하는 구조체

##### 활성 레코드

DTO의 특수한 형태로 공개 변수가 있거나 비공개 변수에 조회/설정 함수가 있는 자료 구조지만, 대개 save나 find와 같은 탐색 함수도 제공

활성 레코드는 데이터베이스 테이블이나 다른 소스에서 자료를 직접 변환한 결과

활성 레코드는 자료 구조로 취급하고, 비즈니스 규칙을 담으면서 내부 자료를 숨기는 객체는 따로 생성하는 것이 바람직



### 자바스크립트에서의 적용

#### getter / setter 사용

getter, setter를 사용하여 객체의 데이터에 접근하는 것이 객체의 속성을 찾는 것보다 훨씬 나음

* 객체의 속성을 얻는 것 이상 많은 것을 하고 싶을 때, 코드에서 모든 접근자를 찾아 바꾸고 할 필요가 없음
* set할 때 검증 로직을 추가하는 것이 코드를 더 간단하게 만듦
* 내부용 API를 캡슐화할 수 있음
* getting / setting 할 때 로그를 찾거나 에러처리 하기 쉬움
* 서버에서 객체 속성을 받아올 때 lazy load 할 수 있음

##### 안 좋은 예

```javascript
function makeBankAccount() {
  // ...

  return {
    // ...
    balance: 0
  };
}

const account = makeBankAccount();
account.balance = 100;
```

##### 좋은 예

```javascript
function makeBankAccount() {
  // private으로 선언된 변수
  let balance = 0;

  // 아래 return을 통해 public으로 선언된 "getter"
  function getBalance() {
    return balance;
  }

  // 아래 return을 통해 public으로 선언된 "setter"
  function setBalance(amount) {
    // ... balance를 업데이트하기 전 검증로직
    balance = amount;
  }

  return {
    // ...
    getBalance,
    setBalance
  };
}

const account = makeBankAccount();
account.setBalance(100);
```



#### 객체에 비공개 멤버를 만들어라

`클로져`를 이용하면 가능

##### 안좋은 예

```javascript
const Animal = function(age) {
  if (!(this instanceof Animal)) {
    throw new Error("Instantiate Animal with `new`");
  }
    
  this.age = age;
};

Animal.prototype.move = function() {};

const Mammal = function(age, furColor) {
  if (!(this instanceof Mammal)) {
    throw new Error("Instantiate Mammal with `new`");
  }

  Animal.call(this, age);
  this.furColor = furColor;
};

Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.constructor = Mammal;
Mammal.prototype.liveBirth = function liveBirth() {};

const Human = function(age, furColor, languageSpoken) {
  if (!(this instanceof Human)) {
    throw new Error("Instantiate Human with `new`");
  }

  Mammal.call(this, age, furColor);
  this.languageSpoken = languageSpoken;
};

Human.prototype = Object.create(Mammal.prototype);
Human.prototype.constructor = Human;
Human.prototype.speak = function speak() {};
```

##### 좋은 예

```javascript
class Animal {
  constructor(age) {
    this.age = age;
  }

  move() { /* ... */ }
}

class Mammal extends Animal {
  constructor(age, furColor) {
    super(age);
    this.furColor = furColor;
  }

  liveBirth() { /* ... */ }
}

class Human extends Mammal {
  constructor(age, furColor, languageSpoken) {
    super(age, furColor);
    this.languageSpoken = languageSpoken;
  }

  speak() { /* ... */ }
}
```



# 7. 오류 처리

오류 처리는 프로그램에 반드시 필요한 요소 중 하나.

깨끗한 코드는 읽기도 좋아야 하지만 안정성도 높아야 한다.

**오류 처리를 프로그램 논리와 분리**하면 독립적인 추론이 가능해지며 코드 유지보수성도 크게 높아진다.

### 오류 코드보다 예외를 사용하라

오류가 발생하면 예외를 던지는 편이 낫다. 그러면 호출자 코드가 더 깔끔해진다.

논리가 오류 처리 코드와 뒤섞이지 않아서 보기에도 좋고 개념도 독립적이게 된다.

```java
public class DeviseController {
  ...
  public void sendShutDown(){
    try {
      tryToShutDown();
    } catch (DeviceShutDownError e){
      logger.log(e);
    }
  }
  
  private void tryToShutDown() throws DeviceShutDownError {
    DeviceHandle handle = getHandle(DEV1);
    DeviceHandle record = retrieveDeviceRecord(handle);
    
    pauseDevice(handle);
    clearDeviceWorkQueue(handle);
    closeDevice(handle);
  }
  
  private DeviceHandle getHandle(DeviceId id){
    ...
  }
  ...
}
```



### try-catch-finally 문부터 작성하라

try 블록은 트랜잭션과 비슷하다. try 블록에서 무슨 일이 생기든지 catch 블록은 프로그램 상태를 일관성 있게 유지해야 한다.

예외가 발생할 코드를 짤 때는 try-catch-finally 문으로 시작하는 편이 낫다. 그러면 try 블록에서 무슨 일이 생기든지 호출자가 기대하는 상태를 정의하기 쉬워진다.

강제로 예외를 일으키는 테스트 케이스를 작성한 후 테스트를 통과하게 코드를 작성하는 방법을 권장. 자연스럽게 try 블록의 트랜잭션 범위부터 구현하게 되므로 범위 내에서 트랜잭션 본질을 유지하기 쉬워진다.



### 미확인 (unchecked) 예외를 사용하라

확인된 예외는 OCP (Open Closed Pinciple) 을 위반한다. 메서드에서 확인된 예외를 던졌는데 catch 블록이 위에 있다면 그 사이 메서드 모두 선언부에 해당 예외를 정의해야 한다.

즉, 하위 단계에서 코드를 변경하면 상위 단계 메서드 선언부를 전부 고쳐야 한다는 말. 캡슐화가 깨진다



### 예외에 의미를 제공하라

예외를 던질 때는 전후 상황을 충분히 덧붙인다. 그러면 오류가 발생한 원인과 위치를 찾기가 쉬워진다. 오류 메세지에 정보를 담아 예외와 함께 던진다



### 호출자를 고려해 예외 클래스를 정의하라

애플리케이션에서 오류를 정의할 때 가장 중요한 것은 오류를 잡아내는 방법

외부 API를 사용할 때는 감싸기 기법이 최선. 

외부 API를 감싸면 외부 라이브러리와 프로그램 사이에서 의존성이 크게 줄어들고 나중에 갈아타는 비용도 적다. 

감싸기 클래스에서 외부 API를 호출하는 대신 테스트 코드를 넣어주는 방법으로 프로그램을 테스트하기도 쉬워짐

마지막 장점으로 특정 업체가 API를 설계한 방식에 발목을 잡히지 않음. 프로그램이 사용하기 편리한 API를 정의하면 됨



### 정상흐름을 정의하라

특수 사례 패턴 : 클래스를 만들거나 객체를 조작해 특수 사례를 처리. 

클라이언트 코드가 예외적인 상황을 처리할 필요가 없어진다. 클래스나 객체가 예외적인 상황을 캡슐화해서 처리하게 됨



### null을 반환하지 마라

null을 반환하는 습관은 오류를 유발하는 행위. null을 반환하면 일거리를 늘릴 뿐만 아니라 호출자에게 문제를 떠넘긴다.

null을 반환하는 것보다는 빈 컬렉션을 반환하는게 낫다



### null을 전달하지 마라

메서드에서 null을 반환하는 방식도 나쁘지만, 메서드로 null을 전달하는 방식은 더 나쁨. 

정상적인 인수로 null을 기대하는 API가 아니라면 메서드로 null을 전달하는 코드는 최대한 피한다



### 자바스크립트에서의 적용 (에러 처리)

#### 단순히 에러를 확인만 하지마라

try/catch 로 어떤 코드를 감쌌다면 그에 대한 계획이 있거나 어떠한 장치를 해야 한다.

##### 안 좋은 예

```javascript
try {
  functionThatMightThrow();
} catch (error) {
  console.log(error);
}
```

##### 좋은 예

```javascript
try {
  functionThatMightThrow();
} catch (error) {
  // 첫번째 방법은 console.error를 이용하는 것입니다. 이건 console.log보다 조금 더 알아채기 쉽습니다.
  console.error(error);
  // 다른 방법은 유저에게 알리는 방법입니다.
  notifyUserOfError(error);
  // 또 다른 방법은 서비스 자체에 에러를 기록하는 방법입니다.
  reportErrorToService(error);
  // 혹은 그 어떤 방법이 될 수 있습니다.
}
```



#### 프로미스가 실패된 것을 무시하지 마라

##### 안 좋은 예

```javascript
getdata()
.then(data => {
  functionThatMightThrow(data);
})
.catch(error => {
  console.log(error);
});
```

##### 좋은 예

```javascript
getdata()
.then(data => {
  functionThatMightThrow(data);
})
.catch(error => {
  // 첫번째 방법은 console.error를 이용하는 것입니다. 이건 console.log보다 조금 더 알아채기 쉽습니다.
  console.error(error);
  // 다른 방법은 유저에게 알리는 방법입니다.
  notifyUserOfError(error);
  // 또 다른 방법은 서비스 자체에 에러를 기록하는 방법입니다.
  reportErrorToService(error);
  // 혹은 그 어떤 방법이 될 수 있습니다.
});
```



# 8. 경계

시스템에 들어가는 모든 소프트웨어를 직접 개발하는 경우는 드물다.

외부 코드를 우리 코드에 깔끔하게 통합해야만 한다.

### 외부 코드 사용하기

인터페이스 제공자는 적용성을 최대한 넓히려 하고, 인터페이스 사용자는 자신의 요구에 집중하는 인터페이스를 바란다.

```java
public class Sensors {
  private Map sensors = new HashMap();
  
  public Sensor getById(String id){
    return (Sensor) sensors.get(id);
  }
}
```

경계 인터페이스인 Map을 sensors 안으로 숨기면 Map 인터페이스가 변하더라도 나머지 프로그램에 영향을 미치지 않는다. 

Map과 같은 **경계 인터페이스를 사용할 때는 이를 이용하는 클래스나 클래스 계열 밖으로 노출되지 않도록 주의한다.**



### 경계 살피고 익히기

학습 테스트 : 우리쪽 코드를 작성해 외부 코드를 호출하는 대신 먼저 간단한 테스트 케이스를 작성해 외부 코드를 익히는 방법



### 학습 테스트는 공짜 이상이다

학습 테스트는 필요한 지식만 확보하는 손쉬운 방법. 패키지 새 버전이 나온다면 학습 테스트를 돌려 차이가 있는지 확인



### 아직 존재하지 않는 코드를 사용하기

우리가 바라는 인터페이스를 구현하면 우리가 인터페이스를 전적으로 통제한다는 장점이 생긴다. 코드 가독성이 높아지고 코드 의도도 분명해진다.

우리가 통제하지 못하고 정의하지도 않은 코드(기능)은 API에서 분리하고 필요한 부분만 자체적으로 인터페이스를 정의한다.

나중에 다른 팀이 API를 정의하면 거기에 맞춰 구현하면 된다. 

이러한 방식의 설계는 테스트도 편하다.



### 깨끗한 경계

경계에 위치하는 코드는 깔끔하게 분리하고 기대치를 정의하는 테스트 케이스도 작성한다. 이쪽 코드에서 외부 패키지를 세세하게 알 필요는 없다.

통제가 불가능한 외부 패키지에 의존하는 것보다 통제가 가능한 우리 코드에 의존하는 편이 좋다.

외부 패키지를 호출하는 코드를 가능한 줄여 경계를 관리하자.

새로운 클래스로 경계를 감싸거나 아니면 우리가 원하는 인터페이스를 패키지가 제공하는 인터페이스로 변환하자.











