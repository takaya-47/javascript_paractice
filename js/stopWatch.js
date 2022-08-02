'use strict';

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop  = document.getElementById('stop');
  const reset = document.getElementById('reset');

  // 最初にスタートボタンを押した時の時間
  let startTime;
  // ストップボタンを押した時点での経過時間
  let elapsedTime = 0;

  // スタートボタン押下時のイベント
  start.addEventListener('click', () => {
    // スタートボタン押下時の時刻を取得
    startTime = Date.now();
    // 時刻のカウントアップ関数を呼び出し
    countUp();
  });

  let timeOutId;
  function countUp() {
    // この関数が呼び出された時の時間からスタートボタンをクリックした時の時間を引く。さらに経過時間があれば足す。
    const time = new Date(Date.now() - startTime + elapsedTime);
    // 分、秒、ミリ秒を取得し、２桁（３桁）かつ満たない場合は０で埋める
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    const milliSeconds = String(time.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${minutes}:${seconds}:${milliSeconds}`;

    // 10ミリ秒経過ごとに自身を呼び出すことで、スタートボタン押下時からの経過時間が10ミリ秒ごとに表示される
    timeOutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  // ストップボタン押下時のイベント
  stop.addEventListener('click', () => {
    // setTimeout()の解除
    clearTimeout(timeOutId);
    // ストップ押下時の時間からスタートボタン押下時の時間を引いて経過時間を取得
    elapsedTime += Date.now() - startTime;
  });

  // リセットボタン押下時のイベント
  reset.addEventListener('click', () => {
    timer.textContent = '00:00.000';
    elapsedTime = 0;
  })

}