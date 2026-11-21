---
title: Ch.5 오차역전파법
sidebar:
  order: 5
---

## 계산 그래프

**계산 그래프**: 노드와 화살표로 식을 표현한 것. 복잡한 계산을 국소적인 계산으로 나눈다.

예) $y = ax^2 + b$ 는 `x × x → × a → + b → y` 의 노드로 나눌 수 있다.

- 왼쪽 → 오른쪽 진행: **순전파**
- 오른쪽 → 왼쪽 진행: **역전파**

노드 $f$ 에서 순전파가 $x \to y$ 일 때, 역전파는 위에서 흘러온 값 $L$ 에 **국소적 미분**을 곱해 전달한다.

$$
L \;\longrightarrow\; L \cdot \frac{dy}{dx}, \qquad \frac{dy}{dx} = f'
$$

- $L$ : 이전 역전파의 흐름
- 노드에서는 $f'$ 만 계산하면 된다.

## 연쇄법칙 (Chain Rule)

**합성 함수의 미분은 각 함수의 미분의 곱으로 표현된다.**

$t = f(x)$, $z = g(t)$ 일 때

$$
\frac{\partial z}{\partial x} = \frac{\partial z}{\partial t} \cdot \frac{\partial t}{\partial x}
$$

역전파로 보면: 출력 쪽에서 $\frac{\partial z}{\partial z} = 1$ 로 시작해
$g$ 노드를 지나며 $\frac{\partial z}{\partial t} = g'$ 이 곱해지고,
$f$ 노드를 지나며 $\frac{\partial t}{\partial x} = f'$ 이 곱해진다.

### 여러 변수에서 영향을 받는 경우

$x$ 가 $y_1, y_2, \dots$ 여러 경로를 통해 $L$ 에 영향을 줄 때는 각 경로의 값을 **모두 더한다.**

$$
\frac{\partial L}{\partial x} = \sum_k \frac{\partial L}{\partial y_k} \cdot \frac{\partial y_k}{\partial x}
$$

## 기본적인 노드의 역전파

### 덧셈 노드: $z = x + y$

$$
\frac{\partial z}{\partial x} = 1, \qquad \frac{\partial z}{\partial y} = 1
$$

→ 위에서 온 $\frac{\partial L}{\partial z}$ 를 **그대로** 양쪽으로 흘려보낸다.

### 곱셈 노드: $z = xy$

$$
\frac{\partial z}{\partial x} = y, \qquad \frac{\partial z}{\partial y} = x
$$

→ $x$ 쪽에는 $\frac{\partial L}{\partial z} \cdot y$, $y$ 쪽에는 $\frac{\partial L}{\partial z} \cdot x$ 를 보낸다. (입력을 **서로 바꿔** 곱한다)

## 활성화 함수 계층

### ReLU의 역전파

$$
y = \begin{cases} x & (x > 0) \\ 0 & (x \le 0) \end{cases}
\qquad
\frac{\partial y}{\partial x} = \begin{cases} 1 & (x > 0) \\ 0 & (x \le 0) \end{cases}
$$

- $x > 0$ : 위에서 온 $\frac{\partial L}{\partial y}$ 를 **그대로** 전달
- $x \le 0$ : **0**을 전달 (신호를 막는다)

### Sigmoid의 역전파

$$
y = \frac{1}{1 + e^{-x}}
$$

$$
\frac{\partial L}{\partial x} = \frac{\partial L}{\partial y}\, y^2 e^{-x} = \frac{\partial L}{\partial y}\, y(1-y)
$$

> 중간 증명은 생략. $y^2e^{-x} = y(1-y)$ 로 표현할 수 있어서, **순전파의 출력 $y$ 만으로** 역전파를 계산할 수 있다.

## Affine 계층의 역전파

$$
\underset{(a,b)}{X} \cdot \underset{(b,c)}{W} + \underset{(1,c)}{B} = \underset{(a,c)}{Y}
$$

$$
\frac{\partial L}{\partial X} = \frac{\partial L}{\partial Y} \cdot W^{T}, \qquad
\frac{\partial L}{\partial W} = X^{T} \cdot \frac{\partial L}{\partial Y}
$$

$$
\frac{\partial L}{\partial B} = \frac{\partial L}{\partial Y} \text{ 의 첫 번째 축(배치 방향)의 합}
$$

- **순전파와 역전파의 행렬 크기가 같다!** ($\frac{\partial L}{\partial X}$ 는 $(a,b)$, $\frac{\partial L}{\partial W}$ 는 $(b,c)$)
- 편향 $B$ 는 배치의 모든 데이터 $y$ 에 더해지므로, 역전파에서는 **모든 $y$ 에 대해 준 영향의 합**이 된다.

## Softmax-with-Loss 계층의 역전파

순전파: $a_1, a_2, a_3 \to$ **Softmax** $\to y_1, y_2, y_3 \to$ (정답 $t_1, t_2, t_3$ 와 함께) **Cross Entropy Error** $\to L$

역전파: $L$ 쪽에서 1로 시작해서, Softmax 입력 쪽에 도착하는 값은

$$
y_1 - t_1, \quad y_2 - t_2, \quad y_3 - t_3
$$

→ **출력과 정답의 차이**가 그대로 앞 계층으로 전달된다.

---

<details class="scan">
<summary>원본 노트 보기</summary>

![Ch.5 원본 노트](/assets/notes/dl1/p04-ch5.jpg)

</details>
