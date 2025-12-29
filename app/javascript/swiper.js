document.addEventListener("turbo:load", () => {
  document.querySelectorAll(".left_img").forEach((container) => {
    const count = parseInt(container.dataset.imagesCount || "0", 10)
    if (count < 2) return  // 2枚未満スキップ

    const carousel = container.querySelector(".simple-carousel")
    if (!carousel) return

    const track = carousel.querySelector(".simple-carousel__track")
    const slides = carousel.querySelectorAll(".simple-carousel__slide")
    const dots = carousel.querySelectorAll(".simple-carousel__dot")
    const cardContent = container.closest(".card_content")  // 親の.card_content
    if (!track || slides.length === 0 || !cardContent) return

    let index = 0
    let isDragging = false
    let startX = 0
    let currentX = 0
    let translateX = 0
    const slideCount = slides.length
    const threshold = 50

    const update = () => {
      translateX = -index * 100
      track.style.transform = `translateX(${translateX}%)`
      
      // ドット更新
      if (dots.length > 0) {
        dots.forEach((dot, i) => {
          dot.classList.toggle("is-active", i === index)
        })
      }

      // 右側表示/非表示制御
      if (index === 0) {
        // 1枚目：右側表示（通常レイアウト）
        cardContent.classList.remove("is-fullscreen")
      } else {
        // 2枚目以降：右側非表示（全画面）
        cardContent.classList.add("is-fullscreen")
      }
    }

    // ドラッグ処理（既存と同じ）
    const startDrag = (clientX) => {
      isDragging = true
      startX = clientX
      track.style.transition = "none"
    }

    const drag = (clientX) => {
      if (!isDragging) return
      currentX = clientX
      const diff = currentX - startX
      track.style.transform = `translateX(${translateX + (diff / window.innerWidth * 100)}%)`
    }

    const endDrag = () => {
      if (!isDragging) return
      isDragging = false
      track.style.transition = "transform 0.3s ease"

      const diff = currentX - startX
      if (Math.abs(diff) > threshold) {
        if (diff > 0 && index > 0) {
          index--
        } else if (diff < 0 && index < slideCount - 1) {
          index++
        }
      }
      update()
    }

    // ドットクリック
    if (dots.length > 0) {
      dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
          index = i
          update()
        })
      })
    }

    // マウス・タッチイベント（既存と同じ）
    track.addEventListener("mousedown", (e) => startDrag(e.clientX))
    document.addEventListener("mousemove", (e) => drag(e.clientX))
    document.addEventListener("mouseup", endDrag)
    track.addEventListener("touchstart", (e) => startDrag(e.touches[0].clientX))
    document.addEventListener("touchmove", (e) => drag(e.touches[0].clientX), { passive: false })
    document.addEventListener("touchend", endDrag)

    update() // 初期化
  })
})

