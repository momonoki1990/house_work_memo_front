import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const FormInputActions = {
  updateDate: actionCreator<string>('ACTIONS_UPDATE_DATE'),
  updateCategory: actionCreator<string>('ACTIONS_UPDATE_CATEGORY'),
  updateHours: actionCreator<number>('ACTIONS_UPDATE_HOURS'),
  updateNote: actionCreator<string>('ACTIONS_UPDATE_NOTE'),
}

/*export const HomeActions = {
  updateWorks: actionCreator<Array<any>>('ACTIONS_UPDATE_HOME_WORKS')
}

export const DailyActions = {
  updateMonth: actionCreator<number>('ACTIONS_UPDATE_DAILY_MONTH'),
  updateWorks: actionCreator<Array<any>>('ACTIONS_UPDATE_DAILY_WORKS')
}

export const MonthlyActions = {
  updateMonth: actionCreator<number>('ACTIONS_UPDATE_MONTHLY_MONTH'),
  updateHoursPerCategory: actionCreator<Array<any>>('ACTIONS_UPDATE_HOURS_PER_CATEGORY')
}*/