'use strict';
{
  const images = [
    'img/pic00.png',
    'img/pic01.png',
    'img/pic02.png',
    'img/pic03.png',
    'img/pic04.png',
    'img/pic05.png',
    'img/pic06.png',
    'img/pic07.png',
  ];
  let currentIndex = 0;
  let isPlaying = false;

  // メイン画像の表示
  const mainImage = document.getElementById('main');
  mainImage.src = images[currentIndex];

  // サムネ画像の表示
  images.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = image;

    // サムネの濃色表示
    const li = document.createElement('li');
    if (index === currentIndex) {
      li.classList.add('current');
    }

    // サムネクリック時のイベント
    li.addEventListener('click', () => {
      mainImage.src = image;
      const thumnails = document.querySelectorAll('.thumnails > li');
      thumnails[currentIndex].classList.remove('current');
      currentIndex = index;
      thumnails[currentIndex].classList.add('current');
    });

    li.appendChild(img);
    document.querySelector('.thumnails').appendChild(li);
  });

  // nextボタンのイベント
  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    let target = currentIndex + 1;
    if (target === images.length) {
      target = 0;
    }
    // 最後にクリックメソッドを呼び出すことで定義済みのli要素に対するイベントを呼べる
    document.querySelectorAll(".thumnails > li")[target].click();
  });

  // previousボタンのイベント
  const previous = document.getElementById('previous');
  previous.addEventListener('click', () => {
    let target = currentIndex - 1;
    if (target < 0) {
      target = images.length - 1;
    }
    // 最後にクリックメソッドを呼び出すことで定義済みのli要素に対するイベントを呼べる
    document.querySelectorAll(".thumnails > li")[target].click();
  });

  let timeoutId;
  const play = document.getElementById('play');
  play.addEventListener('click', () => {
    if (isPlaying === false) {
      playSlideShow();
      play.textContent = 'pause';
    } else {
      clearTimeout(timeoutId);
      play.textContent = 'play';
    }
    // クリックのたびに反転させる
    isPlaying = !isPlaying;
  });

  function playSlideShow() {
    // nextをクリックした時と同じ処理を1秒ごとに行う
    timeoutId = setTimeout(() => {
      next.click();
      playSlideShow();
    }, 1000);
  }

}