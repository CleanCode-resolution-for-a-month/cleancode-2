- [14장. 점진적인 개선](#14장-점진적인-개선)
- [15장. JUnit 들여다보기](#15장-junit-들여다보기)
  - [15-1) 접두어 `f` 제거](#15-1-접두어-f-제거)
  - [15-2) 캡슐화되지 않은 조건문](#15-2-캡슐화되지-않은-조건문)
  - [15-3) compact 함수의 expected, actual 변수명](#15-3-compact-함수의-expected-actual-변수명)
  - [15-4) if 내부는 긍정문으로](#15-4-if-내부는-긍정문으로)
  - [15-5) 불명확한 `compact` 메서드명 수정](#15-5-불명확한-compact-메서드명-수정)
- [16장. SerialDate 리팩터링](#16장-serialdate-리팩터링)
  - [16-1) 테스트 케이스와 코드 커버리지](#16-1-테스트-케이스와-코드-커버리지)
  - [16-2) 어색한 클래스명](#16-2-어색한-클래스명)
  - [16-3) MonthConstants를 enum으로 변경](#16-3-monthconstants를-enum으로-변경)
- [17장. 냄새와 휴리스틱](#17장-냄새와-휴리스틱)
  - [17-1) 주석](#17-1-주석)
  - [17-2) 환경](#17-2-환경)
  - [17-3) 함수](#17-3-함수)
  - [17-4) 일반](#17-4-일반)

# 14장. 점진적인 개선
- arguments 구문을 분석하는 용도의 `Args` 클래스를 점진적으로 개선하는 방법을 제시한다.
- Java 코드라 전부를 이해하지는 못했지만 리팩터링 된 `Args` 클래스는 위에서 아래로 읽기 편했다.
- 점진적으로 개선해가는 과정을 글로 읽을 수 있어서 좋았다. *(이걸 글로 표현하다니 정말 대단한 것 같다)*
- 1차 초안부터 완벽하게 짜려고 하지 말고, 대충 짠 다음에 코드를 고쳐 나가자. 이 과정에서 TDD가 필요하다.
- 코드는 언제나 깔끔하고 단순하게 정리하자!

<br>

# 15장. JUnit 들여다보기
> **JUnit**은 자바 프로그래밍 언어용 **유닛 테스트 프레임워크**이다.

15장에서는 JUnit으로 작성한 코드를 리팩터링하는 과정을 다룬다.
## 15-1) 접두어 `f` 제거
변수 이름에는 범위를 명시할 필요가 없다.

<table>
  <tr>
    <th>Before</th>
    <th>After</th>
  </tr>
<tr>
  <td>

  ```java
  public class ComparisonCompactor {
    private int fContextLength;
    private String fExpected;
    private String fActual;
    private int fPrefix;
    private int fSuffix;
  }
  ```
  </td>
  <td>

  ```java
  public class ComparisonCompactor {
    private int contextLength;
    private String expected;
    private String actual;
    private int prefix;
    private int suffix;
  }
  ```
  </td>
</tr>

</table>

<br>

## 15-2) 캡슐화되지 않은 조건문
의도를 명확히 표현하려면 조건문을 캡슐화해야 한다. 조건문을 메서드로 뽑아내 적절한 이름을 붙이자.

<table>
<tr>
  <th>Before</th>
  <th>After</th>
</tr>
<tr>
<td>

```java
public String compact(String message) {
  if (expected == null || actual == null || areStringsEqual())
    return Assert.format(message, expected, actual);

  findCommonPrefix();
  findCommonSuffix();
  String expected = compactString(this.expected);
  String actual = compactString(this.actual);
  return Assert.format(message, expected, actual);
}
```

</td>
<td>

```java
public String compact(String message) {
  if (shouldNotCompact())
    return Assert.format(message, expected, actual);

  findCommonPrefix();
  findCommonSuffix();
  String expected = compactString(this.expected);
  String actual = compactString(this.actual);
  return Assert.format(message, expected, actual);
}

private boolean shouldNotCompact() {
  return expected == null || actual == null || areStringsEqual();
}
```

</td>
</tr>
</table>


<br>

## 15-3) compact 함수의 expected, actual 변수명
접두어를 삭제하면서 `compact` 함수에 `expected`와 `this.expected`가 존재하게 되었다. 서로 다른 의미는 다른 이름을 붙여준다.

<table>
<tr>
  <th>Before</th>
  <th>After</th>
</tr>
<tr>
<td>

```java
public String compact(String message) {
  ...
  String expected = compactString(this.expected);
  String actual = compactString(this.actual);
  ...
}

```
</td>
<td>

```java
public String compact(String message) {
  ...
  String compactExpected = compactString(expected);
  String compactActual = compactString(actual);
  ...
}
```
</td>
</tr>
</table>

<br>

## 15-4) if 내부는 긍정문으로
부정문은 긍정문보다 이해하기 어렵다. If 조건문은 긍정문으로 반전시킨다.

<table>
<tr>
  <th>Before</th>
  <th>After</th>
</tr>
<tr>
<td>

```java
public String compact(String message) {
  if (shouldNotCompact())
    return Assert.format(message, expected, actual);

  findCommonPrefix();
  findCommonSuffix();
  String compactExpected = compactString(expected);
  String compactActual = compactString(actual);
  return Assert.format(message, expected, actual);
}

private boolean shouldNotCompact() {
  return expected == null || actual == null || areStringsEqual();
}
```
</td>
<td>

```java
public String compact(String message) {
  if (canBeCompacted()) {
    findCommonPrefix();
    findCommonSuffix();
    String compactExpected = compactString(expected);
    String compactActual = compactString(actual);
    return Assert.format(message, expected, actual);
  } else {
    return Assert.format(message, expected, actual);
  }
}

private boolean canBeCompacted() {
  return expected != null && actual != null && !areStringsEqual();
}
```
</td>
</tr>
</table>

<br>

## 15-5) 불명확한 `compact` 메서드명 수정
위의 코드에서 `compact` 함수는 `canBeCompacted` 가 false이면 압축하지 않는다. 함수에 compact라는 이름을 붙이면 오류 점검이라는 부가 단계가 숨겨진다. 게다가 함수는 단순히 압축된 문자열이 아니라 형식이 갖춰진 문자열을 반환한다.

`compactExpected`와 `compactActual`을 멤버 벼수로 승격했다는 사실에 주의한다.

<table>
<tr>
  <th>Before</th>
  <th>After</th>
</tr>
<tr>
<td>

```java
public String compact(String message) {
  if (canBeCompacted()) {
    findCommonPrefix();
    findCommonSuffix();
    String compactExpected = compactString(expected);
    String compactActual = compactString(actual);
    return Assert.format(message, compactExpected, compactActual);
  } else {
    return Assert.format(message, expected, actual);
  }
}

private boolean canBeCompacted() {
  return expected != null && actual != null && !areStringsEqual();
}
```
</td>
<td>

```java
...
  private String compactExpected;
  private String compactActual;
...

public String formatCompactedComparison(String message) {
  if (canBeCompacted()) {
    compactExpectedAndActual();
    return Assert.format(message, compactExpected, compactActual);
  } else {
    return Assert.format(message, expected, actual);
  }
}

private boolean canBeCompacted() {
  return expected != null && actual != null && !areStringsEqual();
}

private void compactExpectedAndActual() {
  findCommonPrefix();
  findCommonSuffix();
  compactExpected = compactString(expected);
  compactActual = compactString(actual);
}
```
</td>
</tr>
</table>

<br>

# 16장. SerialDate 리팩터링
16장에서는 데비이브 길버트<sup>David Gilbert</sup>가 구현한 SerialDate를 리팩터링 하는 과정과 테스트 케이스에 대한 내용을 다룬다.

## 16-1) 테스트 케이스와 코드 커버리지
`SerialDateTests`라는 클래스는 단위 테스트 케이스 몇 개를 포함하며, 돌려보면 실패하는 테스트 케이스는 없다.
하지만 테스트 케이스가 모든 경우를 점검하지 않는다. 저자는 코드 커버리지 분석 도구인 클로버<sup>Clover</sup>를 이용해 단위 테스트가 실행하는 코드와 실행하지 않는 코드를 조사했다.
**`SerialDate`에서 실행 가능한 문장 185개 중 단위 테스트가 실행하는 문장은 91개에 불과했다. 즉, 대략 50% 정도였다.** 실패한 테스트 케이스들은 주석으로 처리되어 있었다. 주석 처리된 테스트 케이스는 저자가 생각하기에 `SerialDate`가 마땅히 통과해야한다고 여겨지는 것들이었다.
 
<br>

## 16-2) 어색한 클래스명
### SerialDate라는 이름은 서술적이지 않다
클래스 이름이 `SerialDate`인 이뉴는 일련번호<sup>serial number</sup>를 사용해 클래스를 구현했기 때문이다.
1899년 12월 30일을 기준으로 경과한 날짜수를 사용한다. 일련번호라는 용어보다는 *relative offset*이나 *ordinal*이 더 적합하다.

### 추상화 수준이 올바르지 못하다
`SerialDate` 라는 이름은 구현을 암시하는데 실상은 추상 클래스다. 구현을 암시할 필요가 없으며, 구현을 숨기는 것이 좋다.
저자 의견으로는 `Date`나 `Day`가 더 좋은 이름이라고 한다. 이 둘은 너무 많이 쓰이는 이름이라 `DayDate`는 용어로 결정했다.

<br>

## 16-3) MonthConstants를 enum으로 변경
`MonthConstants` 는 달을 정의하는 static final 상수 모음에 불과하다. 이는 enum으로 정의해야 마땅하다.
<table>
  <tr>
    <th>Before</th>
    <th>After</th>
  </tr>
<tr>
  <td>

  ```java
  public interface MonthConstants {
    public static final int JANUARY = 1;

    public static final int FEBRYARY = 2;

    public static final int MATCH = 3;
    
    ...
  }
  ```
  </td>
<td>

```java
public abstract class DayDate implements Comparable, Serializable {
  public static enum Month {
    JANUARY(1),
    FEBRYARY(2),
    MATCH(3),
    ...

    Month(int index) {
      this.index = index;
    }
    ...
  }
}
```
</td>
</tr>
</table>

<br>

# 17장. 냄새와 휴리스틱
## 17-1) 주석
|코드 냄새|설명|
|:----:|----|
| **부적절한 정보** | VCS, 이슈 추적 시스템 등에 저장할 정보는 주석으로 적절하지 못하다. 일반적으로 작성자, 최종 수정일 , SPR<sup>Software Problem Report</sup> 번호 등과 같은 메타 정보만 주석으로 넣는다.|
| **쓸모 없는 주석** | 쓸모 없어질 주석은 아예 달지 않는 편이 좋으며, 재빨리 삭제하자. |
| **중복된 주석** | 코드만으로 충분한데 구구절절 설명하는 주석은 중복된 주석이다. |
| **성의 없는 주석** | 주석을 달려면 단어를 신중하게 선택하고, 주절대지 말아라. 간결하고 명료하게 작성해라. |
| **주석 처리된 코드** | 주석으로 처리된 코드를 발견하면 즉각 지워버려라! 누군가 정말로 필요하다면 이전 버전을 가져오면 된다. | 

<br>

## 17-2) 환경
|코드 냄새|설명|
|:----:|----|
| **여러 단계로 빌드해야 한다** | 빌드는 간단하게 한 단계로 끝나야 한다. VCS에서 이것저것 check-out 할 필요가 없어야 한다. 불가해한 명령이나 스크립트를 잇달아 실행해 각 요소를 따로 빌드할 필요가 없어야 한다. |
| **여러 단계로 테스트해야 한다** | 모든 단위 테스트는 한 명령으로 돌려야 한다. IDE에서 버튼 하나로 모든 테스트를 돌린다면 가장 이상적이다. |

<br>

## 17-3) 함수
|코드 냄새|설명|
|:----:|----|
| **너무 많은 인수** | 함수에서 개수는 작을 수록 좋다. 아예 없으면 가장 좋다. |
| **출력 인수** | 함수에서 뭔가의 상태를 변경해야 한다면 출력 인수를 쓰지 말고 함수가 속한 객체의 상태를 변경한다. |
| **플래그 인수** | boolean 인수와 같은 플래그 인수는 함수가 여러 기능을 수행한다는 뜻이다. 혼란을 초래하므로 피한다. |
| **죽은 함수** | 죽은 코드는 과감하게 삭제해라. |

<br>

## 17-4) 일반
|코드 냄새|설명|
|:----:|----|
| **한 소스 파일에 여러 언어를 사용한다** | 이상적으로는 소스 파일 하나에 언어 하나만 사용하는 것이 좋다. |
| **당연한 동작을 구현하지 않는다** | 함수나 클래스는 다른 프로그래머가 당연하게 여길 만한 동작과 기능을 제공해야 한다. |
| **경계를 올바로 처리하지 않는다** | 모든 경계 조건을 찾아내고, 모든 경계 조건을 테스트하는 테스트 케이스를 작성하라. |
| **안전 절차 무시** | 실패하는 테스트 케이스를 일단 제껴두고 나중으로 미루는 태도는 위험하다. |
| **중복** | 이 책에 나오는 가장 중요한 규칙 중 하나이다. DRY<sup>Don't Repeat Yourself</sup> 이라 불린다. ***코드에서 중복을 발견할 때마다 추상화할 기회로 간주하라.*** 중복된 코드를 하위 루틴이나 다른 클래스로 분리하라 |
| **추상화 수준이 올바르지 못하다** | 추상화는 저차원 상세 개념에서 고차원 일반 개념을 분리한다. 세부 구현과 관련한 상수, 변수, 유틸리티 함수는 기초 클래스에 넣으면 안 된다. 기초 클래스는 구현 정보에 무지해야 마땅하다. 고차원 개념과 저차원 개념을 섞어서는 안 된다. |
| **기초 클래스가 파생 클래스에 의존한다** | 개념을 기초 클래스와 파생 클래스로 나누는 이유는 고차원 기초 클래스 개념을 저차원 파생 클래스 개념으로부터 분리해 독립성을 보장하기 위함이다. 독립성을 보장하면 변경이 시스템에 미치는 영향이 작아지므로 유지보수가 수월하다. |
| **과도한 정보** | 잘 정의된 인터페이스는 많은 함수를 제공하지 않아서 결합도<sup>coupling</sup>가 낮다. 자료, 유틸리티 함수, 상수와 임시 변수를 숨겨라. 메서드와 인스턴스 변수가 넘쳐나는 클래스를 피하라. protected 변수나 함수를 마구 생성하지 말아라. 인터페이스를 매우 작게, 깐깐하게 만들어라. |
| **죽은 코드** | 실행되지 않는 코드는 제거하라. |
| **수직 분리** | 변수와 함수는 사용되는 위치에 가깝게 정의한다. 지역 변수는 처음으로 사용하기 직전에 선언하며 수직으로 가까운 곳에 위치해야 한다. 비공개 함수는 처음 호출한 직후에 정의한다. |
| **일관성 부족** | 표기법은 신중하게 선택하며, 일단 선택한 표기법은 신충하게 따른다. |
| **잡동사니** | 사용하지 않는 함수나 변수, 정보를 제공하지 못하는 주석, 비어있는 생성자는 없애라. |
| **인위적 결합** | 서로 무관한 개념은 인위적으로 결합하지 않는다. 예를 들어 일반적인 enum은 특정 클래스에 속할 이유가 없다. |
| **기능 욕심** | 클래스 메서드는 자기 클래스의 변수와 함수에 관심을 가져야지, 다른 클래스의 변수와 함수에 관심을 가져서는 안 된다. |
| **선택자 인수** | 함수 호출 끝에 달리는 false 인수 같은 선택자 인수를 피하라. 목적을 기억하기도 어렵고, 각 선택자 인수가 여러 함수를 하나로 조합한다. 선택자 인수 대신 함수를 여러 개로 쪼개라. |
| **모호한 의도** | 코드를 짤 때는 의도를 최대한 분명하게 밝힌다. |

|권장 방향|설명|
|:----:|----|
|**알고리즘을 이해하라**|알고리즘이 올바르다는 사실을 확인하고 이해하려면 기능이 뻔히 보일 정도로 함수를 깔끔하고 명확하게 재구성하는 방법이 최고다.|
|**If/Else 혹은 Switch/Case 문보다 다형성을 사용하라**|선택 유형 하나에는 switch 문을 한 번만 사용한다. 같은 선택을 수행하는 다른 코드에서는 다형성 객체를 생성해 switch 문을 대신한다. |
| **표준 표기법을 따르라** | 업계 표준에 기반한 규현 표준에 따라야 한다. 구현 표준은 인스턴스 변수, 이름을 선언하는 위치, 클래스/메서드/변수 이름을 정하는 방법, 괄호를 넣는 위치 등을 명시해야 한다. 표준을 설명하는 문서는 코드 자체로 충분해야 하며, 별도 문서를 만들 필요는 없어야 한다. |
| **조건을 캡슐화하라**| boolean 논리는 이해하기 어렵다. 조건의 의도를 분명히 밝히는 함수로 표현하라 |
| **부정 조건은 피하라** | 부정 조건은 긍정 조건보다 이해하기 어렵다. 가능하면 긍정 조건으로 표현한다. |
|**함수는 한 가지만 해야 한다**|함수가 여러가지 일을 한다면 *한 가지만 수행하는 좀 더 작은 함수* 여럿으로 나누자. |

