/**
 * main.js - Điểm khởi động chính của ứng dụng (Entry Point)
 */
import { loadHtmlPartials } from './core/partialLoader.js';
import { initTheme } from './modules/theme.js';
import { initNavbar } from './modules/navbar.js';
import { initCourses } from './modules/courses.js';
import { initWishlist } from './modules/wishlist.js';
import { initFaq } from './modules/faq.js';
import { initContactForm } from './modules/contactForm.js';
import { initToast } from './modules/toast.js';
import { initInteractive } from './modules/interactive.js';

async function initApp() {
  try {
    // 1. Nạp toàn bộ các thành phần HTML partials
    await loadHtmlPartials();

    // 2. Khởi tạo các module chức năng sau khi HTML đã sẵn sàng
    initTheme();
    initNavbar();
    initCourses();
    initWishlist();
    initFaq();
    initContactForm();
    initToast();
    initInteractive();
  } catch (error) {
    console.error('Lỗi khởi tạo ứng dụng:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
