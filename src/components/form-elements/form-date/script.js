{
  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const date = new Date();
  // date.setFullYear(2020);
  // date.setMonth(1);
  const nowYear = date.getFullYear();
  const nowMonth = date.getMonth();
  const nowWeekday = date.getDay();
  const nowDay = date.getDate();

  /* Functions */
  const getDay = (day = nowDay, month = nowMonth, year = nowYear) =>
    new Date(year, month, day).getDate();

  const getWeakday = (day = nowDay, month = nowMonth, year = nowYear) =>
    new Date(year, month, day).getDay();

  const setDaysOnDate = () => {
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
    // Delete last weak
    // if (firstWeakdayOfMonth + lastDayOfMonth > 35) {
    //   var parent = document.querySelector('.form-date .content');
    //   parent.removeChild(parent.lastElementChild);
    // }
  }

  /* Usage */
  setDaysOnDate();
}
