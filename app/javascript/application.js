// 1. まずライブラリを読み込む
import "@hotwired/turbo-rails"
import $ from "jquery"
window.$ = window.jquery = $ // 2. 他のファイルが読み込まれる前にグローバル化する

// 3. その後に自分のカスタムJSを読み込む（これで各ファイル内で $ が使える）
import "controllers"
import "profile_image"
import "footer"
import "post"
import "swiper"
import "trix"
import "@rails/actiontext"

document.addEventListener('turbo:load', () => {
  window.alert('DOM LOADED')
  console.log("jQuery is ready and global!");
});
