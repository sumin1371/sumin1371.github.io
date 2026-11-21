---
title: RNN
sidebar:
  order: 3
---

## 아이디어

하나의 시계열 입력을 **순환 구조**로 처리한다.
이전 입력의 정보가 다음 입력으로 이어져 전달된다.

- RNN 계층은 입력 $x_t$ 를 받아 $h_t$ 를 출력하고, 그 $h_t$ 가 다시 자기 자신에게 들어간다. (이전 정보가 이어짐)
- 순환을 시간 방향으로 **펼치면** RNN 계층이 옆으로 나란히 연결된 구조가 된다.

## BPTT (Backpropagation Through Time)

시간 방향으로 **펼친** 신경망의 오차역전파법.
펼친 구조에서 그대로 역전파를 진행한다.

### Truncated BPTT

시계열 역전파를 **적당한 길이로 끊는다.**

- 너무 긴 역전파 → **기울기 불안정** (소실 / 폭발)
- 역전파는 끊어지지만, **순전파는 연결**된 상태를 유지한다.

## RNN 계산 그래프

$$
h_{next} = \tanh\left( h_{prev} W_h + x W_x + b \right)
$$

- $h_{prev}$ 와 $W_h$ 를 **MatMul**
- $x$ 와 $W_x$ 를 **MatMul**
- 둘을 더하고 편향 $b$ 를 더한 뒤 **tanh** → $h_{next}$ (다음 시각과 위층으로 동시에 전달)

## RNN의 손실 함수 계산

모든 시계열 데이터의 출력에 각각 **Softmax with Loss** 를 적용하고 → 그 **평균**을 손실로 쓴다.

## 퍼플렉서티 (Perplexity)

언어 모델의 **성능 지표**

- 확률의 **역수**, **낮을수록 좋음**
- 다음에 올 수 있는 후보의 수, 즉 **분기 수**를 의미한다.

$$
L = -\frac{1}{N}\sum_n \sum_k t_{nk} \log y_{nk}
$$

$$
\text{perplexity} = e^{L}
$$

---

<details class="scan">
<summary>원본 노트 보기</summary>

![RNN 원본 노트](/assets/notes/dl2/p03-rnn.jpg)

</details>
