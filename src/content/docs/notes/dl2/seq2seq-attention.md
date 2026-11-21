---
title: seq2seq와 어텐션
sidebar:
  order: 5
---

## RNN을 통한 문장 생성

**한 단어씩 샘플링을 반복**해서 문장을 만든다.

## seq2seq

**시계열 데이터 → 시계열 데이터**로 변환한다.

**2개의 RNN**: encoder, decoder

- encoder가 입력 $xs$ 를 읽어 마지막 은닉 상태 $h$ 를 decoder로 넘긴다.
- decoder는 `<eos>` 로 시작해서 $y_1, y_2, y_3, \dots$ 를 차례로 출력하고, 각 출력이 다음 시각의 입력이 된다.
- `<eos>` : 디코더의 **시작과 끝**을 나타내는 구분 기호

정리하면
- **가변 길이 데이터** → 패딩을 통해 길이를 맞춘다.
- 인코더에서는 $h$ 만 디코더로 보내며, 인코더의 출력은 따로 이용하지 않는다.

### 결과 개선을 위한 기법

- **Reverse**: 입력 데이터의 순서를 반전시킨다.
- **Peeky**: 인코더의 출력 $h$ 를 디코더의 첫 LSTM뿐 아니라 **여러 레이어에서** 이용한다.

## 어텐션 (Attention)

**seq2seq의 문제점**: encoder의 출력 $h$ 가 **고정 길이 벡터**다.
→ 입력 문장이 길어져도 크기가 같아서, 많은 정보를 담기 어렵다.

**아이디어**: encoder의 **모든 시계열 출력**을 이용하자 ($hs$)

- $hs$ : 각 입력마다 생기는 $h$ 를 모은 **행렬**
- encoder: $x_1, x_2, x_3$ → Embed → LSTM → $h_1, h_2, h_3$ → 모아서 $hs$
- decoder: `<eos>` 부터 시작하는 각 LSTM 출력 위에서 $hs$ 를 참고하는 계산을 한다. ($hs$ 를 다 가져옴)

### Weight Sum 계층

$hs$ 에서 **선택하는** 계산. 가중합을 구한다.

$$
\underbrace{\begin{bmatrix} \circ & \circ & \circ \\ \circ & \circ & \circ \\ \circ & \circ & \circ \\ \circ & \circ & \circ \end{bmatrix}}_{hs}
\times
\underbrace{\begin{bmatrix} 0.8 \\ 0.1 \\ 0.07 \\ 0.03 \end{bmatrix}}_{a}
\longrightarrow
\begin{bmatrix} \circ & \circ & \circ \end{bmatrix}
$$

- $a$ : 각 단어의 중요도. 확률분포를 따르며 **합이 1**
- 각 행에 가중치를 곱하고 **행 방향으로 더한다** → 가중합 (맥락 벡터)

### Attention Weight 계층

$a$ 를 구하는 계산

- decoder의 현재 출력 $h$ 와 $hs$ 의 각 행의 **유사도**를 구한다.
- → decoder가 **현재 집중하고 있는 부분**을 찾는다.

$$
hs \cdot h \;(\text{dot}) \;\longrightarrow\; s \;\xrightarrow{\text{softmax}}\; a
$$

### Attention 계층

**Attention 계층 = Attention Weight 계층 + Weight Sum 계층**

- 기존: decoder의 LSTM 출력 → Affine
- 변경: LSTM 출력과 $hs$ → **Attention** → Affine

> 기존 decoder에서 attention이 추가된 decoder로 바뀐다.

### 어텐션에 대한 이해적인 해석

- 어텐션은 시계열 전체에서 **집중해야 할 부분을 고른다.**
- 기존 방식은 **마지막 상태만** 참고한다.

---

<details class="scan">
<summary>원본 노트 보기</summary>

![seq2seq와 어텐션 원본 노트](/assets/notes/dl2/p05-seq2seq-attention.jpg)

</details>
