import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { format, addDays, startOfMonth } from 'date-fns';
import { FormInputActions, HomeActions, DailyActions, MonthlyActions } from './actions';

export interface Form {
  date: string,
  category: string,
  hours: number,
  note: string
};

export interface Home {
  works: Array<any>,  // 作成日(createdAt)降順
  categories: Array<any>
}
export interface Daily {
  month: Date,
  works: Array<any>  // 作業日(done_date)降順
}
export interface Monthly {
  month: Date,
  hours_per_category: Array<any>
  
}

let today = new Date();
// 2020/07/24の形式に直す
const today_str =  format(today, 'yyyy/MM/dd')
// 月初に直す→2020-07-01T06:36:45.878Z
today = addDays(startOfMonth(today), +1)

const initialFormState: Form = {
  date: today_str,
  category: 'あああ',
  hours: 0,
  note: ''
};

const initialHomeState: Home = {
  works: [],
  categories: []
};

const initialDailyState: Daily = {
  month: today, // 月初
  works: []
};

const initialMonthlyState: Monthly = {
  month: today,　// 月初
  hours_per_category: [] // 分類別月間合計時間
}

export const formReducer = reducerWithInitialState(initialFormState)
  .case(FormInputActions.updateDate, (state, date) => {
    return { ...state, date }
  })
  .case(FormInputActions.updateCategory, (state, category) => {
    return { ...state, category }
  })
  .case(FormInputActions.updateHours, (state, hours) => {
    return { ...state, hours }
  })
  .case(FormInputActions.updateNote, (state, note) => {
    return { ...state, note }
  })

export const homeReducer = reducerWithInitialState(initialHomeState)
  .case(HomeActions.updateWorks, (state, works) => {
    return { ...state, works }
  })
  .case(HomeActions.updateCategories, (state, categories) => {
    return { ...state, categories }
  })

export const dailyReducer = reducerWithInitialState(initialDailyState)
  .case(DailyActions.addMonth, (state) => {
    let month = state.month;
    month.setMonth(month.getMonth() + 1);
    return { ...state, month: month }
  })
  .case(DailyActions.updateWorks, (state, works) => {
    return { ...state, works }
  })

export const monthlyReducer = reducerWithInitialState(initialMonthlyState)
  .case(MonthlyActions.addMonth, (state) => {
    let month = state.month;
    month.setMonth(month.getMonth() + 1);
    return { ...state, month: month }
  })
  .case(MonthlyActions.updateHoursPerCategory, (state, hours_per_category) => {
    return { ...state, hours_per_category }
  })