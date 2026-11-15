/**
 * partialLoader.js - Nạp động các file HTML partials từ thư mục src/partials/
 */
export async function loadHtmlPartials() {
  const placeholders = Array.from(document.querySelectorAll('[data-partial]'));
  if (placeholders.length === 0) return;

  // Xác định đường dẫn base an toàn kể cả khi URL thiếu dấu gạch chéo cuối
  let basePath = window.location.pathname;
  if (!basePath.endsWith('/') && !basePath.endsWith('.html')) {
    basePath += '/';
  } else if (basePath.endsWith('.html')) {
    basePath = basePath.substring(0, basePath.lastIndexOf('/') + 1);
  }
  const baseUrl = window.location.origin + basePath;

  await Promise.all(
    placeholders.map(async (placeholder) => {
      const rawPath = placeholder.getAttribute('data-partial');
      if (!rawPath) return;

      const cleanPath = rawPath.replace(/^\.\//, '');
      const fullUrl = new URL(cleanPath, baseUrl).href;

      try {
        const response = await fetch(fullUrl);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const htmlText = await response.text();
        const range = document.createRange();
        const fragment = range.createContextualFragment(htmlText);
        placeholder.replaceWith(fragment);
      } catch (err) {
        console.error(`Không thể nạp partial: ${fullUrl}`, err);
      }
    })
  );
}
