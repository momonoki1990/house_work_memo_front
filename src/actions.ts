import { actionCreatorFactory } from 'typescript-fsa';
import axios from 'axios';
import { Dispatch, AnyAction } from 'redux';

const actionCreator = actionCreatorFactory();

export const FormInputActions = {
  updateDate: actionCreator<string>('ACTIONS_UPDATE_DATE'),
  updateCategory: actionCreator<string>('ACTIONS_UPDATE_CATEGORY'),
  updateHours: actionCreator<number>('ACTIONS_UPDATE_HOURS'),
  updateNote: actionCreator<string>('ACTIONS_UPDATE_NOTE'),
}

export const HomeActions = {
    updateWorks: actionCreator<Array<any>>('ACTIONS_UPDATE_HOME_WORKS')
}
  
export const DailyActions = {
  addMonth: actionCreator('ACTIONS_UPDATE_DAILY_MONTH'),
  updateWorks: actionCreator<Array<any>>('ACTIONS_UPDATE_DAILY_WORKS')
}

export const MonthlyActions = {
  addMonth: actionCreator('ACTIONS_UPDATE_MONTHLY_MONTH'),
  updateHoursPerCategory: actionCreator<Array<any>>('ACTIONS_UPDATE_HOURS_PER_CATEGORY')
}

const client = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? "https://house-work-memo-back.herokuapp.com" : "http://localhost:5000"
});


// 非同期アクション
// works取得(Home用、createdAt降順)
export const fetchHomeWorks = () => {
  return (dispatch: Dispatch<AnyAction>) => {
    client.get('/home')
      .then((response) => {
        const result: Array<any> = response.data;
        dispatch(HomeActions.updateWorks(result));
      })
      .catch((err) => {
        console.error('非同期通信エラー1')
      })
  }
}

// hours_per_category取得(Monthly用、Category.id降順)
export const fetchMonthlyHoursPerCategory = (month: Date) => {
  return (dispatch: Dispatch<AnyAction>) => {
    client.get('/monthly', { params: { month: month } })
      .then((response) => {
        const result: Array<any> = response.data;
        dispatch(MonthlyActions.updateHoursPerCategory(result));
      })
      .catch((err) => {
        console.error('非同期通信エラー2');
        console.error(err);
      })
  }
}