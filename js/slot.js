'use strict';

{
  class Panel {
    constructor() {
      const section = document.createElement('section');
      section.classList.add('panel');

      // Panelクラスのプロパティとしておくことで、このクラス内でどこでも呼び出せる
      this.img = document.createElement('img');
      this.img.src = this.getRandomImage();
      // Panelクラスのプロパティとしておくことで、このクラス内でどこでも呼び出せる
      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop');
      this.stop.classList.add('inactive');

      // HTML要素の親子関係の定義
      section.appendChild(this.img);
      section.appendChild(this.stop);
      const main = document.querySelector('main');
      main.appendChild(section);

      // setTimeout関数を使用するので戻り値をプロパティとして定義
      this.timeoutId = undefined;
    }

    /**
     * 画像配列からランダムな画像を１枚返却します
     */
    getRandomImage() {
      const images = [
        'img2/seven.png',
        'img2/bell.png',
        'img2/cherry.png'
      ];
      return images[Math.floor(Math.random() * images.length)];
    }

    /**
     * 50ミリ秒ごとにランダムな画像をセットします
     */
    spin() { // NOTE:クラス内の関数定義はfunctionの記述は不要
      this.img.src = this.getRandomImage();
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 50);
    }
    /**
     * SPINボタン押下時のパネルのスタイルを定義します
     */
    activate() {
      this.img.classList.remove('unmatch');
      this.stop.classList.remove('inactive');
    }

    /**
     * 画像が引数に渡した画像と一致するかを判定します
     *
     * @param  {Panel} panel1
     * @param  {Panel} panel2
     * @return {bool}
     */
    isUnmatched(panel1, panel2) {
      return this.img.src !== panel1.img.src && this.img.src !== panel2.img.src;
    }
    /**
     * 他の画像と一致していない画像要素に対し、不一致を意味するクラスを付与します
     *
     * @return {void}
     */
    unmatch() {
      this.img.classList.add('unmatch');
    }
  }

  // コンストラクターを使って初期画面のHTML要素を生成
  const panels = [
    new Panel(),
    new Panel(),
    new Panel()
  ];

  // SPINボタンクリック時のイベント
  const spin = document.getElementById('spin');
  spin.addEventListener('click', () => {
    // SPINボタンがすでに押下されていたら処理を終了
    if (spin.classList.contains('inactive')) return;

    spin.classList.add('inactive');
    panels.forEach((panel) => {
      // Panelクラスのインスタンスメソッドを呼び出す
      panel.spin();
      panel.activate();
    });
  });

  // stopされていないパネル数
  let leftPanels = 3;
  // STOPボタンクリック時のイベント
  panels.forEach((panel) => {
    panel.stop.addEventListener('click', () => {
      // STOPボタンがすでに押下されていたら処理を終了
      if (panel.stop.classList.contains('inactive')) return;
      // STOPボタンのスタイル定義
      panel.stop.classList.add('inactive');
      // タイマーの解除
      clearTimeout(panel.timeoutId);
      // パネル数の再定義
      leftPanels--;
      // 残パネル数が０の場合、結果判定に進む
      if (leftPanels === 0) {
        // 画像の一致判定
        checkResult();
        spin.classList.remove('inactive');
        leftPanels = 3;
      }
    });
  });

  /**
   * 画像が他の２枚の画像と一致するかを全ての画像に対して判定します。
   *
   * @return {bool}
   */
  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
  }
}