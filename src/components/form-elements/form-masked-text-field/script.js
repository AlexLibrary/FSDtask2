{
  'use strict';
  const DATEMASK = 'ДД.ММ.ГГГГ';
  document.addEventListener('DOMContentLoaded', () => {
    // Function
    const transformationPlaceholderToSpan = element => {
      const letters = element.dataset.placeholder;
      for (const letter of letters) {
        const span = document.createElement('span');
        span.className = 'spanMask';
        span.innerHTML = letter;
        element.appendChild(span);
      }
    }

    const checkLastChar = target => ((nextEl(target) === DATEMASK.length - 1) &&
      (target.children[nextEl(target)].innerText !== DATEMASK[DATEMASK.length - 1]));

    const nextEl = target => {
      const splitedMask = DATEMASK.split('');
      const splitedInput = target.innerText.split('');
      let i = 0;
      for (; i < splitedInput.length; i++) {
        if (splitedMask[i] === splitedInput[i] && splitedInput[i] !== '.') return i;
      }
      return DATEMASK.length - 1;
    }

    const selectNode = (node) => {
      var range = document.createRange();
      var sel = window.getSelection();
      range.selectNode(node);
      // range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    const selectAfterNode = (node) => {
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(node, 1);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    const cursorFunc = ({ target } = event) => {

      while (target.tagName != 'DIV') {
        target = target.parentElement;
      }

      const indexEl = nextEl(target);

      if (checkLastChar(target)) {
        selectAfterNode(target.children[indexEl])
      } else {
        selectNode(target.children[indexEl])
      }
    }

    const backspace = target => {

      if (checkLastChar(target)) {
        target.children[nextEl(target)].className = 'spanMask';
        target.children[nextEl(target)].innerText = DATEMASK[nextEl(target)];
      }
      else if (DATEMASK[nextEl(target) - 1] !== '.' && nextEl(target) !== 0) {
        target.children[nextEl(target) - 1].className = 'spanMask';
        target.children[nextEl(target) - 1].innerText = DATEMASK[nextEl(target) - 1];
      }
      else if (nextEl(target) !== 0) {
        if (target.children[nextEl(target) - 1].innerText === '.') {
          target.children[nextEl(target) - 1].className = 'spanMask';
        }
        target.children[nextEl(target) - 2].className = 'spanMask';
        target.children[nextEl(target) - 2].innerText = DATEMASK[nextEl(target) - 2];
      }

    }

    const checkInput = e => {
      const check = [
        /[0-3]/,
        /^(0[1-9]|[12][0-9]|3[01])/,
        ,
        /^(0[1-9]|[12][0-9]|3[01])(\.)[0-1]$/,
        /^(0[1-9]|[12][0-9]|3[01])(\.)(0[1-9]|1[012])$/,
        ,
        /^(0[1-9]|[12][0-9]|3[01])(\.)(0[1-9]|1[012])(\.)[1-2]$/,
        /^(0[1-9]|[12][0-9]|3[01])(\.)(0[1-9]|1[012])(\.)(19|20)$/,
        /^(0[1-9]|[12][0-9]|3[01])(\.)(0[1-9]|1[012])(\.)(19[1-9]|20[0-2])$/,
        // /^(0[1-9]|[12][0-9]|3[01])(\.)(0[1-9]|1[012])(\.)(19[1-9]|20[0-2])\d$/
        /^(?:(?:31(\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
      ]

      const elementStr = e.target.innerText;
      let slicedElementStr = elementStr.slice(0, nextEl(e.target)) + e.key;
      return slicedElementStr.match(check[slicedElementStr.length - 1]);
    }

    const blink = e => {
      for (const child of e.target.children) {
        child.classList.add('red');
      }
      setTimeout(() => {
        for (const child of e.target.children) {
          child.classList.remove('red');
        }
      }, 300)
    }

    const keydownFunc = e => {

      if (e.key === 'Backspace') {
        backspace(e.target);
        cursorFunc(e);
      }
      if (e.key !== 'Backspace') {
        if (checkInput(e) === null) {
          blink(e);
          return e.preventDefault();
        }
      }

      const mat = e.key.match(/^[0-9]+$/);
      if (!mat) return e.preventDefault();
      if (checkLastChar(e.target)) return e.preventDefault();

    }

    const inputFunc = ({ target } = event) => {
      if (checkLastChar(target)) {
        target.children[nextEl(target)].className = 'spanInput';
      }
      if (target.children[nextEl(target) - 1].innerText === '.') {
        target.children[nextEl(target) - 2].className = 'spanInput';
      }
      target.children[nextEl(target) - 1].className = 'spanInput';

      cursorFunc(event);
    }
    // Usage
    for (const element of document.querySelectorAll("[data-placeholder]")) {
      transformationPlaceholderToSpan(element);
      element.addEventListener("input", inputFunc);
      element.addEventListener("click", cursorFunc);
      element.addEventListener("keydown", keydownFunc);
    }
  });
}

/*
 * https://stackoverflow.com/a/55010378
 * требует дороботки:
 * Проверки ДД.ММ.ГГГГ - 99.99.9999 //incorrect
 * Курсор в начало и выделение первого символа при фокусе input
 */

/*

document.addEventListener('DOMContentLoaded', () => {
    for (const el of document.querySelectorAll("[placeholder][data-slots]")) {
        const pattern = el.getAttribute("placeholder"),
            slots = new Set(el.dataset.slots || "_"),
            prev = (j => Array.from(pattern, (c,i) => slots.has(c)? j=i+1: j))(0),
            first = [...pattern].findIndex(c => slots.has(c)),
            accept = new RegExp(el.dataset.accept || "\\d", "g"),
            clean = input => {
                input = input.match(accept) || [];
                return Array.from(pattern, c =>
                    input[0] === c || slots.has(c) ? input.shift() || c : c
                );
            },
            format = () => {
                const [i, j] = [el.selectionStart, el.selectionEnd].map(i => {
                    i = clean(el.value.slice(0, i)).findIndex(c => slots.has(c));
                    return i<0? prev[prev.length-1]: back? prev[i-1] || first: i;
                });
                el.value = clean(el.value).join``;
                el.setSelectionRange(i, j);
                back = false;
            };
        let back = false;
        el.addEventListener("keydown", (e) => back = e.key === "Backspace");
        el.addEventListener("input", format);
        el.addEventListener("focus", format);
        el.addEventListener("blur", () => el.value === pattern && (el.value=""));
    }
});

*/
