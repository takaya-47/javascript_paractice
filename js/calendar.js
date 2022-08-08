'use strict';

{
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth(); // JSでは月は0から始まるので7月は6となる

  // 先月の日付部分を取得
  function getCalendarHead() {
    const dates = [];
    // 先月末日を取得
    const lastDate  = new Date(year, month, 0).getDate();
    // 先月の日付の個数を取得(今月1日が何曜日か？)
    // 日曜日が0となる
    const count = new Date(year, month, 1).getDay();

    for (let i = 0; i < count; i++) {
      dates.unshift(
        {
          date: lastDate - i,
          isToday: false,
          isDisabled: true,
        }
      );
    }
    return dates;
  }

  // 今月分の日付を作成
  function getCalendarBody() {
    const dates = []; // date: 日付, day: 曜日
    // 今月末日を取得(翌月の0日目=今月の末日)
    const lastDate = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDate; i++) {
      dates.push(
        {
          date: i,
          isToday: false,
          isDisabled: false,
        }
      );
    }

    // 今日の日付を太字にする
    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }

    return dates;
  }

  // 翌月分の日付を取得
  function getCalendarTail() {
    const dates = [];
    // 今月末日の曜日を取得
    const lastDay = new Date(year, month + 1, 0).getDay();

    // １日から６日までの日付のループ
    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push(
        {
          date: i,
          isToday: false,
          isDisabled: true,
        }
      );
    }
    return dates;
  }

  function clearCalendar() {
    const tbody = document.querySelector("tbody");
    // 最初の子要素が存在すれば削除する
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  function renderTitle() {
    // タイトルの表示
    const title = `${year}/${String(month + 1).padStart(2, 0)}`;
    document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
    // 表示する日付が入った配列
    const dates = getCalendarHead().concat(
      getCalendarBody(),
      getCalendarTail()
    );
    // 週ごとの日付に分割
    const weeks = [];
    const weeksCount = dates.length / 7;
    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }

    weeks.forEach((week) => {
      const tr = document.createElement("tr");
      week.forEach((date) => {
        const td = document.createElement("td");
        td.textContent = date.date;

        if (date.isToday) {
          td.classList.add("today");
        }

        if (date.isDisabled) {
          td.classList.add("disabled");
        }

        tr.appendChild(td);
      });
      document.querySelector("tbody").appendChild(tr);
    });
  }

  // 全ての日付を合算
  function createCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks();
  }
  createCalendar();

  // 前月の矢印をクリックした時のイベント
  document.getElementById('previous').addEventListener('click', () => {
    // 月をマイナス１する
    month--;
    if (month < 0) {
      // 年度をマイナス１して、月を12月に再設定
      year--;
      month = 11;
    }
    // カレンダーを再描画
    createCalendar();
  });

  // 翌月の矢印をクリックした時のイベント
  document.getElementById('next').addEventListener('click', () => {
    // 月をプラス１する
    month++;
    if (month > 11) {
      // 年度をプラス１して、月を１月に再設定
      year++;
      month = 0;
    }
    // カレンダーを再描画
    createCalendar();
  });

  // 「Today」をクリックした時のイベント
  document.getElementById('today').addEventListener('click', () => {
    year = today.getFullYear();
    month = today.getMonth();
    // カレンダーを再描画
    createCalendar();
  });
}