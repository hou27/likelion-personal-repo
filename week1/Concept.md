# [필수 개념]

## - 자바스크립트란?

자바스크립트란, 웹 브라우저에서 동작하는 스크립트 언어이다.

## - js 타입 (Primitive Type(number, string, boolean, ...) / Object / Array)

자바스크립트의 타입은 크게 3가지로 나뉜다.

1. [Primitive Type](https://developer.mozilla.org/ko/docs/Glossary/Primitive)

> 객체가 아니며 메소드를 가지지 않는 타입이다.  
> 불변성을 가진다.

- number
- string
- bigint
- boolean
- null
- undefined
- symbol

2. Object

> Object란 여러 값을 하나의 변수에 담을 수 있는 타입이다.

```js
const obj = {
  name: "홍길동",
  age: 20,
};
```

3. Array

> js의 Array는 사실 Object이다.  
> Array는 Object의 한 종류로, 숫자를 키로 사용하는 Object이다.

```js
const arr = [1, 2, 3];
```

## - js 변수, 상수 선언 방법 (var, let, const)

### 1. var

- 함수 스코프를 가짐.
- 변수 재선언 가능

### 2. let

- 블록 스코프를 가짐.
- 변수 재선언 불가능
- 변수 값 변경 가능

### 3. const

- 블록 스코프를 가짐.
- 변수 재선언 불가능
- 변수 값 변경 불가능(상수 값 선언)

## - 기본 조건 문법 (if, switch)

### 1. if

조건이 참인 경우 블록 내의 코드를 실행

### 2. switch

특정 변수 값에 따라서 다양한 경우 중 하나가 실행  
default는 switch문의 조건과 일치하는 case가 없을 때 실행

## - 기본 반복문 ( for / for..of / for..in / while)

### 1. for

가장 기본적인 반복문으로, 반복 횟수를 알고 있을 때 용이

```js
for (let i = 0; i < 3; i++) {
  console.log(i);
}
```

```text
0
1
2
```

### 2. for..of

배열이나 문자열과 같은 반복 가능한 객체를 순회할 때 사용

```js
const arr = [1, 2, 3, 4, 5];

for (let i of arr) {
  console.log(i);
}
```

```text
1
2
3
4
5
```

### 3. for..in

객체의 프로퍼티를 순회할 때 사용

```js
const obj = { a: 1, b: 2, c: 3 };

for (let i in obj) {
  console.log(i);
}
```

```text
a
b
c
```

만약 객체가 배열이라면 각 객체의 인덱스를 반환한다.

```js
const arr = [1, 2, 3, 4, 5];

for (let i in arr) {
  console.log(i);
}
```

```text
0
1
2
3
4
```

### 4. while

조건이 참인 동안 블록 내의 코드를 계속 실행

```js
let i = 0;

while (i < 3) {
  console.log(i);
  i++;
}
```

```text
0
1
2
```

## - 기본 함수 선언 (function / arrowFunction)

### 1. function

ES5 이전 버전의 함수 선언 방식

ex)

```js
function add(a, b) {
  return a + b;
}
```

function 키워드 다음에 함수 이름을 작성하고, 괄호 안에 매개변수를 작성한 후 중괄호 안에 함수 내용을 작성합니다. 함수 내부에서 return 키워드를 사용하여 값을 반환할 수 있다.

### 2. arrow function

ex)

```js
const add = (a, b) => {
  return a + b;
};
```

function 키워드 대신 화살표(=>)를 사용하며 변수에 할당할 수 있다. 함수 내부에서 return 키워드를 사용하여 값을 반환할 수 있다.

함수를 호출한 객체를 참조하는 function과 달리 항상 상위 스코프의 this를 참조한다.

## - 주석

주석이란, 설명을 달아놓는 것이다.

## - == 비교와 === 비교의 차이점

==는 타입은 비교하지 않고, ===는 타입까지 비교한다.

<hr>
<br>
html, css
( 이 둘은 문법을 배우기 보단 클론코딩을 해보세요!, https://youtu.be/5NQnVoY8zk8 )
  
<br>

# [필수 개념을 다 안다면]

- map, forEach, filter, find, 삼항연산자, 논리연산자
- 객체지향 프로그래밍, 함수형 프로그래밍
- 비동기 처리
- 일급 객체

- 서버 기초(REST, HTTP)
- 웹 기초(DOM, DOM API)

# [JS를 극한으로 배우고 싶다면]

- 클로저, 호이스팅, 프로토타입, 이벤트버블링(캡처링), this 바인딩
- 스코프, 스코프 체이닝, 렉시컬 스코프
- 얕은 복사, 깊은 복사
- (선언형, 관점지향) 프로그래밍
- [1,2,3] == [1,2,3] // false인 이유
- {name: 'lion'} == {name: 'lion'} // false인 이유
