---
title: Ch.6 학습 관련 기술
sidebar:
  order: 6
---

## 매개변수 갱신법

### 확률적 경사 하강법 (SGD)

$$
W \leftarrow W - \eta \frac{\partial L}{\partial W}
$$

- $\eta$ : 학습률, $\frac{\partial L}{\partial W}$ : 기울기
- 기울기를 토대로 일정한 거리씩 이동한다.
- 가장 기본적인 방법

**단점**: **비등방성 함수**에서 비효율적이다.

> **비등방성 함수**: 방향에 따라 성질(기울기)이 달라지는 함수.
> 그릇 모양이 한쪽으로 길쭉하면, 최솟값을 기준으로 보더라도 위치에 따라 기울기 방향이 최솟값을 가리키지 않아 지그재그로 움직이게 된다.

### 모멘텀 (Momentum)

운동량에서 시작된 개념.

$$
v \leftarrow \alpha v - \eta \frac{\partial L}{\partial W}, \qquad
W \leftarrow W + v
$$

- $v$ : 속도 (물리에서 속도에 해당하는 개념)
- $\alpha$ : 이전 속도를 얼마나 반영할지

$v$ 를 통해서
- 같은 방향의 기울기가 연속으로 나타나면 → **가속**
- 방향이 계속 바뀌는 기울기가 나타나면 → **감속**

### AdaGrad

**아이디어**: 학습률을 점차 **감소**시키며 진행한다. 이때 각각의 매개변수에 **따로** 적용한다.

$$
h \leftarrow h + \frac{\partial L}{\partial W} \odot \frac{\partial L}{\partial W}
$$

$$
W \leftarrow W - \eta \frac{1}{\sqrt{h}} \frac{\partial L}{\partial W}
$$

- $\odot$ : 행렬의 원소별 곱셈
- 기울기의 제곱을 누적 → 기울기가 크게 변한 매개변수일수록 학습률이 **크게 감소**, 작게 변했으면 **작게 감소**

> **RMSProp**
> AdaGrad는 계속 누적하므로 갱신량이 0에 가까워지는 문제가 있다.
> RMSProp은 **최근 n개의 기울기만** 반영(먼 과거는 점점 잊음)해서 이 문제를 해결한다.

### Adam

**Momentum + AdaGrad** 를 합친 직관적인 방식. 자세한 내용은 논문 참고.

## 가중치 초깃값

가중치에 따라 **활성화값의 분포**가 치우치면 표현력이 제한된다.

### Xavier 초깃값

- sigmoid, tanh처럼 중앙 부근이 선형에 가까운 활성화 함수에 사용
- 앞 계층 노드가 $n$ 개일 때, 표준편차가 $\frac{1}{\sqrt{n}}$ 인 분포 사용

### He 초깃값

- **ReLU** 사용 시
- 앞 계층 노드가 $n$ 개일 때, 표준편차가 $\sqrt{\frac{2}{n}}$ 인 분포 사용

## 배치 정규화 (Batch Normalization)

각 층의 활성화값 분포를 **강제로** 적당히 퍼지도록 조정한다.

$$
\mu_B \leftarrow \frac{1}{m}\sum_{i=1}^{m} x_i
$$

$$
\sigma_B^2 \leftarrow \frac{1}{m}\sum_{i=1}^{m} (x_i - \mu_B)^2
$$

$$
\hat{x}_i \leftarrow \frac{x_i - \mu_B}{\sqrt{\sigma_B^2 + \varepsilon}}
$$

- $\mu_B$ : 미니배치 입력의 평균, $\sigma_B^2$ : 미니배치 입력의 분산, $\sigma_B$ : 표준편차
- 세 번째 식에서
  - $x_i - \mu_B$ → 평균을 0에 맞추는 작업
  - $\sqrt{\sigma_B^2 + \varepsilon}$ 로 나눔 → 분산을 1에 맞추는 작업 ($\varepsilon$ 은 0으로 나누는 것을 막는 작은 값)

정규화한 뒤 **확대**와 **이동**을 한다.

$$
y_i \leftarrow \gamma \hat{x}_i + \beta
$$

- 시작값은 $\gamma = 1$, $\beta = 0$
- $\gamma, \beta$ 는 **학습 파라미터**(학습으로 조정됨)

> 역전파는 시간 되면 정리하기...

## 오버피팅

**오버피팅**: 훈련 데이터에만 지나치게 적응한 상태

주로 이럴 때 일어난다.
- 매개변수가 많고 표현력이 큰 모델
- 훈련 데이터가 적음

### 가중치 감소 (Weight decay)

큰 가중치에 **페널티**를 준다.

**L2 법칙**: 손실 함수 $L$ 에 $\frac{1}{2}\lambda W^2$ (L2 regularization)을 더한다.

- 가중치가 클수록 손실이 커진다 → 큰 가중치에 페널티
- 역전파에서는 미분값인 $\lambda W$ 가 더해진다.

> **L1 법칙과 L2 법칙**
> - L1: 가중치 **절댓값**의 합
> - L2: 가중치 **제곱**의 합

### 드롭아웃 (Dropout)

뉴런을 **임의로 삭제**하면서 학습한다.

- **훈련**: 삭제할 뉴런을 무작위로 골라 신호를 끊는다.
- **시험**: 모든 뉴런을 사용한다. (각 출력에 훈련 때 삭제 안 한 비율을 곱한다)

> 실제 구현에서는 시험 때 비율을 곱하지 않는 경우가 많다. 이유는?
> → **Inverted Dropout**: 학습할 때 미리 제거 비율을 반영해 두기 때문.

## 하이퍼파라미터 찾는 방법 (탐색법)

**검증 데이터**를 이용한다. 하이퍼파라미터가 시험 데이터에 오버피팅되지 않게 하기 위해서다.

- 훈련 데이터 → 가중치 최적화
- 검증 데이터 → 하이퍼파라미터 최적화
- 시험 데이터 → 마지막에 범용 성능 확인

---

<details class="scan">
<summary>원본 노트 보기</summary>

![Ch.6 원본 노트 1](/assets/notes/dl1/p05-ch6.jpg)

![Ch.6 원본 노트 2](/assets/notes/dl1/p06-ch6.jpg)

</details>
