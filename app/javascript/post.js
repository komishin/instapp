document.addEventListener('turbo:load', () => {
  const fileInput = document.getElementById('post_images');
  const previewContainer = document.getElementById('image_preview_container');

  if (!fileInput || !previewContainer) return;

  let dataTransfer = new DataTransfer();

  fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      dataTransfer.items.add(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        // 1. 枠（ラッパー）を作成
        const wrapper = document.createElement('div');
        wrapper.className = 'preview-wrapper'; // SCSSで定義するクラス名

        // 2. 画像を作成
        const img = document.createElement('img');
        img.src = event.target.result;

        // 3. 削除ボタンを作成
        const removeBtn = document.createElement('div');
        removeBtn.className = 'remove-btn'; // SCSSで定義するクラス名
        removeBtn.innerHTML = '×';

        // 4. 削除ボタンのクリックイベント
        removeBtn.addEventListener('click', () => {
          wrapper.remove();
          const newDataTransfer = new DataTransfer();
          Array.from(dataTransfer.files).forEach(f => {
            if (f !== file) newDataTransfer.items.add(f);
          });
          dataTransfer = newDataTransfer;
          fileInput.files = dataTransfer.files;
        });

        // 組み立て
        wrapper.appendChild(img);
        wrapper.appendChild(removeBtn);
        previewContainer.appendChild(wrapper);
      };
      reader.readAsDataURL(file);
    });
    fileInput.files = dataTransfer.files;
  });
});

