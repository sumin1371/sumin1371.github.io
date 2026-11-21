---
title: Ch.4 신경망 학습
sidebar:
  order: 4
---

## 손실 함수 (Loss function)

### 평균 제곱 오차 (Mean Squared Error, MSE)

$$
E = \frac{1}{2}\sum_k (y_k - t_k)^2
$$

- $y_k$ : 신경망의 출력
- $t_k$ : 정답

### 교차 엔트로피 오차 (Cross Entropy Error)

$$
E = -\sum_k t_k \log y_k
$$

- $t_k$ : **원-핫 인코딩**된 정답 (예: 정답이 3번째일 때 $[0, 0, 1, \dots, 0]$)
- $t_k$ 는 정답일 때만 1이므로, 결국 **정답일 때의 출력** $y_k$ 만 오차를 결정한다.
- $\log x$ 그래프를 보면, 정답에 해당하는 출력이 **1.0에 가까울수록 오차가 0에 가까워진다.**

> **Cross Entropy Error 최적화 (코드 단계에서)**
> 정답 레이블에 해당하는 $y_k$ 만 log 계산을 하면 된다.
>
> $E = -\log y_k \quad (k = \text{정답})$

### 미니배치에서의 손실 함수

$$
E_{\text{batch}} = -\frac{1}{N}\sum_n \sum_k t_{nk} \log y_{nk}
$$

$N$ 개 데이터의 오차를 모두 더한 뒤 $\frac{1}{N}$ 로 나눠 **평균**을 낸다.

### 손실 함수가 필요한 이유

- 신경망 학습에는 **미분**을 쓴다.
- 정확도(맞힌 개수)를 지표로 쓰면 → 계단 함수처럼 **불연속적**
- 손실 함수는 → **연속적**
- 불연속적인 함수는 미분값이 대부분의 구간에서 0이라, 매개변수를 바꿔도 변화가 없다.

∴ **연속적인 함수를 손실 함수로 사용한다!**

## 수치 미분 (Numerical differentiation)

해석적 미분(수식으로 푸는 미분)과 달리, 아주 작은 차분으로 근삿값을 구하는 방법.

$$
\frac{df(x)}{dx} = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$

$h$ 를 매우 작은 값으로 줄여 근삿값을 구한다.
보통 오차를 줄이기 위해 **중심 차분(중앙 차분)** 을 사용한다.

$$
\lim_{h \to 0} \frac{f(x+h) - f(x-h)}{2h}
$$

## 기울기 (Gradient)

모든 변수의 편미분을 벡터로 묶은 것.

$$
\nabla f = \frac{\partial f}{\partial \mathbf{x}} =
\begin{bmatrix} \dfrac{\partial f}{\partial x_1} \\ \dfrac{\partial f}{\partial x_2} \\ \vdots \\ \dfrac{\partial f}{\partial x_n} \end{bmatrix}
$$

## 경사 하강법 (Gradient Descent Method, GDM)

$$
x_k \leftarrow x_k - \eta \frac{\partial f}{\partial x_k}
$$

- $\eta$ : **학습률**
- $\frac{\partial f}{\partial x_k}$ : 각 변수에 대한 기울기

## 훈련 · 시험 데이터 간 평가

- **에폭(epoch)**: 학습에서 훈련 데이터를 모두 한 번씩 소진했을 때의 단위
- 1 epoch 단위로 학습 / 시험 데이터에서의 정확도를 기록해 비교한다.

> 예) 훈련 데이터 10,000개, batch 100개 → 100 iter = 1 epoch

---

<details class="scan">
<summary>원본 노트 보기</summary>

![Ch.4 원본 노트](/assets/notes/dl1/p03-ch4.jpg)

</details>
