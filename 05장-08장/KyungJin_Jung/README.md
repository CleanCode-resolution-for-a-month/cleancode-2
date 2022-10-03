- [5장. 형식 맞추기](#5장-형식-맞추기)
  - [5-1) 형식을 맞추는 목적](#5-1-형식을-맞추는-목적)
  - [5-2) 적절한 행 길이를 유지하라](#5-2-적절한-행-길이를-유지하라)
    - [신문 기사처럼 작성하라](#신문-기사처럼-작성하라)
    - [개념은 빈 행으로 분리하라](#개념은-빈-행으로-분리하라)
    - [세로 밀집도](#세로-밀집도)
    - [수직 거리](#수직-거리)
    - [세로 순서](#세로-순서)
  - [5-3) 가로 형식 맞추기](#5-3-가로-형식-맞추기)
    - [가로 공백과 밀집도](#가로-공백과-밀집도)
    - [가로 정렬](#가로-정렬)
    - [들여쓰기](#들여쓰기)
  - [5-4) 팀 규칙](#5-4-팀-규칙)
- [6장. 객체와 자료 구조](#6장-객체와-자료-구조)
  - [6-1) 자료 추상화](#6-1-자료-추상화)
    - [Example 1: Point 클래스](#example-1-point-클래스)
    - [Example 2: Vehicle 클래스](#example-2-vehicle-클래스)
  - [6-2) 자료/객체 비대칭](#6-2-자료객체-비대칭)
  - [6-3) 디미터 법칙](#6-3-디미터-법칙)
- [7장. 오류 처리](#7장-오류-처리)
  - [7-1) 오류 코드보다 예외를 사용하라](#7-1-오류-코드보다-예외를-사용하라)
  - [7-2) Try-Catch-Finally 문부터 작성하라](#7-2-try-catch-finally-문부터-작성하라)
  - [7-3) 예외에 의미를 제공하라](#7-3-예외에-의미를-제공하라)
  - [7-4) 호출자를 고려해 예외 클래스를 정의하라](#7-4-호출자를-고려해-예외-클래스를-정의하라)
  - [7-5) 정상 흐름을 제공하라](#7-5-정상-흐름을-제공하라)
  - [7-6) null을 반환하지 마라](#7-6-null을-반환하지-마라)
  - [7-7) null을 전달하지 마라](#7-7-null을-전달하지-마라)
- [8장. 경계](#8장-경계)
  - [8-1) 외부 코드 사용하기](#8-1-외부-코드-사용하기)
  - [8-2) 경계를 살피고 익히기](#8-2-경계를-살피고-익히기)
  - [8-4) 학습 테스트는 공짜 이상이다](#8-4-학습-테스트는-공짜-이상이다)
  - [8-5) 깨끗한 경계](#8-5-깨끗한-경계)
<br>


# 5장. 형식 맞추기
> **뚜껑을 열었을 때 독자들이 코드가 깔끔하고, 일관적이며, 꼼꼼하다고 감탄하면 좋겠다.** 모듈을 읽으며 두 눈이 휘등그레 놀라면 좋겠다. 전문가가 짰다는 인상을 심어주면 좋겠다.

프로그래머라면 형식을 깔끔하게 맞춰 코드를 짜야 한다. <br>코드 형식을 맞추기 위한 간단한 규칙을 정하고 그 규칙을 착실히 따라야 한다.

## 5-1) 형식을 맞추는 목적
코드 형식은 의사소통의 일환이다.

오늘 구현한 코드의 가독성은 앞으로 바뀔 코드의 품질에 지대한 영향을 미친다. 오랜 시간이 지나도 맨 처음 잡아놓은 구현 스타일과 가독성 수준은 유지보수 용이성과 확장성에 계속 영향을 미친다.

<br>

## 5-2) 적절한 행 길이를 유지하라
소스 코드는 얼마나 길어야 적당할까?

> 500줄을 넘지 않고 대부분 20줄 정도인 파일로도 커다란 시스템을 구축할 수 있다.

반드시 지킬 엄격한 규칙은 아니지만, 일반적으로 큰 파일보다 작은 파일이 이해하기 쉽다.

### 신문 기사처럼 작성하라
**이름은 간단하면서도 설명이 가능하게 짓는다.** 이름만 보고도 올바른 모듈을 살표보고 있느지 아닌지를 판단할 수 있도록 신경써서 짓는다. 소스 파일 첫 부분은 고차원 개념과 알고리즘을 설명한다. 아래로 내려갈수록 의도를 세세하게 묘사한다. 마지막에는 가장 저차원 함수와 세부 내역이 나온다.

### 개념은 빈 행으로 분리하라
패키지 선언부, import 문, 각 함수 사이와 같은 **다른 개념**에는 빈 행을 넣어 분리한다.

### 세로 밀집도
줄 바꿈이 개념을 분리한다면 세로 밀집도는 연관성을 의미한다. **즉, 서로 밀접한 코드 행은 세로로 가까이 놓여야 한다.**

### 수직 거리

- [변수](#변수)
- [인스턴스 변수](#인스턴스-변수)
- [종속 함수](#종속-함수)
- [개념적 유사성](#개념적-유사성)
  
서로 밀접한 개념은 세로로 가까이 둬야 한다. 물론 두 개념이 다른 파일에 속한다면 규칙이 통하지는 않는다. 하지만 타당한 근거가 없다면 서로 밀접한 개념은 한 파일에 속해야 마땅하다. *이게 바로 protected 변수를 피해야 하는 이유 중 하나이다.*

연관성이 깊은 두 개념이 멀리 떨어져 있으면 코드를 읽는 사람이 소스 파일과 클래스를 여기저기 뒤지게 된다.

#### 변수
변수는 사용하는 위치에 최대한 가까이 선언한다.
- 지역 변수는 각 함수의 맨 처음에 선언한다.
- 루프를 제어하는 변수는 흔히 루프 문 내부에 선언한다.

#### 인스턴스 변수
인스턴스 변수는 클래스 맨 처음에 선언한다.

#### 종속 함수
**한 함수가 다른 함수를 호출한다면 두 함수는 세로로 가까이 배치한다. 또한 가능하다면 호출하는 함수를 호출되는 함수보다 먼저 배치한다.**

규칙을 일관적으로 적용한다면 독자는 방금 호출한 함수가 잠시 후에 정의되리라는 사실을 예측한다.

```js
const makeReponse = () => {
  // ...
  const pageName = getPageNameOrDefault();
  loadPage(pageName);
}

const getPageNameOrDefault = () => {
  // ...
}

const loadPage = () => {
  // ...
}
```

#### 개념적 유사성
친화도가 높을 수록 코드를 가까이 배치한다.

친화도가 높다는 것은?
- 한 함수가 다른 함수를 호출 (직접적 종속성 발생)
- 변수와 그 변수를 사용하는 함수
- 비숫한 동작을 수행하는 함수들


### 세로 순서
호출되는 함수를 호출하는 함수보다 나중에 배치한다. 그러면 소스 모듈이 고차원에서 저차원으로 자연스럽게 내려간다.

신문 기사와 마찬가지로 **가장 중요한 개념을 가장 먼저 표현**한다. **가장 중요한 개념을 표현할 때는 세세한 사항을 최대한 배제한다.** 세세한 사항을 가장 마지막에 표현한다.

그러면 독자가 소스 파일에서 첫 함수 몇 개만 읽어도 개념을 파악하기가 쉬워진다.

<br>

## 5-3) 가로 형식 맞추기
한 행은 가로로 얼마나 길어야 적당할까?

> 필자는 120자 정도로 행 길이를 제한한다.

### 가로 공백과 밀집도
할당 연산자 좌우로 공백을 주어 두 가지 요소를 분리한다. 
<br>`b*b - 4*a*c` 와 같이 연산자 우선 순위를 강조하기 위해서 공백을 사용하기도 한다.

### 가로 정렬
특정 구조를 강조하기 위한 가로 정렬은 불필요하다.
```java
// 😱 BAD
public class FitNessExpediter implements ResponseSender {
  private Soket         socket;
  private InputStream   input;
  private OutputStream  output;
}
```
### 들여쓰기
들여쓰기한 파일은 구조가 한 눈에 들어온다. 변수, 생성자 함수, 접근자 함수, 메서드가 금방 보인다.

<br>

## 5-4) 팀 규칙
팀은 한 가지 규칙을 만들고 모든 팀원은 그 규칙을 따라야 한다. 그래야 소프트웨어가 일관적인 스타일을 보인다.

- 어디에 괄호를 넣을지
- 들여쓰기는 몇 자로 할지
- 클래스 변수와 메서드 이름은 어떻게 지을지

등을 결정한 후 IDE 코드 형식기를 설정한다.

<br>

# 6장. 객체와 자료 구조

## 6-1) 자료 추상화

- 자료를 세세하게 공개하기 보다는 **추상적인 개념으로 표현하는 것이 좋다**.
- 인터페이스나 조회/설정 함수만으로는 추상화가 이뤄지지 않는다.
- 개발자는 객체가 포함하는 자료를 표현할 방법을 고민해야 한다.
- **아무 생각 없이 조회/설정 함수를 추가하는 방법이 가장 나쁘다.**

### Example 1: Point 클래스
다음 예시에서 한 클래스는 구현을 외부로 노출하고, 다른 클래스는 구현을 완전히 숨긴다.

<table>
  <tr>
    <th>구체적인 Point 클래스</th>
    <th>추상적인 Point 클래스 (Better 😎)</th>
  </tr>

<tr>
<td>

```java
// 구현을 외부로 노출
public class Point {
  public double x;
  public double y;
}
```
</td>
<td>

```java
// 구현을 완전히 숨긴다.
public interface Point {
  double getX();
  double getY();
  void setCartesian(double x, double y);
  double getR();
  double getTheta();
  void setPolar(double r, double theta);
}
```
</td>
</tr>

<tr>
<td>

- 구현을 노출한다.
- 직교 좌표계를 사용한다는 사실이 분명하다.
</td>
<td>

- 인터페이스는 자료구조를 명백하게 표현한다.
- 클래스 메서드가 접근 정책을 강제한다.
  - 좌표를 읽을 때는 각 값을 개별적으로 읽어야 한다.
  - 좌표를 설정할 때는 두 값을 한꺼번에 설정해야 한다.
</td>
</tr>
</table>

변수 사이에 함수라는 계층을 넣는다고 구현이 저절로 감춰지지는 않는다. **구현을 감추려면 추상화가 필요하다!** 

*변수를 private으로 선언하더라도 각 값마다 get, set 함수를 제공한다면 구현을 외부로 노출하는 셈이다.* 그저 형식적으로 get, set 함수로 변수를 다룬다고 클래스가 되지는 않는다.

> 그보다는 **추상 인터페이스를 제공해 사용자가 구현을 모른 채로 자료의 핵심을 조작할 수 있어야** 진정한 의미의 클래스다.


<br>


### Example 2: Vehicle 클래스

<table>
  <tr>
    <th>구체적인 Vehicle 클래스</th>
    <th>추상적인 Vehicle 클래스 (Better 😎)</th>
  </tr>

<tr>
<td>

```java
public interface Vehicle {
  double getFuelTankCapacityInGallons();
  double getGallonsOfGasoline();
}
```
</td>
<td>

```java
public interface Vehicle {
  double getPercentFuelRemaining();
}
```
</td>
</tr>

<tr>
<td>

- 자동차 연료 상태를 구체적인 숫자 값으로 알려준다.
- 두 함수가 변수값을 읽어 반환할 뿐이라는 사실이 거의 확실하다.

</td>
<td>

- 자동차 연료 상태를 **백분율이라는 추상화된 값**으로 알려준다.
- 정보가 어디서 오는지 전혀 드러나지 않는다.

</td>
</tr>
</table>

<br>

## 6-2) 자료/객체 비대칭

<table>
  <tr>
    <th>절차적인 도형</th>
    <th>다형적인 도형</th>
  </tr>

<tr>
<td>

```java
public class Square {
  public Point topLeft;
  public double side;
}

public class Rectangle {
  public Point topLeft;
  public double height;
  public double width;
}

public class Circle {
  public Point center;
  public double radius;
}

public class Geometry {
  public final double PI = 3.141592;

  public double are(Object shape) throws NoSuchShapeException {
    if (shape instanceof Square) {
      Square square = (Square)shape;
      return square.side * square.side;
    }

    if (shape instanceof Rectangle) {
      Rectangle rectangle = (Rectangle)shape;
      return rectangle.height * rectangle.width;
    }

    if (shape instanceof Circle) {
      Circle circle = (Circle)shape;
      return PI * circle.radius * circle.radius;
    }

    throw new NoSuchShapeException();
  }
}
```
</td>
<td>

```java
public class Square implements Shape {
  private Point topLeft;
  private double side;

  public double area() {
    return side * side;
  }
}

public class Rectangle implements Shape {
  private Point topLeft;
  private double height;
  private double width;

  public double area() {
    return height * width;
  }
}

public class Circle implements Shape {
  private Point center;
  private double radius;
  public final double PI = 3.141592;

  public double area() {
    return PI * radius * radius;
  }
}


```
</td>
</tr>

<tr>
<td>

- 절차 지향적으로 구현된 클래스이며, 객체 지향과는 거리가 멀다.
- 하지만 Geometry 클래스에 둘레의 길이를 구하는 `perimeter()` 함수를 추가한다면, 도형 클래스는 아무 영향도 받지 않는다.
- *반대로 새 도형을 추가하고 싶다면 Geometry 클래스에 속한 함수를 모두 고쳐야 한다.*


</td>
<td>

- 객제 지향적으로 구현된 클래스이다.
- `area()` 는 다형<sup>polymorphic</sup> 메서드이다.
- Geomertry 클래스는 필요 없다. 따라서 새 도형을 추가해도 기존 함수에 영향을 미치지 않는다.
- *반면 새 함수를 추가하고 싶다면 도형 클래스 전부를 고쳐야 한다.*
 
</td>
</tr>
</table>

두 방법은 상호 보완적인 특질이 있으며 이를 정리하면 다음과 같다.

| | <center>절차적인 코드</center> | <center>객체 지향 코드</center> |
|--|:----------|:-------------|
| **장점** | 기존 자료 구조를 변경하지 않으면서 새 함수를 추가하기 쉽다 | 기존 함수를 변경하지 않으면서 새 클래스를 추가하기 쉽다 |
| **단점** | 새로운 자료 구조를 추가하기 어렵다 (모든 함수를 고쳐야 함) | 새로운 함수를 추가하기가 어렵다 (모든 클래스 고쳐야 함)|

## 6-3) 디미터 법칙
[디미터 법칙<sup>Law of Demeter</sup>](https://en.wikipedia.org/wiki/Law_of_Demeter)은 잘 알려진 휴리스틱으로, 모듈은 자신이 조작하는 객체의 속사정을 몰라야 한다는 법칙이다.<br>
**객체는 조회 함수로 내부 구조를 공개하면 안 된다는 의미이다.**

디미터 법칙은 ***클래스 C의 메서드 f는 다음과 같은 객체의 메서드만 호출해야 한다***고 주장한다.
- 클래스 C
- f가 생성한 객체
- f 인수로 넘어온 객체
- C 인스턴스 변수에 저장된 객체

하지만 위 객체에서 혀옹된 메서드가 반환하는 객체의 메서드는 호출하면 안 된다.

<br>

# 7장. 오류 처리
> 오류 처리는 프로그램에 반드시 필요한 요소 중 하나이다. 입력이 이상하거나 디바이스가 실패할지도 모르기 때문이다. <br>**뭔가 잘못된 가능성은 늘 존재하고, 이를 바로 잡을 책임은 우리 프로그래머에게 있다.**

깨끗한 코드와 오류 처리는 확실히 연관성이 있다. 여기저기 흩어진 오류 처리 코드 때문에 실제 코드가 하는 일을 파악하기가 힘들어진다.

## 7-1) 오류 코드보다 예외를 사용하라
얼마 전까지만 해도 예외를 지원하지 않는 프로그래밍 언어가 많았다. 예외를 지원하지 않는 언어에서는 다음과 같은 방법으로 오류를 처리했다.

**오류 코드를 사용하여 오류를 처리**
```java
public class DeviceController {
  public void sendShutDown() {
    DeviceHandle handle = getHandle(DEV1);
    if (handle != DeviceHandle.INVALID) {
      retrieveDeviceRecord(handle);
      if (record.getStatus() != DEVICE_SUSPENDED) {
        pauseDevice(handle);
        clearDeviceWorkQueue(handle);
        closeDevice(handle);
      } else {
        logger.log("Device suspended.: " + DEVICE_SUSPENDED.toString());  
      }
    } else {
      logger.log("Invalid handle for: " + DEV1.toString());
    }
  }
}
```

위와 같은 방법을 사용하면 호출자 코드가 복잡해진다. 함수를 즉시 호출한 즉시 오류를 확인해야 하기 때문이다. 그래서 **오류가 발생하면 예외를 던지는 편이 낫다.** 그러면 호출자 코드가 더 깔끔해진다.

**예외를 사용하여 오류를 처리**
```java
public class DeviceController {
  public void sendShutDown() {
    try {
      tryToShutDown();
    } catch (DeviceShutDownError e) {
      logger.log(e);
    }
  }

  private void tryToShutDown() throws DeviceShutDownError {
    DeviceHandle handle = getHandle(DEV1);
    DeviceRecord record = retrieveDeviceRecord(handle);

    pauseDevice(handle);
    clearDeviceWorkQueue(handle);
    closeDevice(handle);
  }

  private DeviceHandle getHandle(DeviceID id) {
    // ...
    throw new DeviceShutDownError("Invalid handle for: " + id.toString());
    // ...
  }
}
```

<br>

## 7-2) Try-Catch-Finally 문부터 작성하라
- *try-catch-finally* 문에서 try 블록에 들어가는 코드를 실행하면 어느 시점에서든 실행이 중돤된 후 catch 블록으로 넘어갈 수 있다.
- try 블록은 트랙잭션과 비슷하다. try 블록에서 무슨 일이 생기든지 catch 블록은 프로그램 상태를 일관성 있게 유지해야 한다.
- 그러므로 *try-catch-finally* 문으로 시작하는 것이 낫다.
- TDD, 먼저 강제로 예외를 일으키는 테스트 케이스르 작성한 후 테스트를 통과하는 코드를 작성하는 방법을 권장한다. 그러면 자연스럽게 try 블록의 트랜잭션 범위부터 구현하게 되므로, 범위 내에서 트랜잭션 본질을 유지하기가 쉬워진다.


<br>

## 7-3) 예외에 의미를 제공하라
- 예외를 던질 때에는 전후 상황을 충분히 덧붙여서 오류가 발생한 원인과 위치를 찾기 쉽도록 한다.
- 오류 메세지에 정보를 담아 예외와 함께 던진다. 실패한 연산 이름과 실패 유형도 언급한다.
- 애플리케이션이 로깅 기능을 사용한다면 catch 블록에서 오류를 기록하도록 충분한 정보를 넘겨준다.

<br>

## 7-4) 호출자를 고려해 예외 클래스를 정의하라
애플리케이션에서 오류를 정의할 때 프로그래머에게 가장 중요한 관심사는 **오류를 잡아내는 방법**이 되어야 한다.

**오류를 형편없이 분류한 사례**<br>
외부 라이브러리를 호출하는 try-catch-finally 문을 포함한 코드로, 외부 라이브러리가 던질 예외를 모두 잡아낸다.

```java
ACMEPort port = new ACMEPort(12);

try {
  port.open();
} catch (DeviceResponseException e) {
  reportPortError(e);
  logger.log("Device response exception", e);
} catch (ATM1212UnlockedException e) {
  reportPortError(e);
  logger.log("Unlock exception", e);
} catch (GMXError e) {
  reportPortError(e);
  logger.log("Unlock exception", e);
} finally {
  // ...
}
```
위의 경우는 예외에 대응하는 방식이 예외 유형과 무관하게 거의 동일하다. <br>호출하는 라리브러리 API를 감싸면서 예외 유형 하나를 반환하면 된다.

```java
LocalPort port = new LocalPort(12);

try {
  port.open();
} catch (PortDeviceFailure e) {
  reportPortError(e);
  logger.log(e.getMessage(), e);
} finally {
  // ...
}
```
```java
// LocalPort 클래스는 단순히 ACMEPort 클래스가 던지는 예외를 잡아 변환하는 wrapper 클래스이다.
public class LocalPort {
  private ACMEPort innerPort;

  public LocalPort(int portNumber) {
    innerPort = new ACMEPort(portNumber);
  }

  public void open() {
    try {
      innerPort.open();
    } catch (DeviceResponseException e) {
      throw new PortDeviceFailure(e);
    } catch (ATM1212UnlockedException e) {
      throw new PortDeviceFailure(e);
    } catch (GMXError e) {
      throw new PortDeviceFailure(e);
    }
  }

  // ...
}
```
- LocalPort 클래스처럼 ACMEPort를 감싸는 클래스는 매우 유용하다. **실제로 외부 API를 사용할 때는 감싸기 기법이 최선이다.**
- 외부 라이브러리를 감싸면 외부 라이브러리와 프로그램 사이의 의존성이 크게 줄어든다.
- Wrapper 클래스에서 외부 API를 호출하는 대신 테스트 코드를 넣어주는 방법으로 프로그램을 테스트하기도 쉬워진다.

<br>

## 7-5) 정상 흐름을 제공하라
앞서 소개한 방법들이 대개는 멋진 처리 방식이지만, 때로는 중단이 적합하지 않은 때가 있다.

```java
try {
  MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());  // 식비를 비용으로 청구했다면
  m_total += expenses.getTotal();                                       // 청구한 식비를 총계에 더함
} catch (MealExpenseNotFound e) { // 식비를 비용으로 청구하지 않았다면
  m_total += getMealPerDiem();    // 일일 기본 식비를 총계에 더함
}
```
위의 코드는 예외가 논리를 따라가기 어렵게 만드는 사례이다. 특수 상황을 처리할 필요가 없다면 코드가 더 깔끔해질 것이다.

```java
MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
m_total += expenses.getTotal();
```
```java
public class PerDiemMealExpenses implements MealExpenses {
  public int getTotal() {
    // 기본 값으로 일일 기본 식비를 반환한다.
  }
}
```
이를 **특수 사례 패턴**<sup>Speical Case Pattern</sup>이라고 한다. 클래스를 만들거나 객체를 조작해 특수 사례를 처리하는 방식이다.<br>그러면 클라이언트에서 코드가 예외적인 상황을 처리할 필요가 없어진다. 클래스나 객체가 예외적인 상황을 캡슐화해서 처리하기 때문이다.

<br>

## 7-6) null을 반환하지 마라
- null을 반환하는 코드는 일거리를 늘릴 뿐만 아니라 호출자에게 문제를 떠넘긴다.
- **메서드**에서 null을 반환하고 싶어진다면 예외를 던지거나 특수 사례 객체를 반환한다.
- **사용하려는 외부 API**가 null을 반환하다면 wrapper 메서드를 구현해 예외를 던지거나, 특수 사례 객체를 반환하는 방식을 고려한다.

<br>

## 7-7) null을 전달하지 마라
- 메서드에서 null을 반환하는 방식도 나쁘지만 메서드로 null을 전달하는 방식은 더 나쁘다.
- **정상적인 인수로 null을 기대하는 API가 아니라면 메서드로 null을 전달하는 코드는 최대한 피한다.**

<br>

# 8장. 경계
소프트웨어를 직접 개발하는 경우는 드물고, 대부분의 경우 외부 코드를 우리 코드에 통합한다. 소프트웨어의 경계를 깔끔하게 처리하는 기법을 살펴보자.

## 8-1) 외부 코드 사용하기
**Map 같은 경계 인터페이스를 이용할 때는 이를 이용하는 클래스나 클래스 계열 밖으로 노출되지 않도록 주의한다.**

```java
public class Sensors {
  private Map sensors = new HashMap();

  public Sensor getById(String id) {
    return (Sensor) sensors.get(id);
  }
}
```
- 경계 인터페이스인 Map을 Sensors 안으로 숨긴다. 따라서 Map 인터페이스가 변하지 않더라도 나머지 프로그램에는 영향을 미치지 않는다.
- Sensors 클래스는 프로그램에 필요한 인터페이스만 제공한다.
- Sensors 클래스는 설계 규칙과 비즈니스 규칙을 따르도록 강제할 수 있다.
- Map 클래스를 사용할 때마다 위와 같이 캡슐화하라는 소리가 아니다. Map 혹은 Map과 유사한 경계 인터페이스를 여기저기 넘기지 말라는 것이다.

<br>

## 8-2) 경계를 살피고 익히기
- 외부 코드를 통합할 때 우리쪽 코드를 작성해서 외부 코드를 호출하는 대신, 먼저 간단한 테스트 케이스를 작성해 외부 코드를 익혀보자.
- 짐 뉴커크<sup>Jim Newkirk</sup>는 이를 **학습 테스트**라 부른다.
- 학습 테스트는 프로그램에서 사용하려는 방식대로 외부 API를 호출한다. 통제된 환경에서 API를 제대로 이해하는지 확인하려는 셈이다.

<br>

## 8-4) 학습 테스트는 공짜 이상이다
- 학습 테스트는 이해도를 높여주는 정확한 실험이다.
- 학습 테스트는 패키지가 예상대로 도는지 검증한다.
- 이런 경계 테스트가 있다면 패키지의 새 버전으로 이전하기 쉬워진다.

<br>

## 8-5) 깨끗한 경계
- 경게에 위치하는 코드는 깔끔하게 분리한다.
- 외부 패키지를 호출하는 코드를 가능한 줄여 경계를 관리하자.
- Map에서 봤듯이 새로운 클래스를 경계로 감싸거나 Adapter 패턴을 사용해 우리가 원하는 인터페이스를 패키지가 제공하는 인터페이스로 변환하자.
- 어느 방법이든 코드 가독성이 높아지며, 경계 인터페이스를 사용하는 일관성도 높아진다. 또한 외부 패키지가 변했을 때 변경할 코드도 줄어든다.


