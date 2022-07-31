'use strict';

{
  const button = document.getElementById('button');
  button.addEventListener('click', () => {
    // おみくじの結果を配列化しておく
    const results = ['大吉', '中吉', '凶', '末吉'];
    // 0以上かつ〇〇未満のランダムな数値を生成する
    const random_number = Math.random() * results.length;
    // 小数点以下を切り捨てし、整数のみが生成されるようにする
    const int_number = Math.floor(random_number);
    // 要素のテキストを変更
    button.textContent = results[int_number];

    // 以下の書き方もあるが若干冗長なのでコメントアウト
    // switch (number) {
    //   case 0:
    //     button.textContent = '大吉';
    //     break;
    //   case 1:
    //     button.textContent = '中吉';
    //     break;
    //   case 2:
    //     button.textContent = '凶';
    // }
  });
}