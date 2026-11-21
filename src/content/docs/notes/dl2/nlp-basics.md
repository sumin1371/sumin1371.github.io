---
title: 자연어 처리 기초
sidebar:
  order: 1
---

## 시소러스 (Thesaurus)

**시소러스**: 사람이 직접 정의한 단어 사전(유의어 사전)

- 각 단어의 관계를 사람이 정의한다.
- 대표적인 예: **WordNet** (유명함)

## 말뭉치 (corpus)를 이용한 통계 기반 기법

- **말뭉치(corpus)**: 단어에 대한 지식(사용법)이 담긴 대량의 텍스트
- 단어의 벡터화 → **분산 표현 (distributional representation)**: 단어의 의미를 담은 벡터

### 점별 상호정보량 (PMI)

$$
\text{PMI}(x, y) = \log_2 \frac{P(x, y)}{P(x)P(y)}
$$

값이 높을수록 두 단어의 **관련성**이 높다.

## 특잇값분해 (SVD)에 의한 차원 감소

**특잇값분해의 정의**: 어떤 행렬 변환을 **회전 변환 → 스케일 → 회전 변환**으로 표현한다.

$$
X = U \Sigma V^{T}
$$

- $U$ : $m \times m$ 직교행렬
- $V$ : $n \times n$ 직교행렬
- $\Sigma$ : $m \times n$ 대각행렬

**근사**: $X \approx U' \Sigma' V'^{T}$

- 대각 성분(특잇값)이 작은 것은 버려도 정보 손실이 적다.
- 대각 성분인 singular value 중 **큰 값만 남겨서** 근사한다. (중요도가 작은 원소를 깎아 냄)

---

<details class="scan">
<summary>원본 노트 보기</summary>

![NLP 기초 원본 노트](/assets/notes/dl2/p01-nlp.jpg)

</details>
