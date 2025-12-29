document.addEventListener("turbo:load", () => {
  document.querySelectorAll(".left_img").forEach((container) => {
    const count = parseInt(container.dataset.imagesCount || "0", 10)
    if (count < 4) return

    const carousel = container.querySelector(".simple-carousel")
    if (!carousel) return

    const track = carousel.querySelector(".simple-carousel__track")
    const slides = carousel.querySelectorAll(".simple-carousel__slide")
    const dots = carousel.querySelectorAll(".simple-carousel__dot")
    if (!track || slides.length === 0 || dots.length === 0) return

    let index = 0
    let isDragging = false
    let startX = 0
    let currentX = 0
    let translateX = 0

    const slideCount = slides.length
    const threshold = 50 // ドラッグでスライド判定の閾値（px）

    const update = () => {
      translateX = -index * 100
      track.style.transform = `translateX(${translateX}%)`
      
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index)
      })
    }

    // ドラッグ開始
    const startDrag = (clientX) => {
      isDragging = true
      startX = clientX
      track.style.transition = "none"
    }

    // ドラッグ中
    const drag = (clientX) => {
      if (!isDragging) return
      currentX = clientX
      const diff = currentX - startX
      track.style.transform = `translateX(${translateX + (diff / window.innerWidth * 100)}%)`
    }

    // ドラッグ終了
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
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        index = i
        update()
      })
    })

    // マウスイベント（PC）
    track.addEventListener("mousedown", (e) => startDrag(e.clientX))
    document.addEventListener("mousemove", (e) => drag(e.clientX))
    document.addEventListener("mouseup", endDrag)

    // タッチイベント（スマホ）
    track.addEventListener("touchstart", (e) => startDrag(e.touches[0].clientX))
    document.addEventListener("touchmove", (e) => drag(e.touches[0].clientX), { passive: false })
    document.addEventListener("touchend", endDrag)

    // 初期化
    update()
  })
})
