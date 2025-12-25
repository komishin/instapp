let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    // 下にスクロールした場合 ＆ 少しスクロールしてから反応させる
    footer.classList.add('hidden');
  } else {
    // 上にスクロールした場合
    footer.classList.remove('hidden');
  }

  lastScrollY = currentScrollY;
});
