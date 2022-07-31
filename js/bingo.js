'use strict';

{
  /**
   * ランダムな５つの数値が入った配列を生成します
   */
  function createRow(column_number) {
    // 要素数が15かつ自然数が入った配列を作成
    const column = [];
    for (let i = 0; i < 15; i++) {
      column[i] = i + 1 + 15 * column_number;
    }
    // 列に表示されるランダムな自然数が入った配列を作成（中身は５つで固定）
    const random_array = [];
    for (let i = 0; i < 5; i++) {
      // 元配列のランダムな位置から要素を一つ取り除き、配列に詰める
      random_array[i] = column.splice(
        Math.floor(Math.random() * column.length),
        1
      )[0];
    }
    return random_array;
  }

  /**
   * ビンゴシートの元となる二次元配列を作成します
   */
  function createRows() {
    const rows = [];
    for (let i = 0; i < 5; i++) {
      // 定義した関数を使い、各列ごとに配列を作り、元配列に格納していく
      rows[i] = createRow(i);
    }
    // シートの真ん中は常にFREEと表示する
    rows[2][2] = "FREE";
    console.table(rows);
    return rows;
  }
  /**
   * テーブルのtbody内の要素を生成します
   */
  function renderBingo() {
    const rows = createRows();
    for (let i = 0; i < 5; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < 5; j++) {
        const td = document.createElement("td");
        // 画面には行と列を反転させて表示する
        td.textContent = rows[j][i];
        tr.appendChild(td);
      }
      document.querySelector("tbody").appendChild(tr);
    }
  }

  // 関数呼び出し
  renderBingo();
}