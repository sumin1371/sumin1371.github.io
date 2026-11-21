---
title: word2vec
sidebar:
  order: 2
---

**통계 기반** → **추론 기반 (신경망)**

## CBOW 모델

**추론 기반으로 단어의 인코딩을 얻는다!**

- 입력, 출력: **원-핫 벡터** (크기가 $n$ 인 벡터)
- $W_{in}$ : $n \times m$ matrix
- $W_{out}$ : $m \times n$ matrix
- 맥락 단어들이 각각 $W_{in}$ 을 거쳐 은닉층에서 합쳐지고, $W_{out}$ 을 거쳐 출력이 된다.

> 은닉층 크기 $m$ 이 어휘 수 $n$ 보다 작아야($m < n$) 분산 표현이 의미를 **함축(압축)** 한다.

### $W_{in}$, $W_{out}$ 에서의 분산 표현

- $W_{in}$ : **각 행**이 각 단어의 인코딩을 담는다.
- $W_{out}$ : **각 열**이 각 단어의 인코딩을 담당한다.

> 일반적으로 **$W_{in}$ 만** 인코딩으로 이용한다!

### CBOW 모델의 확률

- **동시 확률**: $P(A, B)$
- **사후 확률**: $P(A \mid B)$ , $B$ 이후 $A$ 의 확률

말뭉치 $w_1, w_2, \dots, w_{t-1}, w_t, w_{t+1}, \dots, w_{T-1}, w_T$ 에서
맥락 $w_{t-1}, w_{t+1}$ 이 주어졌을 때 타깃 $w_t$ 가 나올 확률

$$
P(w_t \mid w_{t-1}, w_{t+1})
$$

### 손실 함수

음의 로그 가능도:

$$
L = -\log P(w_t \mid w_{t-1}, w_{t+1})
$$

> 교차 엔트로피 $L = -\sum_k t_k \log y_k$ 에서 $k = t$ 일 때만 $t_k = 1$ 이므로 위 식과 같아진다.

말뭉치 전체로 확장하면

$$
L = -\frac{1}{T}\sum_{t=1}^{T} \log P(w_t \mid w_{t-1}, w_{t+1})
$$

## CBOW vs skip-gram

예) `? say ? and I say hello.`

- **CBOW**: 맥락(양옆)으로 가운데 단어를 맞힌다.
- **skip-gram**: 맥락과 타깃이 **역전된** 형태. 가운데 단어로 양옆 맥락을 맞힌다.

$$
P(w_{t-1}, w_{t+1} \mid w_t) = P(w_{t-1} \mid w_t)\, P(w_{t+1} \mid w_t)
$$

$$
\begin{aligned}
L &= -\log P(w_{t-1}, w_{t+1} \mid w_t) \\
  &= -\left( \log P(w_{t-1} \mid w_t) + \log P(w_{t+1} \mid w_t) \right)
\end{aligned}
$$

## 이진 분류

- 기존의 **다중 분류**: 각 클래스의 확률을 전부 계산
- **이진 분류**: Yes or No 로 대답
  - 출력에 **sigmoid**를 적용해 확률로 변환

구조: 맥락 단어(예: 0, 2)의 **Embedding** → 더하고 0.5를 곱해 평균 → $h$
→ 타깃 단어(예: 1)의 Embedding과 **dot** → **Sigmoid with Loss** (정답 레이블 1) → Loss

> **Embedding 계층**: 효율화를 위해 원-핫 벡터와 행렬 곱을 하는 대신, 입력이 가리키는 **인덱스의 행만 추출**한다.

## 네거티브 샘플링

- 이진 분류에서 **정답이 아닌 확률도** 학습한다.
  - 이진 분류는 오답이 나올 확률도 예측해야 한다. (예: 항상 출력이 1인 경우를 생각해 보기)
- 모든 오답에 대해 학습하지 않고 → **몇 개의 예시(샘플)에 대해서만** 학습한다.

---

<details class="scan">
<summary>원본 노트 보기</summary>

![word2vec 원본 노트](/assets/notes/dl2/p02-word2vec.jpg)

</details>
