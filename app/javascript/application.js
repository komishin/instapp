import "@hotwired/turbo-rails"
import $ from "jquery"
import axios from "axios" // 追加

window.$ = window.jquery = $
window.axios = axios // これで他のファイルでも axios が使えます

// RailsのCSRFトークンをaxiosのヘッダーに自動設定
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content
if (csrfToken) {
  axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
}

// 既存のimport
import "controllers"
import "profile_image"
import "footer"
import "post"
import "swiper"
import "trix"
import "@rails/actiontext"
