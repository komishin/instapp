# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "profile_image"
pin "footer"
pin "post"
pin "swiper" # @12.0.3
pin "jquery" # @3.7.1
pin "@rails/actiontext", to: "@rails--actiontext.js" # @8.1.100
pin "trix" # @2.1.15
pin "axios", to: "https://esm.sh/axios@1.7.9"
