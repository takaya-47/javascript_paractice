'use strict';

{
  const year = 2022;
  const month = 6; // JSでは月は0から始まるので7月は6となる

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
          isDisabled: false,
        }
      );
    }
    return dates;
  }

  // 全ての日付を合算
  function createCalendar() {
    // 表示する日付が入った配列
    const dates = getCalendarHead().concat(getCalendarBody(), getCalendarTail());
    // 週ごとの日付に分割
    const weeks = [];
    const weeksCount = dates.length / 7;
    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }

    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');
        td.textContent = date.date;

        if (date.isToday) {
          td.classList.add('today');
        }

        if (date.isDisabled) {
          td.classList.add('disabled');
        }

        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }
  createCalendar();
}