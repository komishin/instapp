document.addEventListener('turbo:load', () => {
  const trigger = document.getElementById('avatar_trigger');
  const input = document.getElementById('avatar_input');

  if (trigger && input) {
    trigger.addEventListener('click', () => {
      input.click();
    });
  }
});
