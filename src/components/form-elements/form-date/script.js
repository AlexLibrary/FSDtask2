{
  /* Functions */

  const getDayElements = () => document.querySelectorAll('.form-date .content__day');
  const getAmountDayElements = () => getDayElements().length;
  const getMonthElement = () => document.querySelector('.form-date .header__text');
  const getFirstWeakdayThisMonth = date => new Date(date.getFullYear(), date.getMonth(), 0).getDay();
  const getLastDayThisMonth = date => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const setMonthInHtml = date => {
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthEl = getMonthElement();
    monthEl.textContent = months[month] + ' ' + year;
  }
  const setNextMonth = date => {
    date.setFullYear(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }
  const setLastMonth = date => {
    date.setFullYear(date.getFullYear(), date.getMonth() - 1, date.getDate());
  }
  const setActualMonth = date => {
    d = new Date();
    date.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
  }
  const toggleLastWeak = date => {
    const firstWeakday = getFirstWeakdayThisMonth(date);
    const daysInMonth = 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate()
    const needElements = firstWeakday + daysInMonth;
    const amountElements = getAmountDayElements();
    const parent = document.querySelector('.form-date .content');
    if (amountElements === 42 && needElements < 35) {
      for (let i = 0; i < 7; i++) {
        parent.removeChild(parent.lastElementChild);
      }
    } else if (amountElements === 35 && needElements > 35) {
      for (let i = 0; i < 7; i++) {
        const div = document.createElement('div');
        div.classList.value = 'content__day';
        div.textContent = '1';
        parent.appendChild(div);
      }
    }
  }

  const setDaysInHTML = date => {

    const days = getDayElements();
    const firstWeakday = getFirstWeakdayThisMonth(date);
    const thisDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const actualDate = new Date();

    date.setFullYear(date.getFullYear(), date.getMonth(), 1);
    date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() - firstWeakday);

    for (const day of days) {
      // console.log(thisDate);
      day.classList.value = 'content__day'; // обнуляю класс элемента
      day.textContent = date.getDate();
      if (date.getMonth() === (thisDate.getMonth() - 1 === -1 ? 11 : thisDate.getMonth() - 1)) day.classList.add('lastMonth');
      if (date.getMonth() === (thisDate.getMonth() + 1 === 12 ? 0 : thisDate.getMonth() + 1)) day.classList.add('nextMonth');
      if (date.toDateString() === actualDate.toDateString()) day.classList.add('actualDay');

      date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    }
    date.setFullYear(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate());
  }

  const clickOnArrow = date => e => {
    const element = e.target;
    let stringClass = element.classList.value;
    if (stringClass.includes('box')) {
      stringClass = element.children[0].classList.value
    }

    if (stringClass.includes('right')) {
      date.setFullYear(date.getFullYear(), date.getMonth() + 1, date.getDate());
      toggleLastWeak(date);
      setMonthInHtml(date);
      setDaysInHTML(date);
    } else if (stringClass.includes('left')) {
      date.setFullYear(date.getFullYear(), date.getMonth() - 1, date.getDate());
      toggleLastWeak(date);
      setMonthInHtml(date);
      setDaysInHTML(date);
    }
  }

  /* Usage */
  const DATE = new Date();
  setMonthInHtml(DATE);
  setDaysInHTML(DATE);

  document.querySelectorAll('.header__arrow-box').forEach(e => {
    e.addEventListener('click', clickOnArrow(DATE));
  });


}
