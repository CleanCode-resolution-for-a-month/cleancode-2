- [9장. 단위 테스트](#9장-단위-테스트)
  - [9-1) TDD 법칙 세 가지](#9-1-tdd-법칙-세-가지)
  - [9-2) 깨끗한 테스트 코드 작성의 중요성](#9-2-깨끗한-테스트-코드-작성의-중요성)
  - [9-3) 깨끗한 테스트 코드: 가독성](#9-3-깨끗한-테스트-코드-가독성)
  - [9-4) F.I.R.S.T](#9-4-first)
    - [✔️ 1. **F**ast (빠르게)](#️-1-fast-빠르게)
    - [✔️ 2. **I**ndependent (독립적으로)](#️-2-independent-독립적으로)
    - [✔️ 3. **R**epeatable (반복가능하게)](#️-3-repeatable-반복가능하게)
    - [✔️ 4. **S**elf-Validating (자가검증하는)](#️-4-self-validating-자가검증하는)
    - [✔️ 5. **T**imely (적시에)](#️-5-timely-적시에)
- [10장. 클래스](#10장-클래스)
  - [10-1) 클래스 체계](#10-1-클래스-체계)
  - [10-2) 클래스는 작아야 한다](#10-2-클래스는-작아야-한다)
    - [✔️ 단일 책임 원칙 (Single Responsibility Principle, SRP)](#️-단일-책임-원칙-single-responsibility-principle-srp)
    - [✔️ 응집도 (Cohesion)](#️-응집도-cohesion)
    - [✔️ 응집도를 유지하면 작은 클래스 여럿이 나온다](#️-응집도를-유지하면-작은-클래스-여럿이-나온다)
  - [10-3) 변경하기 쉬운 클래스](#10-3-변경하기-쉬운-클래스)
- [11장. 시스템](#11장-시스템)
  - [11-1) Main 분리](#11-1-main-분리)
  - [11-2) 팩토리](#11-2-팩토리)
  - [11-3) 의존성 주입 (Dependency Injection, DI)](#11-3-의존성-주입-dependency-injection-di)
- [12장. 창발성](#12장-창발성)
  - [12-1) 모든 테스트를 실행하라](#12-1-모든-테스트를-실행하라)
  - [12-2) 리팩터링](#12-2-리팩터링)
  - [12-3) 중복을 없애라](#12-3-중복을-없애라)
  - [12-4) 표현하라](#12-4-표현하라)
  - [12-5) 클래스와 메서드 수를 최소로 줄여라](#12-5-클래스와-메서드-수를-최소로-줄여라)
- [13장. JavaScript에서의 동시성](#13장-javascript에서의-동시성)
  - [13-1) Callback vs Promise](#13-1-callback-vs-promise)
  - [13-2) Async/Await](#13-2-asyncawait)

<br>

# 9장. 단위 테스트
## 9-1) TDD 법칙 세 가지
1. 실패하는 단위 테스트를 작성할 때까지 실제 코드를 작성하지 않는다.
2. 컴파일은 실패하지 않으면서 실행이 실패하는 정도로만 단위 테스트를 작성한다.
3. 현재 실패하는 테스트를 통과할 정도로만 실제 코드를 작성한다.

<br>

## 9-2) 깨끗한 테스트 코드 작성의 중요성
> **테스트 코드는 실제 코드 못지 않게 중요하다.<br>실제 코드 못지 않게 깨끗하게 짜야 한다.**

- 테스트 케이스가 있으면 변경이 두렵지 않다. <br>테스트 케이스가 없다면 모든 변경이 잠정적인 버그이다.
아키텍처가 아무리 유연하더라도, 설계를 아무리 잘 나눴더라도 **테스트 케이스가 없으면 개발자는 변경을 주저한다**.<br><br> 
- 테스트 케이스가 있다면 공포는 사라진다. 테스트 커버리지가 높을 수록 공포는 줄어든다.<br>
아키텍처가 부실하거나 설계가 엉망인 코드라도 안심하고 개선할 수 있다.<br><br>
- 그러므로 실제 코드를 점검하는 **자동화된 단위 테스트 슈트**는 설계와 아키텍처를 최대한 깨끗하게 보존하는 열쇠이다.<br>
**테스트는 유연성, 유지보수성, 재사용성을 제공한다.**<br><br>
- 테스트 코드가 지저분할수록 실제 코드도 지저분해진다. 결국 테스트 코드를 잃어버리고 실제 코드도 망가진다.

<br>

## 9-3) 깨끗한 테스트 코드: 가독성
깨끗한 테스트 코드를 만들려면 세 가지가 필요하다.
1. 가독성
2. 가독성
3. 가독성

**어쩌면 가독성은 실제 코드보다 테스트 코드에 더더욱 중요하다.**

<br>

## 9-4) F.I.R.S.T
깨끗한 테스트는 다음 다섯 가지 규칙을 따른다.

### ✔️ 1. **F**ast (빠르게)
**테스트는 빨리 돌아야 한다.**<br>
테스트가 느리면 자주 돌릴 엄두를 못 낸다. 자주 돌리지 않으면 결국 코드 품질이 망가지게 된다.

### ✔️ 2. **I**ndependent (독립적으로)
**각 테스트는 서로 의존하면 안 된다.**<br>
한 테스트가 다른 테스트가 실행될 환경을 준비해서는 안 된다. 각 테스트는 독립적으로 그리고 어떤 순서로 실행해도 괜찮아야 한다.

테스트가 서로에게 의존하면 하나가 실패할 때 나머지도 잇달아 실패하므로, 원인을 진단하기 어려워지며 후반 테스트가 찾아낼 결함이 숨겨진다.


### ✔️ 3. **R**epeatable (반복가능하게)
**테스트는 어떤 환경에서도 반복 가능해야 한다.**<br>
실제 환경, QA 환경, 버스를 타고 집으로 가는 길에 사용하는<sup>네트워크가 연결되지 않은 </sup> 노트북 환경에서도 실행할 수 있어야 한다.

### ✔️ 4. **S**elf-Validating (자가검증하는)
**테스트는 bool 값으로 결과를 내야 한다.**<br>
통과 여부를 알려고 로그 파일을 읽게 하거나, 텍스트 파일 두 개를 수작업으로 비교하게 만들어서는 안 된다.

### ✔️ 5. **T**imely (적시에)
**테스트는 적시에 작성되어야 한다.**<br>
단위 테스트는 테스트하려는 실제 코드를 구현하기 직전에 구현한다.
실제 코드를 구현한 다음에 테스트 코드를 만들면 실제 코드가 테스트하기 어렵다는 사실을 발견할지도 모른다.

----

<br>

# 10장. 클래스
## 10-1) 클래스 체계
클래스를 정의하는 표준 자바 관례는 다음과 같다.
**추상화 단계가 순차적으로 내려가서** 프로그램이 신문 기사처럼 읽힌다.

1. 변수 목록
   1. static public 상수
   2. static private 변수
   3. private 변수 (_public 변수가 필요한 경우는 거의 없다_)
2. 공개 함수
3. 비공개 함수

**번수와 유틸리티 함수는 가능한 공개하지 않는 편이 낫지만 반드시 숨겨야 한다.**<br>
때로는 변수나 유틸리티 함수를 protected로 선언해 테스트 코드에 접근을 허용하기도 한다.
하지만 그 전에 비공개 상태를 유지할 온갖 방법을 강구해야 한다. **캡슐화를 풀어주는 결정은 언제나 최후의 수단이다.**

<br>

## 10-2) 클래스는 작아야 한다
- 함수와 마찬가지로 클래스를 설계할 때도 **'작게'가 기본 규칙**이다.<br>
- 함수는 물리적인 행 수로 크기를 측정했으나, 클래스는 '**클래스가 맡은 책임**'을 척도로 크기를 측정한다.
- 클래스 이름이 모호하다면 그건 클래스 책임이 너무 많아서이다.
  - 클래스 이름에 `Processor`, `Manager`, `Super` 등과 같이 모호한 단어가 있다면 그 클래스에다 여러 책임을 떠안겼다는 증거다.
- **클래스 설명**은 `if`, `and`, `or`, `but`을 사용하지 않고서 **25단어 내외**로 가능해야 한다.

다음은 책에 예시로 나온 클래스이다. 이 클래스의 크기는 적절한가?
```java
public class SuperDashboard extends JFrame implements MetaDataUser {
    public Component getLastFocusedComponent ()
    public void setLastFocused(Component lastFocused)
    public int getMajorVersionNumber()
    public int getMinorVersionNumber()
    public int getBuildNumber()
}
```

**`SuperDashboard`는 메서드 수가 작은에도 책임이 너무 많다.**

### ✔️ 단일 책임 원칙 (Single Responsibility Principle, SRP)
> 단일 책임 원칙은 **클래스나 모듈을 변경할 이유가 단 하나뿐이어야 한다**는 원칙이다.

`SuperDashboard` 는 변경할 이유가 두 가지다.
1. 버전 정보는 소프트웨어를 출시할 때마다 달라진다.
2. [스윙](https://ko.wikipedia.org/wiki/%EC%8A%A4%EC%9C%99_(%EC%9E%90%EB%B0%94)) 코드를 변경할 때마다 버전 번호가 달라진다.

책임, 즉 변경할 이유를 파악하려 애쓰다 보면 코드를 추상화하기도 쉬워진다. 
`SuperDashboard`에서 버전 정보를 다루는 메서드를 따로 빼내 `Version`이라는 독자전인 클래스를 만든다.
```java
public class Version {
    public int getMajorVersionNumber()
    public int getMinorVersionNumber()
    public int getBuildNumber()
}
```

큰 클래스 몇 개가 아니라 작은 클래스 여럿으로 이뤄진 시스템이 더 바람직하다.
**작은 클래스는 각자 맡은 책임이 하나며, 변경할 이유가 하나이다.**

### ✔️ 응집도 (Cohesion)
메서드가 변수를 더 많이 사용할 수록 메서드와 클래스는 응집도가 높아진다.<br>
모든 인스턴스 변수를 메서드마다 사용하는 클래스는 응집도가 가장 높다.

'함수를 작게, 매개변수 목록을 짧게' 전략을 따르다 보면 몇몇 메서드만이 사용하는 인스턴스 수가 많아진다.
이는 새로운 클래스로 쪼개야 한다는 신호이다.

> **응집도가 높아지도록 변수와 메서드를 적절히 분리**해서 새로운 클래스 두세 개로 쪼갠다.

### ✔️ 응집도를 유지하면 작은 클래스 여럿이 나온다
클래스 변수를 인스턴스 변수로 승격한다면 인수가 필요 없는 함수로 바뀐다.
이렇게 하면 함수로 쪼개기는 쉬워지지만 클래스가 응집력을 잃는다.
몇몇 함수만 사용하는 인스턴스 변수가 점점 늘어나기 때문이다.

몇몇 함수가 몇몇 변수만 사용한다면 독자적인 클래스로 분리해도 된다는 뜻이다.
> **클래스가 응집력을 잃는다면 쪼개라!**

<br>

## 10-3) 변경하기 쉬운 클래스
- 깨끗한 시스템은 클래스를 체계적으로 정리해 변경에 수반하는 위험을 낮춘다.
- 새 기능을 수정하거나 기존 기능을 변경할 때 건드릴 코드가 최소인 시스템 구조가 바람직하다. 이상적인 시스템이라면 새 기능을 추가할 때 시스템을 확장할 뿐 기존 코드를 변경하지는 않는다.
- 테스트가 가능할 정도로 시스템의 결합도를 낮추면 유연성과 재사용성도 더욱 높아진다.
- 결합도가 낮다는 것은 각 시스템 요소가 다른 요소들과 변경으로부터 잘 격리되어 있다는 의미다.

---

<br>

# 11장. 시스템
**관심사 분리**는 우리 분야에서 가장 오래되고 중요한 설계 기법 중 하나이다. **시스템 제작**과 **시스템 사용**을 *분리*하는 방법에 대해 알아보자.
## 11-1) Main 분리
시스템 생성과 시스템 사용을 분리하는 한 가지 방법이다.

생성과 관련한 코드는 모두 main이나 main이 호출하는 모듈로 옮기고, 나머지 시스템은 모든 객체가 생성되었으며 모든 의존성이 연결되었다고 가정한다.

<img width="400" alt="separate-main" src="https://user-images.githubusercontent.com/31913666/194805129-d8e7af53-3f3a-4d5e-8e6d-a8dd07bf2fe8.png">

- main 함수에서 시스템에 필요한 객체를 생성한 후 이를 application에 넘긴다.
- 모든 화살표가 main 쪽에서 application 쪽을 향한다.
- application은 그저 객체를 사용할 뿐이다.
- application은 main이나 객체가 생성되는 과정을 전혀 모른다. 단지 모든 객체가 적절히 생성되었다고 가정한다.

<br>

## 11-2) 팩토리
때로는 객체가 생성되는 시점을 애플리케이션이 결정할 필요도 생긴다.

예를 들어, 주문처리 시스템에서 애플리케이션은 LineItem 인스턴스를 생성해 Order에 추가한다.
이때는 **ABSTRACT FACTORY 패턴**을 사용한다. 그러면 ListItem을 생성하는 시점은 애플리케이션이 결정하지만, LineItem을 생성하는 코드는 애플리케이션이 모른다.

<img width="522" alt="factory-pattern" src="https://user-images.githubusercontent.com/31913666/194805916-ff74a2a6-5caa-457f-a82f-c3ce5c6aa8c2.png">

- 모든 의존성이 main에서 OrderProcessing을 향한다.
- OrderProcessing은 ListItem이 생성되는 구체적인 방법을 모른다. 그 방법은 main 쪽에 있는 LineItemFactoryImplementation이 안다.
- OrderProcessing은 ListItem 인스턴스가 생성되는 시점을 완벽하게 통제한다.
- 필요하다면 OrderProcessing에서만 사용하는 생성자 인수도 넘길 수 있다.

<br>

## 11-3) 의존성 주입 (Dependency Injection, DI)
**사용과 제작을 분리하는 강력한 메커니즘 하나가 의존성 주입이다.**
[의존성 주입](DependencyInversionPrinciple/README.md)은 제어 역전<sup>Inversion of Control, IoC</sup> 기법을 의존성 관리에 적용한 매커니즘이다.

제어 역전에서는 한 객체가 맡은 보조 책임을 새로운 객체에게 전적으로 떠넘긴다.
새로운 객체는 넘겨받은 책임만 맡으므로 단일 책임 원칙을 지키게 된다. 

---

<br>

# 12장. 창발성
켄트 백이 제시한 설계 규칙 네 가지은 소프트웨어 품질을 크게 높여준다.
1. 모든 테스트를 실행한다.
2. 중복을 없앤다.
3. 프로그래머 의도를 표현한다.
4. 클래스와 메서드 수를 최소로 줄인다.

<br>

## 12-1) 모든 테스트를 실행하라
- 테스트가 가능한 시스템을 만들려고 애쓰면 설계 품질이 높아진다.
  - 크기는 작고 목적 하나만 수행하는 클래스가 나온다.
  - SPR를 준수하는 클래스는 테스트가 훨씬 더 쉽다.
  - 테스트 케이스가 많을 수록 개발자는 테스트가 쉽게 코드를 작성한다.
- 결합도가 높으면 테스트 케이스를 작성하기가 어려워진다.
  - 테스트 케이스를 많이 작성할 수록 개발자는 DIP와 같은 원칙을 적용한다.
  - DI, 인터페이스, 추상화 등과 같은 도구를 사용해 결합도를 낮춘다.

<br>

## 12-2) 리팩터링
- 테스트 케이스를 모두 작성했다면 코드와 클래스를 정리해도 괜팒다.
- 리팩터링 단계에서는 소프트웨어 설계 품질을 높이는 기법이라면 무엇이든 적용해도 괜찮다.
  - 시스템 관심사를 모듈로 나누기
  - 함수와 클래스 크기를 줄이기
  - 더 나은 이름을 선택하기 등

<br>

## 12-3) 중복을 없애라
- 우수한 설계에서 중복은 커다란 적이다.
- 중복은 추가 작업, 추가 위험, 불필요한 복잡도를 뜻한다.

<br>

## 12-4) 표현하라
- 자신이 이해하는 코드를 짜기는 쉽다.
- 시스템이 복잡해지면서 유지보수 개발자가 시스템을 이해하느라 보내는 시간은 늘어가고, 코드를 오해할 가능성도 높아진다.
- 그러므로 코드는 개발자의 의도를 분명하게 표현해야 한다. 그래야 결함이 줄어들고 유지보수 비용이 적게 든다.
- 의도를 잘 표현하는 방법
  - 좋은 이름을 선택한다
  - 함수와 클래스 크기를 줄인다
  - 표준 명칭을 사용한다
  - 단위 테스트 케이스를 꼼꼼히 작성한다

## 12-5) 클래스와 메서드 수를 최소로 줄여라
- 클래스와 메서드 수를 최소로 줄이는 것의 목표는 함수와 클래스의 크기를 작게 유지하면서 동시에 시스템 크기도 작게 유지하는데 있다.
- 무의미하게 클래스의 크기를 줄여 작은 클래스와 메서드를 수 없이 만들기보다는, 실용적으로 분리하자.
- 클래스와 함수 수를 줄이는 작업도 중요하지만, 테스트 케이스를 만들고 중복을 제거하고 의도를 표현하는 작업은 더 중요하다.

---

<br>

# 13장. JavaScript에서의 동시성
> 동시성은 결합<sup>coupling</sup>을 없애는 전략이다. 즉, 무엇<sup>what</sup>과 언제<sup>when</sup>을 분리하는 전략이다.

스레드가 하나인 프로그램은 무엇과 언제가 서로 밀접하다.
무엇과 언제를 분리하면 애플리케이션 구조와 효울이 극적으로 나아진다.

(13장의 내용은 JavaScript와 차이가 있어서, [
clean-code-javascript-ko](https://github.com/qkraudghgh/clean-code-javascript-ko#%EB%8F%99%EC%8B%9C%EC%84%B1concurrency) 레포를 참고하여
작성하였습니다.)


## 13-1) Callback vs Promise
Callback은 콜백 지옥을 만들어 가독성을 크게 떨어트린다.
ES2015/ES6에선 Promise가 내장되어 있다. Callback 보다는 Promise를 사용하자.

`Callback 사용`
```js
require('request').get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin', (requestErr, response) => {
  if (requestErr) {
    console.error(requestErr);
  } else {
    require('fs').writeFile('article.html', response.body, (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
      } else {
        console.log('File written');
      }
    });
  }
});
```

<br>

`Promise 사용`

```js
require('request-promise').get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin')
  .then((response) => {
    return require('fs-promise').writeFile('article.html', response);
  })
  .then(() => {
    console.log('File written');
  })
  .catch((err) => {
    console.error(err);
  });
```


## 13-2) Async/Await
ES2017/ES8에선 async와 await이 있습니다. async/await을 사용하면 비동기 함수를 동기적인 코드처럼 보이도록 작성할 수 있다.

`async/await 사용`

```js
async function getCleanCodeArticle() {
  try {
    const response = await require('request-promise').get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin');
    await require('fs-promise').writeFile('article.html', response);
    console.log('File written');
  } catch(err) {
    console.error(err);
  }
}
```
