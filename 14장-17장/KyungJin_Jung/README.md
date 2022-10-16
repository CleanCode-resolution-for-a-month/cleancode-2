# 14장. 점진적인 개선
- arguments 구문을 분석하는 용도의 `Args` 클래스를 점진적으로 개선하는 방법을 제시한다.
- Java 코드라 전부를 이해하지는 못했지만 리팩터링 된 `Args` 클래스는 위에서 아래로 읽기 편했다.
- 점진적으로 개선해가는 과정을 글로 읽을 수 있어서 좋았다. *(이걸 글로 표현하다니 정말 대단한 것 같다)*
- 1차 초안부터 완벽하게 짜려고 하지 말고, 대충 짠 다음에 코드를 고쳐 나가자. 이 과정에서 TDD가 필요하다.
- 코드는 언제나 깔끔하고 단순하게 정리하자!

<br>

# 15장. JUnit 들여다보기
> **JUnit**은 자바 프로그래밍 언어용 **유닛 테스트 프레임워크**이다.
## 15-1) JUnit 코드 리팩터링 하기
### 접두어 `f` 제거
변수 이름에는 범위를 명시할 필요가 없다.

<table>
  <tr>
    <th>원본</th>
    <th>리팩터링 후</th>
  </tr>
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

### 캡슐화되지 않은 조건문
의도를 명확히 표현하려면 조건문을 캡슐화해야 한다. 조건문을 메서드로 뽑아내 적절한 이름을 붙이자.

<table>
<tr>
  <th>원본</th>
  <th>리팩터링 후</th>
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

### compact 함수의 expected, actual 변수명
접두어를 삭제하면서 `compact` 함수에 `expected`와 `this.expected`가 존재하게 되었다. 서로 다른 의미는 다른 이름을 붙여준다.

<table>
<tr>
  <th>원본</th>
  <th>리팩터링 후</th>
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

### if 내부는 긍정문으로
부정문은 긍정문보다 이해하기 어렵다. If 조건문은 긍정문으로 반전시킨다.

<table>
<tr>
  <th>원본</th>
  <th>리팩터링 후</th>
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

### 불명확한 `compact` 메서드명 수정
위의 코드에서 `compact` 함수는 `canBeCompacted` 가 false이면 압축하지 않는다. 함수에 compact라는 이름을 붙이면 오류 점검이라는 부가 단계가 숨겨진다. 게다가 함수는 단순히 압축된 문자열이 아니라 형식이 갖춰진 문자열을 반환한다.

`compactExpected`와 `compactActual`을 멤버 벼수로 승격했다는 사실에 주의한다.

<table>
<tr>
  <th>원본</th>
  <th>리팩터링 후</th>
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