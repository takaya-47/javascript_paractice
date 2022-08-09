'use strict';

{
  const words = [
    'red',
    'blue',
    'yellow'
  ];
  let word = 'red';
  let location = 0;
  let startTime;
  let isPlaying = false;

  const target = document.getElementById('target');

  function setWord() {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    target.textContent = word;
    location = 0;
  }

  document.addEventListener('click', () => {
    // ゲーム開始されていた場合は処理を行わない
    if (isPlaying === true) {
      return;
    }

    isPlaying = true;
    startTime = Date.now();
    setWord();
  })

  document.addEventListener('keydown', (e) => {
    if (e.key !== word[location]) {
      // 打ったキーが間違っている場合は処理終了
      return;
    }

    location++;
    target.textContent = '_'.repeat(location) + word.substring(location);

    // 単語を全て入力し終わった場合、次の単語をセットする
    if (location === word.length) {
      // 全ての単語の入力が終わった場合、結果を表示する
      if (words.length === 0) {
        const elapsedTime = (((Date.now() - startTime) / 1000).toFixed(2));
        const result = document.getElementById('result');
        result.textContent = `Finished! ${elapsedTime} seconds!`;
        return;
      }
      setWord();
    }
  })

}