# 1. 깨끗한 코드

### 나쁜 코드

개발자는 바쁘다는 핑계로 코드를 마구 짰던 경험들이 있고, 나중에 손보겠다고 생각하지만 그 나중은 결코 오지 않는다는 사실.

나쁜 코드는 개발 속도를 크게 떨어트리며 팀 생산성을 떨어트린다. 이에 재설계를 시작하지만 재설계는 시간과 돈이 많이 드는 작업임

언제나 코드를 최대한 깨끗하게 유지하는 습관이 오히려 코드 짜는 기한을 맞출 수 있게하고, 비용을 절감할 수 있음

### 깨끗한 코드란?

> 보기에 즐거운 코드
>
> 세세한 사항까지 꼼꼼하게 처리하는 코드
>
> 한 가지를 잘하는 코드

> 가독성이 좋은 코드
>
> 반드시 필요한 내용만 담는 코드

> 다른 사람이 고치기 쉬운 코드 - 단위 테스트 케이스 / 인수 테스트 케이스
>
> 인간이 읽기 좋은 코드

> 주의 깊게 작성한 코드

> 중복을 피하기
>
> 한 가지 기능만 수행하기
>
> 제대로 표현하기
>
> 작게 추상화하기

> 짐작하는 기능을 그대로 수행하는 코드

**저자의 생각 - 읽기 쉬운 코드가 중요함**

### 보이스카우트 규칙

> 캠프장은 처음 왔을 때보다 더 깨끗하게 해놓고 떠나라.

한꺼번에 많은 시간과 노력을 투자해 코드를 정리할 필요는 없음. 변수 이름 하나를 개선하고, 조금 긴 함수 하나를 분할하고, 약간의 중복을 제거하고, 복잡한 if문 하나를 정리하면 충분

# 2. 의미 있는 이름

**이름을 잘 짓는 규칙**

### 의도를 분명히 밝혀라

의도가 드러나는 이름을 사용하면 코드 이해와 변경이 쉬워짐

### 그릇된 정보를 피하라

널리 쓰이는 의미가 있는 단어를 다른 의미로 사용하면 안됨 (ex. hp, aix, sco, List 등)

서로 흡사한 이름을 사용하지 않도록 주의

소문자 L, 대문자 O 등 헷갈릴 수 있는 문자 주의

### 의미 있게 구분하라

연속된 숫자를 덧붙이거나 불용어(noise word)를 추가하는 방식을 피하라 (ex. ProductInfo - ProductData)

### 발음하기 쉬운 이름을 사용하라

### 검색하기 쉬운 이름을 사용하라

문자 하나를 사용하는 이름과 상수 주의

이름 길이는 범위 크기에 비례해야 함 (여러 곳에서 사용할수록 검색하기 쉬운 명확한 이름이어야 함)

### 인코딩을 피하라

이름에 타입을 넣지 말기

접두어를 무분별하게 사용하지 않기

### 자신의 기억력을 자랑하지 마라

명료함이 최고. 자신의 기억력을 믿고 문자 하나만 사용하는 변수를 만든다거나 하지 말기

### 클래스 이름 - 명사 / 명사구

### 메서드 이름 - 동사 / 동사구

접근자, 변경자, 조건자는 값 앞에 get, set, is 를 붙임

### 기발한 이름은 피하라

### 한 개념에 한 단어를 사용하라

일관성 있는 어휘를 사용 (똑같은 메서드인데 클래스마다 fetch, retrieve, get 등으로 제각각 부르면 혼란스러움)

### 말장난을 하지 마라

### 해법 영역에서 가져온 이름을 사용하라

기술 개념에는 기술 이름이 가장 적합한 선택

### 문제 영역에서 가져온 이름을 사용하라

적절한 프로그래머 용어가 없다면 문제 영역에서 이름을 가져옴

### 의미 있는 맥락을 추가하라

### 불필요한 맥락을 없애라

# 3. 함수

### 작게 만들어라!

함수를 만드는 첫째 규칙은 '작게!'

if / else / while 문 등에 들어가는 블록은 한 줄이어야 함. 대게 거기서 함수를 호출. 블록 안에서 호출하는 함수 이름이 적절하면 코드 이해하기도 쉬움.

중첩 구조가 생길만큼 함수가 커져서는 안 된다는 뜻

### 한 가지만 해라!

> 함수는 한 가지를 해야 한다. 그 한가지를 잘해야 한다. 그 한 가지만을 해야 한다.

### 함수 당 추상화 수준은 하나로!

함수가 확실히 한 가지 작업만 하려면 함수 내 모든 문장의 추상화 수준이 동일해야 함

핵심은 짧으면서도 한 가지만 하는 함수

##### 위에서 아래로 코드 읽기: 내려가기 규칙

한 함수 다음에는 추상화 수준이 한 단계 낮은 함수가 옴. 즉, 위에서 아래로 프로그램을 읽으면 함수 추상화 수준이 한 번에 한 단계씩 낮아지는 것

> 추상화 수준 : 해당 코드를 읽으면서 파악할 수 있는 정보의 수준. 더 자세한 정보를 알 수 있으면 추상화 수준이 낮아진다.

### Switch 문

switch 문은 작게 만들기 어렵고, 한 가지 작업만 하는 switch 문도 만들기 어려움.

각 switch 문을 저차원 클래스에 숨기고 절대로 반복하지 않는 방법이 있음 (다형성 이용)

### 서술적인 이름을 사용하라!

함수가 하는 일을 좀 더 잘 표현. (testableHtml -> SetupTeardownIncluder.render)

이름을 붙일 때는 일관성이 있어야 함. 모듈 내에서 함수 이름은 같은 문구, 명사, 동사 사용 (includeSetupAndTeardownPages, includeSetupPages, includeSuiteSetupPage, includeSetupPage)

### 함수 인수

이상적인 인수 개수는 0개(무항), 다음은 1개(단항), 다음은 2개(이항), 3개(삼항)은 가능한 피하는 편이 좋고 4개(다항) 이상은 정말 특별한 경우 아니면 사용 안하는게 좋음

인수는 개념을 이해하기 어렵게 만듦

##### 많이 쓰는 단항 형식

함수에 인수 1개를 넘기는 경우 중 하나는 인수에 질문을 던지는 경우 `boolean fileExists("MyFile")` - 스트링 객체를 처리하고 boolean 값을 반환

다른 하나는 인수를 뭔가로 변환해 결과를 반환하는 경우 `InputStream fileOpen("MyFile")` - String 형의 파일 이름을 InputStream 으로 변환해서 반환

다소 드물게 사용하는 형식은 이벤트 함수. 이벤트 함수는 입력 인수만 있고, 함수 호출을 이벤트로 해석해 입력 인수로 시스템 상태를 바꿈

플래그 인수 : 피해라!

##### 이항 함수

단항 함수보다 이해하기 어렵고 위험함. 단항 함수로 바꿀 수 있으면 바꿔라

##### 삼항 함수

만들 때 신중히 고려해라.

가변 인수를 취하는 함수는 단항, 이항, 삼항 함수로 취급할 수 있음

### 부수 효과를 일으키지 마라!

부수 효과는 시간적인 결합을 초래하고, 시간적인 결합은 혼란을 일으킴

##### 출력 인수

일반적으로 출력 인수는 피해야 함. 출력 인수로 사용하라고 설계한 변수가 this

### 명령과 조회를 분리하라!

함수는 객체 상태를 변경하거나 객체 정보를 반환하거나 둘 중 하나. 둘 다 하면 혼란

### 오류 코드보다 예외를 사용하라!

오류 코드 대신 예외를 사용하면 오류 처리 코드가 원래 코드에서 분리되서 코드가 깔끔해짐

##### try / catch 블록 뽑아내기

try/catch 블록은 정상 동작과 오류 처리 동작을 뒤섞으므로 별도 함수로 뽑아내는 편이 좋음

##### 오류 처리도 한 가지 작업이다.

오류를 처리하는 함수는 오류만 처리해야 마땅함. 함수에 키워드 try가 있다면 함수는 try 문으로 시작해 catch/finally 문으로 끝나야 함

### 반복하지 마라!

중복은 소프트웨어에서 만악의 근원임

### 함수를 어떻게 짜죠?

처음부터 완벽하게 짜려고 하지말고, 계속 수정하고 보완해나가면서

# 4. 주석

저자는 주석을 줄이고 코드를 더 명확히 해야한다고 말하고 있음

### 주석은 나쁜 코드를 보완하지 못한다

표현력이 풍부하고 깔끔하며 주석이 거의 없는 코드가, 복잡하고 어수선하며 주석이 많이 달린 코드보다 훨씬 좋음

### 코드로 의도를 표현하라

### 좋은 주석

- 법적인 주석 - 저작권 정보 / 소유권 정보 등

- 정보를 제공하는 주석

- 의도를 설명하는 주석 - 저자의 의도가 드러나는 주석

- 의미를 명료하게 밝히는 주석

- 결과를 경고하는 주석

- TODO 주석 - 앞으로 할 일

- 중요성을 강조하는 주석

### 나쁜 주석 - 대다수의 주석이 해당

- 주절거리는 주석 - 특별한 이유 없이 의무감으로 마지못해 다는 주석
- 같은 이야기를 중복하는 주석
- 오해할 여지가 있는 주석
- 의무적으로 다는 주석
- 이력을 기록하는 주석
- 있으나 마나 한 주석
- 함수나 변수로 표현할 수 있다면 주석을 달지 마라
- 닫는 괄호에 다는 주석
- 공로를 돌리거나 저자를 표시하는 주석
- 주석으로 처리한 코드
- HTML 주석
- 전역 정보
- 너무 많은 정보
- 모호한 관계 - 주석과 주석이 설명하는 관계가 명백하지 않은 주석
