import {createDate} from "./createDate";

export const  getMonthNames = (locale: string = 'default') => {
  const monthsNames:{
    month: ReturnType<typeof createDate>['month'],
    monthShort: ReturnType<typeof createDate>['monthShort'],
    monthIndex: ReturnType<typeof createDate>['monthIndex'],
    date: ReturnType<typeof createDate>['date'],
  }[] = Array.from({length: 12});

  const d = new Date()

  monthsNames.forEach((_, i) => {
    const {month, monthIndex, monthShort, date} = createDate({
      locale,
      date: new Date(d.getFullYear(), d.getMonth() + i, 1)
    });

    monthsNames[monthIndex] = {month, monthIndex, monthShort, date};
  })

  return monthsNames;
}