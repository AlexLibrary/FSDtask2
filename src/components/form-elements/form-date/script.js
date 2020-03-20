{
  /* Functions */
  const setDaysOnDate = (month = 0, year = 1970) => {
    /* Variables */
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const date = new Date();
    // Set date
    date.setFullYear(year, month);
    const nowYear = date.getFullYear();
    const nowMonth = date.getMonth();
    // const nowWeekday = date.getDay();
    const nowDay = date.getDate();
    /* Functions */
    const getDay = (day = nowDay, month = nowMonth, year = nowYear) =>
      new Date(year, month, day).getDate();

    const getWeakday = (day = nowDay, month = nowMonth, year = nowYear) =>
      new Date(year, month, day).getDay();
    /* Usage */
    // Set name of month
    const nameMonth = document.querySelector('.form-date .header__text');
    nameMonth.textContent = months[nowMonth] + ' ' + nowYear;
    // Set days
    const firstWeakdayOfMonth = getWeakday(0);
    const lastDayOfMonth = getDay(0, nowMonth + 1);
    const items = document.querySelectorAll('.form-date .content__day');
    let j = 1;
    let k = 1;
    for (let i = 0; i < items.length; i++) {
      let dayOfLastMonth = getDay(i - getWeakday(0) + 1);
      const item = items[i];
      if (i < firstWeakdayOfMonth) {
        item.textContent = dayOfLastMonth;
        item.classList.add('lastMonth');
      } else if (j <= lastDayOfMonth) {
        item.textContent = j++;
      } else {
        item.classList.add('nextMonth');
        item.textContent = k++;
      }
    }
    // delete last weak
    // const totalElementsOfCalendar = document.querySelectorAll('.form-date .content__day').length; (? && totalElementsOfCalendar === 42)
    if (firstWeakdayOfMonth + lastDayOfMonth < 36) {
      var parent = document.querySelector('.form-date .content');
      for (let i = 0; i < 7; i++) {
        parent.removeChild(parent.lastElementChild);
      }
    }
    // Set style .actualDay
    const actualDate = new Date();
    if (date.getMonth() === actualDate.getMonth() && date.getFullYear() === actualDate.getFullYear()) {
      const days = document.querySelectorAll('.form-date .content__day');
      days[firstWeakdayOfMonth + actualDate.getDate() - 1].classList.add('actualDay');
    }
  }
  const changeMonthOfCalendar = () => {

  }
  /* Function Events */
  const clickOnArrow = e => {
    const element = e.target;
    let stringClass = element.classList.value;
    // console.dir(stringClass.includes('right'));
    // console.dir(element);
    if (stringClass.includes('box')) {
      stringClass = element.children[0].classList.value
    }

    if (stringClass.includes('right')) {
      console.log('right')
      // month++;
      // setDaysOnDate(month, nowYear)
    } else if (stringClass.includes('left')) {
      console.log('left')
      // month--;
      // setDaysOnDate(month, nowYear)
    }
  }

  /* Usage */
  const date = new Date();
  const nowYear = date.getFullYear();
  const nowMonth = date.getMonth();
  const nowDay = date.getDate();
  let month = nowMonth;
  let year = nowYear;
  setDaysOnDate(nowMonth, nowYear); // default: month = 0, year = 1970

  document.querySelectorAll('.header__arrow-box').forEach(e => {
    e.addEventListener('click', clickOnArrow);
  });

}
