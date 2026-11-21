---
title: LSTM
sidebar:
  order: 4
---

## 기울기 소실 / 폭발의 원인

### 1. tanh 함수

$y = \tanh(x)$ 의 미분은 $x = 0$ 에서 최댓값 1을 갖고, 멀어질수록 0으로 작아지는 종 모양이다.

→ 기울기 $\le 1$ 이므로 tanh를 **통과할수록 기울기가 점점 작아진다.**

### 2. MatMul의 반복

- RNN에서 $h$ 의 역전파 흐름: **MatMul, tanh를 반복**해서 지난다.
- MatMul만 보면 (간략화), 매번 같은 $W_h$ 를 곱한다.
- $W_h$ 의 값이 고정 → 시간 크기에 따라 기울기가 **지수적으로 증가 or 감소**하는 경향

## 기울기 클리핑 (Gradient Clipping)

**기울기 폭발**의 대책

**아이디어**: threshold라는 값을 문턱값으로 둔다.

$$
\text{if} \;\; \lVert \hat{g} \rVert \ge \text{threshold}: \qquad
\hat{g} \leftarrow \frac{\text{threshold}}{\lVert \hat{g} \rVert}\, \hat{g}
$$

- $\hat{g}$ : 신경망의 **모든 매개변수의 기울기**를 하나로 모은 것

## LSTM

**기울기 소실**의 대책 (새로운 계층 구조)

**아이디어**: 시계열 방향으로만 흐르는 **기억 셀 $c$** 를 도입한다.
기억 셀은 $+$, $\times$ 처럼 기울기에 영향이 적은 노드만 지나간다! → **기울기 소실 방지**

### LSTM의 구조

- 위쪽 경로: $c_{t-1} \to (\times f) \to (+\, g \odot i) \to c_t$
- 아래쪽: $h_{t-1}$ 과 $x_t$ 가 네 개의 블록($\sigma, \tanh, \sigma, \sigma$)으로 들어가 각각 $f, g, i, o$ 를 만든다.
- 출력: $c_t$ 에 tanh를 적용하고 $o$ 를 곱해 $h_t$ 를 만든다.
- $\sigma$ : sigmoid

LSTM에서는 $c \xrightarrow{\tanh} h$ 로 출력을 만든다. ($h$ 는 RNN과 같은 역할)

> $c$ 는 쭉 흐르면서 외부 출력 $h$ 를 만든다. 즉 $c$ 가 LSTM의 **기억**이다.

## LSTM의 각 게이트

각 게이트는 **데이터의 흐름의 양**을 조절한다.

### output 게이트

기억 셀의 출력 $h_t$ 에 정보가 얼마나 중요한가

$$
o = \sigma\left( x_t W_x^{(o)} + h_{t-1} W_h^{(o)} + b^{(o)} \right)
$$

$$
h_t = o \odot \tanh(c_t)
$$

- $o$ : 흘려보낼 정도, $\tanh(c_t)$ : 기억에 대한 정보
- → 기억 셀에서 출력에 필요한 정보를 추출

### forget 게이트

이전 기억 셀에서 어떤 정보를 잊을지

$$
f = \sigma\left( x_t W_x^{(f)} + h_{t-1} W_h^{(f)} + b^{(f)} \right)
$$

이후 $f \odot c_{t-1}$ 를 수행한다.

### 새로운 정보 추가 ($g$)

$$
g = \tanh\left( x_t W_x^{(g)} + h_{t-1} W_h^{(g)} + b^{(g)} \right)
$$

- 이전 정보($h$)와 이번 입력($x_t$)으로 정보를 계산하는 연산 (RNN의 흐름과 같다)
- → 기억 셀에 더해지며 **새로운 입력을 기억에 추가**한다.

### input 게이트

$$
i = \sigma\left( x_t W_x^{(i)} + h_{t-1} W_h^{(i)} + b^{(i)} \right)
$$

$g$ 에 의해 더해질 **새 정보의 중요도**를 결정한다.

---

<details class="scan">
<summary>원본 노트 보기</summary>

![LSTM 원본 노트](/assets/notes/dl2/p04-lstm.jpg)

</details>
