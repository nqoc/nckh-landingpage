/**
 * interactive.js - Quản lý các hiệu ứng tương tác cao cấp (Mouse Spotlight, 3D Tilt, ScrollSpy Rail, Floating Dock, Hero Simulator)
 */
import { showToast } from './toast.js';

export function initInteractive() {
  initSpotlightGlow();
  initHeroSimulator();
  initScrollSpyRail();
  initFloatingDock();
  initMethodologyStepper();
  initFontScaleToggle();
}

/**
 * 1. Hiệu ứng Chuột Spotlight Glow & 3D Tilt trên các thẻ tương tác
 */
function initSpotlightGlow() {
  // Tự động gán class spotlight-card cho các thẻ chính
  const targetCards = document.querySelectorAll(
    '.topic-card, .pillar-card, .mentor-card, .tool-card, .hero-interactive-card, .timeline-step'
  );

  targetCards.forEach((card) => {
    card.classList.add('spotlight-card');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Hiệu ứng nghiêng 3D nhẹ đối với thẻ Hero Simulator
      if (card.classList.contains('hero-interactive-card')) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('hero-interactive-card')) {
        card.style.transform = '';
      }
    });
  });
}

/**
 * 2. Khối mô phỏng Thẩm định Đề tài tại Hero (Hero Topic Simulator)
 */
const SIMULATION_DATA = {
  ai: {
    tag: 'Hồ sơ #01 • Thuyết minh đề cương',
    badge: '✓ Turnitin < 5% • Khớp chuẩn Q1',
    title: 'Ứng dụng Học Sâu (Deep Learning) Hỗ Trợ Chẩn Đoán Tổn Thương Phổi',
    gap: 'Khoảng trống: Tuyến cơ sở thiếu công cụ hỗ trợ sàng lọc tự động ảnh X-Quang.',
    method: 'Mô hình: CNN ResNet + Vision Transformer • 112.000 ảnh chuẩn NIH Chest X-ray.',
    mentor: 'TS. Trần Anh Tuấn (ĐHBK - ĐHĐN) • 5 - 6 tháng',
    prompt: 'Nhóm em muốn làm AI y tế nhưng chưa có dataset',
    answer: 'Cỡ mẫu cần đạt độ mạnh thống kê (Power ≥ 0.8) cho 18 biến quan sát. NOVA hỗ trợ cấp dataset chuẩn và tài khoản GPU.'
  },
  iot: {
    tag: 'Hồ sơ #02 • Kỹ thuật & IoT Phần cứng',
    badge: '✓ 100% Khả thi cấp Trường',
    title: 'Hệ Thống Phân Loại Rác Tự Động Bằng Cánh Tay Robot & Thị Giác Nhúng',
    gap: 'Khoảng trống: Phân loại rác tại nguồn thủ công có sai lệch cao, cần tự động hóa chi phí thấp.',
    method: 'Mô hình: Máy tính nhúng Raspberry Pi 5 + YOLOv8-Nano trên băng chuyền 20 sp/phút.',
    mentor: 'KS. Lê Hoàng Minh (R&D Lab) • 5 tháng',
    prompt: 'Làm phần cứng mạch nhúng có tốn kém chi phí không anh?',
    answer: 'Lab đã có sẵn kit máy tính nhúng và máy in 3D, nhóm chỉ cần tập trung phát triển code và mô hình!'
  },
  econ: {
    tag: 'Hồ sơ #03 • Kinh tế & Social Commerce',
    badge: '✓ Dễ công bố Hội thảo QG',
    title: 'Tác Động Của Thuật Toán Video Ngắn TikTok Đến Quyết Định Mua Hàng Của Gen Z',
    gap: 'Khoảng trống: Chưa nhiều nghiên cứu mô hình hóa tác động tâm lý FOMO trong Social Commerce tại VN.',
    method: 'Mô hình: Khảo sát định lượng 600 sinh viên, kiểm định Cronbach Alpha & SmartPLS SEM.',
    mentor: 'ThS. Hoàng Bảo Ngọc (Khoa Quản trị) • 4 tháng',
    prompt: 'Làm đề tài khảo sát hành vi người dùng cần tối thiểu bao nhiêu mẫu?',
    answer: 'Quy tắc 5:1 của Hair et al. khuyến nghị từ 250 - 400 mẫu, mẫu 600 của nhóm đạt độ tin cậy xuất sắc!'
  }
};

function initHeroSimulator() {
  const tabBtns = document.querySelectorAll('.sim-tab-btn');
  const tagEl = document.getElementById('sim-tag-lead');
  const badgeEl = document.getElementById('sim-verified-badge');
  const titleEl = document.getElementById('sim-topic-title');
  const gapEl = document.getElementById('sim-check-gap');
  const methodEl = document.getElementById('sim-check-method');
  const mentorEl = document.getElementById('sim-check-mentor');
  const promptEl = document.getElementById('sim-speech-prompt');
  const answerEl = document.getElementById('sim-speech-answer');
  const applyBtn = document.getElementById('btn-sim-apply');

  if (!tabBtns.length) return;

  function updateSimulation(key) {
    const data = SIMULATION_DATA[key];
    if (!data) return;

    if (tagEl) tagEl.textContent = data.tag;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (titleEl) titleEl.textContent = data.title;
    if (gapEl) gapEl.textContent = data.gap;
    if (methodEl) methodEl.textContent = data.method;
    if (mentorEl) mentorEl.textContent = data.mentor;
    if (promptEl) promptEl.textContent = `"${data.prompt}"`;
    if (answerEl) answerEl.innerHTML = `<strong>Cố vấn lưu ý:</strong> ${data.answer}`;
    if (applyBtn) applyBtn.setAttribute('data-sim-title', data.title);
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const topicKey = btn.getAttribute('data-sim-target');
      updateSimulation(topicKey);
    });
  });

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const topicTitle = applyBtn.getAttribute('data-sim-title') || 'Ứng dụng Học Sâu (Deep Learning)';
      const consultSection = document.getElementById('consultation');
      const ideaTextarea = document.getElementById('research-idea');
      const nameInput = document.getElementById('student-name');

      if (ideaTextarea) {
        ideaTextarea.value = `Mình muốn nhận tư vấn đăng ký đề tài thử nghiệm: "${topicTitle}". Nhờ NOVA hỗ trợ nhóm mình nhé!`;
      }
      if (consultSection) {
        consultSection.scrollIntoView({ behavior: 'smooth' });
        if (nameInput) setTimeout(() => nameInput.focus(), 600);
      }
      showToast('✓ Đã nạp đề tài vào form tư vấn bên dưới!');
    });
  }
}

/**
 * 3. Thanh ray ScrollSpy số La Mã bên lề trái (Left Sticky ScrollSpy Rail)
 */
function initScrollSpyRail() {
  const railItems = document.querySelectorAll('.rail-item');
  if (!railItems.length) return;

  const sections = [
    { id: 'hero-section', railIndex: '0' },
    { id: 'roadmap', railIndex: 'I' },
    { id: 'topics', railIndex: 'II' },
    { id: 'about', railIndex: 'III' },
    { id: 'mentors', railIndex: 'IV' },
    { id: 'faq', railIndex: 'V' },
    { id: 'consultation', railIndex: 'VI' }
  ];

  function onScroll() {
    const scrollPos = window.scrollY + 200;

    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = document.getElementById(sections[i].id) || document.querySelector(`.${sections[i].id}`);
      if (sec) {
        const top = sec.offsetTop;
        if (scrollPos >= top) {
          railItems.forEach((item) => {
            if (item.getAttribute('data-rail-id') === sections[i].railIndex) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
          break;
        }
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 4. Thanh Dock điều hướng nổi thông minh phía dưới (Floating Bottom Dock)
 */
function initFloatingDock() {
  const dock = document.getElementById('floating-bottom-dock');
  const topBtn = document.getElementById('dock-btn-top');
  if (!dock) return;

  function handleDockVisibility() {
    if (window.scrollY > 380) {
      dock.classList.add('visible');
    } else {
      dock.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleDockVisibility, { passive: true });
  handleDockVisibility();

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * 5. Lộ trình NCKH tương tác: Chuyển bước & Nút Bước tiếp theo
 */
function initMethodologyStepper() {
  const methodTabs = document.querySelectorAll('.method-tab');
  const nextBtn = document.getElementById('btn-methodology-next');
  const steps = document.querySelectorAll('.timeline-step');
  if (!methodTabs.length || !steps.length) return;

  let currentStepIndex = 0;

  function highlightStep(index) {
    currentStepIndex = index;
    methodTabs.forEach((tab, i) => {
      if (i === index) tab.classList.add('active');
      else tab.classList.remove('active');
    });

    steps.forEach((step, i) => {
      if (i === index) {
        step.classList.add('active-step');
        // Cuộn mượt đến thẻ nếu màn hình nhỏ
        if (window.innerWidth < 900) {
          step.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        step.classList.remove('active-step');
      }
    });
  }

  methodTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      highlightStep(index);
    });
  });

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const nextIndex = (currentStepIndex + 1) % steps.length;
      highlightStep(nextIndex);
    });
  }

  highlightStep(0);
}

/**
 * 6. Nút Phóng to Cỡ chữ (Accessibility Large Text Mode)
 */
function initFontScaleToggle() {
  const toggleBtn = document.getElementById('font-scale-toggle');
  const savedScale = localStorage.getItem('nova_large_text');

  if (savedScale === 'true') {
    document.documentElement.classList.add('large-text-mode');
    if (toggleBtn) toggleBtn.classList.add('btn-large-text-active');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isLarge = document.documentElement.classList.toggle('large-text-mode');
      localStorage.setItem('nova_large_text', isLarge ? 'true' : 'false');
      toggleBtn.classList.toggle('btn-large-text-active', isLarge);
      showToast(isLarge ? '🔍 Đã bật chế độ Chữ To dễ đọc' : '🔎 Đã khôi phục cỡ chữ chuẩn');
    });
  }
}
