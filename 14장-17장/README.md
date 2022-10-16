
# 15장 JUnit 들여다보기

자바에서 Junit는 가장 많이 사용되는 테스트 프레임워크다.

ComparisonCompactor 문자열 비교 코드를 보고 리팩토링을 하자.

```java
public class ComparisonCompactor {

    private static final String ELLIPSIS = "...";
    private static final String DELTA_END = "]";
    private static final String DELTA_START = "[";

        // (1)
    private int fContextLength;
    private String fExpected;
    private String fActual;
    private int fPrefix;
    private int fSuffix;

    public ComparisonCompactor(int contextLength, String expected, String actual) {
        fContextLength = contextLength;
        fExpected = expected;
        fActual = actual;
    }
        
    // (4)
    public String compact(String message) {
                // (2)
        if (fExpected == null || fActual == null || areStringsEqual()) {
            return Assert.format(message, fExpected, fActual);
        }
                // (5)
        findCommonPrefix();
        findCommonSuffix();
                // (3)
        String expected = compactString(fExpected);
        String actual = compactString(fActual);
        return Assert.format(message, expected, actual);
    }

    private String compactString(String source) {
        String result = DELTA_START + source.substring(fPrefix, source.length() - fSuffix + 1) + DELTA_END;
        if (fPrefix > 0) {
            result = computeCommonPrefix() + result;
        }
        if (fSuffix > 0) {
            result = result + computeCommonSuffix();
        }
        return result;
    }

    private void findCommonPrefix() {
        fPrefix = 0;
        int end = Math.min(fExpected.length(), fActual.length());
        for (; fPrefix < end; fPrefix++) {
            if (fExpected.charAt(fPrefix) != fActual.charAt(fPrefix)) {
                break;
            }
        }
    }

    private void findCommonSuffix() {
        int expectedSuffix = fExpected.length() - 1;
        int actualSuffix = fActual.length() - 1;
        for (; actualSuffix >= fPrefix && expectedSuffix >= fPrefix; actualSuffix--, expectedSuffix--) {
            if (fExpected.charAt(expectedSuffix) != fActual.charAt(actualSuffix)) {
                break;
            }
        }
        fSuffix = fExpected.length() - expectedSuffix;
    }

    private String computeCommonPrefix() {
        return (fPrefix > fContextLength ? ELLIPSIS : "") + fExpected.substring(Math.max(0, fPrefix - fContextLength), fPrefix);
    }

    private String computeCommonSuffix() {
        int end = Math.min(fExpected.length() - fSuffix + 1 + fContextLength, fExpected.length());
        return fExpected.substring(fExpected.length() - fSuffix + 1, end) + (fExpected.length() - fSuffix + 1 < fExpected.length() - fContextLength ? ELLIPSIS : "");
    }

    private boolean areStringsEqual() {
        return fExpected.equals(fActual);
    }
}
```

## 1. 멤버 변수 앞에 붙인 접두어를 지우자.

중복되는 정보이므로 필요없다.

## as-is

```java
public class ComparisonCompactor {
  private int fContextLength;
    private String fExpected;
    private String fActual;
  private int fPrefix;
  private int fSuffix;
}
```

## to-be

```java
public class ComparisonCompactor {
  private int contextLength;
    private String expected;
    private String actual;
  private int prefix;
  private int suffix;
}
```

## 2. 의도를 명확히하기 위한 함수 분리

compact 함수 시작부에 캡슐화되지 않은 조건문이 보인다.

의도를 명확히 표현하기 위해 조건문을 캡슐화하자.

또한, 부정문보다 긍정문이 더 이해하기 쉽다.

## as-is

```java
public String compact(String message) {
  if (expected == null || actual == null || areStringsEqual()) 
    return Assert.format(message, expected, actual);
...
}
```

## to-be 1

```java
public String compact(String message) {
  if (shouldNotCompact()) 
    return Assert.format(message, expected, actual);
...
}
```

## to-be 2

```java
public String compact(String message) {
  if (canBeCompacted()) { 
        findCommonPrefix();
        findCommonSuffix();
        ...
    return Assert.format(message, expected, actual);
    } else { 
        ...
    }

}
```

## 3.  함수 내에서 멤버변수와 지역변수의 이름이 같아야 할까?

this 키워드를 사용하는 것보다 다른 이름을 붙이는 것이 좋다.

## as-is

```java
String expected = compactString(expected);
String actual = compactString(actual);
```

## to-be

```java
String compactExpected = compactString(expected);
String compactActual = compactString(actual);
```

## 4.  모호한 함수명 수정

compact(String message) 메서드는 단순히 문자열을 압축하는게 아니라 형식이 갖춰진 문자열을 반환한다.

compact라는 모호한 함수명보다 formatCompactedComparison 가 더 명확하다.

```java
public String formatCompactedComparison(String message) [ ...
}
```

## 5. 실제로 문자열을 압축하는 메서드를 분리하자.

fomratCompactedComparison() 메서드의 if 문 내부에서 문자열을 분리한다는 사실을 명확히 알리자.

## as-is

```java
public String formatCompactedComparison(String message) {
  if (canBeCompacted()) {
        // here
    findCommonPrefix();
    findCommonSuffix();
    String compactExpected = compactString(expected);
    String compactActual = compactString(actual);
    return Assert.fortmat(message, expected, actual);
  } else {
    return Assert.format(message, expected, actual);
  }   
}
```

## to-be

```java
public String formatCompactedComparison(String message) {
  if (canBeCompacted()) {
    compactExpectedAndActual();
    return Assert.fortmat(message, expected, actual);
  } else {
    return Assert.format(message, expected, actual);
  }   
}

private void compactExpectedAndActual() {
  findCommonPrefix();
  findCommonSuffix();
  String expected = compactString(expected);
  String actual = compactString(actual);
}
```

## 6. 변수를 반환하는 일관된 형식 맞추기

## as-is

```java
private void compactExpectedAndActual() {
  findCommonPrefix();
  findCommonSuffix();
  String expected = compactString(expected);
  String actual = compactString(actual);
}
```

## to-be

```java
private void compactExpectedAndActual() {
  prefixIndex = findCommonPrefix();
  suffixIndex = findCommonSuffix();
  String expected = compactString(expected);
  String actual = compactString(actual);
}
```

## 78. 시간적 결합(hidden temporal coupling)

findCommonSuffix는 findCommonPrefix가 prefixIndex 를 계산한다는 사실에 의존한다.

만약 잘못된 순서로 호출하면 제대로 동작되지 않는다.

시간 결합을 외부에 노출하기 위해 인수를 받도록 한다.

## as-is

```java
private int findCommonSuffix() {
  int expectedSuffix = expected.length() - 1;
  int actualSuffix = actual.length() - 1;
  for(; actualSuffix >= prefixIndex && expectedSuffix >= prefixIndex; actualSuffix--, expectedSuffix--) {
    if (expected.charAt(expectedSuffix) != actual.charAt(actualSuffix))
      break;
  }
  return expected.length() - expectedSuffix;
}
```

## to-be

```java
private void compactExpectedAndActual() {
  prefixIndex = findCommonPrefix();
  suffixIndex = findCommonSuffix(prefixIndex);
  String compactExpected = compactString(expected);
  String compactActual = compactString(actual);
}

private int findCommonSuffix(int prefixIndex) {
  int expectedSuffix = expected.length() - 1;
  int actualSuffix = actual.length() - 1;
  for(; actualSuffix >= prefixIndex && expectedSuffix >= prefixIndex; actualSuffix--, expectedSuffix--) {
    if (expected.charAt(expectedSuffix) != actual.charAt(actualSuffix))
      break;
  }
  return expected.length() - expectedSuffix;
}
```

여기서 더 개선할 수 없을까? 

prefixIndex를 넘겨야할 이유가 분명히 드러나지 않는다.

두 함수를 호출하는 순서를 드러내는 함수를 따로 작성하자.

findCommonSuffix 를 findCommonPrefixAndSuffix 로 이름을 변경한다.

findCommonPrefixAndSuffix는 가장 먼저 findCommonPrefix를 호출하자.

```java
private void compactExpectedAndActual() {
  findCommonPrefixAndSuffix();
  String compactExpected = compactString(expected);
  String compactActual = compactString(actual);
}
private void findCommonPrefixAndSuffix() {
  findCommonPrefix();
...
}
```

## suffixIndex는 0으로 시작하지 않는다.

suffixIndex는 실제로 9에서 시작하지 않는데 “인덱스” 라는 말이 어색하다.

또한, 접두어에 1을 더해야하는 `fSuffix + 1` 다음과 같은 코드가 반복되는 것이 지저분하다.

suffixIndex를 suffixLength 로 정정하고 +1을 제거하자.

# 17장 냄새와 휴리스틱

17 장에서는 마틴 파울러의 리팩토링에 살을 덧붙인 피해야할 코드에 대해 설명한다.

함수의 인수 개수는 몇개가 적당할까?

- 인수 개수는 작을수록 좋다.
- 넷 이상은 최대한 피한다.

출력 인수를 피하라

- 출력 인수는 직관을 위배한다.
- 함수를 통해 뭔가의 상태를 변경하려면 함수가 속한 객체의 상태를 변경하라.

boolean을 인수로 두지마라

- 플래그 인수는 혼란을 초래한다.
- 플래그 인수는 여러 기능이 메서드에 혼재되어 있다는 것을 의미한다.

프로그래머가 예상하는 동작을 구현하라

- 예를 들어, 요일 문자열에서 요일을 나타내는 enum으로 바꾸는 함수는 ‘Monday’도 Day.MONDAY enum으로 바꿀 수 있어야 한다.

중복은 Template Method 패턴이나 Strategy 패턴으로 제거한다.

- 코드 중복은 코드 오류의 근원이다.
- 디자인 패턴 대다수는 중복을 제거하기 위한 방법의 다른 방식들일 뿐이다.

기초 클래스가 파생 클래스에 의존하지 않도록 하라.

- Spring Boot는 파생 클래스와 기초 클래스가 모두 합쳐진 FatJar 형태로 구동된다.
- 기초 컴포넌트만 수정하여 배포할 수 있다면 유지보수가 한결 수월하다.

enum을 특정 클래스 내부에 두지마라

- enum이 클래스에 속한다면 enum을 사요하는 코드의 특정 클래스도 참조하게 된다.
- static 함수역시 특정 클래스에 속할 이유가 없다.

- 함수를 재정의할 가능성이 있다면 static 함수로 두지마라
- Math.max(double a, double b) 아 같은 메서드는 특정 인스턴스와 관련이 없다.
- 특정 객체와 관련이 없고 모든 정보를 인수에서 가져올 수 있다면 static으로 사용해도 된다.
- 함수를 재정의할 가능성이 있다면 static 함수로 두지마라

돌아간다고 말하기에는 부족하다

- 프로그래밍은 흔히 탐험이다.
- 알고리즘을 안다고 착각하고 코드를 돌아갈 때 까지 이리저리 찔러보고 굴러보지 마라.
- 함수를 깔끔하고 명확히 재구성하여 알고리즘을 명확히 이해하라

시간적 결합을 숨겨서는 안된다.

- 세 함수가 실행되는 순서가 존재할 경우, 연결 소자를 생성하여 시간적 결합을 노출해야 한다.

```java
public void dive(String reason) {
    sturateGradient();
    reticulateSplines();
    diveForMoog(reason);
}
```

```java
public void dive(String reason) {
    Gradient gradient = saturateGradient();
    Line<Spline> splines = reticulateSplines(gradient);
    diveForMoog(splines, reason);
}
```

함수는 추상화 수준을 한 단계만 내려가야 한다.

- 함수 내 모든 문장의 추상화 수준은 동일해야 한다.
- 함수의 추상화 수준은 그 함수이름이 의미하는 작업보다 한 단계만 낮아야 한다.

```java
public String render() throws Exception {
  StringBuffer html = new StringBuffer("<hr");
  if(size > 0)
    html.append(" size=\"").append(size + 1).append("\"");
  html.append(">");

  return html.toString();
}
```

위 함수에는 추상화 수준이 두 개가 존재한다.

- 첫째는 수평선에 크기 개념이다.
- 둘째는 HR 태그 자체의 문법이다.

수평선의 크기 개념을 hrSize(int height) 함수로 분리한다.
