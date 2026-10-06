// Shared Gallery Carousel and Lightbox Modal Controller for Portfolio Detail Pages
document.addEventListener('DOMContentLoaded', () => {
  // 1. Gallery Carousel
  const track = document.querySelector('.carousel-track');
  if (track) {
    const btnLeft = document.querySelector('.carousel-btn.left');
    const btnRight = document.querySelector('.carousel-btn.right');
    const images = Array.from(track.querySelectorAll('.carousel-item'));
    let currentIndex = 0;

    function updateCarousel() {
      if (!images.length) return;
      const slideWidth = images[0].getBoundingClientRect().width + 16;
      const visibleSlides = Math.floor(track.parentElement.offsetWidth / slideWidth);
      const maxIndex = images.length - visibleSlides;

      currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
      const offset = currentIndex * slideWidth;
      track.style.transform = `translateX(-${offset}px)`;

      if (btnLeft) btnLeft.classList.toggle('hidden', currentIndex === 0);
      if (btnRight) btnRight.classList.toggle('hidden', currentIndex >= maxIndex);
    }

    if (btnRight) {
      btnRight.addEventListener('click', () => {
        currentIndex++;
        updateCarousel();
      });
    }

    if (btnLeft) {
      btnLeft.addEventListener('click', () => {
        currentIndex--;
        updateCarousel();
      });
    }

    window.addEventListener('resize', updateCarousel);
    window.addEventListener('load', updateCarousel);
    updateCarousel();
  }

  // 2. Lightbox Modal
  const modalOverlay = document.getElementById('modal-overlay');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalClose = document.getElementById('modal-close');

  if (modalOverlay && modalImage) {
    document.querySelectorAll('.carousel-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;

        modalImage.src = img.src;
        modalImage.alt = img.alt;
        if (modalTitle) modalTitle.textContent = item.dataset.title || img.alt || '';

        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modalOverlay.style.display = 'none';
      document.body.style.overflow = 'auto';
    };

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
        closeModal();
      }
    });
  }
});
