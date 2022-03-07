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

const addLoader = (element) => {
  const div = createElement("div");
  div.classList.add("loader");
  element.append(div);
};

const removeLoader = () => {
  const loader = document.querySelector("div.loader");
  if (loader) {
    loader.parentNode.removeChild(loader);
  }
};

export { capitalizeFirstLetter, createElement, removeElement, extractKeys, addLoader, removeLoader };
