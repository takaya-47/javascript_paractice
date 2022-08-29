'use strict';

{
  class Panel {
    constructor() {
      this.ele = document.createElement("li");
      this.ele.classList.add("pressed");
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

  const button = document.getElementById('button');
  button.addEventListener('click', () => {
    board.activate();
  });
}