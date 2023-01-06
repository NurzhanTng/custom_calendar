import React from 'react';
import {useCalendar} from "./hooks/useCalendar";
import {checkDateIsEqual, checkIsToday} from "../../utils/helpers/date";

import './Calendar.css'

interface CalendarProps {
  locale?: string,
  selectedDate: Date,
  selectDate: (date: Date) => void,
  firstWeekDay?: number,
}

const Calendar: React.FC<CalendarProps> = ({
  locale = 'ar-EG',
  selectDate,
  selectedDate,
  firstWeekDay= 2,
}) => {
  const { state, functions } = useCalendar({ firstWeekDay, selectedDate, locale });
  // console.log('state', state);

  return (
    <div className='calendar'>
      <div className="calendar__header">
        <div
          aria-hidden
          className="calendar__header__arrow__left"
          onClick={() => functions.onClickArrow('left')}
        />
        {state.mode === 'days' && (
          <div onClick={() => functions.setMode('months')}>
            {state.monthNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
          </div>
        )}
        {state.mode === 'months' && (
          <div aria-hidden onClick={() => functions.setMode('years')}>
            {state.selectedYear}
          </div>
        )}
        {state.mode === 'years' && (
          <div aria-hidden onClick={() => functions.setMode('days')}>
            {state.selectedYearInterval[0]} -{' '}
            {state.selectedYearInterval[state.selectedYearInterval.length - 1]}
          </div>
        )}
        <div
          aria-hidden
          className="calendar__header__arrow__right"
          onClick={() => functions.onClickArrow('right')}
        />
      </div>

      <div className="calendar__body">
        {state.mode === 'days' && (
          <>
            <div className="calendar__week__names">
              {state.weekDaysNames.map((weekDaysName) => (
                <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
              ))}
            </div>
            <div className="calendar__days">
              {state.calendarDays.map((day) => {
                const isToday = checkIsToday(day.date);
                const isSelectedDay = checkDateIsEqual(day.date, state.selectedDate.date);
                const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;

                return (
                  <div
                    aria-hidden
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    onClick={() => {
                      functions.setSelectedDate(day);
                      selectDate(day.date);
                    }}
                    className={['calendar__day',
                      isToday ? 'calendar__today__item' : '',
                      isSelectedDay ? 'calendar__selected__item' : '',
                      isAdditionalDay ? 'calendar__additional__day' : '',
                    ].join(' ')}>
                    {day.dayNumber}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {state.mode === 'months' && (
          <div className='calendar__pick__item__container'>
            {state.monthNames.map(monthName => {
              const isCurrent =
                new Date().getMonth() === monthName.monthIndex &&
                new Date().getFullYear() === state.selectedYear;

              const isSelectedMonth = monthName.monthIndex === state.selectedMonth.monthIndex;

              return (
                <div
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedMonthByIndex(monthName.monthIndex);
                    functions.setMode('days');
                  }}
                  className={['calendar__pick__item',
                    isCurrent ? 'calendar__today__item' : '',
                    isSelectedMonth ? 'calendar__selected__item' : '',
                  ].join(' ')}>
                  {monthName.monthShort}
                </div>
              );
            })}
          </div>
        )}

        {state.mode === 'years' && (
          <div className='calendar__pick__item__container'>
            <div className="calendar__unchoosable__year">{state.selectedYearInterval[0] - 1}</div>
            {state.selectedYearInterval.map(year => {
              const isCurrent = new Date().getFullYear() === year;
              const isSelectedYear = year === state.selectedYear;

              return (
                <div
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedYear(year);
                    functions.setMode('months');
                  }}
                  className={['calendar__pick__item',
                    isCurrent ? 'calendar__today__item' : '',
                    isSelectedYear ? 'calendar__selected__item' : '',
                  ].join(' ')}>
                  {year}
                </div>
              );
            })}
            <div className="calendar__unchoosable__year">{state.selectedYearInterval[state.selectedYearInterval.length - 1] + 1}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;