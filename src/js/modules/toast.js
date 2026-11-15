// toast.js - Quản lý hiển thị Toast notification nổi góc màn hình
 
let toastTimeoutId = null;

export function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const msgEl = document.getElementById('toast-text-msg');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add('active');

  clearTimeout(toastTimeoutId);
  toastTimeoutId = setTimeout(() => {
    toast.classList.remove('active');
  }, 3500);
}

export function initToast() {
  // Sẵn sàng nhận thông báo
}
