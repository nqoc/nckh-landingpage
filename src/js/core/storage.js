// storage.js - Quản lý LocalStorage cho Theme và Sổ tay đề tài (Wishlist)

const THEME_KEY = 'nova_theme';
const WISHLIST_KEY = 'nova_saved_topics';

export function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (e) {
    return null;
  }
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error('Không thể lưu theme vào localStorage:', e);
  }
}

export function getSavedWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveWishlist(items) {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Không thể lưu wishlist vào localStorage:', e);
  }
}
