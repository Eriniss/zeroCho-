import numpy as np
import matplotlib.pyplot as plt

# 시도 횟수
num_trials = 20

# 강화 성공 확률
success_prob = 0.03

# 강화를 시도한 횟수 중 성공한 횟수를 저장할 리스트
successes = []

# 시뮬레이션을 통해 num_trials번 강화 시도를 함
for i in range(num_trials):
    # 이항 분포에서 값을 추출하여 성공 여부를 결정
    success = np.random.binomial(n=1, p=success_prob)
    successes.append(success)

# 결과 그래프를 그림
plt.hist(successes, bins=range(3), align='left', rwidth=0.8)
plt.xticks([0, 1], ['실패', '성공'])
plt.title('20번의 강화 시도 중 성공 횟수')
plt.xlabel('강화 성공 여부')
plt.ylabel('시도 횟수')
plt.show()
