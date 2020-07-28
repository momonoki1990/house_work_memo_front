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
  updateWorks: actionCreator<Array<any>>('ACTIONS_UPDATE_HOME_WORKS'),
  updateCategories: actionCreator<Array<any>>('ACTIONS_UPDATE_HOME_CATEGORIES')
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
// Home用デフォルトアクション、works(createdAt降順)・categories取得
export const defaultHomeAction = () => {
  return (dispatch: Dispatch<AnyAction>) => {
    client.get('/home')
      .then((response) => {
        const result: Array<any> = response.data;
        dispatch(HomeActions.updateWorks(result[0]));
        dispatch(HomeActions.updateCategories(result[1]));
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

// works取得(daily用、done_date降順)
export const fetchDailyWorks = (month: Date) => {
  return (dispatch: Dispatch<AnyAction>) => {
    client.get('/daily', { params: { month: month } })
      .then((response) => {
        const result: Array<object> = response.data;
        dispatch(DailyActions.updateWorks(result));
      })
      .catch((err) => {
        console.error('非同期通信エラー3');
        console.error(err);
      })
  }
}