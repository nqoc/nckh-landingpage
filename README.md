# NOVA Research — Landing Page Tư Vấn & Đồng Hành NCKH Sinh Viên

**Live Demo:** https://nqoc.github.io/nckh-landingpage/  
**GitHub Repository:** https://github.com/nqoc/nckh-landingpage

Landing Page giới thiệu **NOVA Research** — chương trình tư vấn, định hướng và kết nối sinh viên nghiên cứu khoa học với các giảng viên, cựu sinh viên đạt giải thưởng Sinh viên Nghiên cứu Khoa học (NCKH cấp Trường, cấp Bộ, Giải thưởng Euréka toàn quốc). Dự án trực thuộc và được hỗ trợ bởi **Google Developer Groups on Campus - DUT** tại Trường Đại học Bách Khoa - Đại học Đà Nẵng (54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng). Dự án được xây dựng theo **Hướng B: HTML5 + CSS3 + Vanilla JavaScript (ES6+ Modules)**.

---

## 1. Công nghệ & Kiến trúc

- **HTML Partials tách theo nội dung (`src/partials/`):** Mỗi phần (Header, Hero Bento, Courses, Methodology, Testimonials, FAQ, Contact, Footer, Overlays) nằm trong một file HTML riêng và được nạp động bất đồng bộ qua `src/js/core/partialLoader.js`.
- **CSS3 Phân tầng (`src/styles/`):** Chia nhỏ theo kiến trúc `tokens.css`, `base.css`, `layout.css`, `components.css`, nạp qua `main.css` với bảng màu chuẩn tương phản cao **WCAG AAA** (hỗ trợ Light Mode & Dark Mode), tùy biến đầy đủ scrollbars, selections, hairline borders và Bento Grid.
- **Vanilla JavaScript (ES6+ Modules):** Tách rõ `core/` (`dom.js`, `storage.js`, `partialLoader.js`) và `modules/` (`theme.js`, `navbar.js`, `courses.js`, `wishlist.js`, `faq.js`, `contactForm.js`, `toast.js`, `interactive.js`).
- **Tương tác & Hiệu ứng Cao cấp (Impeccable Craft UI):** Chuột Spotlight Glow di chuyển theo tọa độ thực (`--mouse-x`, `--mouse-y`), nghiêng 3D Tilt, thanh ray ScrollSpy La Mã cố định lề trái (`0, I, II, III...`), thanh Dock động trôi nổi ở đáy trang (`floating-dock`), khối mô phỏng thẩm định đề tài tức thì tại Hero và nút phóng to cỡ chữ trợ năng (`T Chữ to`).
- **Mock Data tập trung (`src/data/mockData.js`):** Toàn bộ dữ liệu danh mục đề tài, thống kê, lộ trình, mentor và FAQ được tách độc lập, render danh sách ra giao diện 100% bằng hàm `.map()`, tuyệt đối không hardcode HTML lặp lại.

---

## 2. Danh sách 6/6 Tính năng Trọng tâm

1. **scroll Event + Cleanup (`src/js/modules/navbar.js`):** Navbar đổi nền kính mờ (`backdrop-filter: blur`), co hẹp chiều cao khi cuộn trang > 40px; quản lý Mobile Navigation Drawer và cung cấp hàm `cleanupNavbarListener` (gỡ bỏ `removeEventListener`) chống rò rỉ bộ nhớ.
2. **Dynamic Filter + Debounce 200ms (`src/js/modules/courses.js`):** Lọc danh mục đề tài đa chiều theo Tab lĩnh vực (*Tất cả*, *AI & CNTT*, *Kỹ thuật & IoT*, *Kinh tế*, *Môi trường*) kết hợp ô tìm kiếm từ khóa với Debounce 200ms; cập nhật thông báo số lượng đề tài qua vùng trợ năng `aria-live="polite"`.
3. **Overlays State + Keydown Event (`src/js/modules/courses.js`, `navbar.js`, `wishlist.js`):** Đóng/mở Modal chi tiết đề tài, Mobile Drawer và Sổ tay đề tài quan tâm (Wishlist); khóa cuộn trang nền (`overflow: hidden`), đóng nhanh bằng phím `Escape` / click Backdrop và tự khôi phục con trỏ tiêu điểm (Focus restoration).
4. **Single-open Accordion Pattern (`src/js/modules/faq.js`):** FAQ Accordion giải đáp thắc mắc NCKH mở duy nhất 1 câu hỏi tại một thời điểm, tự động thu gọn các câu hỏi còn lại khi mở câu mới; hiệu ứng xoay icon mượt mà.
5. **Form Validation + Async Loading Simulation (`src/js/modules/contactForm.js`):** Validate Họ tên, Email hợp lệ, SĐT 10 chữ số phía client; giả lập gửi dữ liệu qua `setTimeout` 1.5s, khóa nút và hiện spinner `⏳ Đang xử lý hồ sơ...` chống spam; hiển thị Toast thông báo thành công và tự động reset form.
6. **State Persistence + LocalStorage API (`src/js/core/storage.js`, `theme.js`, `wishlist.js`):** Đồng bộ bền vững chế độ Dark/Light Mode và Sổ tay đề tài quan tâm (Research Notebook / Bookmark) vào `localStorage`, tự động khôi phục nguyên vẹn trạng thái khi người dùng tải lại trang.

---

## 3. Cấu trúc thư mục

```text
├── index.html
├── README.md
├── .nojekyll
├── .gitignore
├── .github/
│   └── workflows/
│       └── deploy.yml
└── src/
    ├── data/
    │   └── mockData.js
    ├── partials/
    │   ├── header.html
    │   ├── hero.html
    │   ├── courses.html
    │   ├── methodology.html
    │   ├── testimonials.html
    │   ├── faq.html
    │   ├── contact.html
    │   ├── footer.html
    │   └── overlays.html
    ├── styles/
    │   ├── tokens.css
    │   ├── base.css
    │   ├── layout.css
    │   ├── components.css
    │   └── main.css
    └── js/
        ├── core/
        │   ├── dom.js
        │   ├── partialLoader.js
        │   └── storage.js
        ├── modules/
        │   ├── contactForm.js
        │   ├── courses.js
        │   ├── faq.js
        │   ├── interactive.js
        │   ├── navbar.js
        │   ├── theme.js
        │   ├── toast.js
        │   └── wishlist.js
        └── main.js
```

---

## 4. Hướng dẫn chạy & Triển khai (Deploy)

Vì dự án sử dụng ES6 Modules và HTML Partials (`fetch`), hãy chạy qua máy chủ tĩnh cục bộ (tránh mở trực tiếp bằng `file://` do hạn chế CORS của trình duyệt):

- **VS Code Live Server:** Chuột phải vào `index.html` → chọn **Open with Live Server**.
- **Node.js:** Chạy lệnh `npx serve .` hoặc `npx http-server .` tại thư mục gốc.
- **Deploy (GitHub Pages / Vercel / Netlify):** Trỏ trực tiếp thư mục gốc (không cần build command). File `.github/workflows/deploy.yml` đã được thiết lập sẵn tự động kích hoạt deploy khi push lên nhánh `main`.
