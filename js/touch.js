'use strict';

{
  class Panel {
    constructor(game) {
      this.game = game; // Gameクラスのインスタンス
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
      if (this.game.getCurrentNum() === Number(this.ele.textContent)) {
        this.ele.classList.add("pressed");
        this.game.addCurrentNum();
        // 全てのパネルを押し終わったらタイマーをストップする
        if (this.game.getCurrentNum() === 4) {
          clearTimeout(this.game.getTimeoutId());
        }
      }
    }
  }

  class Board {
    constructor(game) {
      this.game = game; // Gameクラスのインスタンス
      this.panels = [];
      for (let i = 0; i < 4; i++) {
        this.panels.push(new Panel(this.game));
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

  class Game {
    constructor() {
      this.board = new Board(this); // thisはGameクラスのインスタンス
      this.currentNum = undefined;
      this.startTime = undefined;
      this.timeoutId = undefined;

      const button = document.getElementById('button');
      button.addEventListener('click', () => {
        this.start();
      });
    }

    /**
     * currentNumに１を加算します。
     */
    addCurrentNum() {
      this.currentNum++;
    }

    /**
     * currentNumのゲッター
     */
    getCurrentNum() {
      return this.currentNum;
    }

    /**
     * timeoutIdのゲッター
     */
    getTimeoutId() {
      return this.timeoutId;
    }

    /**
     * スタートボタン押下時の処理
     */
    start() {
      // すでにタイマーが起動していたらスタートボタン押下のたびに解除する
      if (typeof this.timeoutId !== undefined) {
        clearTimeout(this.timeoutId);
      }

      this.board.activate();
      this.startTime = Date.now(); // スタートボタン押下時の時間
      this.runTimer();
      this.currentNum = 0;
    }

    /**
     * タイマーを起動します。
     */
    runTimer() {
      const timer = document.getElementById('timer');
      timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);

      this.timeoutId = setTimeout(() => {
        this.runTimer();
      }, 10);
    }
  }

  new Game();
}