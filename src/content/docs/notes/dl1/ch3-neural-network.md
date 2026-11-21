---
title: Ch.3 신경망
sidebar:
  order: 3
---

신경망은 퍼셉트론을 여러 층으로 나열한 형태로, **입력층 – 은닉층 – 출력층** 구조를 가진다.

## 활성화 함수

퍼셉트론의 출력을 결정하는 부분을 함수로 분리할 수 있다.

$$
y = h(w_1x_1 + \cdots + w_nx_n + b), \qquad
h(x) = \begin{cases} 0 & (x \le 0) \\ 1 & (x > 0) \end{cases}
$$

이 $h(x)$ 가 퍼셉트론의 **활성화 함수**(계단 함수)다.
신경망에서는 이 $h(x)$ 를 원하는 다른 함수로 바꿔 쓸 수 있다.

> 그림에서는 노드 안에 $a \to h() \to y$ 처럼 그리기도 하고, 활성화 함수를 생략해서 그리기도 한다.

### 시그모이드 함수 (Sigmoid)

$$
h(x) = \frac{1}{1 + e^{-x}}
$$

0과 1 사이에서 매끄럽게 변하는 S자 곡선이다.

### ReLU (Rectified Linear Unit)

$$
h(x) = \begin{cases} x & (x > 0) \\ 0 & (x \le 0) \end{cases}
$$

### 선형 함수와 비선형 함수

- **선형**: 출력이 입력의 상수배인 함수 (예: $ax + b$)
- **비선형**: 선형이 아닌 함수

**신경망은 반드시 비선형 함수를 활성화 함수로 써야 한다.**
선형 함수로는 층을 여러 개 쌓아도 의미가 없다.

> 예: $h(x) = cx$ 일 때 $y = h(h(h(x))) = c^3x$ 인데,
> $a = c^3$ 으로 두면 $y = ax$ 라는 층 하나로 표현된다.

## 신경망과 행렬 계산

$y = h(w_1x_1 + \cdots + w_nx_n + b)$ 의 가중합 부분은 행렬의 **dot 연산**과 같다.

입력 2개, 출력 3개인 층이라면

$$
\underset{(1,2)}{X} = \begin{bmatrix} x_1 & x_2 \end{bmatrix}, \quad
\underset{(2,3)}{W} = \begin{bmatrix} w_{11} & w_{12} & w_{13} \\ w_{21} & w_{22} & w_{23} \end{bmatrix}
$$

$$
XW = \begin{bmatrix} x_1w_{11} + x_2w_{21} & x_1w_{12} + x_2w_{22} & x_1w_{13} + x_2w_{23} \end{bmatrix}
= \begin{bmatrix} a_1 & a_2 & a_3 \end{bmatrix}
$$

편향 $B = \begin{bmatrix} b_1 & b_2 & b_3 \end{bmatrix}$ 까지 포함하면

$$
\underset{(1,2)}{X}\,\underset{(2,3)}{W} + \underset{(1,3)}{B} = \underset{(1,3)}{Y}
$$

여기서 각 $a_i$ 에 $h(a_i)$ 를 적용한 값이 다음 층으로 가는 출력 $y_i$ 가 된다.

## 출력층의 활성화 함수

### 항등 함수 (Identity function)

입력을 **그대로** 출력한다. (주로 회귀에 사용)

### 소프트맥스 함수 (Softmax function)

$$
y_k = \frac{e^{a_k}}{\sum_{i=1}^{n} e^{a_i}}
$$

- 모든 출력의 합이 **1**이 된다. → 확률처럼 해석할 수 있다.
- 큰 값이 더 두드러지게 강조된다.

> **학습과 추론 단계**
> 일반적으로 추론 단계에서는 softmax를 쓰지 않고, 그냥 출력 중 가장 큰 값을 고른다.
> (softmax는 대소 관계를 바꾸지 않기 때문)

## 배치 처리

**배치(batch)**: 하나로 묶은 입력 데이터

대량의 데이터를 한 번에 계산하면 **효율적**이고 처리 시간이 **단축**된다.

예) MNIST 데이터 100장을 묶어서 넣는 경우의 형상 흐름

$$
\underset{100\times784}{X} \to \underset{784\times50}{W_1} \to \underset{50\times100}{W_2} \to \underset{100\times10}{W_3} \to \underset{100\times10}{Y}
$$

맨 앞의 100이 **batch size**이고, 입력과 출력에서 그대로 유지된다.

---

<details class="scan">
<summary>원본 노트 보기</summary>

![Ch.3 원본 노트 1](/assets/notes/dl1/p01-ch2-ch3.jpg)

![Ch.3 원본 노트 2](/assets/notes/dl1/p02-ch3.jpg)

</details>
