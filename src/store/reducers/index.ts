function getLastDayOfMonth(year: number, month: number) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

const getCurrDate = (date?: Date ) => {
  let dd, mm, yy;
  if (date) {
    dd = new Date(date).getDate()
    mm = new Date(date).getMonth()
    yy = new Date(date).getFullYear()
    return {date: `${dd}.${mm + 1}.${yy}`, startWeekDay: new Date(new Date(date).setFullYear(yy, mm, 1)).getDay(), daysAmount: getLastDayOfMonth(yy, mm)}
  }
  dd = new Date().getDate()
  mm = new Date().getMonth()
  yy = new Date().getFullYear()
  return {date: `${dd}.${mm + 1}.${yy}`, startWeekDay: new Date(new Date().setFullYear(yy, mm, 1)).getDay(), daysAmount: getLastDayOfMonth(yy, mm) }
}

console.log(`getCurrDate()`, getCurrDate())

const createInitArr = () => {
  return Array(6).fill(0).map(() => {
    return Array(7).fill(0).map(() => {
      return {date: 0, reminder: []}
    })
  })
}
console.log(`object`, createInitArr())

const getRestStartDays = (year: number, month: number, amount: number) => {
  let lastDay = getLastDayOfMonth(year, month)
  const restDays = [];
  for(let i=0; i<amount;i++) {
    restDays.push(lastDay--)
  }
  return restDays.reverse()
}



const createDays = (o: {date: string, startWeekDay: number, daysAmount: number}) => {
  const {date, startWeekDay, daysAmount } = o;
  console.log(`daysAmount`, daysAmount)
  const [dd, mm, yy] = o.date.split('.')
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
  const startDays = getRestStartDays(+yy, +mm, startMonthDays)
  for(let i=0; i<startMonthDays; i++) {
    arr[0][i] = {date: startDays[i], reminder: []}
  }
  
  return arr
}



console.log(`object`, createDays(getCurrDate()))


const initMonths = () => {
  const data = [];
  data.push({
    day: new Date().getDay(),
    days: createDays(getCurrDate())
  })
  return data
}

const initState = {
  [new Date().getFullYear()]: initMonths(),
}

export const reducer = (state: any = initState, action: any) => {
  switch(action.type) {
    case 'nextMOnth':
      return {...state, }
    default:
      return state
  }
}