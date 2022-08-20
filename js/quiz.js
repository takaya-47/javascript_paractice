'use strict'
{
  // HTMLから要素取得
  const question = document.getElementById("question");
  const choices = document.getElementById("choices");
  const button = document.getElementById("button");
  const result = document.getElementById("result");
  const scoreLabel = document.querySelector('#result > p');
  // 問題と選択肢を格納した配列
  const quizSet = shuffle(
    [
      { que: "世界で一番大きな湖は?", choice: ["カスピ海", "カリブ海", "琵琶湖"] },
      { que: "２の８乗は?", choice: ["256", "64", "1024"] },
      { que: "最初にリリースされた言語は?", choice: ["Python", "JavaScript", "HTML"] },
    ]
  );
  // クイズの設問番号
  let currentNum = 0;
  // 回答済みか否かを保持する変数
  let isAnswered;
  // 正答数を保持する変数
  let score = 0;

  // 問題と選択肢をセット
  setQuiz();

  // ************
  // 関数の定義
  // ************
  /**
   * 問題文及び選択肢のHTML要素を生成します
   */
  function setQuiz() {
    isAnswered = false;
    // すでに描画されている選択肢があれば削除する
    while (choices.firstChild !== null) {
      choices.removeChild(choices.firstChild);
    }
    // 問題文のHTML要素を作成
    question.textContent = quizSet[currentNum].que;
    // 選択肢の入った配列をシャッフルしておく
    const shuffledChoice = shuffle(quizSet[currentNum].choice);
    // シャッフル後の選択肢を用いて選択肢のHTML要素を作成
    shuffledChoice.forEach((c) => {
      const li = document.createElement("li");
      li.textContent = c;
      choices.appendChild(li);
      // 選択肢をクリックした時のイベント処理
      li.addEventListener("click", () => {
        checkAnswer(li);
      });
    });
    // 次の問題がない場合はボタンのテキストを変更する
    if (currentNum === quizSet.length - 1) {
      button.textContent = 'Show Score';
    }
  }

  /**
   * フィッシャー・イェーツのアルゴリズムを用いて配列をシャッフルし、シャッフル後の配列を返却します
   * ※引数に渡される元配列を変更しないよう、スプレッド構文を使って新しい配列を作っています
   */
  function shuffle([...array]) {
    for (let i = array.length - 1; i > 0; i--) {
      // iは2,1と変化する
      // 乱数生成を使ってランダムに取り出す値を決める
      const r = Math.floor(Math.random() * (i + 1));
      // 選択肢配列の最後の要素とランダムに取得した位置の要素を入れ替える(分割代入)
      [array[i], array[r]] = [array[r], array[i]];
    }
    // シャッフルした選択肢の配列を返却
    return array;
  }

  /**
   * 選択肢クリック時の正誤を判定します
   */
  function checkAnswer(li) {
    // 一度でも回答していればクリック時のイベントを行わない
    if (isAnswered) {
      return;
    }
    // 回答済みに変更
    isAnswered = true;
    // 正誤のスタイルを付与
    if (li.textContent === quizSet[currentNum].choice[0]) {
      li.classList.add("correct");
      score++;
    } else {
      li.classList.add("wrong");
    }
    // 次の問題へ行くボタンのスタイルを変更
    button.classList.remove("disabled");
  }

  // ***************
  // イベントの定義
  // ***************
  button.addEventListener("click", () => {
    // 未回答なら処理を行わない
    if (isAnswered === false) {
      return;
    }
    // 次の問題へ行くボタンのスタイルを変更
    button.classList.add("disabled");
    // 次の問題がなかった場合は結果を表示する
    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score}/${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}