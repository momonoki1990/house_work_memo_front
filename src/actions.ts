import { actionCreatorFactory } from 'typescript-fsa';
import axios from 'axios';

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
  updateMonth: actionCreator<number>('ACTIONS_UPDATE_DAILY_MONTH'),
  updateWorks: actionCreator<Array<any>>('ACTIONS_UPDATE_DAILY_WORKS')
}

export const MonthlyActions = {
  updateMonth: actionCreator<number>('ACTIONS_UPDATE_MONTHLY_MONTH'),
  updateHoursPerCategory: actionCreator<Array<any>>('ACTIONS_UPDATE_HOURS_PER_CATEGORY')
}

const client = axios.create({
  baseURL: 'http://localhost:3001'
});


/*
export const fetchUsers = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const response = await client.get('api/v1/list');
      const result: Array<any> = response.data;
      dispatch(TextInputActions.updateUsers(result));
    } catch {
      //勇者よ，忘れず例外処理をやるのです
      //例外通知用の同期Actionを作るのもオススメです
    }
  };
};
*/