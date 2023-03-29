const path = require('path');

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development', // 실서비스는 production로 설정
  devtool: 'eval', // 빠르게
  resolve: { // resolve 옵션은 뒤에 확장자를 생략해도 되는 값을 넣어 설정해줄 수 있다. 이 키워드를 넣을 시 웹팩이 자동으로 파일형식을 검사하여 찾아준다.
    extensions: ['.js', '.jsx'] // .js와 .jsx 파일은 확장자를 입력하지 않아도 웹팩에서 자동으로 찾아준다.
  },

  entry: { // 중요!
    app: ['./client'], // resolve에서 .js와 .jsx를 설정 하였으므로 .jsx는 생략해도 무관하다.
  }, // 입력

  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    }],
  },

  output: { // 중요!
    path: path.join(__dirname, 'dist'), // __dirname은 현재 폴더 'lecture'을 가리킴. 즉, lecture 안에 있는 dist를 가리킨다.
    filename: 'app.js'
  } // 출력
};

// entry는 쪼개어진 모듈 파일, output은 쪼개어진 파일을 합쳐 최종적으로 출력할 파일을 가리킨다.