- [1장. 깨끗한 코드](#1장-깨끗한-코드)
  - [1-1) 나쁜 코드로 치르는 대가](#1-1-나쁜-코드로-치르는-대가)
  - [1-2) 깨끗한 코드란?](#1-2-깨끗한-코드란)
  - [1-3) 이 책의 내용을 요약한다면](#1-3-이-책의-내용을-요약한다면)
- [2장. 의미 있는 이름](#2장-의미-있는-이름)
  - [2-1) 의도를 분명히 밝혀라](#2-1-의도를-분명히-밝혀라)
  - [2-2) 의미 있게 구분하라](#2-2-의미-있게-구분하라)
  - [2-3) 검색하기 쉬운 이름을 사용하라](#2-3-검색하기-쉬운-이름을-사용하라)
  - [2-4) 클래스 이름, 메서드 이름](#2-4-클래스-이름-메서드-이름)
  - [2-5) 한 개념에 한 단어를 사용하라](#2-5-한-개념에-한-단어를-사용하라)
  - [2-6) 의미 있는 맥락을 추가하라](#2-6-의미-있는-맥락을-추가하라)
- [3장. 함수](#3장-함수)
  - [3-1) 작게 만들어라](#3-1-작게-만들어라)
  - [3-2) 한 가지만 해라!](#3-2-한-가지만-해라)
  - [3-3) 함수 당 추상화 수준은 하나로!](#3-3-함수-당-추상화-수준은-하나로)
  - [3-4) 위에서 아래로 코드 읽기: 내려가기 규칙](#3-4-위에서-아래로-코드-읽기-내려가기-규칙)
  - [3-5) 함수 인수](#3-5-함수-인수)
  - [3-6) 반복하지 마라!](#3-6-반복하지-마라)
- [4장. 주석](#4장-주석)
  - [4-1) 주석은 나쁜 코드를 보완하지 못한다](#4-1-주석은-나쁜-코드를-보완하지-못한다)
  - [4-2) 코드로 의도를 표현하라!](#4-2-코드로-의도를-표현하라)
  - [4-3) 좋은 주석](#4-3-좋은-주석)
  - [4-4) 나쁜 주석](#4-4-나쁜-주석)

<br>

# 1장. 깨끗한 코드
## 1-1) 나쁜 코드로 치르는 대가
나쁜 코드는 개발 속도를 크게 떨어트린다. 프로젝트 초반에는 번개처럼 나가다가 1-2년만에 굼벵이처럼 기어가는 팀도 많다.

코드를 고칠 때마다 엉뚱한 곳에서 문제가 생긴다. 간단한 변경은 없다. 매번 얽히고설킨 코드를 '해독'해서 얽히고설킨 코드를 더한다. 시간이 지나면서 더미는 점점 높아지고 깊어지고 커진다.

나쁜 코드가 쌓일 수록 팀 생산성은 떨어지고 마침내 0에 근접해진다.

<br>

## 1-2) 깨끗한 코드란?
다음은 유명한 프로그래머들이 정의한 깨끗한 코드들의 특징이다.

- 보기에 즐겁다.
- 오류 처리를 철저하게 한다.
- 한 가지를 잘 한다.
- 가독성이 높아 잘 쓴 문장처럼 읽힌다.
- 다른 사람이 고치기 쉽다.
- 테스트 케이스가 있다. 테스트 케이스가 없는 코드는 아무리 가독성이 높아도 깨끗하지 않다.
- 시간을 들여 작성하여 깔끔하고 단정하다.
- 모든 테스트를 통과한다.
- 중복이 없다.
- 시스템 내 모든 설계 아이디어를 표현한다.
- 클래스, 메서드, 함수 등을 최대한 줄인다.

워드 커닝햄은 깨끗한 코드를 다음과 같이 표현했다.
> "코드를 읽으면서 짐작했던 기능을 각 루틴이 그대로 수행한다면 깨끗한 코드라 불러도 되겠다. 코드가 그 문제를 풀기 위한 언어처럼 보인다면 아름다운 코드라 불러도 되겠다."

<br>

## 1-3) 이 책의 내용을 요약한다면
이 책의 내용을 요약하면 다음과 같다.
> **"중복을 피하라. 한 가지 기능만 수행하라. 제대로 표현하라. 작게 추상하라"**

<br>

# 2장. 의미 있는 이름
의도를 분명하게 이름을 지어야 한다. 좋은 이름을 지으려면 시간이 걸리지만 좋은 이름으로 절약하는 시간이 훨씬 더 많다.

**변수, 함수, 클래스 이름은 다음과 같은 질문에 모두 답할 수 있어야 한다.**
- 존재 이유는?
- 수행 기능은?
- 사용 방법은?

따로 주석이 필요하다면 의도를 분명하게 드러내지 못했다는 말이다.

## 2-1) 의도를 분명히 밝혀라
### Example 1
```js
// 😱 BAD
let d; // 경과 시간 (단위: 날짜)
```
`d` 는 아무 의미도 드러나지 않는다. 경과 시간이나 날짜라는 느낌이 들지 않는다. 측정하려는 값과 단위를 표현하는 이름이 필요하다.


```js
// 😎 GOOD
let elapsedTimeInDays;
let daysSinceCreation;
let daysSinceModification;
let fileAgeInDays;
```
의도가 드러나는 이름을 사용하면 코드의 이해와 변경이 쉬워진다.

### Example 2
다음 코드는 무슨 일을 하는가?
```js
// 😱 BAD
const getThem = () => {
  const list1 = [];
  for (const x in theList) {
    if (x[0] == 4) list1.push(x);
  }
  return list1;
}
```
복잡한 문장은 없으나 코드가 하는 일을 짐작하기 어렵다.

> 문제는 코드의 단순성이 아니라 코드의 **함축성**이다. 다시 말해, 코드 맥락이 코드 자체에 명시적으로 드러나지 않는다.

지뢰 찾기 게임을 만든다고 가정하자. 그럼 `theList` 을 `gameBoard` 로 바꿀 수 있을 것이다.

```js
// 😎 GOOD
const getFlaggedCells = () => {
  const flaggedCells = [];
  for (const cell in gameBoard) {
    if (cell[STATUS_VALUE] == FLAGGED)
      flaggedCells.push(cell);
  }
  return flaggedCells;
}
```

코드의 단순성은 변하지 않았지만 코드가 더욱 명확해졌다.

한 걸음 더 나아가, cell을 간단한 클래스로 만들 수 있다. `isFlagged` 라는 명시적인 함수를 사용하여 `FLAGGED` 상수를 감출 수 있다.
```js
// 🥳 BETTER
const getFlaggedCells2 = () => {
  const flaggedCells = [];
  for (const cell in gameBoard) {
    if (cell.isFlagged)
      flaggedCells.push(cell);
  }
  return flaggedCells;
}
```

<br>

## 2-2) 의미 있게 구분하라
`a1, a2, ..., an` 과 같이 연속적인 숫자를 덧붙인 이름은 아무런 정보도 제공하지 않는다. 다음 코드를 살펴보자.

```js
// 😱 BAD
const copyChars1 = (a1, a2) => {
  for (let i = 0; i < a1.length; i++) {
    a2[i] = a1[i];
  }
}

// 😎 GOOD
const copyChars2 = (source, destination) => {
  for (let i = 0; i < source.length; i++) {
    destination[i] = source[i];
  }
}
```
함수의 인수 이름으로 `source` 와 `destination` 을 사용하니 코드가 훨씬 읽기 쉬워졌다.

**불용어를 추가한 이름 역시 아무런 정보를 제공하지 못한다.**

`Product` 라는 클래스가 있다고 가정하자. 다른 클래스를 `ProductInfo` 혹은 `ProductData` 라 부른다면 개념을 구분하지 않은 채 이름만 달리한 경우이다.

**Info나 Data는 a, an, the와 마찬가지로 의미가 불분명한 불용어이다.**

<br>

## 2-3) 검색하기 쉬운 이름을 사용하라
**문자 하나를 사용하는 이름과 상수는 코드에서 쉽게 눈에 띄지 않는다는 문제점이 있다.**

`MAX_CLASSES_PER_STUDENT` 는 grep으로 찾기가 쉽지만, `7` 은 은근히 까다롭다.

```js
// 😱 BAD
for (let i = 0; i < 34; i++) {
  s += (t[i] * 4) / 5;
}

// 😎 GOOD
let realDaysPerIdealDay = 4;
const WORK_DAYS_PER_WEEK = 5;

let sum = 0;
for (let i = 0; i < NUMBER_OF_TASKS; i++) {
  const realTaskDays = taskEstimate[i] * realDaysPerIdealDay;
  const realTaskWeeks = (realTaskDays / WORK_DAYS_PER_WEEK);
  sum += realTaskWeeks;
}
```
위 코드에서 `sum` 이 별로 유용하지는 않으나 최소한 검색이 가능하다.


<br>

## 2-4) 클래스 이름, 메서드 이름
### 클래스 이름
**클래스 이름과 객체 이름은 명사나 명사구가 적합하다.**

Customer, WikiPage, Account, AddressParser 등이 좋은 예다. Manager, Processor, Data, Info 등과 같은 단어는 피하고, 동사는 사용하지 않는다.

### 메서드 이름
**메서드 이름은 동사나 동사구가 적합하다.**

postPayment, deletePage, save 등이 좋은 예다. 접근자, 변경자, 조건자는 표준에 따라 get, set, is를 붙인다.

<br>

## 2-5) 한 개념에 한 단어를 사용하라
추상적인 개념 하나에 단어 하나를 선택해 이를 고수한다.

예를 들어, **똑같은 메서드를 클래스마다 fetch, retrieve, get으로 제각각 부르면 혼란스럽다.** 어느 클래스에서 어느 이름을 썼는지 기억하기가 어렵다.

마찬가지로, 동일 코드 기반에 controller, manager, driver를 섞어 쓰면 혼란스럽다. DeviceManager와 ProtocolController는 근본적으로 어떻게 다른가? 이름이 다르면 독자는 당연히 클래스도 다르고 타입도 다르다고 생각한다.

**일관성 있는 어휘**는 코드를 사용할 프로그래머가 반갑게 여길 선물이다.

<br>

## 2-6) 의미 있는 맥락을 추가하라
우리는 클래스, 함수, 이름 공간에 넣어 맥락을 부여하고, 모든 방법이 실패하면 마지막 수단에 접두어를 붙인다.

예를 들어, `firstName`, `lastName`, `street`, `houseNumber`, `city`, `state`, `zipCode` 라는 변수가 있다. 변수를 훑어보면 주소라는 사실을 금방 알아챌 수 있다. 하지만 어느 메서드가 `state` 라는 변수를 하나만 사용한다면? 변수 `state` 가 주소 일부라는 사실을 금방 알아챌까?

`addr` 이라는 접두어를 추가해 `addrFristName`, `addrLastName`, `addrState` 라 쓰면 맥락이 좀 더 분명해진다. 물론 Address라는 클래스를 생성하면 더 좋다. 그러면 변수가 좀 더 큰 개념에 속상다는 사실이 컴파일러에게도 분명해진다.

<br>

다음 메서드를 살펴보자. 함수를 끝까지 읽어보고 나서야 number, verb, pluralModifier라는 변수 새 게개 guess statics 메세지에 사용된다는 사실이 드러난다. 불행히도 독자가 맥락을 유주해야만 한다. **그냥 메서드만 훑어서는 세 변수의 의미가 불분명하다.**

```js
// 😱 BAD
// 맥락이 불분명한 함수
const printGuessStatistics = (candiate, count) => {
  let number;
  let verb;
  let pluralModifier;

  if (count == 0) {
    number = 'no';
    verb = 'are';
    pluralModifier = 's';
  }

  else if (count == 1) {
    number = '1';
    verb = 'is';
    pluralModifier = '';
  }

  else {
    number = count.toString();
    verb = 'is';
    pluralModifier = '';
  }

  const guessMessage = `There ${verb} ${number} ${candiate} ${pluralModifier}`;

  console.log(guessMessage);
}
```

<br>


개선한 코드를 살펴보자. 함수를 작은 조각으로 쪼개기위해 `GuessStatisticMessage` 클래스를 만든 후 세 변수를 클래스에 넣었다. 

**즉, 세 변수는 확실하게 `GuessStatisticMessage` 에 속한다. 이렇게 맥락을 개선하면 함수 쪼개기가 쉬워지므로 알고리즘도 좀 더 명확해진다.** 

```js
// 😎 GOOD
// 맥락이 분명한 함수
class GuessStatisticMessage {
  constructor() {
    this.number = '';
    this.verb = '';
    this.pluralModifier = '';
  }

  make(candiate, count) {
    this.createPluralDependentMesageParts(candiate, count);
    return `There ${this.verb} ${this.number} ${candiate} ${this.pluralModifier}`;
  }

  createPluralDependentMesageParts(count) {
    if (count == 0) thereAreNoLetters();
    else if (count == 1) thereIsOneLetter();
    else thereAreManyLetters(count);
  }

  thereAreNoLetters() {
    number = 'no';
    verb = 'are';
    pluralModifier = 's';
  }  

  thereIsOneLetter() {
    number = '1';
    verb = 'is';
    pluralModifier = '';
  }

  thereAreManyLetters(count) {
    number = count.toString();
    verb = 'are';
    pluralModifier = 's';
  }
}
```

<br>

# 3장. 함수
## 3-1) 작게 만들어라
함수를 만드는 첫 번째 규칙은 **작게**이다. 함수를 만드는 두 번째 규칙은 **더 작게**이다.

그럼 얼마나 작아야 하는가? 필자의 경험에 의하면 함수가 2~4줄로 표현되었을 때, 각 함수가 너무나도 명백했다고 한다.

<br>

## 3-2) 한 가지만 해라!
> **함수는 한 가지를 해야 한다. 그 한 가지를 잘 해야 한다. 그 한 가지 만을 잘해야 한다.**

지정된 함수 이름이 아래에서 추상화 수준이 하나인 단계만 수행한다면 그 함수는 한 가지 작업만 한다. 어쨌거나 우리가 함수를 만드는 이유는 큰 개념을 다음 추상화 수준에서 여러 단계로 나눠 수행하기 위해서이다.

함수가 '한 가지' 작업만 하는지 판단하는 방법이 있다. 단순히 다른 표현이 아니라 의미 있는 이름으로 다른 함수를 추출할 수 있다면 그 함수는 여러 작업을 하는 셈이다.


<br>


## 3-3) 함수 당 추상화 수준은 하나로!
함수가 확실히 '한 가지 작업만 하려면 함수 내 모든 문장의 추상화 수준이 동일해야 한다.

- 추상화 수준 높음 `getHtml()`
- 추상화 수준 중간 `String pagePathName = PathParser.redner(pagepath);`
- 추상화 수준 낮음 `.append('\n')`

한 함수 내에 추상화 수준을 섞으면 코드를 읽는 사람이 헷갈린다. 특정 표현이 근본 개념인지 아니면 세부 사항인지 구분하기가 어려운 탓이다. 근본 개념과 세부 사항을 뒤섞기 시작하면, 깨어진 창문처럼 사람들이 함수에 세부사항을 점점 더 추가한다.

<br>

## 3-4) 위에서 아래로 코드 읽기: 내려가기 규칙
**코드는 아래에서 위로 이야기처럼 읽혀야 좋다.** 한 함수 다음에는 추상화 수준이 한 단계 낮은 함수가 온다.

즉, 위에서 아래로 프로그램을 읽으면 함수 추상화 수준이 한 번에 한 단계씩 낮아진다. 필자는 이것을 **내려가기 규칙**이라고 부른다고 한다.

하지만 추상화 수주이 하나인 함수를 구현하기란 쉽지 않다. 그렇지만 매우 중요한 규칙이다. 핵심은 짧으면서도 '한 가지만' 하는 함수이다.

<br>

## 3-5) 함수 인수
**함수에서 이상적인 인수 개수는 0개(무항)이다. 다음은 1개(단항)고, 다음은 2개(이항)이다. 3개(삼항)은 가능한 피하는 것이 좋다.** 특별한 이유가 있어도 사용하면 안 된다.

인수는 개념을 이해하기 어렵게 만든다.

예를 들어, `includeSetupPageInfo(new PageContent)` 보다 `includeSetupPage()` 가 더 이해하기 쉽다. `includeSetupPageInfo(new PageContent)` 는 함수 이름과 인수 사이에 추상화 수준이 다르다. 게다가 코드를 읽는 사람이 현 시점에서 별로 중요하지 않은 세부사항을 알아야 한다.

테스트 관점에서 보면 여러 인수 조합으로 함수를 검증하는 테스트 케이스를 작성해야 하므로, 인수가 간단할 수록 좋다.

<br>

## 3-6) 반복하지 마라!
중복은 문제다. 코드 길이가 늘어날 뿐 아니라 알고리즘이 변하면 여러 곳을 수정해야 한다. 게다가 어느 한 곳이라도 빠트린다면 오류가 발생할 확률도 높다.

소프트웨어 개발에서 지금까지 일어난 혁신은 소스 코드에서 중복을 제거하려는 지속적인 노력들이다.

- 관계형 데이터베이스 | 정규 형식
- 객체지향 프로그래밍 | 부모 클래스로 코드를 분리
- 구조적 프로그래밍, AOP, COP 


<br>

# 4장. 주석
## 4-1) 주석은 나쁜 코드를 보완하지 못한다
코드에 주석을 추가하는 일반적인 이유는 코드 품질이 나쁘기 때문이다.

**표현력이 풍부하고 깔끔하며 주석이 거의 없는 코드가, 복잡하고 어수선하며 주석이 많이 달린 코드보다 훨씬 좋다.** 자신이 저지른 난장판을 주석으로 설명하려 애쓰는 대신에 그 난장판을 깨끗이 치우는 데 시간을 보내라!

<br>

## 4-2) 코드로 의도를 표현하라!
확실히 코드만으로 의도를 설명하기 어려운 경우가 존재한다.

다음 코드 중 어떤 쪽이 나은가?

```js
// #1
// 직원에게 복지 혜택을 받을 자격이 있는지 검사한다.
if ((employee.flags & HOURLY_FALOG) && (employee.age > 65))

// #2
if (employee.isEligibleForFullBenefits())
```
주석으로 달려는 설명을 함수로 만들어 표현해도 충분하다.

<br>

## 4-3) 좋은 주석
### 법적인 주석
각 소스 파일의 첫 머리에 주석으로 들어가는 저작권 정보와 소유권 정보는 필요하고 타당하다.
```js
// Copyright (C) 2003,2004,2005 by Object Mentor, Inc. All right reserved.
// GNU General Public License Version 2.0 (the "License");
```

### 정보를 제공하는 주석으로
때로는 기본적인 정보를 주석으로 제공하면 편리하다. 예를 들어, 다음 주석은 추상 메서드가 반환할 값을 설명한다.

```java
// 테스트 중인 Responder 인스턴스를 반환한다.
protected abstract Responder responderInstace();
```

가능하다면 함수 이름에 정보를 담는 편이 더 좋다. 위 코드는 함수 이름을 `respondorBeingTested` 로 바꾸면 주석이 필요 없어진다.


다음은 좀 더 나은 예제이다.

```java
// kk:mm:ss EEE, MMM dd, yyyy 형식이다.
Pattern timeMatcher = Pattern.compile(
  "\\d*:\\d*:\\d* \\w*, \\w* \\d*, \\d*"
);
```
위에서 제시한 주석은 코드에서 사용한 정규 표현식이 시각과 날짜를 뜻한다고 설명한다. 이왕이면 시각과 날짜를 변환하는 클래스를 만들어 코드를 옮겨주면 더 좋고 깔끔하겠다. 그러면 주석이 필요 없어진다.

### 의미를 명료하게 밝히는 주석
때때로 모호한 인수나 반환 값은 그 의미를 읽기 좋게 표현하면 이해하기 쉬워진다.

일반적으로 인수나 반환값 자체를 명확하게 만들면 더 좋겠지만, 인수나 반환값이 표준 라이브러리나 변경하지 못하는 코드에 속한다면 의므를 명료하게 밝히는 주석이 유용하다.

```java
// 중략
assertTrue(a.compareTo(a) == 0); // a == a
assertTrue(a.compareTo(b) != 0); // a != b
```
물론 그릇된 주석을 달아놓을 위험은 상당히 높다. 주석이 올바른지 검증하기는 쉽지 않다. 그러므로 위와 같은 주석을 달 때는 더 나은 방법이 없는지 고민하고 정확히 달도록 각별히 주의한다.

### 결과를 경고하는 주석
다른 프로그래머들에게 결과를 경고할 목적으로 주석을 사용한다. 예를 들어, 다음은 특정 테스트 케이스를 꺼야하는 이유를 설명하는 주석이다.

```java
// 여유 시간이 충분하지 않다면 실행하지 마십시오.
public void _testWithReallyBigFile() {
  writeLinesToFile(1000000);
  // ...
}
```
물론 요즘에는 `@Ignore` 속성을 이용해 테스트 케이스를 꺼버린다. 구체적으로 설명은 `@Ignore` 속성에 문자열로 넣어준다. 예를 들어, `@Ignore("실행이 너무 오래 걸린다.")` 라고 쓴다.

다음은 주석이 아주 적절한 예제이다.
```java
public static SimpleDataFormat makeStandardHttpDateFormat() {
  // SimpleDateFormat은 스레드에 안전하지 못하다.
  // 따라서 각 인스턴스를 독립적으로 생성해야 한다.
  SimpleDataFormat df = new SimpleDataFormat("EEE, dd MMM yyyy HH:mm:ss z");
  df.setTimeZone(TimeZone.getDefault("GMT"));
  return df;
}
```

### TODO 주석
'앞으로 할 일'을 `//TODO` 주석으로 남겨두면 편하다. 주기적으로 TODO 주석을 점검하여 없애도 되는 주석은 정리하는 거이 좋다.

<br>

## 4-4) 나쁜 주석
대다수의 주석이 이 범주에 속한다. 일반적으로 대다수의 주석은 허술한 코드를 지탱하거나, 엉성한 코드를 변경하거나, 미숙한 결정을 합리화하는 등 프로그래머가 주절거리는 독백에서 크게 벗어나지 못한다.

### 주절거리는 주석
특별한 이유 업이 의무감으로 혹은 프로세스에서 하라고 해서 단 주석은 전적으로 시간낭비이다. 주석을 달기로 결정했다면 충분한 시간을 들여 최고의 주석을 달도록 노력한다.

```java
public void loadProperties() {
  try {
    //...
  } catch(IOException e) {
    // 속성 파일이 없다면 기본 값을 모두 메로리로 읽어 들였다는 의미이다.
  }
}
```
catch 블록에 적힌 주석은 의미가 분명하게 전달되지 않는다.

### 같은 이야기를 중복하는 주석
주석이 코드의 내용을 그대로 중복한다. 자칫하면 코드보다 주석을 읽는 시간이 더 오래 걸리게 된다.

```java
// this.closed가 true일 때 반환되는 유틸리티 메서드다.
// 타임아웃에 도달하면 예외를 던진다.
public synchronized void waitForClose(final long timeoutMillis) throws Exception { 
  if (!closed) {
    wait(timeoutMillis);
    if (!closed) {
      throw new Exception("MockResponseSender colud not be closed")
    }
  }
}
```

### 함수나 변수로 표현할 수 있다면 주석을 달지 말라
다음 코드를 살펴보자.

```java
// 전역 목록 <smoudle>에 속하는 모듈이 우리가 속한 하위 시스템에 의존하는가?
if (smodule.getDependSubsystems().contains(subSysMod.getSubSystem()))
```

이 코드에서 주석을 없애고 다시 표현하면 다음과 같다.

```java
ArrayList moduleDependes = smoudle.getDependSubsystems();
String ourSubSystem = subSysMod.getSubSystem();
if (moduleDependes.contains(ourSubSystem));
```
위와 같이 주석이 필요하지 않도록 코드를 개선하는 편이 좋다.
