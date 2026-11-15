// theme.js - Chuyển đổi giao diện Sáng / Tối (Dark & Light Mode) + LocalStorage

import { getSavedTheme, saveTheme } from '../core/storage.js';
import { showToast } from './toast.js';

export function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');

  const storedTheme = getSavedTheme();
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme ? storedTheme : (systemPrefersDark ? 'dark' : 'light');

  const labelText = document.getElementById('theme-label-text');

  applyTheme(initialTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      showToast(nextTheme === 'dark' ? 'Đã chuyển sang giao diện Tối' : 'Đã chuyển sang giao diện Sáng');
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);

    if (sunIcon && moonIcon) {
      if (theme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        if (labelText) labelText.textContent = 'Sáng';
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        if (labelText) labelText.textContent = 'Tối';
      }
    }
  }
}
