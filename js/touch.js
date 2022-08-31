'use strict';

{
  class Panel {
    constructor() {
      this.ele = document.createElement("li");
      this.ele.classList.add("pressed");
      this.ele.addEventListener("click", () => {
        this.check();
      });
    }

    /**
     * eleプロパティを返却します
     */
    getEle() {
      return this.ele;
    }

    /**
     * パネルに数字を描画します。
     *
     * @param  {number} num
     */
    activate(num) {
      this.ele.classList.remove("pressed");
      this.ele.textContent = num;
    }
    /**
     * タッチすべき数値とクリックしたパネルの数値が同じかどうかチェックします。
     */
    check() {
      if (currentNum === Number(this.ele.textContent)) {
        this.ele.classList.add("pressed");
        currentNum++;
        // 全てのパネルを押し終わったらタイマーをストップする
        if (currentNum === 4) {
          clearTimeout(timeoutId);
        }
      }
    }
  }

  class Board {
    constructor() {
      this.panels = [];
      for (let i = 0; i < 4; i++) {
        this.panels.push(new Panel());
      }
      this.setUp();
    }

    /**
     * ボードにパネルを４枚追加します。
     */
    setUp() {
      const board = document.getElementById('board');
      this.panels.forEach((panel) => {
        board.appendChild(panel.getEle());
      });
    }

    /**
     * パネルにランダムな数字を描画します。
     * ※処理自体はパネルクラスのメソッドで行っています。
     */
    activate() {
      const nums = [0, 1, 2, 3];
      this.panels.forEach((panel) => {
        // numsから0〜3までのランダムな位置から１つ取り出してnumに格納
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        panel.activate(num);
      })
    }
  }

  const board = new Board();
  let currentNum;
  let startTime;
  let timeoutId;

  const button = document.getElementById('button');
  button.addEventListener('click', () => {
    // すでにタイマーが起動していたらスタートボタン押下のたびに解除する
    if (typeof timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    board.activate();
    startTime = Date.now(); // スタートボタン押下時の時間
    runTimer();
    currentNum = 0;
  });

  /**
   * タイマーを起動します。
   */
  function runTimer() {
    const timer = document.getElementById('timer');
    timer.textContent = ((Date.now() - startTime) / 1000).toFixed(2);

    timeoutId = setTimeout(() => {
      runTimer();
    }, 10)
  }
}