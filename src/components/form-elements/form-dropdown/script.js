{
  'use strict';
  // variables
  const TargetEl = document.querySelector('.form-dropdown');
  const Select = TargetEl.querySelector('.select');

  // functions
  const addActiveClass = Element => {
    Element.classList.add('active');
  }
  const removeActiveClass = Element => {
    Element.classList.remove('active');
  }
  const toggleActiveClass = Element => {
    Element.className.includes('active') ?
      removeActiveClass(Element) : addActiveClass(Element);
  }
  const changeValue = (Element) => {
    Select.innerText = Element.innerText;
    removeActiveClass(Select);
  }
  const click = ({ target } = event) => {
    target.className.includes('item') ? changeValue(target) : false;
    target.className.includes('select') ? toggleActiveClass(target) : false;
  }
  const mouseleave = ({ target } = event) => {
    removeActiveClass(Select);
  }

  // usage
  TargetEl.addEventListener('click', click);
  TargetEl.addEventListener('mouseleave', mouseleave);
}
