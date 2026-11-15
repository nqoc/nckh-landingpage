
// wishlist.js - Quản lý Sổ tay Đề tài Quan tâm (Research Notebook / Bookmark) + LocalStorage

import { getSavedWishlist, saveWishlist } from '../core/storage.js';
import { RESEARCH_TOPICS } from '../../data/mockData.js';
import { showToast } from './toast.js';

let savedTopics = getSavedWishlist();

export function getWishlistItems() {
  return savedTopics;
}

export function isTopicSaved(topicId) {
  return savedTopics.includes(topicId);
}

export function toggleWishlistTopic(topicId) {
  const topic = RESEARCH_TOPICS.find((t) => t.id === topicId);
  const index = savedTopics.indexOf(topicId);

  if (index > -1) {
    savedTopics.splice(index, 1);
    showToast(`Đã bỏ lưu đề tài: "${topic ? topic.title.substring(0, 30) : ''}..."`);
  } else {
    savedTopics.push(topicId);
    showToast(`Đã lưu vào sổ tay nghiên cứu!`);
  }

  saveWishlist(savedTopics);
  updateWishlistBadge();
}

export function updateWishlistBadge() {
  const badge = document.getElementById('notebook-count-badge');
  const countEl = document.getElementById('notebook-items-count');

  if (badge) {
    badge.textContent = savedTopics.length;
    badge.style.display = 'inline-flex';
  }

  if (countEl) {
    countEl.textContent = savedTopics.length;
  }
}

export function renderWishlistDrawer() {
  const listEl = document.getElementById('notebook-items-list');
  if (!listEl) return;

  if (savedTopics.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; color: var(--color-ink-muted); padding: 3rem 1rem;">
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.6" style="margin-bottom: 0.75rem; color: var(--color-ink-faint);">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
        <p style="font-weight: 600;">Sổ tay của bạn đang trống</p>
        <small style="color: var(--color-ink-faint); display: block; margin-top: 0.35rem;">Nhấn nút lưu ở các đề tài để đánh dấu và gửi tư vấn nhé!</small>
      </div>
    `;
    return;
  }

  const html = savedTopics
    .map((id) => {
      const topic = RESEARCH_TOPICS.find((t) => t.id === id);
      if (!topic) return '';
      return `
        <div class="notebook-item-card">
          <div class="notebook-item-info">
            <h5>${topic.title}</h5>
            <p>${topic.fieldName} • ${topic.level}</p>
          </div>
          <button class="notebook-item-del" data-delete-id="${topic.id}" title="Xóa đề tài này">&times;</button>
        </div>
      `;
    })
    .join('');

  listEl.innerHTML = html;

  const delButtons = listEl.querySelectorAll('.notebook-item-del');
  delButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const topicId = btn.getAttribute('data-delete-id');
      toggleWishlistTopic(topicId);
      renderWishlistDrawer();
      window.dispatchEvent(new CustomEvent('wishlist-updated'));
    });
  });
}

export function initWishlist() {
  const notebookBtn = document.getElementById('notebook-btn');
  const notebookClose = document.getElementById('notebook-close-x');
  const notebookDrawer = document.getElementById('notebook-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const clearAllBtn = document.getElementById('btn-clear-notebook');
  const consultSavedBtn = document.getElementById('btn-consult-saved-topics');

  updateWishlistBadge();

  if (notebookBtn) {
    notebookBtn.addEventListener('click', () => {
      renderWishlistDrawer();
      if (notebookDrawer && overlay) {
        notebookDrawer.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  function closeNotebook() {
    if (notebookDrawer && overlay) {
      notebookDrawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (notebookClose) notebookClose.addEventListener('click', closeNotebook);

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      if (savedTopics.length === 0) return;
      if (confirm('Bạn có chắc chắn muốn xóa toàn bộ đề tài đã lưu khỏi sổ tay?')) {
        savedTopics = [];
        saveWishlist(savedTopics);
        updateWishlistBadge();
        renderWishlistDrawer();
        window.dispatchEvent(new CustomEvent('wishlist-updated'));
        showToast('Đã làm trống sổ tay nghiên cứu.');
      }
    });
  }

  if (consultSavedBtn) {
    consultSavedBtn.addEventListener('click', closeNotebook);
  }
}
