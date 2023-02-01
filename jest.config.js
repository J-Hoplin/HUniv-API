const path = require('path');

module.exports = {
    setupFiles: [`${path.join(__dirname, '/test/setup.js')}`],
};

/**
 * Jest setupFiles : https://jestjs.io/docs/configuration#setupfiles-array
 *
 * jest가 테스트 실행 이전에 실행할 스크립트들을 배열에 담는다. 될수있으면 절대경로로 처리하는것이 좋다.
 *
 *
 */
