
// faq.js - Quản lý Accordion Hỏi đáp thường gặp (Single-open Accordion Pattern)

export function initFaq() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach((item) => {
    const header = item.querySelector('.accordion-header');

    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Đóng các câu hỏi còn lại (Single-open)
        items.forEach((other) => {
          other.classList.remove('open');
        });

        // Nếu câu được bấm chưa mở thì mở ra
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });
}
