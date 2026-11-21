---
title: Ch.2 퍼셉트론
sidebar:
  order: 2
---

## 퍼셉트론이란

입력으로 여러 개의 신호 $x$ 를 받고, 각 신호에 가중치 $w$ 를 곱해 하나의 출력 신호 $y$ 를 낸다.

$$
y = \begin{cases}
0 & (w_1x_1 + \cdots + w_nx_n \le \theta) \\
1 & (w_1x_1 + \cdots + w_nx_n > \theta)
\end{cases}
$$

- $\theta$ : **임계값**
- 임계값을 기준으로 출력이 0 또는 1의 신호로 바뀐다.

## 편향 도입

$\theta$ 를 좌변으로 넘겨 **편향** $b$ 로 바꾸면

$$
y = \begin{cases}
0 & (w_1x_1 + \cdots + w_nx_n + b \le 0) \\
1 & (w_1x_1 + \cdots + w_nx_n + b > 0)
\end{cases}
$$

## 퍼셉트론의 한계

- 단층 퍼셉트론은 **선형 영역**만 표현할 수 있다.
- 그래서 조금만 복잡한 문제도 풀 수 없다. (예: **XOR**)
- 해결책: 층을 쌓은 **다층 퍼셉트론**

---

<details class="scan">
<summary>원본 노트 보기</summary>

![Ch.2 원본 노트](/assets/notes/dl1/p01-ch2-ch3.jpg)

</details>
