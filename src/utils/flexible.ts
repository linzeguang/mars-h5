const docEl = document.documentElement;

export function getRemUnit() {
  let rem: number;

  if (docEl.clientWidth < 320) rem = 12;
  else if (docEl.clientWidth < 375) rem = 14;
  else if (docEl.clientWidth < 390) rem = 16;
  else if (docEl.clientWidth < 414) rem = 18;
  else rem = 20;

  return `${rem}px`;
}

export function setRemUnit() {
  const rem = getRemUnit();

  docEl.style.fontSize = rem;
}

export function flexible(window: Window) {
  setRemUnit();
  window.addEventListener('resize', setRemUnit);
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      setRemUnit();
    }
  });
}
