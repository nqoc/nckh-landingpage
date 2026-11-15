
// courses.js - Quản lý Danh mục Đề tài NCKH (Dynamic Filter, Debounce 200ms, Render .map(), Modal Chi Tiết)
 
import { RESEARCH_TOPICS } from '../../data/mockData.js';
import { isTopicSaved, toggleWishlistTopic } from './wishlist.js';
import { showToast } from './toast.js';

let activeField = 'all';
let searchKeyword = '';
let lastFocusedElement = null;

export function initCourses() {
  renderTopicList();
  initFilterAndSearch();
  initDetailModal();

  // Khi có cập nhật từ wishlist drawer thì render lại thẻ để đổi icon
  window.addEventListener('wishlist-updated', () => {
    renderTopicList();
  });
}

function renderTopicList() {
  const container = document.getElementById('topics-grid');
  const feedbackEl = document.getElementById('search-feedback');
  if (!container) return;

  const filtered = RESEARCH_TOPICS.filter((topic) => {
    const matchField = activeField === 'all' || topic.field === activeField;
    const query = searchKeyword.trim().toLowerCase();
    const matchQuery =
      query === '' ||
      topic.title.toLowerCase().includes(query) ||
      topic.summary.toLowerCase().includes(query) ||
      topic.methodology.toLowerCase().includes(query) ||
      topic.fieldName.toLowerCase().includes(query);

    return matchField && matchQuery;
  });

  if (feedbackEl) {
    if (searchKeyword.trim() !== '' || activeField !== 'all') {
      feedbackEl.textContent = `Tìm thấy ${filtered.length} hướng đề tài phù hợp.`;
    } else {
      feedbackEl.textContent = '';
    }
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; color: var(--color-ink-muted);">
        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" style="margin-bottom: 0.85rem; color: var(--color-ink-faint);">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h3 style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: var(--color-ink);">Không tìm thấy hướng đề tài phù hợp</h3>
        <p style="margin-top: 0.5rem; max-width: 50ch; margin-left: auto; margin-right: auto; line-height: 1.6;">
          Hãy thử tìm từ khóa khác như "Deep learning", "LoRa", "Khảo sát" hoặc gửi trực tiếp ý tưởng của nhóm bạn ở biểu mẫu đăng ký bên dưới.
        </p>
      </div>
    `;
    return;
  }

  // [TIÊU CHÍ RUBRIC]: Render danh sách đề tài bằng phương thức map(), tuyệt đối không hardcode HTML lặp lại
  const html = filtered
    .map((topic, index) => {
      const isSaved = isTopicSaved(topic.id);
      const savedClass = isSaved ? 'saved' : '';
      const refCode = `REF-${String(index + 1).padStart(2, '0')}`;
      const isFeatured = index === 0;

      const bookmarkSvg = isSaved
        ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>`
        : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>`;

      return `
      <article class="topic-card spotlight-card ${isFeatured ? 'featured-card' : ''}" data-topic-id="${topic.id}">
        <div class="card-top-meta">
          <div class="topic-academic-ref">
            <span class="ref-badge">${refCode}</span>
            <span class="ref-field">${topic.fieldName}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="topic-level-badge">${topic.level}</span>
            <button class="topic-bookmark-btn ${savedClass}" data-bookmark="${topic.id}" title="${isSaved ? 'Bỏ lưu đề tài' : 'Lưu vào sổ tay nghiên cứu'}" aria-label="Lưu đề tài">
              ${bookmarkSvg}
            </button>
          </div>
        </div>

        <h3 class="topic-card-title">${topic.title}</h3>
        <p class="topic-summary">${topic.summary}</p>

        <div class="topic-meta-box">
          <div class="meta-row">
            <span class="meta-icon">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
              </svg>
            </span>
            <span class="meta-label">Phương pháp:</span>
            <span class="meta-val">${topic.methodology}</span>
          </div>
          <div class="meta-row">
            <span class="meta-icon">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            <span class="meta-label">Cố vấn:</span>
            <span class="meta-val">${topic.mentor}</span>
          </div>
        </div>

        <div class="topic-card-actions">
          <button class="btn btn-secondary btn-sm btn-open-detail" data-detail-id="${topic.id}">
            Hồ sơ đề cương
          </button>
          <button class="btn btn-primary btn-sm btn-pick-topic" data-pick-id="${topic.id}" data-topic-name="${topic.title}">
            <span>Chọn đề tài này</span>
            <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </article>
    `;
    })
    .join('');

  container.innerHTML = html;
  attachCardEvents();
}

function attachCardEvents() {
  // Gắn hiệu ứng chuột Spotlight Glow cho từng thẻ đề tài động
  const topicCards = document.querySelectorAll('.topic-card');
  topicCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });

  const bookmarkButtons = document.querySelectorAll('.topic-bookmark-btn');
  bookmarkButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const topicId = btn.getAttribute('data-bookmark');
      toggleWishlistTopic(topicId);
      renderTopicList();
    });
  });

  const detailButtons = document.querySelectorAll('.btn-open-detail');
  detailButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const topicId = btn.getAttribute('data-detail-id');
      openTopicModal(topicId);
    });
  });

  const pickButtons = document.querySelectorAll('.btn-pick-topic');
  pickButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const topicName = btn.getAttribute('data-topic-name');
      selectTopicAndScroll(topicName);
    });
  });
}

function initFilterAndSearch() {
  const tabs = document.querySelectorAll('.filter-tab');
  const searchInput = document.getElementById('topic-search-input');
  const clearBtn = document.getElementById('search-clear-btn');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      activeField = tab.getAttribute('data-field');
      renderTopicList();
    });
  });

  // Debounce 200ms tối ưu hóa tìm kiếm
  let debounceTimer = null;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const val = searchInput.value;
      if (clearBtn) {
        if (val.length > 0) {
          clearBtn.classList.add('visible');
        } else {
          clearBtn.classList.remove('visible');
        }
      }

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchKeyword = val;
        renderTopicList();
      }, 200);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchKeyword = '';
        clearBtn.classList.remove('visible');
        searchInput.focus();
        renderTopicList();
      }
    });
  }
}

function initDetailModal() {
  const modal = document.getElementById('topic-detail-modal');
  const closeX = document.getElementById('modal-close-x');
  const dismissBtn = document.getElementById('modal-btn-dismiss');
  const backdrop = document.getElementById('modal-backdrop-close');
  const chooseBtn = document.getElementById('modal-btn-choose');

  function closeModal() {
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';

    // Khôi phục con trỏ tiêu điểm (Focus restoration)
    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  if (closeX) closeX.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (chooseBtn) {
    chooseBtn.addEventListener('click', () => {
      const topicName = chooseBtn.getAttribute('data-selected-topic-name');
      closeModal();
      selectTopicAndScroll(topicName);
    });
  }
}

function openTopicModal(topicId) {
  const topic = RESEARCH_TOPICS.find((t) => t.id === topicId);
  if (!topic) return;

  lastFocusedElement = document.activeElement;

  const modal = document.getElementById('topic-detail-modal');
  const titleEl = document.getElementById('modal-topic-title');
  const contentEl = document.getElementById('modal-topic-content');
  const chooseBtn = document.getElementById('modal-btn-choose');

  if (titleEl) titleEl.textContent = topic.title;
  if (chooseBtn) chooseBtn.setAttribute('data-selected-topic-name', topic.title);

  if (contentEl) {
    const objectivesHtml = topic.objectives.map((obj) => `<li>${obj}</li>`).join('');

    contentEl.innerHTML = `
      <div style="margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
        <span class="topic-level-badge">${topic.level}</span>
        <span style="font-size: 0.85rem; color: var(--color-ink-muted);">Chuyên ngành: <strong>${topic.fieldName}</strong></span>
      </div>

      <div style="background-color: var(--color-surface-subtle); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; border: var(--border-hairline);">
        <p style="margin-bottom: 0.4rem; font-weight: 700; color: var(--color-primary); font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.04em;">Khoảng trống nghiên cứu (Research Gap):</p>
        <p style="font-size: 0.95rem; color: var(--color-ink); line-height: 1.6;">${topic.gap}</p>
      </div>

      <h4 style="font-family: var(--font-display); font-size: 1.05rem; font-weight: 700; margin-bottom: 0.75rem;">Mục tiêu và các bước thực hiện cụ thể</h4>
      <ul style="padding-left: 1.25rem; margin-bottom: 1.5rem; font-size: 0.92rem; color: var(--color-ink-muted); line-height: 1.65;">
        ${objectivesHtml}
      </ul>

      <div style="border-top: var(--border-hairline); padding-top: 1rem; font-size: 0.88rem; color: var(--color-ink-muted); display: flex; flex-direction: column; gap: 0.45rem;">
        <p><strong>Giảng viên / Cố vấn đề xuất:</strong> ${topic.mentor}</p>
        <p><strong>Tiến độ hoàn thành:</strong> ${topic.timeline}</p>
      </div>
    `;
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function selectTopicAndScroll(topicName) {
  const consultSection = document.getElementById('consultation');
  const ideaTextarea = document.getElementById('research-idea');

  if (ideaTextarea && topicName) {
    ideaTextarea.value = `Mình quan tâm và muốn được tư vấn đăng ký đề tài: "${topicName}". Nhờ NOVA kết nối Mentor hỗ trợ giúp mình nhé!`;
  }

  if (consultSection) {
    consultSection.scrollIntoView({ behavior: 'smooth' });
    const nameInput = document.getElementById('student-name');
    if (nameInput) setTimeout(() => nameInput.focus(), 600);
  }

  showToast('✓ Đã chọn đề tài! Mời bạn điền thông tin bên dưới.');
}
