// contactForm.js - Xử lý Form Đăng Ký Tư Vấn 
 
import { showToast } from './toast.js';

export function initContactForm() {
  const form = document.getElementById('research-consult-form');
  const nameInput = document.getElementById('student-name');
  const emailInput = document.getElementById('student-email');
  const phoneInput = document.getElementById('student-phone');
  const submitBtn = document.getElementById('btn-submit-form');

  const errName = document.getElementById('err-name');
  const errEmail = document.getElementById('err-email');
  const errPhone = document.getElementById('err-phone');

  function clearFormErrors() {
    if (errName) errName.textContent = '';
    if (errEmail) errEmail.textContent = '';
    if (errPhone) errPhone.textContent = '';

    if (nameInput) nameInput.classList.remove('has-error');
    if (emailInput) emailInput.classList.remove('has-error');
    if (phoneInput) phoneInput.classList.remove('has-error');
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearFormErrors();

      let isValid = true;

      // 1. Kiểm tra Họ và tên sinh viên
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (nameVal === '') {
        errName.textContent = 'Vui lòng nhập họ tên của bạn.';
        nameInput.classList.add('has-error');
        isValid = false;
      }

      // 2. Kiểm tra Địa chỉ Email
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailVal === '') {
        errEmail.textContent = 'Vui lòng nhập địa chỉ email để Mentor gửi phản hồi.';
        emailInput.classList.add('has-error');
        isValid = false;
      } else if (!emailPattern.test(emailVal)) {
        errEmail.textContent = 'Định dạng email chưa đúng (ví dụ: an@sv.dut.udn.vn hoặc an@gmail.com).';
        emailInput.classList.add('has-error');
        isValid = false;
      }

      // 3. Kiểm tra Số điện thoại / Zalo (10 chữ số)
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const phonePattern = /^(0[3|5|7|8|9])[0-9]{8}$/;
      if (phoneVal === '') {
        errPhone.textContent = 'Vui lòng nhập số điện thoại hoặc Zalo liên hệ.';
        phoneInput.classList.add('has-error');
        isValid = false;
      } else if (!phonePattern.test(phoneVal)) {
        errPhone.textContent = 'Số điện thoại cần đủ 10 chữ số (bắt đầu bằng 03, 05, 07, 08, 09).';
        phoneInput.classList.add('has-error');
        isValid = false;
      }

      if (!isValid) return;

      // Giả lập gửi dữ liệu bất đồng bộ qua setTimeout 1.5s
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> <span>Đang xử lý hồ sơ tư vấn...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        form.reset();
        clearFormErrors();

        showToast('Đăng ký thành công! Mentor của NOVA sẽ liên hệ bạn qua Zalo/Email trong 24 giờ.');
      }, 1500);
    });
  }
}
