function getLastDayOfMonth(year: number, month: number) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

const getCurrDate = (year?: number, month?: number) => {
  let mm, yy;
  if (year && month) {
    mm = month
    yy = year
    return {month: mm, year: yy, startWeekDay: new Date(new Date().setFullYear(yy, mm - 1, 1)).getDay(), daysAmount: getLastDayOfMonth(yy, mm - 1)}
  }
  mm = new Date().getMonth()
  yy = new Date().getFullYear()
  return {month: mm, year: yy, startWeekDay: new Date(new Date().setFullYear(yy, mm - 1, 1)).getDay(), daysAmount: getLastDayOfMonth(yy, mm - 1) }
}


const createInitArr = () => {
  return Array(6).fill(0).map(() => {
    return Array(7).fill(0).map(() => {
      return {date: 0, reminder: []}
    })
  })
}
console.log(`object`, createInitArr())

const getRestStartDays = (year: number, month: number, amount: number) => {
  let lastDay = getLastDayOfMonth(year, month - 2)
  const restDays = [];
  for(let i=0; i<amount;i++) {
    restDays.push(lastDay--)
  }
  return restDays.reverse()
}



const createDays = (o: {month: number, year: number, startWeekDay: number, daysAmount: number}) => {
  const {month, year, startWeekDay, daysAmount } = o;
  const arr = createInitArr()
  let k = 1;
  let kk = 1;
  for(let i=0; i<6; i++) {
    for(let j=0; j<7; j++) {
      if (i === 0 && j === startWeekDay-1) {
        arr[i][j] = {date: k++, reminder: [] };
      } else if (i === 0 && j < startWeekDay){
        continue 
      } else if (k > daysAmount) {
        arr[i][j] = {date: kk++, reminder: []};
      } else {
        arr[i][j] = {date: k++, reminder: []};
      }
    }
  }
  let startMonthDays = startWeekDay - 1;
  const startDays = getRestStartDays(year, month, startMonthDays)
  for(let i=0; i<startMonthDays; i++) {
    arr[0][i] = {date: startDays[i], reminder: []}
  }
  
  return arr
}





const initMonths = (year: number = new Date().getFullYear()) => {
  const data = [];
  for(let i=0; i<12; i++) {
    data.push(createDays(getCurrDate(year, i+1)))
  }
  return data
}

const initState = {
  currYear: new Date().getFullYear(),
  currMonth: new Date().getMonth(),
  2010: initMonths(2010),
  2011: initMonths(2011),
  2012: initMonths(2012),
  2013: initMonths(2013),
  2014: initMonths(2014),
  2015: initMonths(2015),
  2016: initMonths(2016),
  2017: initMonths(2017),
  2018: initMonths(2018),
  2019: initMonths(2019),
  2020: initMonths(2020),
  [new Date().getFullYear()]: initMonths(),
}

export const reducer = (state: any = initState, action: any) => {
  switch(action.type) {
    case 'prev':
      const newMonth = state.currMonth - 1;
      if (newMonth < 0) {
        return state
      }
      return {...state, currMonth: newMonth, currYear: state.currYear}
    default:
      return state
  }
}