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
    console.log(dates);
  }
  getCalendarHead();

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
    console.log(dates);
  }
  getCalendarBody();

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
    console.log(dates);
  }
  getCalendarTail();
}