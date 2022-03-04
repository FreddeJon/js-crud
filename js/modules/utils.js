const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const createElement = (el, innerText = "") => {
  const newEl = document.createElement(el);
  newEl.innerText = innerText;
  return newEl;
};

const removeElement = (element) => {
  const el = document.querySelector(`${element}`);
  if (el) {
    el.parentNode.removeChild(el);
  }
};

const extractKeys = (obj) => {
  return Object.keys(obj);
};

export { capitalizeFirstLetter, createElement, removeElement, extractKeys };
