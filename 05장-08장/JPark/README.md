# 5장 형식 맞추기

## 형식은 왜 맞춰야 할까?

오늘 구현한 코드의 가독성이 앞으로 수정할 코드의 품질에 미치는 영향이 크다.

구현 스타일과 가독성 수준은 코드가 바뀌어도 유지된다.

### 소스코드는 신문기사와 같아야 한다

- 신문 기사를 위에서 아래로 읽어 내려가면서 상세한 내용을 알 수 있다.
- 소스코드에 깊게 들어갈 수록 세세하게 묘사해야한다.
- 신문은 길이가 짧다. 소스코드도 역시 읽기 쉽게 길이가 짧아야 한다.

### 줄바꿈은 개념적 분리의 단서다

행을 맞추는 것은 정말 중요하다

행은 새로운 개념을 시작한다는 시각적 단서다.

### 뒤죽박죽인 코드에 시간을 소모하지 마라

미로 같은 코드를 읽다가 파일을 이리저리 뒤져보거나, 함수나 변수를 정의한 부분을 찾기 위해 IDE의 도움을 많이 받은 경험이 있다.

서로 밀접한 개념들은 가까이 둬라

예를 들어, 변수는 사용하는 위치에 최대한 가까이 선언한다.

### 함수의 호출 순서를 고려하여 배치하라

호출 하는 함수가 호출되는 함수보다 먼저 배치되도록 하라.

읽는이가 코드를 자연스럽게 위 아래로 읽으며 이해할 수 있다.

## 하나의 행의 가로 길이는 얼마나 길어야 할까?

나는 코드를 작성하면서 세로 길이는 되도록 짧게 유지한다는 사실을 잘 알고 있었다.

하지만 행의 가로 길이는 어느 정도로 길어야할지 가늠하기 어려웠다.

하지만 글을 읽는 것과 소스 코드를 읽는 것이 같다는 사실을 알면 어렵지 않다.

소스코드의 가로길이는 스크롤을 사용할 정도로 길지 않아야 한다.

### 코드의 가로줄 정렬하기

다른사람의 코드를 보면 가끔씩 위 아래를 아래 처럼 맞추는 경우를 본적이 있을 것이다.

```java
public class FitNesseExpediter implements ResponseSender 
{
	private   Socket          socket;
	private   InputStream     input;
	private   FitNesseContext context;
}
```

위와 같은 방법이 나쁘진 않지만, 모든 메소드의 로컬 변수 역시 이러한 형식을 전부 맞춰야 한다면 어색해보인다.

## 자신의 선호보다 팀에서 정하는 규칙을 따라라

만약 회사에 속하고 팀의 구성원이 코드를 작성한다면, 자신의 선호에 맞춰 코드 형식을 맞추는 것은 옳지 않다.

팀에서 정한 규칙에 맞춰 코드 형식을 지켜야 한다.

스타일은 일관적이여야 여러 사람이 작성한 코드를 이어서 보더라도 이해하기 쉽다

---

# 6장 객체와 자료 구조

## 자료 추상화

객체지향의 4대 원칙 중 하나인 추상화가 있다.

[컴퓨터 과학](https://ko.wikipedia.org/wiki/%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99)에서 **추상화**(abstraction)는 복잡한 자료, 모듈, 시스템 등으로부터 핵심적인 개념 또는 기능을 간추려 내는 것을 말한다.

여기서 구체적인 사실이란 무엇일까?

우리가 어떠한 로직을 작성하든지 이 모든 코드들은 구체적이다.

심지어 두 정수를 더하는 한 줄짜리 계산기 클래스를 만들더라도 마찬가지다.

자료를 추상화해야하는 이유는 무엇일까?

사용자가 코드를 올바르지 않은 방향으로 사용할 수 있기 때문이다.

다음과 같이 필드를 외부에 노출할 경우 사용자가 마음대로 조작할 수 있다.

예를 들어, x를 y 대신 사용할 수도 있다.

```java
public class Point {
	public double x;
	public double y;
}
```

위 코드를 개선하여, 변수를 외부로부터 감추자.

그리고, x를 정확하게 사용할 수 있도록 인터페이스를 제공하자.

```java
public class Point {
	private double x;
	private double y;

  public boolean isEqualXCordinate(double x) {
    return x == x;
  }
}
```

자료를 추상화하는 이유는 사용자가 구현을 모른채 자료를 사용하도록 해야한다.

단순히 표면에 드러난 인터페이스를 통해 사용하도록 강제해야 한다.

## 객체의 속사정을 몰라야 한다(디미터 법칙)

객체는 자료를 숨겨야 하며, 함수를 드러내야 한다.

디미터 법칙은 “*클래스 C의 메서드 f는 다음과 같은 객체의 메서드만 호출해야 한다.”*

- 클래스 C
- f가 생성한 객체
- f 인수로 넘어온 객체
- C 인스턴스 변수에 저장된 객체

하지만, 허용된 메서드인 메서드 f가 반환하는 객체의 메서드는 호출하면 안된다.

실제 사례에 대입해보자.

```java
Options opts = context.getOptions();
File dir = opts.getDir();
String outputDir = dir.getAbsoluteDir();
```

context 객체의 허용된 메서드를 getOptions()라고 했을 때, Options 객체가 반환된다.

Options 객체를 통해 다시 getDir() 메서드를 호출하고 File 객체의 getAbsoluteDir() 메서드까지 호출한다.

옳은 방법일까?

위 코드가 디미터 법칙을 위반하는지 알려면, 자료구조인지에 따라 달렸다.

File은 단순히 자료구조이므로 디미터 법칙을 위반하지 않는다.

위 코드를 개선하기 위한 더 좋은 방법이 있을까?

자료구조는 함수를 통하지 않고 곧바로 공개 변수로 포함하는 것이다.

```java
String outputDir = context.options.scratchDir.absolutePath;
```

디미터 법칙을 위반하지 않도록 했다.

하지만, 어딘가 이상하다. 자료구조이면서 객체인것 처럼 행동하는 애매한 형태가 되기 쉽다.

그래서 내가 떠올린 방법은 메서드 하나를 통해 바로 원하는 자료구조에 접근하도록 하는 것이다.

```java
String outputDir = context.getAbsolutePathOfDirectory();
```

**위 코드는 디미터 법칙을 위반한다.**

임시 디렉터리를 가져와서 이 객체를 조작한다면 결국 내부 구조를 드러낸다.

전제자체를 뒤집어보자, 임시 디렉터리는 왜 필요한가?

임시 디렉터리가 필요한 일이 임시 파일을 생성하는 일이라면, 그 일을 해당 객체, 즉 컨텍스트(context)에 시키면 된다.

```java
BufferedOutputStream bos = context.createScratchFileStream(classFileName);
```

## DTO 를 비즈니스 객체로 사용하지 마라

흔히 초보 개발자들이 데이터베이스의 정보나 통신 메시지의 자료구조를 전송하기 위해 자료 전달 객체(Data Transfer Object) 를 많이 사용한다.

하지만 결국 get과 set으로만 이뤄진 아무일도 하지 못하는 객체일 뿐이다.

이러한 DTO 객체는 어쩔 수 없이 사용된다.

예를 들어, 데이터베이스를 오갈때나 API 통신을 위해 필요하다.

하지만, 비즈니스 규칙을 담당하는 객체는 따로 생성해야 한다.

DTO 는 자료구조로 취급해야 마땅하다.

비즈니스규칙을 담당하는 객체가 DTO가 되는 순간 내부구조를 모두 드러내게 된다.

---

# 7장 오류처리

오류처리는 프로그램에 있어서 반드시 필요한 요소다.

우리가 만든 코드에 오류가 발생할 가능성은 반드시 발생한다.

따라서, 프로그램의 오류 처리를 제대로 하는 것 또한 좋은 코드의 핵심이다.

## 오류코드 vs 예외

나는 최근 프린터를 사용하다 용지걸림으로 인해 애를 먹은적이 있다.

프린터와 같은 기기에 접근하여 프린트 동작을 수행하기 위한 메서드를 호출해야 한다고 하자.

이 때, 이 프린터는 메서드 호출에 대해 프린터의 용지걸림이나 용지부족처럼 우리가 전혀 예상치 못한 오류가 발생할 수 있다.

프린트 호출을 할 때 오류 발생을 대응하기 위해 오류코드를 만들어 그에 따라 분기처리를 하는 코드를 사용해보자.

```java
public class PrinterController {
	public void print(Document document) {
		DeviceHandle nadle = Printer.print(docment);
		if (handle != DeviceHandle.INVALID) {
			// 정상 동작 처리
		} else {
			// 오류 처리
		}
	}
}
```

하지만, 이는 코드가 복잡해진다.

하나의 메서드에 정상 동작 처리와 오류처리가 혼재하는 코드가 있기 때문이다.

오류가 발생하면 예외를 던지는 편이 낫다.

하나의 개념적 경계 안에서 두 개의 서로 다른 흐름이 발생하면 코드는 읽기 어려워진다.

```java
public class DeviceController {
	public void print(Document document) {
		try { 
   		Printer.print(docment);
		} catch (Exception e) {
			logger.log(e);
		}
	}
}
```

## 확인된(checked) 예외 대신 미확인(unchecked) 예외를 써라

메서드 반환할때 발생할 수 있는 예외를 모두 잡아서 처리하기 위해 열거하는 것이 좋을까?

하지만 지금은 안정적인 소프트웨어를 제작하는 요소로 확인된 예외가 반드시 필요하지 않다는 것을 알게되었다.

자바에는 확인된 예외가 여전히 존재하지만 C#, C++ 은 확인된 예외가 없다.

확인된 오류는 OCP(Open Closed Principle)를 위반한다.

다음의 코드를 보면, method2에서 호출하는 메서드가 새로운 오류를 던진다면 catch 구문은 하나 더 추가해야한다.

```java
public static void main() {
	try {
		method1();
	} catch (MyException1 e1) {
		...
	} catch (MyException2 e2) {
		...
	}
}
public void method1() throws MyException1 {
	method2();
} 
public void method2() throws MyException2 {
	// 새로운 오류를 던지는 메서드가 추가된다면?
} 

```

이처럼 확인된 예외는 캡슐화를 깨버린다.

## 어떤 일이 있어도 프로그램이 멈춰선 안되는 경우

다음 예제는 음식 비용 청구 로직의 총합을 계산한다.

```java
try {
	MealExpenses expenses = expenseReportDAO.getMeals(id);
	total += expenses.getTotal();
} catch (MealExpensesNotFound e) {
	total += getMealPerDiem();
}
```

위 코드에서 문제는 예외가 발생해도 총합을 계산해야 한다는 것이다.

대신, 특수 사례 패턴(SPECIAL CASE PATTERN) 을 사용하라

청구한 식비가 없거나, 오류가 발생했을 때 일일 기본 식비를 반환하도록 변경하면 된다.

이를 위해, `expenseReportDAO` 를 수정해야 한다.

```java
public class PerDiemMealExpenses implements MealExpenses {
	public int getTotal() {
		// 기본값으로 일일 기본 식비를 반환한다.
	}
}
```

`PerDiemMealExpenses` 는 기본 식비를 의미한다.

이 클래스는 `MealExpenses` 인터페이스를 구현하므로 `getMeals(id)` 가 구현해도 무방하다.

다음 코드 처럼 작성할 수 있다.

```java
MealExpenses expenses = expenseReportDAO.getMeals(id);
total += expenses.getTotal();
```

## null을 반환하지 마라

null을 반환하는 습관은 초보자들이 가장 많이 저지르는 실수다.

null을 던졌을 때 문제점은 null이 반환되었을 때 정상적인 반환처럼 보인다는 것이다.

null이 반환 될 수 있다는 사실을 인지하지 않는 다면, 곧바로 NullPointerException의 함정에 빠지게 된다.

null을 피하는 방법은 무엇일까?

다음처럼 컬렉션의 경우, null을 반환하지 않고 빈 컬렉션을 반환하도록 한다

```java
List<User> Users = getUsers();
if (users != null) {
	for (User u: users) {
		totalPay += u.getPay();
	}
}
```

```java
List<User> Users = getUsers();
for (User u: users) {
	totalPay += u.getPay();
}
```

---

# 8장 경계

모든 소프트웨어를 직접 개발하는 비율보다 외부 라이브러리나 오픈소스를 사용하는 경우가 많다.

외부 코드를 우리 코드를 깔끔하게 외부 코드와 통합해야 한다.

## 코드 제공자와 사용자간의 긴장

[java.util.Map](http://java.util.Map) 은 다양한 인터페이스를 갖고 있다.

Map은 다양한 기능을 사용할 수 있어 유용하지만 그만큼 위험도 있다.

Map의 clear 함메서드는 Map을 접근할 수 있는 사용자라면 누구나 Map의 원소를 지울 수 있다는 것을 말한다.

자바5 이후로 제너릭스가 도입되었다. 제너릭스를 사용하면 Map<String, Sensor> 처럼 타입 안정성을 가지며 자료구조를 다룰 수 있다.

하지만, Map<Integer, Sensor> 처럼 Map 인터페이스가 변한다면, 이 자료구조를 사용하는 코드는 모두 변경돼야 할 것이다.

여기에 해결책이 있다.

### 자료구조 객체를 다른 객체로 합성하여 감싸는 편이 좋다.

```java
public class Sensors {
  private Map<String, Sensor> sensors = new HashMap<>();
}
```

이렇게 하면, Map 인터페이스가 변하더라도 이 코드를 참조하는 나머지 코드에는 영향을 미치지 않는다.

Map 인터페이스 자체를 공개 API 수준으로 사용하면 안된다.

## 외부 패키지 익히기를 위한 학습 테스트 추천

대부분의 오픈소스는 API 문서를 제공한다.

하지만, 백문이 불여일견이라는 말처럼 직접 코드를 사용하여 익히는 편이 바람직하다.

외부 코드를 정확히 알고 사용하기 위해 학습 테스트를 추천한다.

학습 테스트는 사용하려는 외부 프로그램의 API 호출하여 제대로 동작하는지 검증하는 코드를 의미한다.

log4j를 예로 들어보자.

log4j는 로깅 기능을 구현하는 라이브러리다.

log4j 패키지를 사용하여 화면에 “hello”를 출력하는 테스트 케이스를 작성해보자.

우리의 목적은 콘솔에 “hello”가 찍히길 원하는 것이다.

학습 테스트를 통해 log4j를 사용하다 보면, ConsoleAppender 에 두 가지 인자를 넘겨야 한다는 것을 배울 수 있다.

```java
class LogTest {
	private Logger logger;

  // log4j 내부적으로 설정된 출력할 스트림을 리셋한다.
	@Before
	void initialize() {
	  Logger logger = Logger.getLogger("MyLogger");
    logger.removeAllAppendes();
    Logger.getRootLogger().removeAllAppenders();
	}

	@Test
	void basicLogger() {
	  BasicConfigurator.configure();
	  logger.info("hello");
	}

  @Test
  void addAppenderWithStream() {
    logger.addAppender(new ConsokeAppender(
      new PatternLayout("%p %t %m%n"),
      ConsoleAppender.SYSTEM_OUT));
		 logger.info("addAppenderWIthStream");
  }
}
```

## 생산성을 높이는 API 사용법

여러 팀이 협업을 통해 하나의 프로그램을 만드는 경우, 아직 존재하지 않는 코드를 사용할 수 있어야 더 빠른 시간에 개발이 가능하다.

‘송신기Transmitter’ 시스템을 개발하는 예제를 들어 설명한다.

우리가 송신기 모듈의 원하는 기능은 무엇인가?

> 지정한 주파수를 이용해 이 스트림에서 들어오는 자료를 아날로그 신호로 전송하라.


우리 팀은 이 API를 당장 사용하여 개발하려고 하지만, 다른 팀에서 아직 준비가 되지 않았다.

다른 팀으로부터 API를 받기전에 인터페이스를 자체적으로 정의하라.

우리가 구현한 인터페이스와 다른 팀으로부터 받은 API의 인터페이스가 다르면 어떻게 할까?

ADAPTER 패턴을 사용하면 API 인터페이스를 캡슐화할 수 있다.

![image](https://user-images.githubusercontent.com/37852769/193433913-f6f9583a-4d78-42e5-9696-1a8ba8d96a88.png)

