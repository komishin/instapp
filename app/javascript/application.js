// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

document.addEventListener('turbo:load', () => {
  const trigger = document.getElementById('avatar_trigger');
  const input = document.getElementById('avatar_input');

  if (trigger && input) {
    trigger.addEventListener('click', () => {
      input.click();
    });
  }
});
