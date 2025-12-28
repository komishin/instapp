document.addEventListener('turbo:load', () => {
  const fileInput = document.getElementById('post_images');
  const previewContainer = document.getElementById('image_preview_container');

  if (!fileInput || !previewContainer) return;

  let dataTransfer = new DataTransfer();

  fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      // カゴに追加
      dataTransfer.items.add(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        // 1. 画像とボタンを包む枠を作成
        const wrapper = document.createElement('div');
        wrapper.className = 'preview-wrapper';
        Object.assign(wrapper.style, {
          position: 'relative',
          display: 'inline-block',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '15px'
        });

        // 2. 画像要素を作成
        const img = document.createElement('img');
        img.src = event.target.result;
        Object.assign(img.style, {
          width: '100%',
          height: 'auto',
          borderRadius: '10px',
          display: 'block'
        });

        // 3. 削除ボタンを作成
        const removeBtn = document.createElement('div');
        removeBtn.innerHTML = '×';
        Object.assign(removeBtn.style, {
          position: 'absolute',
          top: '5px',
          right: '5px',
          width: '24px',
          height: '24px',
          background: 'rgba(0,0,0,0.6)',
          color: 'white',
          borderRadius: '50%',
          textAlign: 'center',
          lineHeight: '22px',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold'
        });

        // 4. 削除ボタンが押された時の処理
        removeBtn.addEventListener('click', () => {
          // プレビュー表示を消す
          wrapper.remove();

          // カゴ（DataTransfer）から特定のファイルを削除する
          const newDataTransfer = new DataTransfer();
          Array.from(dataTransfer.files).forEach(f => {
            // 今クリックした画像（file）以外のファイルを新しいカゴに移す
            if (f !== file) {
              newDataTransfer.items.add(f);
            }
          });
          
          // カゴを更新してinputに戻す
          dataTransfer = newDataTransfer;
          fileInput.files = dataTransfer.files;
        });

        // 組み立てて表示
        wrapper.appendChild(img);
        wrapper.appendChild(removeBtn);
        previewContainer.appendChild(wrapper);
      };
      reader.readAsDataURL(file);
    });

    // 実際のinputを最新のカゴの中身で上書き
    fileInput.files = dataTransfer.files;
  });
});
