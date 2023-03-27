// 강화 성공 확률 (0~100)
const x = 4;

// 시도 횟수
const numTrials = 10;

// 강화를 시도한 횟수 중 성공한 횟수를 저장할 배열
const successes = [];

// 시뮬레이션을 통해 numTrials번 강화 시도를 함
for (let i = 0; i < numTrials; i++) {
  // x%의 확률로 강화 성공 여부를 결정
  const success = Math.random() < x / 100;
  successes.push(success);
  console.log(`강화 ${i+1}회 결과: ${success ? '성공' : '실패'}`);
}

// 시도 결과를 요약하여 출력
const numSuccesses = successes.filter(success => success).length;
console.log(`시도 횟수: ${numTrials}, 성공 횟수: ${numSuccesses}, 성공 확률: ${numSuccesses / numTrials}`);
