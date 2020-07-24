import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { FormInputActions, /*HomeActions, DailyActions, MonthlyActions*/ } from './actions';

export interface Form {
  //form: {
    date: string,
    category: string,
    hours: number,
    note: string
  //}
}

/*export interface Home {
  home: {
    works: Array<any>  // 作成日(createdAt)降順
  },
}

export interface Daily {
  daily: {
    month: number,
    works: Array<any>  // 作業日(done_date)降順
  },
}

export interface Monthly {
  monthly: {
    month: number,
    hours_per_category: Array<any>
  }
}*/

/*export type State = Form & Home & Daily & Monthly;*/

const today = new Date();
// 2020/07/24の形式に直す
const today_str = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`

const initialFormState: Form = {
  //form: {
    date: today_str,
    category: 'あああ',
    hours: 0,
    note: ''
  //}
};
/*const initialHomeState: Home = {
  home: {
    works: []
  },
};
const initialDailyState: Daily = {
  daily: {
    month: today.getMonth() + 1,
    works: []
  },
};
const initialMonthlyState: Monthly = {
  monthly: {
    month: today.getMonth() + 1,
    hours_per_category: [] // 分類別月間合計時間
  }
}*/

export const formReducer = reducerWithInitialState(initialFormState)
  .case(FormInputActions.updateDate, (state, inputDate) => {
    return { ...state, inputDate }
  })
  .case(FormInputActions.updateCategory, (state, inputCategory) => {
    return { ...state, inputCategory}
  })
  .case(FormInputActions.updateHours, (state, inputHours) => {
    return { ...state, inputHours }
  })
  .case(FormInputActions.updateNote, (state, inputNote) => {
    return { ...state, inputNote}
  })

/*export const homeReducer = reducerWithInitialState(initialHomeState)
  .case(HomeActions.updateWorks, (state, works) => {
    return { ...state, works }
  })

export const dailyReducer = reducerWithInitialState(initialDailyState)
  .case(DailyActions.updateMonth, (state, month) => {
    return { ...state, month }
  })
  .case(DailyActions.updateWorks, (state, works) => {
    return { ...state, works }
  })

export const monthlyReducer = reducerWithInitialState(initialMonthlyState)
  .case(MonthlyActions.updateMonth, (state, month) => {
    return { ...state, month }
  })
  .case(MonthlyActions.updateHoursPerCategory, (state, hours_per_category) => {
    return { ...state, hours_per_category }
  })
*/