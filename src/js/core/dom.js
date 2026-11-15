// dom.js - Các hàm tiện ích thao tác DOM (DOM Utility Functions)

export const $ = (selector, context = document) => context.querySelector(selector);
export const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

export function on(element, event, handler) {
  if (element) {
    element.addEventListener(event, handler);
  }
}
